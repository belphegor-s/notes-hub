import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.main}>
      <div>404</div>
      <p>Uh-oh! The page you are looking for does not exist</p>
      <Link to="/" className={styles.link}>
        Click Here to Login Page
      </Link>
    </div>
  );
};

export default NotFound;
