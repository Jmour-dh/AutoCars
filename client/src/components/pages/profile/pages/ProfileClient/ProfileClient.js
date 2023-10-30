
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfileClientNav from "./components/ProfileClientNav"

function ProfileClient() {
  const { key } = useLocation();
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion De profil</h4>
      <div className="flex-fill d-flex flex-column">
        <ProfileClientNav/>
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProfileClient