import { Box, HStack, Heading, Spacer } from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { BBSHeadingButton } from "./BBSHeadingButton";
import shortenAddress from "@/utils/shortenAddress";
import NextLink from "next/link";
import { ColorsContext } from "@/config/ColorContext";

export default function BBSLayout({ children, primaryColor, bgColor }: { children: ReactElement; primaryColor: string; bgColor: string }) {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
    }, [bgColor]);
    return (
        <ColorsContext.Provider value={[primaryColor, bgColor]}>
            <Box bgColor={bgColor} color={primaryColor} w="full" h="full">
                <Box w={960} margin="0 auto" pt={16}>
                    <HStack mb={3} px={2}>
                        <Heading
                            fontSize={24}
                            fontStyle="italic"
                            bgColor={primaryColor}
                            color={bgColor}
                            pl={3}
                            pr={4}
                            pt={1.5}
                            pb={1}
                            lineHeight={5}
                            h={30}
                            as={NextLink}
                            href="/"
                        >
                            &gt;&gt;deBBS
                        </Heading>
                        <Spacer />
                        <BBSHeadingButton>Ethereum Network</BBSHeadingButton>
                        <BBSHeadingButton
                            buttonProps={{ onClick: !isConnected ? () => connect({ connector: connectors[0] }) : () => disconnect() }}
                        >
                            {isConnected && address ? shortenAddress(address) : "Connect Wallet"}
                        </BBSHeadingButton>
                    </HStack>
                    <Box border="2px solid #fff" borderRadius={10} padding={5}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </ColorsContext.Provider>
    );
}
