import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { CgNotes } from "react-icons/cg";
import { getUserFromDatabase } from "../../firebase/firebaseConfig";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { BsArrowClockwise } from "react-icons/bs";
import { toast } from "react-hot-toast";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import NotesContext from "../../context/notes-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const notesCtx = useContext(NotesContext);
  const uid = localStorage.getItem("id");
  const navigate = useNavigate();

  const [userData, setUserData] = useState("");

  const fetchUser = () => {
    getUserFromDatabase(uid)
      .then((user) => {
        setUserData(user);
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logoutHandler = () => {
    authCtx.logout();
    notesCtx.emptyNotes();
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <CgNotes />
        &nbsp;Notes Hub
      </div>
      <div className={styles.profile}>
        {userData ? (
          <>
            <img
              src={userData.profilePhoto}
              alt="profile-pic"
              className={styles["profile-pic"]}
            />
            <div className={styles.greeting}>Hi, {userData.name}</div>
          </>
        ) : (
          <BsArrowClockwise className={styles.loading} />
        )}

        <button onClick={logoutHandler} className={styles["logout-button"]}>
          Logout
        </button>
      </div>
      <span className={styles["burger-menu"]}>
        <BurgerMenu userData={userData} />
      </span>
    </div>
  );
};

export default Navbar;
