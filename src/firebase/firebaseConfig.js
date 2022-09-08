import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { doc, setDoc, getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwfzAJGPmmdUrWUg-337IbB_rmeIKoF38",
  authDomain: "notes-hub-84dfb.firebaseapp.com",
  projectId: "notes-hub-84dfb",
  storageBucket: "notes-hub-84dfb.appspot.com",
  messagingSenderId: "361862135321",
  appId: "1:361862135321:web:6f02ed38393bc55ccf7488",
  measurementId: "G-RNZG6Z11Q5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const user = auth.currentUser;
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
