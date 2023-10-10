// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f8caa.firebaseapp.com",
  projectId: "mern-estate-f8caa",
  storageBucket: "mern-estate-f8caa.appspot.com",
  messagingSenderId: "1026653582867",
  appId: "1:1026653582867:web:d8a1668d2307727c3031e6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);