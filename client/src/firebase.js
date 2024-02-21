// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ironic-187cb.firebaseapp.com",
  projectId: "ironic-187cb",
  storageBucket: "ironic-187cb.appspot.com",
  messagingSenderId: "755765981827",
  appId: "1:755765981827:web:a8e2f2f2661de9cd90a1b6",
  measurementId: "G-WBLVCHTQ8J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);