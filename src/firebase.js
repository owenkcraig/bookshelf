// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4K7wizzV6jU5UPvbyiAmvDOwN91ZxAuM",
  authDomain: "bookshelf-789b5.firebaseapp.com",
  projectId: "bookshelf-789b5",
  storageBucket: "bookshelf-789b5.appspot.com",
  messagingSenderId: "510334911429",
  appId: "1:510334911429:web:880e446f6797edad1581ac"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;