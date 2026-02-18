import React, { useState } from "react";
import "./Faqs.css";
import coin from "../assets/coin.png";

const FAQ = () => {
    // 1. Data: Add your questions and answers here
    const faqs = [
        {
            question: "Is there a free trial available?",
            answer: "Yes! Don’t panic about your finances, stay zen with our state-of-the-art budgeting features. You can try Premium for 14 days free."
        },
        {
            question: "How can I change my account email?",
            answer: "Go to your Settings page, click on 'Profile', and update your email address there. You'll need to verify the new email."
        },
        {
            question: "Is the payment platform secure?",
            answer: "Absolutely. We use Stripe and industry-standard encryption to ensure your data is never compromised."
        },
        {
            question: "How does billing work?",
            answer: "We bill monthly or annually, depending on your plan. You can cancel anytime from your dashboard."
        },
        {
            question: "What is your cancellation policy?",
            answer: "Cancel anytime. If you cancel, your subscription will remain active until the end of your current billing cycle."
        }
    ];

    // 2. State: Tracks which index is open. null means all are closed.
    const [openIndex, setOpenIndex] = useState(null);

    // 3. Toggle Function
    const toggleFAQ = (index) => {
        // If clicking the one already open, close it (set to null)
        // Otherwise, open the new one
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-img">
                <img src={coin} alt="FAQ Image" />
            </div>
            <div className="faq-container">
                <p>FAQ</p>
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${openIndex === index ? "open" : ""}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                {/* The Arrow Icon */}
                                <span className="arrow">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </div>
                            
                            {/* The Answer (Only shows if openIndex matches) */}
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;