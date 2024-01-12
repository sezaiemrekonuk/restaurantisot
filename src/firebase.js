// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";


 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv9rjjKtdmscg8FIa8vB160eDQnpY-iw4",
  authDomain: "admin-bff28.firebaseapp.com",
  projectId: "admin-bff28",
  storageBucket: "admin-bff28.appspot.com",
  messagingSenderId: "852110679780",
  appId: "1:852110679780:web:0f2d9f763c49b5d89856f1",
  measurementId: "G-HCLS1S5G8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();