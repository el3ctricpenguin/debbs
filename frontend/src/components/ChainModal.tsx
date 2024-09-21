import { ColorsContext } from "@/config/ColorContext";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    VStack,
} from "@chakra-ui/react";
import { ReactElement, useContext, useState } from "react";
import { useSwitchChain } from "wagmi";
import { BBSHeadingButton } from "./BBSHeadingButton";
import { mainnet } from "viem/chains";

export const ChainModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): ReactElement => {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    const bgColor = colors[1];

    const { chains, switchChain, isPending } = useSwitchChain();
    const [selectedNetwork, setSelectedNetwork] = useState(-1);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w={400} bgColor={bgColor} color={primaryColor} border={`2px ${primaryColor} solid`}>
                <ModalHeader>Select Chain</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack w={300} margin="0 auto">
                        {chains.map(
                            (chain, i) =>
                                chain !== mainnet && (
                                    <BBSHeadingButton
                                        buttonProps={{
                                            w: "full",
                                            onClick: () => {
                                                setSelectedNetwork(i);
                                                switchChain({ chainId: chain.id });
                                            },
                                            isLoading: isPending && selectedNetwork == i,
                                            loadingText: chain.name,
                                            spinner: <Spinner size="xs" />,
                                        }}
                                        key={i}
                                    >
                                        {chain.name}
                                    </BBSHeadingButton>
                                )
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};
