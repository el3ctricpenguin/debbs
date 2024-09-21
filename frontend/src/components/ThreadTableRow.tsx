import { ColorsContext } from "@/config/ColorContext";
import { Tr, Td, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import { EnsNameOrAddress } from "./EnsNameOrAddress";
import { Address } from "viem";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { deBbsAbi } from "@/generated";
import { useAccount, useReadContract } from "wagmi";

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
                <Link as={NextLink} href={`/account/${threadOwner}`}>
                    <EnsNameOrAddress address={threadOwner} shorten />
                </Link>
            </Td>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                <Link as={NextLink} href={`/thread/${threadId}`}>
                    {threadTitle}
                </Link>
            </Td>
            <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                {postsCount !== undefined && Number(postsCount * createThreadFee).toFixed(4)} ETH
            </Td>
        </Tr>
    );
}
