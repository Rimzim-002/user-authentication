import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { loginUser } from "../../Services/authservices";
import { APP_ROUTES } from "../../Routes/routes";

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
      if (response?.data?.token) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", user.role);
        toast.success("Login successful!");

        navigate(user.role === "superadmin" ? APP_ROUTES.ADMIN_DASHBOARD : APP_ROUTES.USER_DASHBOARD);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      const errorResponse = err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorResponse);
    }
  };

  return (
    <div className="login-container">
      <Toaster />
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
              Don't have an account? <Link to="/">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
