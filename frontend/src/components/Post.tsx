import { convertTimestampToLocalTime } from "@/utils/convertTimestampToLocalTime";
import { Box, VStack, HStack, Text, chakra, Tooltip, Link, Image } from "@chakra-ui/react";
import { ColorsContext } from "@/config/ColorContext";
import { useContext } from "react";
import { EnsNameOrAddress } from "@/components/EnsNameOrAddress";
import * as jdenticon from "jdenticon";
import { Address, getAddress } from "viem";
import NextLink from "next/link";
import { normalize } from "path";
import { useEnsName, useEnsAvatar } from "wagmi";

type PostProps = {
    postId: bigint | string;
    parentThreadId: bigint | string;
    postOwner: Address | string;
    postContent: string;
    timestamp: bigint | string;
    isDeleted: boolean;
    mentionTo: bigint | string;
};

export default function Post({ post }: { post: PostProps }) {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    const bgColor = colors[1];

    const Hr = chakra("hr");

    const svgString = jdenticon.toSvg(post.postOwner, 28);

    const { data: ensName } = useEnsName({
        address: getAddress(post.postOwner),
        chainId: 1,
    });
    const { data: ensAvatar } = useEnsAvatar({
        name: normalize(String(ensName)),
        chainId: 1,
    });
    return (
        !post.isDeleted && (
            <Box>
                <VStack spacing={2} align="start">
                    <HStack justify="left">
                        <Link as={NextLink} href={`/user/${post.postOwner}`}>
                            <Box border={`1px solid ${primaryColor}`}>
                                {ensAvatar ? (
                                    <Image src={String(ensAvatar)} alt={String(ensName)} w={7} />
                                ) : (
                                    <Box w={7} h={7} dangerouslySetInnerHTML={{ __html: svgString }} />
                                )}
                            </Box>
                        </Link>
                        <Tooltip
                            label={
                                <Box>
                                    <Text fontWeight={900}>
                                        &gt; <EnsNameOrAddress address={getAddress(post.postOwner)} shorten />
                                    </Text>
                                </Box>
                                // TODO: create a component here
                            }
                            placement="bottom-start"
                            bgColor={bgColor}
                            boxShadow="none"
                            border={`1px solid ${primaryColor}`}
                            borderRadius={0}
                            offset={[0, 4]}
                        >
                            <Link as={NextLink} href={`/user/${post.postOwner}`}>
                                <Text>
                                    <EnsNameOrAddress address={getAddress(post.postOwner)} shorten />
                                </Text>
                            </Link>
                        </Tooltip>
                    </HStack>
                    <Text>{post.postContent}</Text>
                    <Text>[{convertTimestampToLocalTime(Number(post.timestamp))}]</Text>
                </VStack>
                <Hr borderStyle="dashed" my={2} borderColor={primaryColor} />
            </Box>
        )
    );
}
