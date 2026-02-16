import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard1 from "../components/FeatureCard1";
import Footer from "../components/Footer";
import styles from "./Homepage.module.css";
import { Button } from "@/components/ui/button";
import { HStack } from "@chakra-ui/react";

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <section className={styles.section}>
                <Hero />
                <FeatureCard1 />
            </section>
            {/* <Footer /> */}
        </div>
    );
};

export default Homepage;