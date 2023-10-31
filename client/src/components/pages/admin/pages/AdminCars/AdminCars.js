import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminCarsNav from "./components/AdminCarsNav/AdminCarsNav";

function AdminCars() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
    <h4 className="mb-20">Gestion des voitures</h4>
    <div className="flex-fill d-flex flex-column">
      <AdminCarsNav />
      <div className="flex-fill d-flex flex-column">
        <Suspense>
          <Outlet key={key} />
        </Suspense>
      </div>
    </div>
  </div>
  )
}

export default AdminCars