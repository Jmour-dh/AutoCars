import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import AdminNav from './components/AdminNav/AdminNav'
import styles from './Admin.module.scss';

function Admin() {
  return (
    <div className={`d-flex flex-fill p-20 ${styles.container}`}>
      <AdminNav/>
      <div className="d-flex flex-column flex-fill mh-80vh">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default Admin