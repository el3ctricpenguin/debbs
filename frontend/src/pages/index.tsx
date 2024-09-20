import { BBSHeading } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import { chakra, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

const primaryColor = "#fff";
const bgColor = "#335CFF";

export default function Home() {
    const boardsResult = [
        { boardTitle: "Ethereum", boardId: 0 },
        { boardTitle: "DeFi", boardId: 0 },
        { boardTitle: "Trading", boardId: 0 },
        { boardTitle: "NFT", boardId: 0 },
        { boardTitle: "Prediction Market", boardId: 0 },
        { boardTitle: "GameFi", boardId: 0 },
        { boardTitle: "Wallet Security", boardId: 0 },
    ];

    const recentThreadsResult = [
        {
            threadId: 0,
            account: "great-security.eth",
            threadDescription: "I made a special anti-fraud wallet, Pizza Wallet.",
        },
        {
            threadId: 0,
            account: "0xd3ef...ad823",
            threadDescription: "Where can I get WBTC at better price?",
        },
        {
            threadId: 0,
            account: "house-boy.eth",
            threadDescription: "I’m crypto bilionaire living with my mom",
        },
    ];

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

    const Hr = chakra("hr");
    return (
        <>
            <Head>
                <title>&gt;&gt;deBBS | Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BBSLayout primaryColor={primaryColor} bgColor={bgColor}>
                <>
                    <BBSHeading headingProps={{ mb: 2 }}>&gt; Boards</BBSHeading>
                    <Text>
                        {boardsResult.map((board, i) => (
                            <>
                                {i == 0 ? "" : " / "}
                                <Link as={NextLink} href={`/board/${board.boardId}`} key={i}>
                                    {board.boardTitle}
                                </Link>
                            </>
                        ))}
                    </Text>
                    <Text>[See More]</Text>
                    <Hr borderStyle="dashed" my={2} />

                    <BBSHeading headingProps={{ mt: 4, mb: 2 }}>&gt; Recent Threads</BBSHeading>
                    {recentThreadsResult.map((thread, i) => (
                        <Text key={i}>
                            <Link as={NextLink} href={`/account/${thread.account}`}>
                                [{thread.account}]
                            </Link>{" "}
                            <Link as={NextLink} href={`/thread/${thread.threadId}`}>
                                {thread.threadDescription}
                            </Link>
                        </Text>
                    ))}

                    <BBSHeading headingProps={{ mt: 4, mb: 2 }}>&gt; Recent Posts</BBSHeading>
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
