
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbe5VWYMfAuNzkeOYeWaKjgZn4vpPDbSE",
  authDomain: "password-manager-ee065.firebaseapp.com",
  projectId: "password-manager-ee065",
  storageBucket: "password-manager-ee065.firebasestorage.app",
  messagingSenderId: "113123830506",
  appId: "1:113123830506:web:5cc703c7aae1077fc80593"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
