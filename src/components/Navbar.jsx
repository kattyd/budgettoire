import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "@chakra-ui/react";

function Navbar({ hideAuthLinks }) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">budgettoire</Link>
            </div>
            <div className={styles.links}>
                    <Link to="/features">Features</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/about">About</Link>
            </div>
            {!hideAuthLinks && (
                <div className={styles.navLinks}>
                    <button className={styles.login}>
                        <Link to="/login">Login</Link>
                    </button>
                    <button className={styles.signup}>
                        <Link to="/signup">Sign up</Link>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;