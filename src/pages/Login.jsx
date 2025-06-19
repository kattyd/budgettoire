import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            alert("who are you ho?");
        }
    };
    return (
        <>
            <Navbar />
            <div className={styles.loginWrapper}>
                <form className={styles.form} onSubmit={handleLogin}>
                    <h2>welcome back ho!</h2>
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">login</button>
                    <p>
                        don't have an account? <a href="/signup">sign up here</a>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;