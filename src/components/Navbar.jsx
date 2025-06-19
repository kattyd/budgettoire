import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>budgettoire</div>
            <div className={styles.navLinks}>
                <Link to="/">home</Link>
                <Link to="/login">login</Link>
                <Link to="/signup">signup</Link>
            </div>
        </nav>
    );
};

export default Navbar;