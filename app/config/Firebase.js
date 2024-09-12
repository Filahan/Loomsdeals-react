// Firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGD4v9UO0PkQpTuVUewWCH-9K0ovpitDw",
  authDomain: "promappio.firebaseapp.com",
  projectId: "promappio",
  storageBucket: "promappio.appspot.com",
  messagingSenderId: "565061825795",
  appId: "1:565061825795:web:946b77ed2599edc5a6e536",
  measurementId: "G-7VS814PZ2T"
};

// Custom name for the Firebase app instance
const appName = 'Promappio';

// Initialize Firebase app
const app = getApps().length === 0 
  ? initializeApp(firebaseConfig, appName) 
  : getApp(appName);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// const auth = initializeAuth(app)
// Initialize Firestore
const db = getFirestore(app);

// Export Auth, Firestore, and authentication methods
export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  db
};
