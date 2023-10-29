import React from "react";
import styles from "./AdminNav.module.scss";
import { NavLink } from "react-router-dom";

function AdminNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.lActive : "")}
        to="reservations"
      >
        Réservations
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
    </ul>
  );
}

export default AdminNav;
