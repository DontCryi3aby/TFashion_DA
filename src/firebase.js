// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTqd2ZvN_6ul4390gOe8dhDVGKDXe6emA",
  authDomain: "tfashion-social-login.firebaseapp.com",
  projectId: "tfashion-social-login",
  storageBucket: "tfashion-social-login.appspot.com",
  messagingSenderId: "534031998404",
  appId: "1:534031998404:web:6aec3051a84b89e4c1d891",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app as default };
