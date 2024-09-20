import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { Courier_Prime } from "@next/font/google";

const courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"] });

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
                body: { bgColor: "#3355FF" },
            },
        },
        components: {
            Text: defineStyleConfig({
                baseStyle: {
                    fontSize: 14,
                },
            }),
        },
    });

export default createTheme();
