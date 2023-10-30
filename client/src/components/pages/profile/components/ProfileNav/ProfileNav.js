import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProfileNav.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../../../context";

function ProfileNav() {
  const {  signout } = useContext(AuthContext);
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
    <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="details/tabBord"
      >
        Détails compte
      </NavLink>
      <NavLink onClick={() => signout()}>Déconnexion</NavLink>
    </ul>
  );
}

export default ProfileNav;
