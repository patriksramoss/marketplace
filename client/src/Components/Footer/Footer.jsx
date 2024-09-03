import React from "react";
import styles from "./styles.module.scss";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerBottom}>
          <p className={styles.captionText}>
            &copy; {currentYear} Mindscatter. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
