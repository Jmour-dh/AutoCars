import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminAvisNav from "./components/AdminAvisNav/AdminAvisNav";

function AdminAvis() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des avis</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminAvisNav />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminAvis;
