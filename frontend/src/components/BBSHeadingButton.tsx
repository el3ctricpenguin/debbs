import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export const BBSHeadingButton = ({ children, buttonProps }: { children: string | ReactElement; buttonProps?: ButtonProps }) => {
    return (
        <Button
            fontSize={18}
            fontStyle="italic"
            border="2px solid #fff"
            display="inline-block"
            px={4}
            pt={1}
            pb={0.5}
            lineHeight={5}
            h={30}
            fontWeight={500}
            color="white"
            bgColor="#3355FF"
            borderRadius={0}
            _hover={{ color: "#3355FF", bgColor: "white" }}
            _active={{ color: "#3355FF", bgColor: "white" }}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};
