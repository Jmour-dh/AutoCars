import React from 'react'
import styles from "./AdminMessageNav.module.scss"
import { NavLink } from 'react-router-dom';

function AdminMessageNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="list"
      >
        Liste des messages
      </NavLink>
    </ul>
  )
}

export default AdminMessageNav