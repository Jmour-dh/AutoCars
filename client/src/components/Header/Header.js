import React, { useState } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineBars } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../context";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import logo from "../../assets/images/Logo.png";

function Header() {
  const { user, signout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={`${styles.header} d-flex justify-content-between align-items-center`}
    >
      <div
        className={`${styles.logo} d-flex flex-column justify-content-center align-items-center`}
      >
        <img src={logo} alt="logo" />
      </div>
      <div>
        {user ? (
          <>
            {user.role_id === 2 && (
              <ul className={`${styles.headerList} d-flex p-5`}>
                <li className="mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/admin"
                  >
                    Profil admin
                  </NavLink>
                </li>
                <li className="ml-10">
                  <NavLink onClick={() => signout()}>Déconnexion</NavLink>
                </li>
              </ul>
            )}
            {user.role_id === 3 && (
              <ul className={`${styles.headerList} d-flex p-5`}>
                <li className="mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/"
                  >
                    Accueil
                  </NavLink>
                </li>
                <li className="mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/profilPersonnel"
                  >
                    Profil personnel
                  </NavLink>
                </li>
                <li className="ml-10">
                  <NavLink onClick={() => signout()}>Déconnexion</NavLink>
                </li>
              </ul>
            )}
            {user.role_id !== 2 && user.role_id !== 3 && (
              <ul className={`${styles.headerList} d-flex p-5`}>
                <li className="mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/"
                  >
                    Accueil
                  </NavLink>
                </li>
                <li className="ml-10 mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/occasion"
                  >
                    l'Occasion
                  </NavLink>
                </li>
                <li className="ml-10 mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/accessoire"
                  >
                    Accessoires
                  </NavLink>
                </li>
                <li className="ml-10 mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/about"
                  >
                    À propos
                  </NavLink>
                </li>
                <li className="mr-10">
                  <NavLink
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                    to="/profile"
                  >
                    Profil
                  </NavLink>
                </li>

                <li className="ml-10">
                  <NavLink onClick={() => signout()}>Déconnexion</NavLink>
                </li>
              </ul>
            )}
          </>
        ) : (
          <ul className={`${styles.headerList} d-flex p-5`}>
            <li className="mr-10">
              <NavLink
                className={({ isActive }) => (isActive ? "Linkactive" : "")}
                to="/"
              >
                Accueil
              </NavLink>
            </li>
            <li className="ml-10 mr-10">
              <NavLink
                className={({ isActive }) => (isActive ? "Linkactive" : "")}
                to="/occasion"
              >
                l'Occasion
              </NavLink>
            </li>
            <li className="ml-10 mr-10">
              <NavLink
                className={({ isActive }) => (isActive ? "Linkactive" : "")}
                to="/accessoire"
              >
                Accessoires
              </NavLink>
            </li>
            <li className="ml-10 mr-10">
              <NavLink
                className={({ isActive }) => (isActive ? "Linkactive" : "")}
                to="/about"
              >
                À propos
              </NavLink>
            </li>

            <li className=" ml-10 mr-10">
              <NavLink to="/signin">
                <AiOutlineUser style={{ marginBottom: "2px" }} />
              </NavLink>
            </li>
          </ul>
        )}
        <AiOutlineBars
          className={styles.headerXs}
          onClick={() => setShowMenu(true)}
        />
        {showMenu && (
          <>
            <div onClick={() => setShowMenu(false)} className="calc"></div>
            <HeaderMenu />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
