import React from "react";
import styles from "./ProfileBanniere.module.scss";
import imgProfileClient from "../../../../../assets/images/imgProfileClient.jpg";

function ProfileBanniere() {
  return (
    <div className={styles.profileClient}>
      <img src={imgProfileClient} alt="imgProfileClient" />
      <h1>Mon profil</h1>
    </div>
  );
}

export default ProfileBanniere;
