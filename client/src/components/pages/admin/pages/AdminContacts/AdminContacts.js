import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminContactsNav from "./components/AdminContactsNav/AdminContactsNav"

function AdminContacts() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des contacts</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminContactsNav />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default AdminContacts