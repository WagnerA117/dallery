// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAvwIA3Gzmf9WU3_Ide4hCOy3FahYMTkT0",
	authDomain: "dallery-61e16.firebaseapp.com",
	projectId: "dallery-61e16",
	storageBucket: "dallery-61e16.appspot.com",
	messagingSenderId: "80803561125",
	appId: "1:80803561125:web:180a52cbd4b2fb48c6574c",
	measurementId: "G-XP2N2WQDSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
