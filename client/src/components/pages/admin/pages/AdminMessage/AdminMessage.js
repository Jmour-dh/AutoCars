import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminMessageNav from "./components/AdminMessageNav/AdminMessageNav";

function AdminMessage() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des messages</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminMessageNav />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminMessage;
