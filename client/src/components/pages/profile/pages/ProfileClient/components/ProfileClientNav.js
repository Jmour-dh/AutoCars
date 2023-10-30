import React from 'react'
import styles from "./ProfileClientNav.module.scss"
import { NavLink } from "react-router-dom";

function ProfileClientNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="tabBord"
      >
        Tableau de bord
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="profileC"
      >
        Profil
      </NavLink>
    </ul>
  )
}

export default ProfileClientNav