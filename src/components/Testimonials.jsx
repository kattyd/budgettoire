import React from "react";
import  "./Testimonials.css";
import testimony from "../assets/testimony.png";

function Testimonials() {
    return (
    <section className="testimonial-wrapper">
        <div className="testimonial">
            <div className="testimonial-content">
                <h2>What people are saying</h2>
                <p>Our app has helped thousands of users manage their finances better. Here's what some of them have to say:</p>
            </div>
            <div className="testimonial-image">
                <img src={testimony} alt="Testimonial" />
            </div>
        </div>
    </section>
    );
}

export default Testimonials;