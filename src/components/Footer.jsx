import React from "react";
import styles from "./Footer.module.css";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <a href="#">privacy</a> | <a href="#">terms</a>
            </div>

            <div className={styles.socialIcons}>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>
            </div>

            <div className={styles.newsletter}>
                <p>join and let us disturb you weekly</p>
                <input type="email" placeholder="your email"/>
                <button>subscribe</button>
            </div>

            <p style={{ marginTop: "2rem" }}>
                © {new Date().getFullYear()} Budgettoire. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;