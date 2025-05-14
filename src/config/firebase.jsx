import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwPpNIU5nlJR1KwwjFVg0JnCQhOTaJs7M",
  authDomain: "base1-24761.firebaseapp.com",
  projectId: "base1-24761",
  storageBucket: "base1-24761.firebasestorage.app",
  messagingSenderId: "530621764221",
  appId: "1:530621764221:web:111c5123542d86cbb55714",
  measurementId: "G-BG290353LP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
