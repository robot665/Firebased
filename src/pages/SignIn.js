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

//init services
const db = getFirestore()
const auth = getAuth()

// collection references (grabbing hold of a specific collection)
const colRef = collection(db, 'books')

//queries finds a particular type of data
const q = query(colRef, orderBy('createdAt'))


// real time collection data

  // onSnapshot(q, (snapshot) => {
  //   providers.textContent = '';
  //   let books = []
  //   snapshot.docs.forEach((doc)=> {
  //   books.push({ ...doc.data(), id: doc.id}) 
  //   renderCafe(doc);  
  //   })
  //   console.log(books)
  // })



//logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
signOut(auth)
  .then(() => {
    console.log('the user is signed out')
  })
  .catch((err) => {
    console.log(err.message)
  })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
const email = loginForm.email.value
const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    // console.log('user logged in:', cred.user)
  })
.catch((err) => {
  console.log(err.message)
})
})

//subscribing to auth changes
onAuthStateChanged(auth,(user)=>{
  console.log('user status changed:', user)
})


