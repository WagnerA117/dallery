"use client";

import { Heading } from "@chakra-ui/react";
import { useContext } from "react";

import RandomArtWorks from "./components/ArtWorkGenerator/RandomArtWorks";
import SignInOptions from "./components/SignInOptions/SignInOptions";
import AuthContext from "./firebase/AuthProvider";

// protected routes you want for whole application
// setting up a HOC
// login/logout features
//

//change the button to show logged in o

export default function Home() {
  // User Authentication

  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <div>
          {" "}
          <Heading margin="2%">Welcome to your gallery of Dreams</Heading>
          <RandomArtWorks />
        </div>
      ) : (
        <SignInOptions />
      )}
    </>
  );
}
