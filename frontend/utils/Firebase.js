

// ✅ Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔑 Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,  // Your Firebase API key from .env
  authDomain: "logineduceafted.firebaseapp.com", // Firebase auth domain
  projectId: "logineduceafted",                  // Project ID
  storageBucket: "logineduceafted.firebasestorage.app", // Storage bucket
  messagingSenderId: "389356532406",            // Messaging sender ID
  appId: "1:389356532406:web:c7c5c7f1165a49bf7c6c17" // App ID
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication
const auth = getAuth(app);

// ✅ Set up Google Authentication Provider
const provider = new GoogleAuthProvider();

// ⚠️ Export auth and provider for use in your app
export { auth, provider };

