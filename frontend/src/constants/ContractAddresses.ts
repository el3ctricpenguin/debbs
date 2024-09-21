import { getAddress, zeroAddress } from "viem";
import { lineaSepolia, sepolia } from "viem/chains";

export function getDeBBSAddress(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return getAddress("0xCc97a26eEc318Ccc23163dC982fb948313603C68");
        case lineaSepolia.id:
            return getAddress("0xE91808b8Dd5f7741d2fF8eFf3aaA98582197b2AB");
        default:
            return zeroAddress;
    }
}
