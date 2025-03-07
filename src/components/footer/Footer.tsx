import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.menu}>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/profilepage"}>
          My profile
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/privacypolicy"}>
          Privacy policy
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/contacts"}>
          Contacts
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/aboutus"}>
          About Us
        </NavLink>
      </nav>

      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaInstagram />
        </a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
}