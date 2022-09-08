import React from "react";
import styles from "./Navbar.module.css";
import { CgNotes } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <CgNotes />
        &nbsp;Notes Hub
      </div>
      <div className={styles.profile}>Profile</div>
    </div>
  );
};

export default Navbar;
