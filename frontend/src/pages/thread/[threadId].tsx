import { BBSHeading, BBSHeadingTitle } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import { Button, chakra, FormControl, HStack, Input, Table, TableContainer, Tbody, Td, Text, Tr, useToast, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { deBbsAbi } from "@/generated";
import { useAccount, useReadContract } from "wagmi";
import { wagmiConfig } from "@/config/wagmi";
import { useState } from "react";
import { Addresses } from "@/constants/Addresses";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { formatEther } from "viem";
import { convertTimestampToLocalTime } from "@/utils/convertTimestampToLocalTime";
import { useRouter } from "next/router";
import Post from "@/components/Post";

export default function Thread() {
    const { chain } = useAccount();

    const router = useRouter();
    const threadId = Number(router.query.threadId);
    console.log("threadId", threadId);

    const { data: getThreadResult } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getThread",
        abi: deBbsAbi,
        args: [BigInt(threadId ? threadId : 0)],
    });
    console.log("getThreadResult", getThreadResult);

    const { data: getPostsByThreadResult, refetch: refetchGetPostsByThread } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        abi: deBbsAbi,
        functionName: "getPostsByThread",
        args: [BigInt(threadId ? threadId : 0)],
    });

    const { data: createPostFee } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "createPostFee",
        abi: deBbsAbi,
    });

    const [formData, setFormData] = useState({
        postContent: "",
        frontendOwnerAddress: Addresses.frontendOwner,
    });
    console.log(formData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [isTxWaiting, setIsTxWaiting] = useState(false);
    const toast = useToast();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsTxWaiting(true);
            const createPostTx = await writeContract(wagmiConfig, {
                address: getDeBBSAddress(chain && chain.id),
                abi: deBbsAbi,
                functionName: "createPost",
                args: [
                    BigInt(threadId),
                    BigInt(getPostsByThreadResult ? getPostsByThreadResult.length : Infinity),
                    formData.postContent,
                    formData.frontendOwnerAddress,
                ],
                value: BigInt(createPostFee ? createPostFee : BigInt(0)),
            });
            if (!createPostTx) {
                throw new Error("Create Post Tx rejected");
            }
            console.log("txId: ", createPostTx);
            const createPostReceipt = await waitForTransactionReceipt(wagmiConfig, {
                hash: createPostTx,
            });
            if (createPostReceipt.status === "reverted") {
                throw new Error("Create Post Tx failed");
            }
            refetchGetPostsByThread();
            toast({
                title: "Create Post Tx Success",
                description: createPostTx,
                status: "success",
                variant: "subtle",
                isClosable: true,
            });
        } catch (e) {
            const errorMessage = e instanceof Error ? `${e.message}` : `${e}`;
            toast({
                title: "Create Post Tx Failed",
                description: errorMessage,
                status: "error",
                variant: "subtle",
                isClosable: true,
            });
        } finally {
            setIsTxWaiting(false);
        }
    };

    const primaryColor = "white";
    const bgColor = "#3355FF";

    const Hr = chakra("hr");
    return (
        <>
            <Head>
                <title>&gt;&gt;deBBS | Board</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BBSLayout primaryColor={primaryColor} bgColor={bgColor}>
                <>
                    <BBSHeadingTitle headingProps={{ mb: 2 }}>{`> Thread: ${getThreadResult && getThreadResult[3]}`}</BBSHeadingTitle>
                    <TableContainer>
                        <Table size="sm" w={500}>
                            <Tbody borderRight={`1px solid ${primaryColor}`}>
                                <Tr borderTop={`1px solid ${primaryColor}`}>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        moderator
                                    </Td>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        {getThreadResult && getThreadResult[2]}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        time created
                                    </Td>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        {getThreadResult && convertTimestampToLocalTime(Number(getThreadResult[4].toString()))}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <Hr borderStyle="dashed" my={2} />
                    {getPostsByThreadResult && getPostsByThreadResult.map((post, i) => <Post key={i} post={post} />)}

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Create A Thread</BBSHeading>
                    <FormControl as="form" onSubmit={handleSubmit}>
                        <VStack align="start" spacing={2}>
                            <Input
                                variant="bbs"
                                w={450}
                                border={`2px ${primaryColor} solid`}
                                bgColor={bgColor}
                                placeholder="Thread Title"
                                _placeholder={{ color: "whiteAlpha.700", fontStyle: "italic" }}
                                isRequired
                                name="postContent"
                                value={formData.postContent}
                                onChange={handleChange}
                            />
                            <HStack>
                                <Button
                                    variant="bbs"
                                    bgColor={primaryColor}
                                    color={bgColor}
                                    type="submit"
                                    isLoading={isTxWaiting}
                                    loadingText="Creating A Thread..."
                                    _loading={{
                                        _hover: {
                                            opacity: 0.75,
                                            bgColor: primaryColor,
                                        },
                                    }}
                                >
                                    Create A Post!
                                </Button>
                                <Text fontSize={14} display="inline-block" mx={4} fontStyle="italic">
                                    You have to pay {formatEther(createPostFee ? createPostFee : BigInt(0))} ETH
                                </Text>
                            </HStack>
                        </VStack>
                    </FormControl>
                </>
            </BBSLayout>
        </>
    );
}
