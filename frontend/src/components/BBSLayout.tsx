import { Box, HStack, Heading, Spacer } from "@chakra-ui/react";
import { ReactElement } from "react";
import { BBSHeading } from "./BBSHeading";
import { useConnect } from "wagmi";
import { BBSHeadingButton } from "./BBSHeadingButton";

export default function BBSLayout({ children }: { children: ReactElement }) {
    const { connect, connectors } = useConnect();
    return (
        <Box bgColor="#3355FF" color="white" w="full" h="full">
            <Box w={960} margin="0 auto" pt={16}>
                <HStack mb={3} px={2}>
                    <Heading
                        fontSize={24}
                        fontStyle="italic"
                        bgColor="white"
                        color="#3355FF"
                        pl={3}
                        pr={4}
                        pt={1.5}
                        pb={1}
                        lineHeight={5}
                        h={30}
                    >
                        &gt;&gt;deBBS
                    </Heading>
                    <Spacer />
                    <BBSHeadingButton>Ethereum Network</BBSHeadingButton>
                    <BBSHeadingButton buttonProps={{ onClick: () => connect({ connector: connectors[0] }) }}>
                        Connect Wallet
                    </BBSHeadingButton>
                </HStack>
                <Box border="2px solid #fff" borderRadius={10} padding={5}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
