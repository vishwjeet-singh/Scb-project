// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDMSsbBcmjDuxZz8YvAKem9QC5jXCVKr1s",
  authDomain: "email-and-phone-verify.firebaseapp.com",
  projectId: "email-and-phone-verify",
  storageBucket: "email-and-phone-verify.appspot.com",
  messagingSenderId: "223396965537",
  appId: "1:223396965537:web:71d769a472805e410614e0",
  measurementId: "G-KZ27F768CF"
};

const app = initializeApp(firebaseConfig);

export const auth =  getAuth(app);
export default app;
const analytics = getAnalytics(app);