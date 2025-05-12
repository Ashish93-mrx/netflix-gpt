import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmflz5hYXorofTE4ZlbtA6CbUfo5SqJpg",
  authDomain: "netflixgpt-5aca0.firebaseapp.com",
  projectId: "netflixgpt-5aca0",
  storageBucket: "netflixgpt-5aca0.firebasestorage.app",
  messagingSenderId: "678833778282",
  appId: "1:678833778282:web:bf221bba5eac4e3fb52413",
  measurementId: "G-76VSDM2JMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();