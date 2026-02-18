import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard1 from "../components/FeatureCard1";
import FeatureCard2 from "../components/FeatureCard2";
import Footer from "../components/Footer";
import styles from "./Homepage.module.css";
import { Button } from "@/components/ui/button";
import { HStack } from "@chakra-ui/react";
import Partners from "@/components/Partners";
import Stack from "@/components/Stack";
import FAQ from "@/components/Faqs";
import Testimonials from "@/components/Testimonials";

const Homepage = () => {
    return (
        <div>
            <Navbar />

                <Hero />
                <FeatureCard1 />
                <FeatureCard2 />
                <Partners />
                <Stack />
                <FAQ />
                <Testimonials />
                <Footer />
        </div>
    );
};

export default Homepage;