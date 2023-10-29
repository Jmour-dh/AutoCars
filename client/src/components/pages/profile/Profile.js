import React, { useContext } from "react";
import { AuthContext } from "../../../components/context";
import styles from "./Profile.module.scss";
import avatarImg from "../../../assets/images/utilisateur.png";

function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.Profile}>
      <h1>Profile</h1>
      <div className={styles.ProfileContainer}>
        <div className={styles.Pdp}>
          <img src={avatarImg} alt="avimg" />
        </div>
        <div className={styles.descriptionProfile}>
          <ul>
            <li className={styles.liPrecision}>
              Nom :<li className={styles.liuser}>{user.name}</li>
            </li>
            <li className={styles.liPrecision}>
              Prenom :<li className={styles.liuser}>{user.lname}</li>
            </li>
            <li className={styles.liPrecision}>
              Adresse mail :<li className={styles.liuser}>{user.email}</li>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
