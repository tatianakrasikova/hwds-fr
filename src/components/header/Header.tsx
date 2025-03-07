import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import BurgerMenu from "../burger-menu/BurgerMenu";

import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 875);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "cart" },
  ];

  

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 875);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isAuthorized, setIsAuthorized, setUser, user } = useAuth();
  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthorized");
    setIsAuthorized(false);
    setUser(undefined);
  }

  return (
    <header className={styles.header}>
      <div className={styles.background}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <img
            src="/assets/images/logo1.png"
            alt="Casa Flamingo Logo"
            className={styles.headerImage}
          />
        </div>
        {isMobileView ? (
        <button className="text-4xl text-white absolute top-4 right-4" onClick={toggleMenu}>☰</button>
      ) : (
        <nav className={styles.nav}>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthorized ? (
            <>
              {user?.roles.find((role) => role.name === "ROLE_ADMIN") ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : styles.link
                  }
                  to="/admin/departaments"
                >
                Management
                </NavLink>
              ) : null}
              <button className={styles.logoutBtn} onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <NavLink
              to={"loginpage"}
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              Login
            </NavLink>
          )}
        </nav>
  )}
        <div className={styles.overlay}>
          <h1 className={styles.title}>HWDS</h1>
          <p className={styles.subtitle}>WEBSERVICE</p>
        </div>
      </div>
      {isMenuOpen && isMobileView && (
        <BurgerMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          onNavigate={(path: string) => {
            navigate(path);
            setIsMenuOpen(false);
          }}
          menuItems={menuItems}
        />
      )}
    </header>
  );
};

export default Header;
