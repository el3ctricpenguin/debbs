import { BBSHeading, BBSHeadingTitle } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import { DashboardTable } from "@/components/DashboardTable";
import { EnsNameOrAddress } from "@/components/EnsNameOrAddress";
import { BoardTableRow } from "@/components/ThreadTableRow";
import { wagmiConfig } from "@/config/wagmi";
import { Addresses } from "@/constants/Addresses";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { getDefaultPrimaryColor, getDefaultBgColor } from "@/constants/DefaultColors";
import { deBbsAbi } from "@/generated";
import { theGraphFetcher } from "@/utils/theGraphFetcher";
import {
    Box,
    Button,
    FormControl,
    HStack,
    Input,
    Link,
    Table,
    TableContainer,
    Tbody,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    useToast,
    VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { formatEther, getAddress } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";

const query = `{
  threadCreateds(first: 3, orderBy: timestamp, orderDirection: desc) {
    threadId
    parentBoardId
    threadOwner
    threadTitle
    timestamp
  }
  postCreateds(orderBy: timestamp, orderDirection: desc, where: {isDeleted: false}) {
    postId
    parentThreadId
    postOwner
    postContent
    timestamp
    isDeleted
    mentionTo
  }
}`;

type theGraphResponse = {
    data: {
        postCreateds: {
            postId: string;
            parentThreadId: string;
            postOwner: string;
            postContent: string;
            timestamp: string;
            isDeleted: boolean;
            mentionTo: string;
        }[];
        threadCreateds: {
            threadId: string;
            parentBoardId: string;
            threadOwner: string;
            threadTitle: string;
            timestamp: string;
        }[];
    };
};

export default function Home() {
    const { chain } = useAccount();
    const { data: getBoardsResult, refetch: refetchGetBoardsByBoard } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getBoards",
        abi: deBbsAbi,
    });
    console.log("getBoardsResult", getBoardsResult);

    const { data: createBoardFee } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "createBoardFee",
        abi: deBbsAbi,
    });
    const { data: createThreadFee } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "createThreadFee",
        abi: deBbsAbi,
    });
    const { data: createPostFee } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "createPostFee",
        abi: deBbsAbi,
    });
    const { data: getThreadsResult } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getThreadsCountByBoard",
        abi: deBbsAbi,
        args: [BigInt(0)],
    });
    const { data: getPostsCountResult } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getPostsCount",
        abi: deBbsAbi,
    });

    const totalFees =
        getBoardsResult &&
        createBoardFee &&
        getThreadsResult &&
        createThreadFee &&
        createPostFee &&
        getPostsCountResult &&
        createBoardFee * BigInt(getBoardsResult.length) + createThreadFee * getThreadsResult + createPostFee * getPostsCountResult;

    const { data: theGraphResult } = useSWR<theGraphResponse>(query, theGraphFetcher);
    console.log(theGraphResult);
    // console.log("postCreateds", theGraphResult && JSON.stringify(theGraphResult.data.postCreateds));
    // console.log("threadCreateds", theGraphResult && JSON.stringify(theGraphResult.data.threadCreateds));

    const recentThreadsResult = theGraphResult && theGraphResult.data.threadCreateds;
    const recentPostsResult = theGraphResult && theGraphResult.data.postCreateds;

    const userCount = recentPostsResult ? new Set(recentPostsResult.map((post) => post.postOwner)).size : 0;

    const primaryColor = getDefaultPrimaryColor(chain && chain.id);
    const bgColor = getDefaultBgColor(chain && chain.id);

    const [formData, setFormData] = useState({
        boardTitle: "",
        boardDescription: "",
        primaryColor: primaryColor,
        bgColor: bgColor,
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
            const createBoardTx = await writeContract(wagmiConfig, {
                address: getDeBBSAddress(chain && chain.id),
                abi: deBbsAbi,
                functionName: "createBoard",
                args: [
                    formData.boardTitle,
                    formData.boardDescription,
                    formData.primaryColor,
                    formData.bgColor,
                    formData.frontendOwnerAddress,
                ],
                value: BigInt(createBoardFee ? createBoardFee : BigInt(0)),
            });
            if (!createBoardTx) {
                throw new Error("Create Board Tx rejected");
            }
            console.log("txId: ", createBoardTx);
            const createBoardReceipt = await waitForTransactionReceipt(wagmiConfig, {
                hash: createBoardTx,
            });
            if (createBoardReceipt.status === "reverted") {
                throw new Error("Create Board Tx failed");
            }
            refetchGetBoardsByBoard();
            toast({
                title: "Create Board Tx Success",
                description: createBoardTx,
                status: "success",
                variant: "subtle",
                isClosable: true,
            });
        } catch (e) {
            const errorMessage = e instanceof Error ? `${e.message}` : `${e}`;
            toast({
                title: "Create Board Tx Failed",
                description: errorMessage,
                status: "error",
                variant: "subtle",
                isClosable: true,
            });
        } finally {
            setIsTxWaiting(false);
        }
    };

    return (
        <>
            <Head>
                <title>&gt;&gt;deBBS | Dashboard</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BBSLayout primaryColor={primaryColor} bgColor={bgColor}>
                <>
                    <BBSHeadingTitle headingProps={{ mb: 2 }}>{`> Dashboard: Welcome to deBBS`}</BBSHeadingTitle>
                    <DashboardTable totalFees={totalFees} userCount={userCount} />

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Boards</BBSHeading>
                    <TableContainer>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th color={primaryColor} borderColor={primaryColor}>
                                        title
                                    </Th>
                                    <Th color={primaryColor} borderColor={primaryColor}>
                                        description
                                    </Th>
                                    <Th color={primaryColor} borderColor={primaryColor}>
                                        moderator
                                    </Th>
                                    <Th color={primaryColor} borderColor={primaryColor}>
                                        earned fee
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody borderRight={`1px solid ${primaryColor}`}>
                                {getBoardsResult &&
                                    getBoardsResult.map((board, i) => (
                                        <BoardTableRow
                                            boardOwner={board.boardOwner}
                                            boardId={board.boardId}
                                            boardTitle={board.boardTitle}
                                            boardDescription={board.description}
                                            createBoardFee={createBoardFee ? createBoardFee : BigInt(0)}
                                            key={i}
                                        />
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Text mt={2}>
                        {getBoardsResult &&
                            getBoardsResult.map((board, i) =>
                                chain && chain.id == sepolia.id && i == 3 ? (
                                    <></>
                                ) : (
                                    <>
                                        {i == 0 ? "" : " / "}
                                        <Tooltip
                                            label={
                                                <Box color={primaryColor}>
                                                    <Text fontWeight={900}>&gt; {board.boardTitle}</Text>
                                                    <Text>[moderator] {board.boardOwner}</Text>
                                                    <Text>[description] {board.description}</Text>
                                                </Box>
                                            }
                                            placement="bottom-start"
                                            bgColor={bgColor}
                                            boxShadow="none"
                                            border={`1px solid ${primaryColor}`}
                                            borderRadius={0}
                                            offset={[0, 4]}
                                        >
                                            <Link as={NextLink} href={`/board/${board.boardId}`} key={i}>
                                                {board.boardTitle}
                                            </Link>
                                        </Tooltip>
                                    </>
                                )
                            )}
                    </Text>

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Recent Threads</BBSHeading>
                    {recentThreadsResult &&
                        recentThreadsResult.map((thread, i) =>
                            i < 3 ? (
                                <Text key={i} isTruncated>
                                    <Link as={NextLink} href={`/user/${thread.threadOwner}`}>
                                        [<EnsNameOrAddress address={getAddress(thread.threadOwner)} shorten />]
                                    </Link>{" "}
                                    <Link as={NextLink} href={`/thread/${thread.threadId}`}>
                                        {thread.threadTitle}
                                    </Link>
                                </Text>
                            ) : (
                                <></>
                            )
                        )}

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Recent Posts</BBSHeading>
                    {recentPostsResult &&
                        recentPostsResult.map((post, i) =>
                            i < 3 ? (
                                <Text key={i} isTruncated>
                                    <Link as={NextLink} href={`/user/${post.postOwner}`}>
                                        [<EnsNameOrAddress address={getAddress(post.postOwner)} shorten />]
                                    </Link>{" "}
                                    <Link as={NextLink} href={`/thread/${post.parentThreadId}`}>
                                        {post.postContent}
                                    </Link>
                                </Text>
                            ) : (
                                <></>
                            )
                        )}

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Create A Board</BBSHeading>
                    <FormControl as="form" onSubmit={handleSubmit}>
                        <VStack align="start" spacing={2}>
                            <Input
                                variant="bbs"
                                w={450}
                                border={`2px ${primaryColor} solid`}
                                bgColor={bgColor}
                                placeholder="Board Title"
                                _placeholder={{ color: primaryColor == "#FFFFFF" ? "whiteAlpha.700" : primaryColor, fontStyle: "italic" }}
                                isRequired
                                name="boardTitle"
                                value={formData.boardTitle}
                                onChange={handleChange}
                            />
                            <Input
                                variant="bbs"
                                w={450}
                                border={`2px ${primaryColor} solid`}
                                bgColor={bgColor}
                                placeholder="Board Description"
                                _placeholder={{ color: primaryColor == "#FFFFFF" ? "whiteAlpha.700" : primaryColor, fontStyle: "italic" }}
                                isRequired
                                name="boardDescription"
                                value={formData.boardDescription}
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
                                    Create A Board!
                                </Button>
                                <Text fontSize={14} display="inline-block" mx={4} fontStyle="italic">
                                    You have to pay {formatEther(createBoardFee ? createBoardFee : BigInt(0))} ETH
                                </Text>
                            </HStack>
                        </VStack>
                    </FormControl>
                </>
            </BBSLayout>
        </>
    );
}
