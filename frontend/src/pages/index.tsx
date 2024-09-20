import { Button, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <>
            <Head>
                <title>debbs</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Button onClick={() => connect({ connector: connectors[0] })}>Connect</Button>
            <Button onClick={() => disconnect()}>Disconnect</Button>
            <Text>{address}</Text>
        </>
    );
}
