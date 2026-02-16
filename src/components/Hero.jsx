import React from "react";
import { Link } from "react-router-dom";
import  "./Hero.css";
import { RatingGroup } from "@chakra-ui/react";

function Hero() {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <p>TRY NOW!</p>
                    <h1>Track money, <br />better future</h1>
                    <text>Don’t panic about your finances, 
                        stay zen with our state-of-the-art 
                        budgetting features</text>
                        <div className="cont">
                            <button className="get-started">
                                <Link to="/signup">Get Started</Link>
                            </button>
                            <div className="rating">
                                <RatingGroup.Root colorPalette="yellow" readOnly allowHalf count={5} defaultValue={3.5} size="lg">
                                    <RatingGroup.HiddenInput />
                                    <RatingGroup.Control />
                                    &nbsp;<strong>3.5</strong>
                                </RatingGroup.Root>
                                <text className="rating-text">from 200+ <u>reviews</u></text>
                            </div>
                        </div>
                </div>
                <div className="hero-img">
                    <img src="src/assets/hero.gif" alt="Hero Image" />
                </div>
            </section>
            <section className="hero-bottom">
                <div className="hero-bottom-content">
                    <h2>Track money, better future</h2>
                    <div className="partners">
                        <img src="src/assets/ApplePay.png" />
                        <img src="src/assets/Bitpay.png" />
                        <img src="src/assets/PayPal.svg" />
                        <img src="src/assets/Stripe.png" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;