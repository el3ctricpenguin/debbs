import { BBSHeading, BBSHeadingTitle } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import {
    Button,
    FormControl,
    HStack,
    Input,
    Link,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
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
import { ThreadTableRow } from "@/components/ThreadTableRow";

export default function Board() {
    const { chain } = useAccount();

    const router = useRouter();
    const boardId = Number(router.query.boardId);
    console.log("boardId", boardId);

    const { data: getBoardResult } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getBoard",
        abi: deBbsAbi,
        args: [BigInt(boardId ? boardId : 0)],
    });
    console.log("getBoardResult", getBoardResult);

    const { data: getThreadsByBoardResult, refetch: refetchGetThreadsByBoard } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        abi: deBbsAbi,
        functionName: "getThreadsByBoard",
        args: [BigInt(boardId ? boardId : 0)],
    });

    const { data: createThreadFee } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "createThreadFee",
        abi: deBbsAbi,
    });

    const recentPostsResult = [
        {
            postId: 0,
            account: "sbf.eth",
            postContent: "I’ll buy as much as ETH has you have...",
        },
        {
            postId: 0,
            account: "0x92da1...2ed3a",
            postContent: "Ethereum is so dead!!",
        },
        {
            postId: 0,
            account: "house-boy.eth",
            postContent: "I made 200k buying vegetable tokens last year",
        },
    ];

    const [formData, setFormData] = useState({
        threadTitle: "",
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
            const createThreadTx = await writeContract(wagmiConfig, {
                address: getDeBBSAddress(chain && chain.id),
                abi: deBbsAbi,
                functionName: "createThread",
                args: [BigInt(boardId), formData.threadTitle, formData.frontendOwnerAddress],
                value: BigInt(createThreadFee ? createThreadFee : BigInt(0)),
            });
            if (!createThreadTx) {
                throw new Error("Create Thread Tx rejected");
            }
            console.log("txId: ", createThreadTx);
            const createThreadReceipt = await waitForTransactionReceipt(wagmiConfig, {
                hash: createThreadTx,
            });
            if (createThreadReceipt.status === "reverted") {
                throw new Error("Create Thread Tx failed");
            }
            refetchGetThreadsByBoard();
            toast({
                title: "Create Thread Tx Success",
                description: createThreadTx,
                status: "success",
                variant: "subtle",
                isClosable: true,
            });
        } catch (e) {
            const errorMessage = e instanceof Error ? `${e.message}` : `${e}`;
            toast({
                title: "Create Thread Tx Failed",
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

    return (
        <>
            <Head>
                <title>&gt;&gt;deBBS | Board: {getBoardResult && getBoardResult[2]}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BBSLayout primaryColor={primaryColor} bgColor={bgColor}>
                <>
                    <BBSHeadingTitle headingProps={{ mb: 2 }}>{`> Board: ${getBoardResult && getBoardResult[2]}`}</BBSHeadingTitle>
                    <TableContainer>
                        <Table size="sm" w={500}>
                            <Tbody borderRight={`1px solid ${primaryColor}`}>
                                <Tr borderTop={`1px solid ${primaryColor}`}>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        moderator
                                    </Td>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        {getBoardResult && getBoardResult[1]}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td borderLeft={`1px solid ${primaryColor}`}>description</Td>
                                    <Td borderLeft={`1px solid ${primaryColor}`}>{getBoardResult && getBoardResult[2]}</Td>
                                </Tr>
                                <Tr>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        time created
                                    </Td>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        {getBoardResult && convertTimestampToLocalTime(Number(getBoardResult[6].toString()))}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Threads</BBSHeading>

                    <TableContainer>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th color={primaryColor}>moderator</Th>
                                    <Th color={primaryColor}>title</Th>
                                    <Th color={primaryColor}>earned fee</Th>
                                </Tr>
                            </Thead>
                            <Tbody borderRight={`1px solid ${primaryColor}`}>
                                {getThreadsByBoardResult &&
                                    getThreadsByBoardResult.map((thread, i) => (
                                        <ThreadTableRow
                                            threadOwner={thread.threadOwner}
                                            threadId={thread.threadId}
                                            threadTitle={thread.threadTitle}
                                            createThreadFee={createThreadFee ? createThreadFee : BigInt(0)}
                                            key={i}
                                        />
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Recent Posts</BBSHeading>
                    {recentPostsResult.map((post, i) => (
                        <Text key={i}>
                            <Link as={NextLink} href={`/user/${post.account}`}>
                                [{post.account}]
                            </Link>{" "}
                            <Link as={NextLink} href={`/post/${post.postId}`}>
                                {post.postContent}
                            </Link>
                        </Text>
                    ))}

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
                                name="threadTitle"
                                value={formData.threadTitle}
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
                                    Create A Thread!
                                </Button>
                                <Text fontSize={14} display="inline-block" mx={4} fontStyle="italic">
                                    You have to pay {formatEther(createThreadFee ? createThreadFee : BigInt(0))} ETH
                                </Text>
                            </HStack>
                        </VStack>
                    </FormControl>
                </>
            </BBSLayout>
        </>
    );
}
