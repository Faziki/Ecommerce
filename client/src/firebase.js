import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgxkn_j6_52PrFfGa1oN0KKVoQKHlzFB8",
  authDomain: "ecommerce-7075e.firebaseapp.com",
  projectId: "ecommerce-7075e",
  storageBucket: "ecommerce-7075e.appspot.com",
  messagingSenderId: "196960366878",
  appId: "1:196960366878:web:15e1e6601dced4e9c8990f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
