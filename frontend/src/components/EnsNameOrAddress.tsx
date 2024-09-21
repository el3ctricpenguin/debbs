import shortenAddress from "@/utils/shortenAddress";
import { Address } from "viem";
import { useEnsName } from "wagmi";

export function EnsNameOrAddress({ address, shorten }: { address: Address; shorten?: boolean }) {
    const { data: ensName } = useEnsName({
        address,
        chainId: 1,
    });
    return ensName ? ensName : shorten ? shortenAddress(address) : address;
}
