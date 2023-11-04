import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context";
import styles from "./ProfilePersonnelNav.module.scss";

function ProfilePersonnelNav() {
  const { signout } = useContext(AuthContext);
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="messages/list"
      >
        Messages
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="avis"
      >
        Avis
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="contacts/list"
      >
        Contacts
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="users"
      >
        Utilisateurs
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="cars"
      >
        Voitures
      </NavLink>

      <NavLink onClick={() => signout()}>Déconnexion</NavLink>
    </ul>
  );
}

export default ProfilePersonnelNav;
