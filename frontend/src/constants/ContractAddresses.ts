import { getAddress, zeroAddress } from "viem";
import { lineaSepolia, morphHolesky, rootstockTestnet, sepolia } from "viem/chains";

export function getDeBBSAddress(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return getAddress("0xCc97a26eEc318Ccc23163dC982fb948313603C68");
        case lineaSepolia.id:
            return getAddress("0xE91808b8Dd5f7741d2fF8eFf3aaA98582197b2AB");
        case rootstockTestnet.id:
            return getAddress("0x083d260e329a30C02382c2E88620372b3d9b0759");
        case morphHolesky.id:
            return getAddress("0x8ac838d9cCBFdF605C1f2D09F027ed39b3321bA2");
        default:
            return zeroAddress;
    }
}
