import AdminPersonnelNav from "./Components/AdminPersonnelNav/AdminPersonnelNav";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

function AdminPersonnel() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des personnels</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminPersonnelNav />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminPersonnel;
