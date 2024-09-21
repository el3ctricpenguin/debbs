import { getAddress, zeroAddress } from "viem";
import { lineaSepolia, sepolia } from "viem/chains";

export function getDeBBSAddress(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return getAddress("0x0B479E42C1EEdeAFb38f49085c4ceaE318db9748");
        case lineaSepolia.id:
            return getAddress("0x083d260e329a30C02382C2E88620372B3d9b0759");
        default:
            return zeroAddress;
    }
}
