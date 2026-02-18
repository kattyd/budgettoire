import React from "react";
import { Link } from "react-router-dom";
import  "./Stack.css";
import walOne from "../assets/wal1.png";
import walTwo from "../assets/wal2.png";
import walThree from "../assets/wal3.png";
import youtube from "../assets/YouTube.png";
import medium from "../assets/Medium.png";
import spotify from "../assets/Spotify.png";
import Twitch from "../assets/Twitch.png";
import listOne from "../assets/list1.png";
import listTwo from "../assets/list2.png";

 
function Stack() {
    const images = [youtube, medium, spotify, Twitch];
    return (
    <section className="stack">
            <div className="stack-content">
                <div className="stack-1">
                    <img src={walOne} alt="Wallet 1" />
                    <h2>Control your subscriptions</h2>
                    <div className="subs">
                       {images.map((src, index) => (
                            <div key={index} className="sub-item">
                                <img src={src} alt={`Sub ${index + 1}`} />
                                <text className="price">₦5000</text>
                            </div>
                       ))}
                    </div>
                </div>
                <div className="stack-2">
                    <img src={walTwo} alt="Wallet 2" />
                    <h2>Check our other product features</h2>
                    <button className="learn-more">
                        <Link to="/features">See Our Rates</Link>
                    </button>
                </div>
                <div className="stack-3">
                    <img src={walThree} alt="Wallet 3" />
                    <h2>Create custom budgets</h2>
                    <div className="list">
                        <img src={listTwo} alt="List 1" />
                        <img src={listOne} alt="List 2" />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Stack;
