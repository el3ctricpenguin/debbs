import { getAddress, zeroAddress } from "viem";

export function getContractAddress(chainId?: number) {
    switch (chainId) {
        case 11155111:
            return getAddress("0x2fc6504a164EEf01Bff0f202f15048054a480a35");
        default:
            return zeroAddress;
    }
}
