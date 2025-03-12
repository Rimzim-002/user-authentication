import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Utils/api";

function Login() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formdata);
      console.log("Full response:", response);
      if (response?.data?.token) {
        const token = response.data.token;
        const user = response.data.user;
      
        console.log("User data:", user, token);
      
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", user.role);
      
        console.log("Token saved successfully:", token);
        console.log("User role:", user.role);
      
        navigate("/admindashboard");
      } else {
        console.log("No token received in response:", response.data);
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data.data : err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={submitHandle}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="signup-link">
            <p>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
