import React from "react";
import styles from "./AdminNav.module.scss";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context";

function AdminNav() {
  const {  signout } = useContext(AuthContext);
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="personnels"
      >
        Personnels
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="users"
      >
        Utilisateurs
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : '')}
        to="contacts"
      >
        Contacts
      </NavLink>
      <NavLink onClick={() => signout()}>Déconnexion</NavLink>
    </ul>
  );
}

export default AdminNav;
