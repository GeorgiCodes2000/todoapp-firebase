import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCP0VPygnClA4_VUwVxyo0hsm-imSjD4cs",
  authDomain: "todo-app-d2979.firebaseapp.com",
  projectId: "todo-app-d2979",
  storageBucket: "todo-app-d2979.appspot.com",
  messagingSenderId: "651870232020",
  appId: "1:651870232020:web:b8d7e16bba92b6915c8a41",
  measurementId: "${config.measurementId}"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();