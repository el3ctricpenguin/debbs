import { BBSHeading } from "@/components/BBSHeading";
import { Box, Button, chakra, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

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
                    <HStack mb={2} px={2}>
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
                        <Text>Ethereum / DeFi / Trading / NFT / Prediction Market / GameFi / Wallet Security</Text>
                        <Text>[See More]</Text>
                        <Hr borderStyle="dashed" my={2} />

                        <BBSHeading headingProps={{ mt: 4, mb: 2 }}>&gt; Recent Threads</BBSHeading>
                        <Text>[great-security.eth] I made a special anti-fraud wallet, Pizza Wallet.</Text>
                        <Text>[0xd3ef...ad823] Where can I get WBTC at better price?</Text>
                        <Text>[house-boy.eth] I’m crypto bilionaire living with my mom</Text>

                        <BBSHeading headingProps={{ mt: 4, mb: 2 }}>&gt; Recent Posts</BBSHeading>
                        <Text>[sbf.eth] I’ll buy as much as ETH has you have...</Text>
                        <Text>[0x92da1...2ed3a] Ethereum is so dead!!</Text>
                        <Text>[house-boy.eth] I made 200k buying vegetable tokens last year</Text>
                        <Button onClick={() => disconnect()}>Disconnect</Button>
                        <Text>{address}</Text>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
