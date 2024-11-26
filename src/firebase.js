import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtHslZBPSnSQ1gpUrFvE8frojPTjcGSqw",
  authDomain: "devlu-devlu.firebaseapp.com",
  projectId: "devlu-devlu",
  storageBucket: "devlu-devlu.appspot.com",
  messagingSenderId: "468663593230",
  appId: "1:468663593230:web:274654bab49a8d246e0f5f",
  measurementId: "G-SNJMYYXLDG",
  databaseURL: "https://devlu-devlu-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set };  // Export for use in Profile.js
