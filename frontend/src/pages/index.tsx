import { Button } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>debbs</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Button>Chakra Test</Button>
        </>
    );
}
