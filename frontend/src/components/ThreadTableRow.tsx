import { ColorsContext } from "@/config/ColorContext";
import { Tr, Td, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import { EnsNameOrAddress } from "./EnsNameOrAddress";
import { Address } from "viem";

export function ThreadTableRow({ threadOwner, threadId, threadTitle }: { threadOwner: Address; threadId: bigint; threadTitle: string }) {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    // const bgColor = colors[1];
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
                <Link as={NextLink} href={`/thread/${threadId}`}>
                    threadFee here
                </Link>
            </Td>
        </Tr>
    );
}
