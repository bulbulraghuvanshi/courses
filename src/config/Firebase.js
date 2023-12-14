// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA-h-1dd0AKjReYpIJWV8nbmD8UATmCxkk",
	authDomain: "example-4be40.firebaseapp.com",
	projectId: "example-4be40",
	storageBucket: "example-4be40.appspot.com",
	messagingSenderId: "326307995957",
	appId: "1:326307995957:web:822e154d450fa04358ac7c",
	measurementId: "G-X0RRW92QTE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const DataBase = getFirestore(app);
export const db = getFirestore();
export const auth = getAuth(app);
