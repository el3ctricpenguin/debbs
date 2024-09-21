import { BBSHeading, BBSHeadingTitle } from "@/components/BBSHeading";
import BBSLayout from "@/components/BBSLayout";
import { Box, chakra, HStack, Table, TableContainer, Tbody, Td, Tr, Image } from "@chakra-ui/react";
import Head from "next/head";
import { useEnsAvatar, useEnsName, useEnsText } from "wagmi";
import { useRouter } from "next/router";
import useEnsNameOrAddress from "@/hooks/useEnsNameOrAddress";
import { getAddress, zeroAddress } from "viem";
import { normalize } from "path";
import * as jdenticon from "jdenticon";
import useSWR from "swr";
import { theGraphFetcher } from "@/utils/theGraphFetcher";
import Post from "@/components/Post";

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
    };
};

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

    const svgString = jdenticon.toSvg(address, 100);
    const { data: ensAvatar } = useEnsAvatar({
        name: normalize(String(ensName)),
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

    const query = `{
        postCreateds(first: 10, where: {postOwner: "${address}"}) {
          postId
          parentThreadId
          postOwner
          postContent
          timestamp
          isDeleted
          mentionTo
        }
      }`;

    const { data: theGraphResult } = useSWR<theGraphResponse>(query, theGraphFetcher);
    console.log(theGraphResult);

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
                    <HStack align="start">
                        <Box border={`2px solid ${primaryColor}`} display="inline-block">
                            {ensAvatar ? (
                                <Image src={String(ensAvatar)} alt={String(ensName)} w={100} />
                            ) : (
                                <Box w={100} h={100} dangerouslySetInnerHTML={{ __html: svgString }} />
                            )}
                        </Box>
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
                                                {data[0] === "twitter" && "@"}
                                                {data[1]}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </HStack>
                    {/* implement The Graph data */}
                    <BBSHeading headingProps={{ mt: 6, mb: 2 }}>&gt; Recent Posts by the User</BBSHeading>
                    <Hr borderStyle="dashed" my={2} />
                    {theGraphResult &&
                        theGraphResult.data &&
                        theGraphResult.data.postCreateds.map((post, i) => <Post key={i} post={post} />)}
                </>
            </BBSLayout>
        </>
    );
}
