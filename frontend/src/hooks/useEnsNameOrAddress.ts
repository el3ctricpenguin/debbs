import shortenAddress from "@/utils/shortenAddress";
import { Address } from "viem";
import { useEnsName } from "wagmi";

export default function useEnsNameOrAddress(address: Address, shorten?: boolean) {
    const { data: ensName } = useEnsName({
        address,
        chainId: 1,
    });
    return ensName ? ensName : shorten ? shortenAddress(address) : address;
}
