"use client";

import { Box, Button, Heading } from "@chakra-ui/react";
import { useContext } from "react";

import RandomArtWorks from "./components/ArtWorkGenerator/RandomArtWorks";
import Link from "./components/Link/Link";
import SignInOptions from "./components/SignInOptions/SignInOptions";
import AuthContext from "./firebase/AuthProvider";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <Box height="50%">
          {" "}
          <Heading textAlign="center" margin="2%">
            Welcome to Dallery, {currentUser.displayName}! Create your own
            gallery{" "}
            <Button variant="outline">
              {" "}
              <Link href="/pages/galleries">Here</Link>
            </Button>
          </Heading>
          <RandomArtWorks />
        </Box>
      ) : (
        <SignInOptions />
      )}
    </>
  );
}
