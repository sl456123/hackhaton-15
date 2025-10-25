
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyDl1o4KjpIvEmDJ3rCoBHv9zVZG3OvsD6w",
    authDomain: "login-e21e5.firebaseapp.com",
    projectId: "login-e21e5",
    storageBucket: "login-e21e5.firebasestorage.app",
    messagingSenderId: "1078511091289",
    appId: "1:1078511091289:web:2c2d56fe9e4d0a5b98fb48"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db, collection, addDoc, getDocs, createUserWithEmailAndPassword, signInWithEmailAndPassword ,getAuth};

