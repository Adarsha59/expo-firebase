// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOIjn6A2Naw9h6eLf66zVMqlmunUOIeSY",
  authDomain: "chatapp-1c762.firebaseapp.com",
  projectId: "chatapp-1c762",
  storageBucket: "chatapp-1c762.firebasestorage.app",
  messagingSenderId: "204210470746",
  appId: "1:204210470746:web:47eecd7e0aaa5a38a87d63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);c
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const userRef = collection(db, "users");
const roomRef = collection(db, "rooms");

export { auth, db, userRef, roomRef };
