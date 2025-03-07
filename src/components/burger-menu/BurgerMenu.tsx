import React from "react";
import styles from './BurgerMenu.module.css';
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

interface BurgerMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onNavigate: (path: string) => void;
  menuItems: MenuItem[];
}



const BurgerMenu: React.FC<BurgerMenuProps> = ({ isMenuOpen, toggleMenu, onNavigate, menuItems }) => {

  const { isAuthorized, setIsAuthorized, setUser, user } = useAuth();

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthorized");
    setIsAuthorized(false);
    setUser(undefined);
  }
  return (
    <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`}>
      <button onClick={toggleMenu} className={styles.closeButton}>✖</button>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index} onClick={() => onNavigate(item.path)} className={styles.menuItem}>
            {item.name}
          </li>
        ))}

        {/* <button className={styles.logoutBtn} onClick={logout}>
          Log out
        </button> */}
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


      </ul>

    </div>
  );
};

export default BurgerMenu;
