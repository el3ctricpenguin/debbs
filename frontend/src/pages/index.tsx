import { BBSHeading } from "@/components/BBSHeading";
import { Box, Button, chakra, Heading, HStack, Link, Spacer, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

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
            account: "great-security.eth",
            threadDescription: "I made a special anti-fraud wallet, Pizza Wallet.",
        },
        {
            account: "0xd3ef...ad823",
            threadDescription: "Where can I get WBTC at better price?",
        },
        {
            account: "house-boy.eth",
            threadDescription: "I’m crypto bilionaire living with my mom",
        },
    ];

    const recentPostsResult = [
        {
            account: "sbf.eth",
            threadDescription: "I’ll buy as much as ETH has you have...",
        },
        {
            account: "0x92da1...2ed3a",
            threadDescription: "Ethereum is so dead!!",
        },
        {
            account: "house-boy.eth",
            threadDescription: "I made 200k buying vegetable tokens last year",
        },
    ];

    const Hr = chakra("hr");
    return (
        <>
            <Head>
                <title>deBBS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box bgColor="#3355FF" color="white" w="full" h="full">
                <Box w={960} margin="0 auto" pt={16}>
                    <HStack mb={3} px={2}>
                        <Heading
                            fontSize={24}
                            fontStyle="italic"
                            bgColor="white"
                            color="#3355FF"
                            pl={3}
                            pr={4}
                            pt={1.5}
                            pb={1}
                            lineHeight={5}
                        >
                            &gt;&gt;deBBS
                        </Heading>
                        <Spacer />
                        <BBSHeading>Ethereum Network</BBSHeading>
                        <BBSHeading>Connect Wallet</BBSHeading>
                    </HStack>
                    <Box border="2px solid #fff" borderRadius={10} padding={5}>
                        <BBSHeading headingProps={{ mb: 2 }}>&gt; Boards</BBSHeading>
                        <Text>
                            {boardsResult.map((board, i) => (
                                <Link as={NextLink} href={`/board/${board.boardId}`} key={i}>
                                    {(i == 0 ? "" : " / ") + board.boardTitle}
                                </Link>
                            ))}
                        </Text>
                        <Text>[See More]</Text>
                        <Hr borderStyle="dashed" my={2} />

                        <BBSHeading headingProps={{ mt: 4, mb: 2 }}>&gt; Recent Threads</BBSHeading>
                        {recentThreadsResult.map((thread, i) => (
                            <Text key={i}>
                                [{thread.account}] {thread.threadDescription}
                            </Text>
                        ))}

                        <BBSHeading headingProps={{ mt: 4, mb: 2 }}>&gt; Recent Posts</BBSHeading>
                        {recentPostsResult.map((post, i) => (
                            <Text key={i}>
                                [{post.account}] {post.threadDescription}
                            </Text>
                        ))}

                        <Button onClick={() => disconnect()}>Disconnect</Button>
                        <Text>{address}</Text>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
