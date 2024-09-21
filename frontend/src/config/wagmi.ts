import { http, createConfig } from "wagmi";
import { lineaSepolia, mainnet, morphHolesky, rootstockTestnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
    chains: [mainnet, sepolia, lineaSepolia, rootstockTestnet, morphHolesky],
    connectors: [injected()],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
        [lineaSepolia.id]: http(),
        [rootstockTestnet.id]: http(),
        [morphHolesky.id]: http(),
    },
    ssr: true,
});
