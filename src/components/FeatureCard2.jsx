import React from "react";
import { Link } from "react-router-dom";
import  "./FeatureCard2.css";
import cardTwo from "../assets/container2.png";

function FeatureCard2() {
    return (
    <section className="feature-card2">
        <div className="card-content">
                <p>WHAT WE DO</p>
                <h2>Transfer funds to any currency.</h2>
                <text>Don’t panic about your finances,
                     stay zen with our state-of-the-art 
                     budgeting features</text>
                <button className="learn-more">
                    <Link to="/features">See Our Rates</Link>
                </button>
            </div>
            <div className="card2">
                <img src={cardTwo} alt="Card Image" />
            </div>
        </section>
    )
}

export default FeatureCard2;