// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tictac-4acf1.firebaseapp.com",
  projectId: "tictac-4acf1",
  storageBucket: "tictac-4acf1.appspot.com",
  messagingSenderId: "447299292249",
  appId: "1:447299292249:web:ce1e0e9e0f49e0724b3548"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);