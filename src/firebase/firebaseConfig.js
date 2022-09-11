import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
export const user = auth.currentUser;
const db = getFirestore(app);

export const SignInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const signOutUser = () => signOut(auth);

export const addUserInDatabase = async (user) => {
  try {
    return await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      profilePhoto: user.photoURL,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserFromDatabase = async (uid) => {
  let user;
  await (
    await getDocs(query(collection(db, "users"), where("id", "==", `${uid}`)))
  ).forEach((doc) => {
    user = { ...doc.data() };
  });
  return user;
};

export const addNoteInDatabase = async (uid, data) => {
  try {
    return await setDoc(doc(db, "notes", uid), {
      ...data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getNotesFromDatabase = async (uid) => {
  let notes;
  await (
    await getDocs(query(collection(db, "notes"), where("uid", "==", `${uid}`)))
  ).forEach((doc) => {
    notes = { ...doc.data() };
  });
  return notes;
};

export const updateNoteInDatabase = async (uid, data) => {
  try {
    return await updateDoc(doc(db, "notes", uid), data);
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateSpecificNoteInDatabase = async (uid, data) => {
  try {
    return await updateDoc(doc(db, "notes", uid), data);
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const deleteNoteFromDatabase = async (uid, noteID, notes) => {
  try {
    const updatedNotes = notes.filter((note) => note.noteID !== noteID);
    // console.log(updatedNotes);
    return await updateDoc(doc(db, "notes", uid), {
      notes: updatedNotes,
    });
  } catch (err) {
    console.log("Err: ", err);
  }
};
