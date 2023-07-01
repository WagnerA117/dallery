"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

import { customTheme } from "./customTheme";

export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
