import { getAddress, zeroAddress } from "viem";
import { lineaSepolia, sepolia } from "viem/chains";

export function getDeBBSAddress(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return getAddress("0x0B479E42C1EEdeAFb38f49085c4ceaE318db9748");
        case lineaSepolia.id:
            return getAddress("0xb3CAEee35bC9330D253BE2901e2eB51091b7D1AB");
        default:
            return zeroAddress;
    }
}
