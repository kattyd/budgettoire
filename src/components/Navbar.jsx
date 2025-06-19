import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ hideAuthLinks }) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">budgettoire</Link>
            </div>
            {!hideAuthLinks && (
                <div className={styles.navLinks}>
                    <Link to="/login">login</Link>
                    <button className={styles.signup}>
                        <Link to="/signup">signup</Link>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;