import { ColorsContext } from "@/config/ColorContext";
import { Tr, Td, Link, Box, Tooltip, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import { EnsNameOrAddress } from "./EnsNameOrAddress";
import { Address, formatEther } from "viem";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { deBbsAbi } from "@/generated";
import { useAccount, useReadContract } from "wagmi";
import { sepolia } from "viem/chains";

export function ThreadTableRow({
    threadOwner,
    threadId,
    threadTitle,
    createThreadFee,
}: {
    threadOwner: Address;
    threadId: bigint;
    threadTitle: string;
    createThreadFee: bigint;
}) {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    // const bgColor = colors[1];

    const { chain } = useAccount();
    const { data: postsCount } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getPostsCountByThread",
        abi: deBbsAbi,
        args: [threadId],
    });
    return (
        <Tr borderTop={`1px solid ${primaryColor}`}>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                <Link as={NextLink} href={`/user/${threadOwner}`}>
                    <EnsNameOrAddress address={threadOwner} shorten />
                </Link>
            </Td>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                <Link as={NextLink} href={`/thread/${threadId}`}>
                    {threadTitle}
                </Link>
            </Td>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                {postsCount !== undefined && Number(formatEther(postsCount * createThreadFee)).toFixed(4)} ETH
            </Td>
        </Tr>
    );
}

export function BoardTableRow({
    boardOwner,
    boardId,
    boardTitle,
    boardDescription,
    createBoardFee,
}: {
    boardOwner: Address;
    boardId: bigint;
    boardTitle: string;
    boardDescription: string;
    createBoardFee: bigint;
}) {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    const bgColor = colors[1];

    const { chain } = useAccount();
    const { data: threadsCount } = useReadContract({
        address: getDeBBSAddress(chain && chain.id),
        functionName: "getThreadsCountByBoard",
        abi: deBbsAbi,
        args: [boardId],
    });
    return chain && chain.id === sepolia.id && Number(boardId) == 3 ? (
        <></>
    ) : (
        <Tr borderTop={`1px solid ${primaryColor}`}>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                <Tooltip
                    label={
                        <Box color={primaryColor}>
                            <Text fontWeight={900}>&gt; {boardTitle}</Text>
                            <Text>[moderator] {boardOwner}</Text>
                            <Text>[description] {boardDescription}</Text>
                        </Box>
                    }
                    placement="bottom-start"
                    bgColor={bgColor}
                    boxShadow="none"
                    border={`1px solid ${primaryColor}`}
                    borderRadius={0}
                    offset={[0, 4]}
                >
                    <Link as={NextLink} href={`/board/${boardId}`}>
                        {boardTitle}
                    </Link>
                </Tooltip>
            </Td>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                {boardDescription}
            </Td>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                <Link as={NextLink} href={`/user/${boardOwner}`}>
                    <EnsNameOrAddress address={boardOwner} shorten />
                </Link>
            </Td>

            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                {threadsCount !== undefined && Number(formatEther(threadsCount * createBoardFee)).toFixed(4)} ETH
            </Td>
        </Tr>
    );
}
