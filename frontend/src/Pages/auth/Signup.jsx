import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { signupUser } from "../../Services/authservices";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "../styles/signuo.css";
import { APP_ROUTES } from "../../Routes/routes";

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

  const usernameRegex = /^(?!.*  )[A-Z][a-z]+( [A-Z][a-z]+)?$/; // Enforce proper capitalization & single space
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // Only lowercase letters allowed in email
  const passwordRegex = /^(?!.*password)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

  const validateField = (name, value) => {
    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage = "Username must start with a capital letter(Ram Sharma)";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Email must contain only lowercase letters.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must be 8+ characters, including uppercase, lowercase, number, and special character.";
    }
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  };

  const isFormValid = Object.values(errors).every((err) => !err) && Object.values(formdata).every((field) => field);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      await signupUser(formdata);
      toast.success("Signup successful!");
      setTimeout(() => navigate(APP_ROUTES.LOGIN), 2000);
      setFormdata({ username: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Toaster position="top-right" />
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" name="username" value={formdata.username} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your name" />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>
          <div className="input-group">
            <label>Email address</label>
            <input type="email" name="email" value={formdata.email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your email" />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={formdata.password} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password" />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <button type="submit" className="signup-btn" disabled={!isFormValid || loading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
          </button>
          <div className="login-link">
            <p>Already have an account? <Link to={APP_ROUTES.LOGIN}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
