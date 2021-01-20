import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIHpXVyRjvSYKqJsoIPW84K3rE8M6aeks",
  authDomain: "bridge-b8503.firebaseapp.com",
  projectId: "bridge-b8503",
  storageBucket: "bridge-b8503.appspot.com",
  messagingSenderId: "1079781622960",
  appId: "1:1079781622960:web:6714afdc232dd401f2a775",
  measurementId: "G-D0HZG1QBB8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
