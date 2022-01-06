// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATEWY3GqZ4qSr1cCnTdduzbpfHJHWQPrg",
  authDomain: "comidas-416.firebaseapp.com",
  projectId: "comidas-416",
  storageBucket: "comidas-416.appspot.com",
  messagingSenderId: "995768128809",
  appId: "1:995768128809:web:ca40956883abe333609338"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)