"use client";

import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/clientApp";
import AuthContext from "./firebase/AuthProvider";

import SignInOptions from "./components/SignInOptions/SignInOptions";

// protected routes you want for whole application
// setting up a HOC
// login/logout features
//

//change the button to show logged in o

export default function Home() {
  // User Authentication
  const [user, loading, error] = useAuthState(auth);

  const { currentUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {currentUser ? (
        <div> Hello there, welcome to Dallery!</div>
      ) : (
        <SignInOptions></SignInOptions>
      )}
    </>
  );
}
