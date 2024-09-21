import { BBSHeading } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import { Button, FormControl, HStack, Input, Link, Text, useToast, VStack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import Table from "cli-table3";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { deBbsAbi } from "@/generated";
import { useAccount, useReadContract } from "wagmi";
import { wagmiConfig } from "@/config/wagmi";
import { useState } from "react";
import { Addresses } from "@/constants/Addresses";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { formatEther } from "viem";

export default function Home() {
    const { chain } = useAccount();
    const { data: getBoardsResult } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getBoards",
        abi: deBbsAbi,
    });

    const boardId = 0;

    const { data: getThreadsByBoardResult, refetch: refetchGetThreadsByBoard } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        abi: deBbsAbi,
        functionName: "getThreadsByBoard",
        args: [BigInt(String(boardId ? boardId : 0))],
    });

    const { data: createThreadFee } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "createThreadFee",
        abi: deBbsAbi,
    });

    const threadsResult = [
        {
            threadId: 0,
            account: "great-security.eth",
            threadDescription: "I made a special anti-fraud wallet, Pizza Wallet.",
            postCount: 120,
        },
        {
            threadId: 0,
            account: "0xd3ef...ad823",
            threadDescription: "Where can I get WBTC at better price?",
            postCount: 21,
        },
        {
            threadId: 0,
            account: "house-boy.eth",
            threadDescription: "I’m crypto bilionaire living with my mom",
            postCount: 6,
        },
    ];

    const table = new Table({
        head: ["Account", "Title", "Earned Fees"],
        colWidths: [20, 60, 15],
        chars: {
            top: "",
            "top-mid": "",
            "top-left": "",
            "top-right": "",
            bottom: "",
            "bottom-mid": "",
            "bottom-left": "",
            "bottom-right": "",
        },
    });
    table.push(
        ...threadsResult.map(({ account, threadDescription, postCount }) => [
            account,
            threadDescription,
            (Math.floor(Number(createThreadFee) * postCount * 10000) / 10000).toFixed(4).toString() + " ETH",
        ])
    );
    console.log(table.toString());

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
                <title>&gt;&gt;deBBS | Board</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BBSLayout primaryColor={primaryColor} bgColor={bgColor}>
                <>
                    <BBSHeading headingProps={{ mb: 2 }}>&gt; Create A Thread</BBSHeading>
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
                                            bgColor: { bgColor },
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

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Threads</BBSHeading>
                    <Text whiteSpace="pre-wrap" fontFamily="monospace" fontSize={11}>
                        {table.toString()}
                    </Text>
                    <Text>
                        {getThreadsByBoardResult && getThreadsByBoardResult.map((thread, i) => <li key={i}>{thread.threadTitle}</li>)}
                    </Text>

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Recent Posts</BBSHeading>
                    {recentPostsResult.map((post, i) => (
                        <Text key={i}>
                            <Link as={NextLink} href={`/account/${post.account}`}>
                                [{post.account}]
                            </Link>{" "}
                            <Link as={NextLink} href={`/post/${post.postId}`}>
                                {post.postContent}
                            </Link>
                        </Text>
                    ))}
                </>
            </BBSLayout>
        </>
    );
}
