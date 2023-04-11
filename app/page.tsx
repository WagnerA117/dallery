"use client";

import { useContext } from "react";

import AuthContext from "./firebase/AuthProvider";

import SignInOptions from "./components/SignInOptions/SignInOptions";
import RandomArtWorks from "./components/ArtWorkGenerator/RandomArtWorks";

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
          Hello there, welcome to Dallery!
          {/*<RandomArtWorks />*/}
        </div>
      ) : (
        <SignInOptions />
      )}
    </>
  );
}
