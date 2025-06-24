// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFGSi393-4KGU-Rskfr5zzEkMwioWLyek",
  authDomain: "user-management-5f10f.firebaseapp.com",
  projectId: "user-management-5f10f",
  storageBucket: "user-management-5f10f.firebasestorage.app",
  messagingSenderId: "147686259123",
  appId: "1:147686259123:web:5cec097e6b064e281af3c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);