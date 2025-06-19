import React from "react";

const Summary = ({ transactions }) => {
  const amounts = transactions.map((t) => t.amount);

  const income = amounts
    .filter((amt) => amt > 0)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const expense = amounts
    .filter((amt) => amt < 0)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const balance = (amounts.reduce((a, b) => a + b, 0)).toFixed(2);

  return (
    <div className="summary-card">
      <h2>Balance: ₦{parseFloat(balance).toLocaleString()}</h2>
      <p style={{ color: "#2ecc71" }}>Income: ₦{parseFloat(income).toLocaleString()}</p>
      <p style={{ color: "#e74c3c" }}>Expense: ₦{Math.abs(expense).toLocaleString()}</p>
    </div>
  );
};

export default Summary;
