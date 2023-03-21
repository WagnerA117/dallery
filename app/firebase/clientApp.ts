////firebase method 1

//import {initializeApp, getApp, getApps} from "firebase/app";
//import {getAuth} from "firebase/auth";
//import {getFirestore} from "firebase/firestore";
//import {getStorage} from "firebase/storage";
//import {getAnalytics} from "firebase/analytics";
//// TODO: Add SDKs for Firebase products that you want to use
//// https://firebase.google.com/docs/web/setup#available-libraries

//// Your web app's Firebase configuration
//// For Firebase JS SDK v7.20.0 and later, measurementId is optional

////NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAvwIA3Gzmf9WU3_Ide4hCOy3FahYMTkT0
////NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dallery-61e16.firebaseapp.com
////NEXT_PUBLIC_FIREBASE_PROJECT_ID=dallery-61e16
////NEXT_PUBLIC_STORAGE_BUCKET=dallery-61e16.appspot.com
////NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=80803561125
////NEXT_PUBLIC_FIREBASE_APP_ID=1:80803561125:web:180a52cbd4b2fb48c6574c
////NEXT_PUBLICH_FIREBASE_MEASUREMENT_ID=G-XP2N2WQDSR

//const firebaseConfig = {
//	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//	measurementId: process.env.NEXT_PUBLICH_FIREBASE_MEASUREMENT_ID,
//};

//// Initialize Firebase

////for SSR

//const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

//const firestore = getFirestore(app);
//const storage = getStorage(app);
//const auth = getAuth(app);

//export {app, auth, firestore};

// method 2

import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(clientCredentials);

export const db = getFirestore(app);
export const auth = getAuth();
export const gitHubProvider = new GithubAuthProvider();
