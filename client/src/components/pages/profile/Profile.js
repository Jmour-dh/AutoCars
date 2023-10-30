import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Profile.module.scss";
import ProfileBanniere from "./components/ProfileBanniere/ProfileBanniere";
import ProfileNav from "./components/ProfileNav/ProfileNav";

function Profile() {
  return (
    <div className={styles.centeredContainer}>
      <ProfileBanniere />
      <div className={`d-flex flex-fill p-20 ${styles.container}`}>
        <ProfileNav />
        <div className="d-flex flex-column ">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Profile;
