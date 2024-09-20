import { Heading, HeadingProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export const BBSHeading = ({ children, headingProps }: { children: string | ReactElement; headingProps?: HeadingProps }) => {
    return (
        <Heading
            fontSize={18}
            fontStyle="italic"
            border="2px solid #fff"
            display="inline-block"
            px={4}
            pt={1}
            pb={0.5}
            lineHeight={5}
            fontWeight={500}
            {...headingProps}
        >
            {children}
        </Heading>
    );
};
