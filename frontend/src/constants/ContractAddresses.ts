import { getAddress, zeroAddress } from "viem";
import { lineaSepolia, sepolia } from "viem/chains";

export function getDeBBSAddress(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return getAddress("0xCc97a26eEc318Ccc23163dC982fb948313603C68");
        case lineaSepolia.id:
            return getAddress("0x86fAE1E990d1D5E96a199F6f797Ae7F144b420E9");
        default:
            return zeroAddress;
    }
}
