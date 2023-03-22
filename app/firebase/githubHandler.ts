import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, gitHubProvider } from "./clientApp";

export const githubHandler = async () => {
  gitHubProvider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, gitHubProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
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
};
const hello = "there";
