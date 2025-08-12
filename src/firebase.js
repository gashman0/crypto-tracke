import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBNri2kDjXW_47krZfdvRo7rbdk3rAPp_k",
    authDomain: "crypto-track-8148c.firebaseapp.com",
    projectId: "crypto-track-8148c",
    storageBucket: "crypto-track-8148c.firebasestorage.app",
    messagingSenderId: "943810914385",
    appId: "1:943810914385:web:7c957230e3365c63eef070"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };