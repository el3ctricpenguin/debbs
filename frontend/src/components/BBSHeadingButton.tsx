import { ColorsContext } from "@/config/ColorContext";
import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactElement, useContext } from "react";

export const BBSHeadingButton = ({ children, buttonProps }: { children: string | ReactElement; buttonProps?: ButtonProps }) => {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    const bgColor = colors[1];
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
            color={primaryColor}
            bgColor={bgColor}
            borderRadius={0}
            _hover={{ color: bgColor, bgColor: primaryColor }}
            _active={{ color: bgColor, bgColor: primaryColor }}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};
