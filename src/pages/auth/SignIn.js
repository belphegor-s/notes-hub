import React from "react";
import styles from "./Signin.module.css";
import { FaGoogle } from "react-icons/fa";
import {
  addUserInDatabase,
  SignInWithGoogle,
} from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const SignInWithGoogleClickHandler = () => {
    SignInWithGoogle()
      .then((result) => {
        console.log(result);
        const { user } = result;
        addUserInDatabase(user);
        navigate("/home", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.main}>
      <button className={styles.button} onClick={SignInWithGoogleClickHandler}>
        <FaGoogle />
        &nbsp;Sign-in
      </button>
    </div>
  );
};

export default SignIn;
