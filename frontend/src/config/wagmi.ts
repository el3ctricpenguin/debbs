import { http, createConfig } from "wagmi";
import { lineaSepolia, mainnet, rootstockTestnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
    chains: [mainnet, sepolia, lineaSepolia, rootstockTestnet],
    connectors: [injected()],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
        [lineaSepolia.id]: http(),
        [rootstockTestnet.id]: http(),
    },
    ssr: true,
});
