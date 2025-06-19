import React from "react";

function TransactionList({ transactions, onDelete }) {
    const formatAmount = (amount) => 
        `${amount < 0 ? "-" : "+"}₦${Math.abs(amount).toLocaleString()}`;

    return (
        <div className="transaction-list">
            <h2>history</h2>
                  <ul>
        {transactions.map((t, index) => (
          <li
            key={t.id}
            style={{
              borderLeft: `6px solid ${t.amount < 0 ? "#e74c3c" : "#2ecc71"}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{t.description}</strong>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                {formatAmount(t.amount)}
              </div>
            </div>
                        <button onClick={() => onDelete(index)} style={{ marginLeft: "10px" }}>
                             ❌
                        </button>
                    </li>
                    ))}
                </ul>
        </div>
    );
}

export default TransactionList;