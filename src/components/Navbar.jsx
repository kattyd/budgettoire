import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ hideLinks = false, authMode = "buttons", customText }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">budgettoire</Link>
      </div>

      {/* Middle Links */}
      <div className={styles.links}>
        {!hideLinks && (
          <>
            <Link to="/features">Features</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className={styles.navLinks}>
        {authMode === "buttons" && (
          <>
            <button className={styles.login}>
              <Link to="/login">Login</Link>
            </button>
            <button className={styles.signup}>
              <Link to="/signup">Sign up</Link>
            </button>
          </>
        )}

        {authMode === "text" && (
          <div className={styles.customText}>
            {customText}
          </div>
        )}

        {authMode === "none" && null}
      </div>
    </nav>
  );
}

export default Navbar;