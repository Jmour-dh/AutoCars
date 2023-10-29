import React from "react";
import styles from "./Footer.module.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterCircle,
} from "react-icons/ai";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerIcons}>
        <li className={styles.socialIcons}>
          <AiFillFacebook />
        </li>
        <li className={styles.socialIcons}>
          <AiFillInstagram />
        </li>
        <li className={styles.socialIcons}>
          <AiFillYoutube />
        </li>
        <li className={styles.socialIcons}>
          <AiFillTwitterCircle />
        </li>
      </ul>
      <div>
        <p>Copyright © {year} AutoCars || vente des voitures </p>
      </div>
    </footer>
  );
}

export default Footer;
