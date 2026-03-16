import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./TransactionForm.css";

const TransactionForm = ({ onAdd, onClose, initialType }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState(initialType || "expense");
    
    // NEW: States for Category and Method
    const [category, setCategory] = useState(initialType === "income" ? "Salary" : "Food");
    const [method, setMethod] = useState("Bank account");

    // Keep the type and default category synced if the user clicks a different action button
    useEffect(() => {
        if (initialType) {
            setType(initialType);
            setCategory(initialType === "income" ? "Salary" : "Food");
        }
    }, [initialType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Bug fix 1: Prevent submitting if fields are empty
        if (!description.trim() || !amount) {
            alert("Please enter a valid description and amount.");
            return;
        }

        const user = auth.currentUser;
        // Bug fix 2: Make sure Firebase Auth knows who is logged in
        if (!user) {
            alert("Error: You must be logged in to add a transaction.");
            return;
        }

        // Build the new transaction object with our new fields
        const newTransaction = {
            description: description.trim(),
            amount: type === "expense" ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
            type,
            category,
            method,
            userId: user.uid,
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, "transactions"), newTransaction);
            // If successful, this calls the function in Dashboard.jsx to close the modal and show a toast
            if (onAdd) onAdd(); 
        } catch (error) {
            // Bug fix 3: Actually show the error to the user instead of just console logging
            console.error("Error saving transaction:", error);
            alert(`Firebase Error: ${error.message}`);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add {type}</h2>
                    <button className="close-btn" type="button" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="e.g. KFC, Rent, Upwork"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    
                    <label>Amount (₦)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Transaction Type</label>
                            <select value={type} onChange={(e) => {
                                setType(e.target.value);
                                setCategory(e.target.value === "income" ? "Salary" : "Food");
                            }}>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Payment Method</label>
                            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                                <option value="Bank account">Bank account</option>
                                <option value="Cash">Cash</option>
                                <option value="Credit card">Credit card</option>
                                <option value="Mobile money">Mobile money</option>
                            </select>
                        </div>
                    </div>

                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {type === "expense" ? (
                            <>
                                <option value="Food">Food & Dining</option>
                                <option value="Transport">Transport</option>
                                <option value="Rent">Rent & Utilities</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Other">Other Expense</option>
                            </>
                        ) : (
                            <>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Investment">Investment</option>
                                <option value="Gift">Gift</option>
                                <option value="Other">Other Income</option>
                            </>
                        )}
                    </select>
                    
                    <button type="submit" className="submit-btn">Save Transaction</button>
                </form>
            </div>
        </div>
    );
}

export default TransactionForm;