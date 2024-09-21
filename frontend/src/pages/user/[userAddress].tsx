import { BBSHeadingTitle } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import { chakra, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import Head from "next/head";
import { useEnsName, useEnsText } from "wagmi";
import { useRouter } from "next/router";
import useEnsNameOrAddress from "@/hooks/useEnsNameOrAddress";
import { getAddress, zeroAddress } from "viem";
import { normalize } from "path";

export default function User() {
    const router = useRouter();
    const address = router.query.userAddress ? getAddress(String(router.query.userAddress)) : zeroAddress;
    console.log("router.query.userAddress", router.query.userAddress);
    console.log("address", address);

    const displayName = useEnsNameOrAddress(address, false);

    const primaryColor = "white";
    const bgColor = "#3355FF";

    const { data: ensName } = useEnsName({
        address: address,
        chainId: 1,
    });
    const { data: descriptionResult } = useEnsText({
        name: normalize(String(ensName)),
        key: "description",
        chainId: 1,
    });
    const { data: urlResult } = useEnsText({
        name: normalize(String(ensName)),
        key: "url",
        chainId: 1,
    });
    const { data: mailResult } = useEnsText({
        name: normalize(String(ensName)),
        key: "mail",
        chainId: 1,
    });
    const { data: twitterResult } = useEnsText({
        name: normalize(String(ensName)),
        key: "com.twitter",
        chainId: 1,
    });
    const { data: discordResult } = useEnsText({
        name: normalize(String(ensName)),
        key: "com.discord",
        chainId: 1,
    });

    const ensData = [
        ["description", descriptionResult],
        ["url", urlResult],
        ["twitter", twitterResult],
        ["mail", mailResult],
        ["discord", discordResult],
    ];

    const Hr = chakra("hr");
    return (
        <>
            <Head>
                <title>&gt;&gt;deBBS | User: </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BBSLayout primaryColor={primaryColor} bgColor={bgColor}>
                <>
                    <BBSHeadingTitle headingProps={{ mb: 2 }}>{`> User: ${displayName}`}</BBSHeadingTitle>
                    <TableContainer>
                        <Table size="sm" w={500}>
                            <Tbody borderRight={`1px solid ${primaryColor}`}>
                                <Tr borderTop={`1px solid ${primaryColor}`}>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        address
                                    </Td>
                                    <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                        {address}
                                    </Td>
                                </Tr>
                                {ensData.map((data, i) => (
                                    <Tr key={i}>
                                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                            {data[0]}
                                        </Td>
                                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                                            {data[1]}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            </BBSLayout>
        </>
    );
}
