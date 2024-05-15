import { initializeApp } from 'firebase/app'
import {
getFirestore, collection, onSnapshot,
addDoc, deleteDoc, doc,  
query, where,
orderBy, serverTimestamp,
getDoc, updateDoc
} from 'firebase/firestore'
import{
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
}from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA5m-O6VupeY8eliFxvPDHGbiiiJS6HMz4",
    authDomain: "bono-14f78.firebaseapp.com",
    projectId: "bono-14f78",
    storageBucket: "bono-14f78.appspot.com",
    messagingSenderId: "988463979807",
    appId: "1:988463979807:web:b1e54bf8e76c84c5b9642a"
  };

//init firebase app
initializeApp(firebaseConfig);

