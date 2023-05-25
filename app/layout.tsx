"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React from "react";

import { theme } from "./chakra/theme";
import Navbar from "./components/NavBar";
import { AuthProvider } from "./firebase/AuthProvider";
//@ts-ignore //Todo: Check import ideas
import TanStackProviders from "./utils/tanstackProviders";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProviders>
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <>
                <Navbar />
                <Box>{children}</Box>
              </>
            </AuthProvider>
          </ChakraProvider>
        </TanStackProviders>
      </body>
    </html>
  );
}

//Page Specific Styling

export default RootLayout;
