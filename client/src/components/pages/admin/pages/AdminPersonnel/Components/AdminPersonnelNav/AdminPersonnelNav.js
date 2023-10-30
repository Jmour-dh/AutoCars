import React from 'react'
import styles from  "./AdminPersonnelNav.module.scss"
import { NavLink } from 'react-router-dom';

function AdminPersonnelNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="list"
      >
        Liste des personnels
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="new"
      >
        Ajouter un personnel
      </NavLink>
    </ul>
  )
}

export default AdminPersonnelNav