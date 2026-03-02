import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import login from "../assets/login.svg";
import goog from "../assets/goog.png";
import app from "../assets/app.png";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            alert("who are you ho?");
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
            navigate("/dashboard");
        } catch (err) {
            alert("Google login failed");
        }
    }
    return (
        <>
            <Navbar 
                hideLinks={true} 
                authMode="text" 
                customText="track money, better future" 
            />
            <div className={styles.loginWrapper}>
                <img src={login} alt="login illustration" className={styles.illustration} />
                <form className={styles.form} onSubmit={handleLogin}>
                    <h2>Nice to see you again</h2>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.optionsRow}>
                        <div className={styles.fir}>
                            <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <span className={styles.slider}></span>
                            </label>

                            <span className={styles.rememberText}>Remember me</span>
                        </div>

                        <a href="/forgot" className={styles.forgot}>
                        Forgot password?
                        </a>
                    </div>
                    <button type="submit" className={styles.log}>Log in</button>
                    <button type="button" className={styles.google} onClick={handleGoogleLogin}><img src={goog} alt="Google logo" className={styles.googleLogo} /> Continue with Google</button>
                    {/* <button type="button" className={styles.apple}><img src={app} alt="Apple logo" className={styles.appleLogo} /> Continue with Apple</button> */}
                    <p>
                        Don't have an account? <a href="/signup">Sign up now</a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;