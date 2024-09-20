import { extendTheme } from "@chakra-ui/react";

const createTheme = () =>
    extendTheme({
        config: {
            initialColorMode: "light",
            useSystemColorMode: false,
        },
        styles: {
            global: {
                body: { bgColor: "#3355FF" },
            },
        },
        components: {},
    });

export default createTheme();
