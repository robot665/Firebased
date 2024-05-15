//NOTE USERA = CLIENT and USERB = PROVIDER


import { initializeApp } from 'firebase/app'
import {
getFirestore, collection, onSnapshot,
addDoc, deleteDoc, doc, getDocs,
query, where,
orderBy, serverTimestamp,
getDoc, updateDoc,
queryEqual
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
const colFriend = collection(db, 'friends')


// assign user.uid to a global variable accessed by the adddoc function
let uid = null
onAuthStateChanged(auth,(user)=>{
  if (user) {
     uid = user.uid; 
    // console.log(uid)
  } else {
    console.log("no user signed in");
  }
})

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


//queries finds a particular type of data


//wait for currentuserid to be collected then find documents where UserB data matches UID
await waitForUID()
const userbQuery = query(colReq, where ("UserB", "==", uid))




//collect all documents where current user is requested

const collectdocB = await getDocs(userbQuery);

let useraID = [];
collectdocB.forEach((doc) => {
  useraID.push(doc.data().UserA);
});

//Fetch documents from books concurrently using their ids
const userADocs = await Promise.all(useraID.map((id) => getDoc(doc(colRef,id))));
let userAinfo = []
userADocs.forEach((docSnap) => {
  if (docSnap.exists()) {
    userAinfo.push({ ...docSnap.data(), id: docSnap.id });
    renderCafe(docSnap) // Log data to the console
  } else {
    console.log("No document found for UserA ID:", docSnap.id);
  }
});


//Search those documents and create a query that grabs every document with UserA's ID


// Render all User A profiles to the requests hub



function renderCafe(docSnap){
  const requests = document.querySelector('#requests-list');

    let li = document.createElement('li');
    let fname = document.createElement('li');
    let lname = document.createElement('li');
    let email = document.createElement('li');
    let specialty = document.createElement('li');
    let degree = document.createElement('li');
    let issues = document.createElement('li');
    let accept = document.createElement('button')
    let decline = document.createElement('button')
  
  
  
    li.setAttribute('data-id', docSnap.id);
    console.log(docSnap.data())
  
    email.textContent = docSnap.data().email;
    fname.textContent = docSnap.data().firstname;
    lname.textContent = docSnap.data().lastname;
    specialty.textContent = docSnap.data().specialty;
    degree.textContent = docSnap.data().degree;
    issues.textContent = docSnap.data().issues;
    accept.textContent = 'Accept'
    decline.textContent = 'Decline'
  
   
  
    li.appendChild(fname);
    li.appendChild(lname);
    li.appendChild(email);
    li.appendChild(specialty);
    li.appendChild(degree);
    li.appendChild(issues);
    li.appendChild(accept);
    li.appendChild(decline);
  
  
  
    requests.appendChild(li);



    // on click save the current user id and the selected user ID to a collection called friends
  accept.addEventListener('click', () => {
    
    if(uid){

      
      addDoc(colFriend, {
        UserA: docSnap.data().uid,
        UserB: uid
      });
    }
    else{ alert('no user signed in')}

  })


  decline.addEventListener('click', () => {
    
    if(uid){

      alert("sucsess")
      deleteDoc(doc(colReq,docSnap.data().uid + uid));
     
    }
    else{ alert('no user signed in')}

  })
    
 

}
  
  
  











