// frontend/src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYhppwMq6X1TCtGgmtywxSLCyOJb6gUN0",
    authDomain: "makobaned.firebaseapp.com",
    projectId: "makobaned",
    storageBucket: "makobaned.firebasestorage.app",
    messagingSenderId: "570632367386",
    appId: "1:570632367386:web:50f0e1c40acdc808d250a3"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getWords = async () => {
  const wordsCollection = collection(db, 'words');
  const wordsSnapshot = await getDocs(wordsCollection);
  return wordsSnapshot.docs.map(doc => doc.data());
};

export const addWord = async (wordData) => {
  const docRef = await addDoc(collection(db, 'words'), wordData);
  return docRef.id;
};