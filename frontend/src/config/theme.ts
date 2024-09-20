import { extendTheme } from "@chakra-ui/react";

const createTheme = () =>
    extendTheme({
        config: {
            initialColorMode: "light",
            useSystemColorMode: false,
        },
        styles: {
            global: {
                body: {},
            },
        },
        components: {},
    });

export default createTheme();
