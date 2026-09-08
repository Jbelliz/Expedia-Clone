// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyEw1jIADJOD2BBdRKGvvkPhT9UioBRA4",
  authDomain: "expedia-clone-3ff4c.firebaseapp.com",
  projectId: "expedia-clone-3ff4c",
  storageBucket: "expedia-clone-3ff4c.firebasestorage.app",
  messagingSenderId: "386956073459",
  appId: "1:386956073459:web:875a533622dc2875229a86"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app;
