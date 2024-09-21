import { getAddress, zeroAddress } from "viem";
import { lineaSepolia, sepolia } from "viem/chains";

export function getDeBBSAddress(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return getAddress("0x0B479E42C1EEdeAFb38f49085c4ceaE318db9748");
        case lineaSepolia.id:
            return getAddress("0x86fAE1E990d1D5E96a199F6f797Ae7F144b420E9");
        default:
            return zeroAddress;
    }
}
