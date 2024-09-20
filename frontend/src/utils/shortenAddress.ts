import { Address } from "viem";

export default function shortenAddress(address: Address, chars = 5) {
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
