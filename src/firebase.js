import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD46AmTcSEvsj0TR0UAWvc6qyGazVGOONs",
    authDomain: "weeklyplanner-eeabe.firebaseapp.com",
    projectId: "weeklyplanner-eeabe",
    storageBucket: "weeklyplanner-eeabe.appspot.com",
    messagingSenderId: "520933822553",
    appId: "1:520933822553:web:8065f0f9af793d0512e148"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); 
const db = getFirestore(app);

export const signUpWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
export const addNote = async (note) => {
  try {
    if (typeof note.content === 'undefined' || !note.date) {
      throw new Error("Required fields are missing: 'content' or 'date' is undefined.");
    }

    const processedDate = note.date instanceof Date ? note.date : new Date(note.date);

    const docRef = await addDoc(collection(db, "notes"), {
      ...note,
      date: processedDate.toISOString(), 
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id; 
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
  export const getNotes = async (userId) => {
    const q = query(collection(db, "notes"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    return notes;
  };
export const signInWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};
export const logOut = () => {
    return signOut(auth);
};
export { auth, db as firestore };
