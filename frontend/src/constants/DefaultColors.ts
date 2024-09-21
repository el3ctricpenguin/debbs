import { sepolia, lineaSepolia } from "viem/chains";

export function getDefaultPrimaryColor(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return "#FFFFFF";
        case lineaSepolia.id:
            return "#61DFFF";
        default:
            return "#FFFFFF";
    }
}
export function getDefaultBgColor(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return "#3355FF";
        case lineaSepolia.id:
            return "#000";
        default:
            return "#3355FF";
    }
}
