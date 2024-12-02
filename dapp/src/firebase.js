// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtHslZBPSnSQ1gpUrFvE8frojPTjcGSqw",
  authDomain: "devlu-devlu.firebaseapp.com",
  projectId: "devlu-devlu",
  storageBucket: "devlu-devlu.appspot.com",
  messagingSenderId: "468663593230",
  appId: "1:468663593230:web:274654bab49a8d246e0f5f",
  measurementId: "G-SNJMYYXLDG",
  databaseURL:
    "https://devlu-devlu-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of Firebase Authentication and Database
const database = getDatabase(app);
const auth = getAuth(app); // Firebase Authentication

// Export Firebase services for use in other files
export { database, ref, set, auth,};
