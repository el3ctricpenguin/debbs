import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
    chains: [mainnet, sepolia],
    connectors: [injected()],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    },
    ssr: true,
});
