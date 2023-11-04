import styles from "./AdminContactsNav.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";

function AdminContactsNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="list"
      >
        Liste des messages
      </NavLink>
    </ul>
  );
}

export default AdminContactsNav;
