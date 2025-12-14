// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAvC8V9KAs4Uaq4RybLwg54pYTsA_3aEBw",
  authDomain: "blogverse-d2b06.firebaseapp.com",
  projectId: "blogverse-d2b06",
  storageBucket: "blogverse-d2b06.appspot.com",
  messagingSenderId: "144805768251",
  appId: "1:144805768251:web:d70042798c5c5221cc001e",
  measurementId: "G-WYZRGCVMVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


