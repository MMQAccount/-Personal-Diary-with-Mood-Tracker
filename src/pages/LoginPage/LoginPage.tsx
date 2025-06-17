import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ".//LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "237510@ppu.edu.ps" && password === "123456") {
      navigate("/");
    } else {
      alert("Email or password is incorrect");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome Back!</h1>
        <p>Please enter your details to login.</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <p className="signup-text">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
