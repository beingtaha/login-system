import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (simulated)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    localStorage.removeItem("user");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome, {user.username}! 👋</h1>
            <p className="dashboard-subtitle">Your Account Dashboard</p>
          </div>
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
        <div className="welcome-message">
          <p className="welcome-text">
            🎉 Welcome to our platform! Explore all features and enjoy your
            experience.
          </p>
          <p className="demo-note">
            This is a demo dashboard. Connect with backend for real
            functionality.
          </p>
        </div>
        <br />
        {/* User Info Card */}
        <div className="info-card">
          <h3>📋 Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">{user.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{user.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender:</span>
              <span className="info-value">
                {user.gender || "Not specified"}
              </span>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="actions-section">
          <h3>⚡ Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">✏️</span>
              Edit Profile
            </button>
            <button className="action-btn">
              <span className="action-icon">🔑</span>
              Change Password
            </button>
            <button className="action-btn">
              <span className="action-icon">📧</span>
              Verify Email
            </button>
            <button className="action-btn">
              <span className="action-icon">📄</span>
              View Documents
            </button>
          </div>
        </div>
        {/* Footer Note */}
      </div>
    </div>
  );
};

export default Dashboard;
