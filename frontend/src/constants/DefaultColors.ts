import { sepolia, lineaSepolia, rootstockTestnet, morphHolesky } from "viem/chains";

export function getDefaultPrimaryColor(chainId?: number) {
    switch (chainId) {
        case sepolia.id:
            return "#FFFFFF";
        case lineaSepolia.id:
            return "#61DFFF";
        case rootstockTestnet.id:
            return "#FF9103";
        case morphHolesky.id:
            return "#FFFFFF";
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
        case rootstockTestnet.id:
            return "#000";
        case morphHolesky.id:
            return "#15A900";
        default:
            return "#3355FF";
    }
}
