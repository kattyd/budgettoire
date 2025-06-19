import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.signUpWrapper}>
                <form className={styles.form} onSubmit={handleSignup}>
                    <h2>create your account</h2>
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">sign up</button>
                    <p>
                        already have an account? <a href="/login">log in</a>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Signup;