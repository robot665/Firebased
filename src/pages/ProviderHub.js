import { initializeApp } from 'firebase/app'
import {
getFirestore, collection, onSnapshot,
addDoc, deleteDoc, doc, getDocs, setDoc,
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
const colReq = collection(db, 'requests')

//queries finds a particular type of data
const q = query(colRef, orderBy('createdAt'))





// real time collection data

  onSnapshot(q, (snapshot) => {
    providers.textContent = '';
    let books = []
    snapshot.docs.forEach((dox)=> {
    books.push({ ...dox.data(), id: dox.id}) 
    renderCafe(dox);  
    })
    console.log(books)
  })


//render provider information
const providers = document.querySelector('#providers-list');

function renderCafe(dox){
  
  let li = document.createElement('li');
  let fname = document.createElement('li');
  let lname = document.createElement('li');
  let email = document.createElement('li');
  let specialty = document.createElement('li');
  let degree = document.createElement('li');
  let issues = document.createElement('li');
  let request = document.createElement('button')



  li.setAttribute('data-id', dox.id);
  console.log(dox.data())

  email.textContent = dox.data().email;
  fname.textContent = dox.data().firstname;
  lname.textContent = dox.data().lastname;
  specialty.textContent = dox.data().specialty;
  degree.textContent = dox.data().degree;
  issues.textContent = dox.data().issues;
  request.textContent = 'Request Service'


  li.appendChild(fname);
  li.appendChild(lname);
  li.appendChild(email);
  li.appendChild(specialty);
  li.appendChild(degree);
  li.appendChild(issues);
  li.appendChild(request);



  providers.appendChild(li);


  
  


  let currentuserid = null
  let selecteduserid = null
// subscribing to auth changes + creating a current user variable
onAuthStateChanged(auth,(user)=>{
  // console.log('user status changed:', user)
  if (user) {
    currentuserid = user.uid; // Set the currentuserid variable
    console.log(currentuserid);
  } else {
    console.log("no user signed in");
  }
})

// on click save the current user id and the selected user ID to a colelction called requests
  request.addEventListener('click', () => {
    
    if(currentuserid){
      alert(`Viewing profile of ${dox.data().firstname} ${dox.data().lastname} `);
  
      setDoc(doc(colReq, currentuserid + dox.data().uid), {
        UserA: currentuserid,
        UserB: dox.data().uid
      });
    }
    else{ alert('no user signed in')}

  })
    
 

}



