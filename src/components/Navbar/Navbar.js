import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { CgNotes } from "react-icons/cg";
import { getUserFromDatabase } from "../../firebase/firebaseConfig";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { BsArrowClockwise } from "react-icons/bs";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const uid = localStorage.getItem("id");
  const navigate = useNavigate();

  const [userData, setUserData] = useState("");

  const fetchUser = () => {
    getUserFromDatabase(uid).then((user) => {
      setUserData(user);
    });
  };

  // console.log(userData);

  useEffect(() => {
    fetchUser();
  }, []);

  const logoutHandler = () => {
    authCtx.logout();
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
    </div>
  );
};

export default Navbar;
