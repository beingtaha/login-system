import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return {
      isValid:
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar &&
        isLongEnough,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate each field
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = "Password does not meet requirements";
      }
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Please select gender";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix all errors before submitting");
      return;
    }

    // Success
    toast.success("Account created successfully! Redirecting to login...");

    // Store user data
    localStorage.setItem("user", JSON.stringify(formData));

    // Redirect after delay
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="signup-container">
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

      <div className="card signup-card">
        <h2 className="title">Create Account 🚀</h2>
        <p className="subtitle">Join us today!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <div className="field-error">{errors.username}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create strong password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />

            <div className="password-requirements">
              <h4>Password must contain:</h4>
              <div
                className={
                  passwordValidation.hasUpperCase ? "valid" : "invalid"
                }
              >
                {passwordValidation.hasUpperCase ? "✅" : "❌"} At least one
                uppercase letter
              </div>
              <div
                className={
                  passwordValidation.hasLowerCase ? "valid" : "invalid"
                }
              >
                {passwordValidation.hasLowerCase ? "✅" : "❌"} At least one
                lowercase letter
              </div>
              <div
                className={passwordValidation.hasNumbers ? "valid" : "invalid"}
              >
                {passwordValidation.hasNumbers ? "✅" : "❌"} At least one
                number
              </div>
              <div
                className={
                  passwordValidation.hasSpecialChar ? "valid" : "invalid"
                }
              >
                {passwordValidation.hasSpecialChar ? "✅" : "❌"} At least one
                special character
              </div>
              <div
                className={
                  passwordValidation.isLongEnough ? "valid" : "invalid"
                }
              >
                {passwordValidation.isLongEnough ? "✅" : "❌"} Minimum 8
                characters
              </div>
            </div>
            {errors.password && (
              <div className="field-error">{errors.password}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && <div className="field-error">{errors.phone}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? "error" : ""}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <div className="field-error">{errors.gender}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Create Account
          </button>

          <div className="links">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
