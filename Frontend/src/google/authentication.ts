import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API as string,
  authDomain: import.meta.env.VITE_AUTH as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: "608763351802",
  appId: import.meta.env.VITE_APP_ID as string,
  measurementId: "G-TTJT9HZ7BB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };
