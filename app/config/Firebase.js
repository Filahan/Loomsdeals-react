import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGD4v9UO0PkQpTuVUewWCH-9K0ovpitDw",
  authDomain: "promappio.firebaseapp.com",
  projectId: "promappio",
  storageBucket: "promappio.appspot.com",
  messagingSenderId: "565061825795",
  appId: "1:565061825795:web:946b77ed2599edc5a6e536",
  measurementId: "G-7VS814PZ2T"
};

// Initialize Firebase
const appName = 'Promappio';  // Custom name for the app instance
const app = !getApps().length ? initializeApp(firebaseConfig, appName) : getApp(appName);
console.log('Existing Firebase Apps:', getApps());

const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut };
