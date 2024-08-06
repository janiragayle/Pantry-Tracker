// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5GlMB8UN-opaj7JqDoV_RJEyCpll5-yQ",
  authDomain: "inventory-management-67a5b.firebaseapp.com",
  projectId: "inventory-management-67a5b",
  storageBucket: "inventory-management-67a5b.appspot.com",
  messagingSenderId: "330067810832",
  appId: "1:330067810832:web:9a8beda0deabc58f678895",
  measurementId: "G-0LJDQLEG22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const fireStore = getFirestore(app); //adds firebase database?

export{ fireStore }