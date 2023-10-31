import React from "react";
import styles from "./AdminCarsNav.module.scss";
import { NavLink } from "react-router-dom";

function AdminCarsNAv() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="list"
      >
        Liste des voitures
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="new"
      >
        Ajouter une voiture
      </NavLink>
    </ul>
  );
}

export default AdminCarsNAv;
