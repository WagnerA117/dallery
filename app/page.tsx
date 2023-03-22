"use client";

import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, gitHubProvider } from "./firebase/clientApp";

export default function Home() {
  // User Authentication
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        // redux action? --> dispatch({ type: SET_USER, user });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        //navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h1>Hello there! I&apos;m so sorry</h1>
      {user ? (
        <div>
          {JSON.stringify(user)} <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
          {/*<input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />*/}
          <button onClick={login}>Login</button>
        </>
      )}
    </>
  );
}
