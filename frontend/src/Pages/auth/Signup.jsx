import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../Utils/api";
// import "../auth/Signup.css"; // Import the same CSS file for consistent theming

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

  // Updated Regex Patterns
  const usernameRegex = /^[A-Za-z]{3,}$/; // Only letters, min 3 characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Min 8 chars, 1 uppercase, 1 lowercase, 1 number

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate Input
    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage = "Username must contain only letters and be at least 3 characters long.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Handle Form Submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Final Validation Check Before Sending Data
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
    <div className="signup-container theme-bg">
      <div className="card p-4 shadow-lg theme-card" style={{ width: "350px" }}>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label text-light">Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              id="exampleInputName"
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}

            <label htmlFor="exampleInputEmail1" className="form-label mt-3 text-light">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              id="exampleInputEmail1"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              id="exampleInputPassword1"
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>

          <div className="text-center mt-3">
            <p className="mb-0 text-light">Already have an account? <Link to="/login" className="text-light">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
