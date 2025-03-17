import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../Utils/api";
import "../styles/signuo.css"; // Import the updated CSS

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

  // Regex Validation
  const usernameRegex = /^[A-Za-z]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage = "Username must be at least 3 characters long.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must be at least 8 characters with uppercase, lowercase, and a number.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!usernameRegex.test(formdata.username) || !emailRegex.test(formdata.email) || !passwordRegex.test(formdata.password)) {
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      console.log("Data submitted successfully", formdata);
      await signupUser(formdata);
      setFormdata({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
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

          <button type="submit" className="signup-btn">Sign Up</button>

          <div className="login-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
