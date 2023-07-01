"use client";

// A wrapper component that will set the context of the logged in user
// renders the rest of the app
// context that holds user, global state check logged in user
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { User as FirebaseUser, UserCredential } from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth, gitHubProvider, googleAuthProvider } from "./clientApp";

// A wrapper component that will set the context of the logged in user
// renders the rest of the app
// context that holds user, global state check logged in user

// A wrapper component that will set the context of the logged in user
// renders the rest of the app
// context that holds user, global state check logged in user

interface AuthContextType {
  currentUser: FirebaseUser | null;
  emailLogin?: () => Promise<UserCredential>;
  googleLogin?: () => Promise<UserCredential>;
  gitHubLogin?: () => Promise<UserCredential>;
  loading: boolean;
  login?: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  newUserEmailLogin?: () => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  gitHubLogin: () => Promise.reject(),
  googleLogin: () => Promise.reject(),
  loading: true,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  //Login Method using popup and githubauth

  const gitHubLogin: AuthContextType["login"] = () => {
    return new Promise<UserCredential>((resolve, reject) => {
      signInWithPopup(auth, gitHubProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          resolve(result);

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
          reject(error);
          // ...
        });
    });
  };

  //login in with email and password
  //@ts-ignore
  const emailLogin: AuthContextType["login"] = async (
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  //Create new user with email and password

  //@ts-ignore
  const newUserEmailLogin: AuthContextType["login"] = (
    email: string,
    password: string
  ) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          // Signed in
          const user = result.user;
          resolve(result);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          reject(error);
          // ..
        });
    });
  };

  const googleLogin: AuthContextType["login"] = () => {
    return new Promise<UserCredential>((resolve, reject) => {
      signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          resolve(result);

          // redux action? --> dispatch({ type: SET_USER, user });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          reject(error);
          // ...
        });
    });
  };

  //Logout Method using poput and githubauth

  const logout: AuthContextType["logout"] = async () => {
    return signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Set up a listener to track the current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        newUserEmailLogin,
        emailLogin,
        googleLogin,
        gitHubLogin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
