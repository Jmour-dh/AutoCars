import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminUsersNav from "./components/AdminUsersNav/AdminUsersNav";

function AdminUsers() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des clients</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminUsersNav/>
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
