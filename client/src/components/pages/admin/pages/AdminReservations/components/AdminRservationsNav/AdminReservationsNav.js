import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./AdminReservationsNav.module.scss"

function AdminReservationsNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="list"
      >
        Liste des réservations
      </NavLink>
    </ul>
  )
}

export default AdminReservationsNav
