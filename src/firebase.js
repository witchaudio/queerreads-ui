// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL8uT9JV2Bs37dHjrSZ7FI0EmPAOO9DOU",
  authDomain: "queerreads-4e9d6.firebaseapp.com",
  projectId: "queerreads-4e9d6",
  storageBucket: "queerreads-4e9d6.appspot.com",
  messagingSenderId: "119023175900",
  appId: "1:119023175900:web:a544bb7c6ee1563d004c19",
  measurementId: "G-4E145E4LKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getFirestore };
export const storage = getStorage(app);

