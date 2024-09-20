import { Box, Button, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <>
            <Head>
                <title>deBBS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box bgColor="#3355FF" color="white" w="full" h="full">
                <Box w={900} margin="0 auto">
                    <HStack>
                        <Heading fontSize={24} fontStyle="italic">
                            &gt;&gt;deBBS
                        </Heading>
                        <Spacer />
                        <Heading fontSize={18} fontStyle="italic">
                            Ethereum Network
                        </Heading>
                        <Heading fontSize={18} fontStyle="italic" onClick={() => connect({ connector: connectors[0] })}>
                            Connect Wallet
                        </Heading>
                    </HStack>
                    <Box border="2px solid #fff" borderRadius={10} padding={5}>
                        <Heading fontSize={18} fontStyle="italic">
                            &gt; Boards
                        </Heading>
                        <Text>Ethereum / DeFi / Trading / NFT / Prediction Market / GameFi / Wallet Security</Text>
                        <Text>[See More]</Text>
                        <hr />
                        <Heading fontSize={18} fontStyle="italic">
                            &gt; Recent Threads
                        </Heading>
                        <Text>[great-security.eth] I made a special anti-fraud wallet, Pizza Wallet.</Text>
                        <Text>[0xd3ef...ad823] Where can I get WBTC at better price?</Text>
                        <Text>[house-boy.eth] I’m crypto bilionaire living with my mom</Text>
                        <Heading fontSize={18} fontStyle="italic">
                            &gt; Recent Posts
                        </Heading>
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
