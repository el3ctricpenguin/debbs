import { ColorsContext } from "@/config/ColorContext";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { ReactElement, useContext } from "react";
import { useSwitchChain } from "wagmi";
import { BBSHeadingButton } from "./BBSHeadingButton";

export const ChainModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): ReactElement => {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    const bgColor = colors[1];

    const { chains, switchChain } = useSwitchChain();
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w={300} bgColor={bgColor} color={primaryColor} border={`2px ${primaryColor} solid`}>
                <ModalHeader>Select Chain</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack w={200} margin="0 auto">
                        {chains.map((chain, i) => (
                            <BBSHeadingButton
                                buttonProps={{
                                    w: "full",
                                    onClick: () => {
                                        switchChain({ chainId: chain.id });
                                    },
                                }}
                                key={i}
                            >
                                {chain.name}
                            </BBSHeadingButton>
                        ))}
                    </VStack>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};
