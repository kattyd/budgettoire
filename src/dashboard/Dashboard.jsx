import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, orderBy, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import StatCard from '../components/StatCard';
import Action from '../components/Action';
import ChartView from './ChartView';
import { FaWallet, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("all");
  
  // NEW: State to control the modal visibility and transaction type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");

  // NEW: Functions to open and close the modal
  const openModal = (type) => {
      setTransactionType(type);
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
    });
    return () => unsubscribe();
  }, [user]);

  const handleAddTransaction = (transaction) => {
    // We no longer need to manually update state here because onSnapshot handles it!
    toast.success("Transaction added!");
    closeModal(); // Close the modal after a successful addition
  };

  const handleDelete = async (idToDelete) => {
    const confirmed = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "transactions", idToDelete));
      toast.success("Transaction deleted!");
    } catch (error) {
      toast.error("Error deleting transaction");
    }
  };

  const filteredTransactions = monthFilter === "all"
    ? transactions
    : transactions.filter((t) => {
        if (!t.createdAt?.toDate) return false;
        const date = t.createdAt.toDate();
        return date.getMonth() === parseInt(monthFilter);
      });

  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0);    
  const balance = totalIncome - totalExpenses;

  return (
    <>
      <Navbar hideLinks={true} authMode="profile" user={user} />
      <div className="container">
        <div className="greeting">
          <h1>Hello, {user?.displayName || "Pookie"}!</h1>
          {/* <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
            <option value="all">All months</option>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long"})}
              </option>
            ))}
          </select> */}
        </div>
        
        <div className="row stats-row">
          <StatCard title="Balance" amount={balance}  positive={balance >= 0} isBalance={true}/>
          <StatCard title="Income" amount={totalIncome}  positive />
          <StatCard title="Expenses" amount={totalExpenses} positive={false} />
        </div>
        
        {/* Pass the openModal function to your Action component */}
        <Action onActionClick={openModal} />

        <div className="row-2">
          <div className="chart-card">
            <ChartView transactions={filteredTransactions} />
          </div>
          <div className="transactions-card">
            <TransactionList transactions={filteredTransactions} onDelete={handleDelete} />
          </div>
        </div>
      </div>

      {/* NEW: Render the modal conditionally based on isModalOpen */}
      {isModalOpen && (
        <TransactionForm 
            onAdd={handleAddTransaction} 
            onClose={closeModal} 
            initialType={transactionType} 
        />
      )}
    </>
  );
}

export default Dashboard;