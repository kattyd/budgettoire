import React, { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Navbar from "../components/Navbar";
import coin from "../assets/coin.svg";
import goog from "../assets/goog.png";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
            });

            // Create Firestore user document
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: user.email,
                provider: "password",
                createdAt: new Date()
            });

            navigate("/dashboard");

        } catch (err) {
            alert(err.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            // Only create Firestore doc if it doesn't exist
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    provider: "google",
                    createdAt: new Date()
                });
            }

            navigate("/dashboard");

        } catch (err) {
            alert("Google signup failed");
        }
    };

    return (
        <>
            <Navbar 
                hideLinks={true} 
                authMode="text" 
                customText="track money, better future" 
            />
            <div className={styles.signUpWrapper}>
                <form className={styles.form} onSubmit={handleSignup}>
                    <img src={coin} alt="signup illustration" className={styles.illustration} />
                    <h2>Welcome to <word>budgettoire</word></h2>
                    <label>Full Name</label>
                    <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit" className={styles.sign}>Sign up</button>
                    <button type="button" className={styles.google} onClick={handleGoogleSignup}><img src={goog} alt="Google logo" className={styles.googleLogo} /> Continue with Google</button>
                    <p>
                        Already have an account? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Signup;