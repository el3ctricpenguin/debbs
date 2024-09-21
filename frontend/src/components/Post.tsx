import { convertTimestampToLocalTime } from "@/utils/convertTimestampToLocalTime";
import { Box, VStack, HStack, Text, chakra, Tooltip } from "@chakra-ui/react";
import { ColorsContext } from "@/config/ColorContext";
import { useContext } from "react";
import { EnsNameOrAddress } from "@/components/EnsNameOrAddress";
import * as jdenticon from "jdenticon";
import { Address } from "viem";

type PostProps = {
    postId: bigint;
    parentThreadId: bigint;
    postOwner: Address;
    postContent: string;
    timestamp: bigint;
    isDeleted: boolean;
    mentionTo: bigint;
};

export default function Post({ post }: { post: PostProps }) {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    const bgColor = colors[1];

    const Hr = chakra("hr");
    const svgString = jdenticon.toSvg(post.postOwner, 20);
    return (
        <Box>
            <VStack spacing={2} align="start">
                <HStack justify="left">
                    <Box border={`1px solid ${primaryColor}`}>
                        <Box w={5} h={5} dangerouslySetInnerHTML={{ __html: svgString }}></Box>
                    </Box>
                    <Tooltip
                        label={
                            <Box>
                                <Text fontWeight={900}>
                                    &gt; <EnsNameOrAddress address={post.postOwner} shorten />
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
                        <Text>
                            <EnsNameOrAddress address={post.postOwner} shorten />
                        </Text>
                    </Tooltip>
                </HStack>
                <Text>{post.postContent}</Text>
                <Text>[{convertTimestampToLocalTime(Number(post.timestamp))}]</Text>
            </VStack>
            <Hr borderStyle="dashed" my={2} />
        </Box>
    );
}