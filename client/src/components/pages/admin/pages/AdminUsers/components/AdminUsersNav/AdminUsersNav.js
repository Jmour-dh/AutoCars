import styles from "./AdminUsersNav.module.scss";
import React from 'react'
import { NavLink } from 'react-router-dom';

function AdminUsersNav() {
  return (
    <ul className={styles.list}>
    <NavLink
      className={({ isActive }) => (isActive ? styles.active : '')}
      to="list"
    >
      Liste des clients
    </NavLink>
    <NavLink
      className={({ isActive }) => (isActive ? styles.active : '')}
      to="new"
    >
      Ajouter un client
    </NavLink>
  </ul>
  )
}

export default AdminUsersNav