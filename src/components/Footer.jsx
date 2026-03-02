import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin, faThreads } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.contentOne}>
                <h2>Let us disturb you weekly</h2>
                <div className={styles.email}>
                    <input type="email" placeholder="Enter your email address" id="email" />
                    <button>Subscribe</button>
                </div>
            </div>
            <hr  className={styles.divider}/>
            <div className={styles.contentTwo}>
                <div className={styles.partOne}>
                    <h2>budgettoire</h2>
                    <p>Don’t panic about your finances,
                        stay zen with our state-of-the-art 
                        budgeting features</p>
                    <div className={styles.socials}>
                        <FontAwesomeIcon icon={faXTwitter} />
                        <FontAwesomeIcon icon={faLinkedin} />
                        <FontAwesomeIcon icon={faThreads} />
                    </div>
                </div>
                <div className={styles.footerLinks}>
                    <div className={styles.homeGroup}>
                        <a href="#">Home</a>
                        <a href="#">About Us</a>
                        <a href="#">Personal</a>
                        <a href="#">Business</a>
                    </div>
                    <div className={styles.featureGroup}>
                        <a href="#">Features</a>       
                        <a href="#">Get Started</a>       
                        <a href="#">Privacy Policy</a>       
                    </div>
                    <div className={styles.socialGroup}>
                        <a href="#">Socials</a>
                        <a href="#">Instagram</a>
                        <a href="#">Linkedin</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer;