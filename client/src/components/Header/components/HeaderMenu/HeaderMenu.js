import React, { useContext } from "react";
import styles from "./HeaderMenu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import logoIcon from "../../../../assets/icons/Royal_Palace_Logo.jpg";
import { AiOutlineUser } from "react-icons/ai";

function HeaderMenu() {
  const { user, signout } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {user ? (
        user.admin === true ? (
          
          <ul
            className={`${styles.MenuContainer} d-flex flex-column align-items-center card p-20`}
          >
            <li>
              <img className={styles.ico} src={logoIcon} alt="logo" />
            </li>
            <li className="mr-20">
              <NavLink
                className={({ isActive }) => (isActive ? "Linkactive" : "")}
                to="/admin"
              >
                Profil admin
              </NavLink>
            </li>
            <li className="mr-20">
              <NavLink onClick={() => signout()}>Déconnexion</NavLink>
            </li>
          </ul>
        ) : (
          <ul
            className={`${styles.MenuContainer} d-flex flex-column align-items-center card p-20`}
          >
            <li>
              <img className={styles.ico} src={logoIcon} alt="logo" />
            </li>
            <li className="mr-20">
              <NavLink
                className={({ isActive }) => (isActive ? "Linkactive" : "")}
                to="/profile"
              >
                Profil
              </NavLink>
            </li>
            <li className="mr-20">
              <NavLink
                className={({ isActive }) => (isActive ? "Linkactive" : "")}
                to="/reserver"
              >
                Réserver
              </NavLink>
            </li>
            <li className="mr-20">
              <NavLink onClick={() => signout()}>Déconnexion</NavLink>
            </li>
          </ul>
        )
      ) : (
        <ul
          className={`${styles.MenuContainer} d-flex flex-column align-items-center card p-20`}
        >
          <li>
            <img className={styles.ico} src={logoIcon} alt="logo" />
          </li>
          <li className="mr-20">
            <NavLink
              className={({ isActive }) => (isActive ? "Linkactive" : "")}
              to="/"
            >
              Accueil
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              className={({ isActive }) => (isActive ? "Linkactive" : "")}
              to="/resto"
            >
              Restaurants & Bars
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              className={({ isActive }) => (isActive ? "Linkactive" : "")}
              to="/gallery"
            >
              Gallery
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              className={({ isActive }) => (isActive ? "Linkactive" : "")}
              to="/localisation"
            >
              Location & Details
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              className={
                location.pathname === "/signin" ||
                location.pathname === "/signup"
                  ? "Linkactive"
                  : ""
              }
              to="/signin"
            >
              <AiOutlineUser style={{ marginBottom: "2px" }} />
            </NavLink>
          </li>
          
        </ul>
        
      )}
      
    </>
  );
}

export default HeaderMenu;
