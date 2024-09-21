import { createMultiStyleConfigHelpers, defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { Courier_Prime } from "@next/font/google";
import { inputAnatomy } from "@chakra-ui/anatomy";

const courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"] });

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const createTheme = () =>
    extendTheme({
        config: {
            initialColorMode: "light",
            useSystemColorMode: false,
        },
        fonts: {
            heading: courierPrime.style.fontFamily,
            body: courierPrime.style.fontFamily,
        },
        styles: {
            global: {
                body: {},
            },
        },
        components: {
            Text: defineStyleConfig({
                baseStyle: {
                    fontSize: 14,
                },
            }),
            Button: defineStyleConfig({
                variants: {
                    bbs: {
                        fontSize: 15,
                        h: 7,
                        lineHeight: 7,
                        fontWeight: 500,
                        fontStyle: "italic",
                        px: 4,
                        pt: 2,
                        pb: 1.5,
                        _hover: {
                            opacity: 0.9,
                        },
                        _active: {
                            opacity: 0.75,
                        },
                    },
                },
            }),
            Input: defineMultiStyleConfig({
                variants: {
                    bbs: definePartsStyle({
                        field: { h: 7, borderRadius: 8, px: 3, pt: 1, pb: 1, fontSize: 15 },
                        addon: {},
                    }),
                },
            }),
        },
    });

export default createTheme();
