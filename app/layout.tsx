"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React from "react";

import { theme } from "./chakra/theme";
import Navbar from "./components/NavBar";
import { AuthProvider } from "./firebase/AuthProvider";
//@ts-ignore //Todo: Check import ideas
import TanStackProvider from "./utils/tanStackProvider";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <TanStackProvider>
              <>
                <Navbar />
                {children}
              </>
            </TanStackProvider>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}

//Page Specific Styling

export default RootLayout;
