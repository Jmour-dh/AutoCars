import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminReservationsNav from "./components/AdminRservationsNav/AdminReservationsNav";

function AdminReservations() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des réservations</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminReservationsNav />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminReservations;
