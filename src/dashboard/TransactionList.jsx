import React from "react";
import "./TransactionList.css"; // Make sure to import the new CSS!

function TransactionList({ transactions, onDelete }) {
    
    // Formats the amount to match Figma (Green for +, Black for -)
    const formatAmount = (amount) => {
        const isIncome = amount > 0;
        // Adding .toFixed(2) ensures we always see the cents (.00) like in Figma
        const formattedNumber = Math.abs(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2
        });

        return (
            <span className={isIncome ? "amount-positive" : "amount-negative"}>
                {isIncome ? "+" : "-"}₦{formattedNumber}
            </span>
        );
    };

    // Safely converts Firebase timestamp to YYYY/MM/DD
    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        // Handle both Firebase timestamps and standard JS Dates
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}/${month}/${day}`;
    };

    // Grabs the first two letters of the description for the avatar badge
    const getInitials = (description) => {
        if (!description) return "TX";
        return description.substring(0, 2).toUpperCase();
    };

return (
        <div className="transaction-list-container">
            <div className="transaction-header">
                <h2>Last transactions</h2>
                <p>Check your last transactions</p>
            </div>
            
            {/* NEW: Scrollable Wrapper */}
            <div className="table-wrapper">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Method</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.id}>
                                <td className="desc-cell">
                                    <div className="icon-badge">{getInitials(t.description)}</div>
                                    <span>{t.description}</span>
                                </td>
                                <td className="method-cell">{t.method || "Bank account"}</td>
                                <td className="date-cell">{formatDate(t.createdAt)}</td>
                                <td>{formatAmount(t.amount)}</td>
                                <td className="action-cell">
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => onDelete(t.id)} 
                                        title="Delete transaction"
                                    >
                                        ⋮
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan="5" className="empty-state">No transactions found for this period.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionList;