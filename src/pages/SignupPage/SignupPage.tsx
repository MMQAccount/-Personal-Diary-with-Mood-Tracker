import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    alert("Account created successfully! Please login.");
  };

  return (
    <div className="signup-container">
      <h1>Create Account</h1>
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <p className="login-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
