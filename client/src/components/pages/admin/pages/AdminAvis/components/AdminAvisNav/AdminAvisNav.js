import styles from "./AdminAvisNav.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";

function AdminAvisNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="listNoValid"
      >
        Liste des avis à traiter
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="listValid"
      >
        Liste des avis traités
      </NavLink>
    </ul>
  );
}

export default AdminAvisNav;
