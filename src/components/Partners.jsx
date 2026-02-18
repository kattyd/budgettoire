import React from "react";
import { Link } from "react-router-dom";
import  "./Partners.css";
import stripe from "../assets/Stripe1.png";
import visa from "../assets/Visa.png";
import klarna from "../assets/Klarna.png";
import master from "../assets/Mastercard.png";
import apple from "../assets/ApplePay1.png";
import eth from "../assets/Etherium.png";
import google from "../assets/GooglePay.png";
import bit from "../assets/Bitpay1.png";
import skrill from "../assets/Skrill.png";


function Partners() {
    const images = [
    stripe, visa, klarna, 
    master, apple, eth,
    google, bit, skrill
  ];
    return (
        <section className="partners">
            <div className="partner-content">
                <div className="partner-text">
                    <h2>Transfer funds to any currency.</h2>
                    <text>Don’t panic about your finances,
                        stay zen with our state-of-the-art 
                        budgeting features</text>
                    <button className="learn-more">
                        <Link to="/features">See Our Rates</Link>
                    </button>
                </div>
                <div className="logos">
                    {images.map((src, index) => (
                        <div key={index} className="item">
                            <img src={src} alt={`Partner ${index + 1}`} />
                        </div> ))}
                </div>
            </div>
        </section>
    )
}

export default Partners;