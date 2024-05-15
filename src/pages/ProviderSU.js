import { initializeApp } from 'firebase/app'
import {
getFirestore, collection, onSnapshot,
addDoc, deleteDoc, doc,  
query, where,
orderBy, serverTimestamp,
getDoc, updateDoc,
setDoc,
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





// Function that waits until to create DB entry until the UID is established
function waitForUID() {
  return new Promise((resolve) => {
    const checkUID = setInterval(() => {
      if (uid !== null) {
        clearInterval(checkUID);
        resolve(uid);
      }
    }, 100); // Check every 100ms
  });
}

// assign user.uid to a global variable accessed by the adddoc function
let uid = null
onAuthStateChanged(auth,(user)=>{
  if (user) {
     uid = user.uid; 
    console.log(uid)
  } else {
    console.log("no user signed in");
  }
})

//signing users up with firebase auth
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log('user created:', cred.user.uid)
      signupForm.reset()
    })
  .catch((err) => {
    // console.log(err.message)
  })
})


// Adds form data to firestore db upon submit
const addBookForm = document.querySelector('.signup');
addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

//Store form data in a variable 
let email = addBookForm.email.value;
let firstname = addBookForm.fname.value;
let lastname = addBookForm.lname.value;
let specialty = addBookForm.specialty.value;
let degree = addBookForm.degree.value;
let licensenum = addBookForm.license.value;
let issues = addBookForm.issues.value;

  await waitForUID();



  setDoc(doc(colRef, uid), {
    email: email,
    firstname: firstname,
    lastname: lastname,
    specialty: specialty,
    degree: degree,
    licensenum: licensenum,
    issues: issues,
    uid: uid,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset();
    console.log('Form submitted with UID:', uid);
  })
  .catch((err) => {
    console.log(err.message);
  });
});











