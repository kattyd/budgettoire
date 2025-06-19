import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./Homepage.module.css";

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <section className={styles.hero}>
                <div className={styles.heroText}>
                    <h1>track money, <br></br>better future</h1>
                    <p>budget tracker for the greats</p>
                    <div className={styles.heroButtons}>
                        <button><a href="/signup">get started</a></button>
                        <button className={styles.secondary}>learn more</button>
                    </div>
                </div>
                <img src="/assets/analysis.svg" alt="track your budget" className={styles.heroImage}/>
            </section>
            <section className={styles.features}>
                <h2>what you can do</h2>
                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <h3>track income and expense</h3>
                        <p>log and categorize</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>visual reports</h3>
                        <p>understand finance</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>custom budget</h3>
                        <p>every month</p>
                    </div>
                </div>
            </section>
            <section className={styles.cta}>
                <h2>take control if you want</h2>
                <p>there's like a thousand people already doing so</p>
                <button>signup free</button>
            </section>
            <section className={styles.testimonials}>
                <h2>what people are saying</h2>
                <div className={styles.testimonialGrid}>
                   <div className={styles.testimonialCard}>
                        <p>"budgettoire is the best! helped me understand where my money goes"</p>
                        <footer>- Noyi, Designer</footer>
                   </div>
                    <div className={styles.testimonialCard}>
                        <p>"budgettoire is the best! helped me understand where my money goes"</p>
                        <footer>- Noyi, Designer</footer>
                   </div>
                    <div className={styles.testimonialCard}>
                        <p>"budgettoire is the best! helped me understand where my money goes"</p>
                        <footer>- Noyi, Designer</footer>
                   </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Homepage;