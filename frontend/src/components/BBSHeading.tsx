import { ColorsContext } from "@/config/ColorContext";
import { Heading, HeadingProps } from "@chakra-ui/react";
import { ReactElement, useContext } from "react";

export const BBSHeading = ({ children, headingProps }: { children: string | ReactElement; headingProps?: HeadingProps }) => {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    return (
        <Heading
            fontSize={18}
            fontStyle="italic"
            border={`2px solid ${primaryColor}`}
            display="inline-block"
            px={4}
            pt={1}
            pb={0.5}
            lineHeight={5}
            h={30}
            fontWeight={500}
            {...headingProps}
        >
            {children}
        </Heading>
    );
};
