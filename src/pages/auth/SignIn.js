import React, { useContext } from "react";
import styles from "./Signin.module.css";
import { FaGoogle } from "react-icons/fa";
import {
  addUserInDatabase,
  SignInWithGoogle,
} from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { CgNotes } from "react-icons/cg";
import { toast, Toaster } from "react-hot-toast";

const SignIn = () => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const SignInWithGoogleClickHandler = () => {
    SignInWithGoogle()
      .then((result) => {
        const { user } = result;
        addUserInDatabase(user);
        navigate("/home", { replace: true });
        authCtx.login(user.accessToken);
        authCtx.setId(user.uid);
        toast.success("Successfully logged in");
      })
      .catch((err) => {
        toast.err(err.message);
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.lines}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <div className={styles["login-card"]}>
        <div className={styles.logo}>
          <CgNotes />
          &nbsp;Notes Hub
        </div>
        <button
          className={styles.button}
          onClick={SignInWithGoogleClickHandler}
        >
          <FaGoogle />
          &nbsp;Sign-in
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
