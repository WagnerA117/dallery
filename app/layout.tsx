"use client";

import { Box } from "@chakra-ui/react";
import React from "react";

import { Providers } from "./chakra/ChakraProviders";
import Navbar from "./components/NavBar";
import { AuthProvider } from "./firebase/AuthProvider";
//@ts-ignore //Todo: Check import ideas
import TanStackProviders from "./utils/TanStackProviders";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProviders>
          <AuthProvider>
            <Providers>
              <Navbar /> <Box>{children}</Box>
            </Providers>
          </AuthProvider>
        </TanStackProviders>
      </body>
    </html>
  );
}

//Page Specific Styling

export default RootLayout;
