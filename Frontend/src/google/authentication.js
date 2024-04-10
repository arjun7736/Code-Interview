import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_GOOGLE_API,
  authDomain: "code-interview-f70f2.firebaseapp.com",
  projectId: "code-interview-f70f2",
  storageBucket: "code-interview-f70f2.appspot.com",
  messagingSenderId: "608763351802",
  appId: "1:608763351802:web:48cf1884ba011e2fb0ef43",
  measurementId: "G-TTJT9HZ7BB"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider}