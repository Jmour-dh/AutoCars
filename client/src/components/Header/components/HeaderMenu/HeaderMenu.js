import React, { useContext } from "react";
import styles from "./HeaderMenu.module.scss";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { AiOutlineUser } from "react-icons/ai";

function HeaderMenu() {
  const { user, signout } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          {user.role_id === 2 && (
            <ul
              className={`${styles.MenuContainer} d-flex flex-column align-items-center card p-20`}
            >
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
          )}
          {user.role_id === 3 && (
            <ul
              className={`${styles.MenuContainer} d-flex flex-column align-items-center card p-20`}
            >
              <li className="mr-20">
                <NavLink
                  className={({ isActive }) => (isActive ? "Linkactive" : "")}
                  to="/profilPersonnel"
                >
                  Profil personnel
                </NavLink>
              </li>
              <li className="mr-20">
                <NavLink onClick={() => signout()}>Déconnexion</NavLink>
              </li>
            </ul>
          )}
          {user.role_id !== 2 && user.role_id !== 3 && (
            <ul
              className={`${styles.MenuContainer} d-flex flex-column align-items-center card p-20`}
            >
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
                  to="/occasion"
                >
                  l'Occasion
                </NavLink>
              </li>
              <li className="mr-20">
                <NavLink
                  className={({ isActive }) => (isActive ? "Linkactive" : "")}
                  to="/about"
                >
                  À propos
                </NavLink>
              </li>
              <li className="mr-20">
                <NavLink
                  className={({ isActive }) => (isActive ? "Linkactive" : "")}
                  to="/profile/details/tabBord"
                >
                  Profil
                </NavLink>
              </li>

              <li className="mr-20">
                <NavLink onClick={() => signout()}>Déconnexion</NavLink>
              </li>
            </ul>
          )}
        </>
      ) : (
        <ul
          className={`${styles.MenuContainer} d-flex flex-column align-items-center card p-20`}
        >
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
              to="/occasion"
            >
              l'Occasion
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              className={({ isActive }) => (isActive ? "Linkactive" : "")}
              to="/accessoire"
            >
              Accessoires
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              className={({ isActive }) => (isActive ? "Linkactive" : "")}
              to="/about"
            >
              À propos
            </NavLink>
          </li>

          <li className="mr-20">
            <NavLink to="/signin">
              <AiOutlineUser style={{ marginBottom: "2px" }} />
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}

export default HeaderMenu;
