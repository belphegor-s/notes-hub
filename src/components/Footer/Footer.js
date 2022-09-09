import React from "react";
import styles from "./Footer.module.css";
import { FiCoffee } from "react-icons/fi";

const Footer = () => {
  return (
    <div className={styles.footer}>
      Created with &nbsp;
      <FiCoffee />
      &nbsp; by Ayush
    </div>
  );
};

export default Footer;
