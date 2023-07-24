"use client";

import { Box, Heading } from "@chakra-ui/react";
import { useContext } from "react";

import RandomArtWorks from "./components/ArtWorkGenerator/RandomArtWorks";
import SignInOptions from "./components/SignInOptions/SignInOptions";
import AuthContext from "./firebase/AuthProvider";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <Box>
          {" "}
          <Heading textAlign="center" width="100%" margin="2%">
            Welcome to Dallery
          </Heading>
          <RandomArtWorks />
        </Box>
      ) : (
        <SignInOptions />
      )}
    </>
  );
}
