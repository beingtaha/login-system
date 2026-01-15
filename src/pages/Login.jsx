import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Mock users database (Replace with backend API)
  const mockUsers = [
    { email: "user@example.com", password: "Test@123", username: "DemoUser" },
    { email: "admin@example.com", password: "Admin@123", username: "Admin" },
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Case 1: Empty fields
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    // Case 2: Invalid email format
    if (email.includes("@") && !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Get ALL users from localStorage (demo + signed up)
    const demoUsers = [
      { email: "user@example.com", password: "Test@123", username: "DemoUser" },
      { email: "admin@example.com", password: "Admin@123", username: "Admin" },
    ];

    // Get signed up users from localStorage
    const storedUser = localStorage.getItem("user");
    const signedUpUsers = storedUser ? [JSON.parse(storedUser)] : [];

    // Combine demo users and signed up users
    const allUsers = [...demoUsers, ...signedUpUsers];

    // Case 3: Check if user exists
    const userExists = allUsers.find(
      (user) => user.email === email || user.username === email
    );

    if (!userExists) {
      toast.error("User not found. Please sign up first.");
      return;
    }

    // Case 4: Check password
    if (userExists.password !== password) {
      toast.error("Incorrect password. Please try again.");
      return;
    }

    // Case 5: Success
    toast.success("Login successful! Redirecting...");

    // Set current logged in user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: userExists.username,
        email: userExists.email,
      })
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="login-container">
      {/* Toast Notifications Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "16px",
            padding: "16px 24px",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#4CAF50",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4757",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="card login-card">
        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email or Username</label>
            <input
              type="text"
              id="email"
              placeholder="Enter email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-hint">
              💡 Demo: user@example.com / Test@123
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>

          <div className="links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
