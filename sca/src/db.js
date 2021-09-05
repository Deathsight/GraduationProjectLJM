import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD2LXm7T9XlH3RoN0G_QCmjnmfmFaX8Ki8",
  authDomain: "graduationprojectljm.firebaseapp.com",
  projectId: "graduationprojectljm",
  storageBucket: "graduationprojectljm.appspot.com",
  messagingSenderId: "266464530343",
  appId: "1:266464530343:web:f3a14f609a139f2480f082",
  measurementId: "G-P62SD412DB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;