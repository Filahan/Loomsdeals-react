// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhX8qqrP2Koa8xShBuEAMDCpezPSQ7O9o",
  authDomain: "socialspot-io.firebaseapp.com",
  projectId: "socialspot-io",
  storageBucket: "socialspot-io.appspot.com",
  messagingSenderId: "526802865717",
  appId: "1:526802865717:web:10c37f5d54031a37f0ab7c",
  measurementId: "G-3P9NBLCJJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut };
