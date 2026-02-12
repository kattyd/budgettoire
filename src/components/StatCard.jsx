import React from "react";
import "./StatCard.css";

const StatCard = ({ title, amount, change, positive, icon }) => {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <span className="stat-icon">{icon}</span>
                <h3 className="stat-title">{title}</h3>
            </div>
            <p className="stat-amount">₦{amount.toLocaleString()}</p>
            {change !== undefined && (
                <p className={`stat-change ${positive ? "positive" : "negative"}`}>
                    {positive ? "▲" : "▼"} {change}%
                </p>
            )}
        </div>
    );
}

export default StatCard;