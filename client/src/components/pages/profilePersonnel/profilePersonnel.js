import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import ProfilePersonnelNav from "./components/profilePersonnelNav/ProfilePersonnelNav"
import styles from "./profilePersonnel.module.scss"

function profilePersonnel() {
  return (
    <div className={`d-flex flex-fill p-20 ${styles.container}`}>
      <ProfilePersonnelNav/>
      <div className="d-flex flex-column flex-fill mh-80vh">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default profilePersonnel