import { BBSHeading, BBSHeadingTitle } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import { DashboardTable } from "@/components/DashboardTable";
import { EnsNameOrAddress } from "@/components/EnsNameOrAddress";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { getDefaultPrimaryColor, getDefaultBgColor } from "@/constants/DefaultColors";
import { deBbsAbi } from "@/generated";
import { theGraphFetcher } from "@/utils/theGraphFetcher";
import { Box, chakra, Link, Text, Tooltip } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import useSWR from "swr";
import { getAddress } from "viem";
import { useAccount, useReadContract } from "wagmi";

const query = `{
  threadCreateds(first: 3, orderBy: timestamp, orderDirection: desc) {
    threadId
    parentBoardId
    threadOwner
    threadTitle
    timestamp
  }
  postCreateds(first: 3, orderBy: timestamp, orderDirection: desc) {
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
    const { data: getBoardsResult } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getBoards",
        abi: deBbsAbi,
    });
    console.log("getBoardsResult", getBoardsResult);

    const { data: theGraphResult } = useSWR<theGraphResponse>(query, theGraphFetcher);
    console.log(theGraphResult);
    // console.log("postCreateds", theGraphResult && JSON.stringify(theGraphResult.data.postCreateds));
    // console.log("threadCreateds", theGraphResult && JSON.stringify(theGraphResult.data.threadCreateds));

    const recentThreadsResult = theGraphResult && theGraphResult.data.threadCreateds;
    const recentPostsResult = theGraphResult && theGraphResult.data.postCreateds;

    const Hr = chakra("hr");

    const primaryColor = getDefaultPrimaryColor(chain && chain.id);
    const bgColor = getDefaultBgColor(chain && chain.id);
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
                    <DashboardTable />
                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Boards</BBSHeading>
                    <Text>
                        {getBoardsResult &&
                            getBoardsResult.map((board, i) => (
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
                            ))}
                    </Text>
                    <Text>[See More]</Text>
                    <Hr borderStyle="dashed" my={2} borderColor={primaryColor} />

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Recent Threads</BBSHeading>
                    {recentThreadsResult &&
                        recentThreadsResult.map((thread, i) => (
                            <Text key={i}>
                                <Link as={NextLink} href={`/user/${thread.threadOwner}`}>
                                    [<EnsNameOrAddress address={getAddress(thread.threadOwner)} shorten />]
                                </Link>{" "}
                                <Link as={NextLink} href={`/thread/${thread.threadId}`}>
                                    {thread.threadTitle}
                                </Link>
                            </Text>
                        ))}

                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Recent Posts</BBSHeading>
                    {recentPostsResult &&
                        recentPostsResult.map((post, i) => (
                            <Text key={i}>
                                <Link as={NextLink} href={`/user/${post.postOwner}`}>
                                    [<EnsNameOrAddress address={getAddress(post.postOwner)} shorten />]
                                </Link>{" "}
                                <Link as={NextLink} href={`/thread/${post.parentThreadId}`}>
                                    {post.postContent}
                                </Link>
                            </Text>
                        ))}
                </>
            </BBSLayout>
        </>
    );
}
