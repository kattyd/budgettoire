import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { 
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  onSnapshot 
} from "firebase/firestore";
import { signOut } from 'firebase/auth';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Summary from './Summary';
import ChartView from './ChartView';
import './Dashboard.css';

const LOCAL_STORAGE_KEY = "naira-budget-buddy";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("all");

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
  }, (error) => {
    console.error("Error loading transactions:", error);
  });

  return () => unsubscribe(); // cleanup
}, [user]);

  const handleAddTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleDelete = async (idToDelete) => {
    const confirmed = window.confirm("are you sure you want to delete this transaction?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "transactions", idToDelete));
      setTransactions((prev) => prev.filter((t) => t.id !== idToDelete));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // 🗓️ Filter by month
  const filteredTransactions =
    monthFilter === "all"
      ? transactions
      : transactions.filter((t) => {
          if (!t.createdAt?.toDate) return false;
          const date = t.createdAt.toDate();
          return date.getMonth() === parseInt(monthFilter);
        });

    const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error("sign out error:", error);
    });
  };


  return (
    <>
      <nav className="navbar">
        <h1>budgettoire</h1>
        <ul>
          <li><a href="#">home</a></li>
          <li><a href="#">about</a></li>
          <li><button onClick={handleSignOut}>sign out</button></li>
        </ul>
      </nav>
      <div className="container">
        <h1>budgettoire</h1>
        <p>track your income, expenses, and savings easily.</p>
        {user && (
          <div className="user-info">
            <p>signed in as: <strong>{user.email}</strong></p>
          </div>
        )}
        <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
          <option value="all">all months</option>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long"})}
            </option>
          ))}
        </select>
        <div className="row">
          <div className="card summary-card">
            <Summary transactions={filteredTransactions} />
          </div>
          <div className="card form-card">
            <TransactionForm onAdd={handleAddTransaction} />
          </div>
        </div>

        <div className="row">
          <div className="card chart-card">
            <ChartView transactions={filteredTransactions} />
          </div>
          <div className="card transaction-list">
            <TransactionList transactions={filteredTransactions} onDelete={handleDelete} />
          </div>
        </div>

        <footer>
          <p>© 2025 Budgettoire. Built with 💚 in Nigeria.</p>
        </footer>
    </div>
    </>
  );
}

export default Dashboard;