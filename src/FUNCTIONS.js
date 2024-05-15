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

  onSnapshot(q, (snapshot) => {
    providers.textContent = '';
    let books = []
    snapshot.docs.forEach((doc)=> {
    books.push({ ...doc.data(), id: doc.id}) 
    renderCafe(doc);  
    })
    console.log(books)
  })

//adding documents
const addBookForm = document.querySelector('.signup')
addBookForm.addEventListener('submit', (e) => {
    e. preventDefault()

    addDoc(colRef, {
        email: addBookForm.email.value,
        firstname: addBookForm.fname.value,
        lastname: addBookForm.lname.value,
        specialty: addBookForm.specialty.value,
        degree: addBookForm.degree.value,
        licensenum: addBookForm.license.value,
        issues: addBookForm.issues.value,

        createdAt: serverTimestamp()
    })
    .then(() =>{
        addBookForm.reset()
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener ('submit', (e) => {
    e. preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef) 
        .then(() => {
            deleteBookForm.reset()
        })
})

// // updating a document
// const updateForm = document.querySelector('.update')
// updateForm.addEventListener('submit', (e) => {
//   e.preventDefault()


//   const docRef = doc(db, 'books', updateForm.id.value)

//   updateDoc(docRef, {
//     title: addBookForm.title.value
//   })
// .then(() => {
//   updateForm.reset()
//   })
// })

//signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log('user created:', cred.user)
      signupForm.reset()
    })
  .catch((err) => {
    // console.log(err.message)
  })
})

// //logging in and out
// const logoutButton = document.querySelector('.logout')
// logoutButton.addEventListener('click', () => {
// signOut(auth)
//   .then(() => {
//     // console.log('the user is signed out')
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })
// })

// const loginForm = document.querySelector('.login')
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault()
// const email = loginForm.email.value
// const password = loginForm.password.value

//   signInWithEmailAndPassword(auth, email, password)
//   .then((cred) => {
//     // console.log('user logged in:', cred.user)
//   })
// .catch((err) => {
//   console.log(err.message)
// })
// })

//subscribing to auth changes
onAuthStateChanged(auth,(user)=>{
  // console.log('user status changed:', user)
})


// //render provider information
// const providers = document.querySelector('#providers-list');

// function renderCafe(doc){
  
//   let li = document.createElement('li');
//   let fname = document.createElement('span');
//   let lname = document.createElement('span');
//   let email = document.createElement('span');
//   let specialty = document.createElement('span');
//   let degree = document.createElement('span');

//   li.setAttribute('data-id', doc.id);
//   console.log(doc.data())
//   email.textContent = doc.data().email;
//   fname.textContent = doc.data().firstname;
//   lname.textContent = doc.data().lastname;
//   specialty.textContent = doc.data().specialty;
//   degree.textContent = doc.data().degree;
 

//   li.appendChild(fname);
//   li.appendChild(lname);
//   li.appendChild(email);
//   li.appendChild(specialty);
//   li.appendChild(degree);

//   providers.appendChild(li);
// }

// console.log("this is running");
