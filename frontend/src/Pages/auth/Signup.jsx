import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../Services/authservices"; 
import "../styles/signuo.css";
import { APP_ROUTES } from "../../Routes/routes"; // ✅ Import centralized routes

function Signup() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Regex Validation
  const usernameRegex = /^[A-Za-z]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));

    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage = "Username must be at least 3 letters long.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setServerError(""); // Clear server error when user types
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Prevent submission if there are errors
    if (Object.values(errors).some((err) => err) || Object.values(formdata).some((field) => !field)) {
      setServerError("Please correct the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      await signupUser(formdata);
      setFormdata({ username: "", email: "", password: "" });
      navigate(APP_ROUTES.LOGIN);
    } catch (err) {
      setServerError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        {serverError && <p className="text-danger">{serverError}</p>}
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>

          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="login-link">
            <p>
              Already have an account? <Link to={APP_ROUTES.LOGIN}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
