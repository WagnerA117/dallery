import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

const Link: React.FC<LinkProps & PropsWithChildren> = (props) => {
  return (
    <NextLink passHref {...props}>
      <ChakraLink as="span">{props.children}</ChakraLink>
    </NextLink>
  );
};

export default Link;
