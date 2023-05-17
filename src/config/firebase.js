import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAE9S6MAgJcANwzJbI4V5KIPgRGYjYWr_A",
  authDomain: "login-project-15f09.firebaseapp.com",
  projectId: "login-project-15f09",
  storageBucket: "login-project-15f09.appspot.com",
  messagingSenderId: "579497264070",
  appId: "1:579497264070:web:aa0e859fb677140ded68c7",
  measurementId: "G-3CVS1MRZ30"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);