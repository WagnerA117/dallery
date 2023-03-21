import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAvwIA3Gzmf9WU3_Ide4hCOy3FahYMTkT0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dallery-61e16.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dallery-61e16
NEXT_PUBLIC_STORAGE_BUCKET=dallery-61e16.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=80803561125
NEXT_PUBLIC_FIREBASE_APP_ID=1:80803561125:web:180a52cbd4b2fb48c6574c
NEXT_PUBLICH_FIREBASE_MEASUREMENT_ID=G-XP2N2WQDSR

const firebaseConfig = {
  apiKey: process.env.  authDomain: "dallery-61e16.firebaseapp.com",
  projectId: "dallery-61e16",
  storageBucket: "dallery-61e16.appspot.com",
  messagingSenderId: "80803561125",
  appId: "1:80803561125:web:180a52cbd4b2fb48c6574c",
  measurementId: "G-XP2N2WQDSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);