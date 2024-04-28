import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_GOOGLE_API,
  authDomain:import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: "608763351802",
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-TTJT9HZ7BB"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider,app}