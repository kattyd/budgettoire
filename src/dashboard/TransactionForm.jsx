import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase";

const TransactionForm = ({ onAdd }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        const user = auth.currentUser;
        if(!user) {
            console.error("no user logged in");
            return;
        }

        const newTransaction = {
            description,
            amount: type === "expense" ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
            type,
            userId: user.uid,
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, "transactions"), newTransaction);
            onAdd({ ...newTransaction, createdAt: new Date() });
            setDescription("");
            setAmount("");
            setType("expense");
        } catch (error) {
            console.error("error saving transaction", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card">
            <input
                type="text"
                placeholder="description (e.g. salary, rent)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="amount (₦)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">income</option>
                <option value="expense">expense</option>
            </select>
            <button type="submit">add transaction</button>
        </form>
    );
}

export default TransactionForm;