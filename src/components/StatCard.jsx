import React from "react";
import "./StatCard.css";

// Add isBalance to your props
function StatCard({ title, amount, icon, positive, isBalance }) {
  // Format the amount
  const formattedAmount = Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2
  });

  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
      </div>
      
      {/* NEW: Check if isBalance is true, and apply the purple color! */}
      <h2 
        className="stat-amount" 
        style={isBalance ? { color: '#7248ee' } : {}}
      >
        ₦{formattedAmount}
      </h2>
      
      {/* ... your existing code for positive/negative percentages ... */}
    </div>
  );
}

export default StatCard;