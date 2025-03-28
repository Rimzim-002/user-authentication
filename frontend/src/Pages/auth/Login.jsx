import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { loginUser } from "../../Services/authservices";
import { APP_ROUTES } from "../../Routes/routes";
import { ClipLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Validation Rules
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; // At least 6 chars, 1 letter & 1 number

  const validateField = (name, value) => {
    let errorMessage = "";
    if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must be at least 6 characters long and include a letter and a number.";
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

  const submitHandle = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fix the errors before logging in.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(formdata);
      if (response?.data?.token) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", user.role);
        toast.success("Login successful!");

        setTimeout(() => {
          navigate(user.role === "superadmin" ? APP_ROUTES.ADMIN_DASHBOARD : APP_ROUTES.USER_DASHBOARD);
        }, 1500);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      const errorResponse = err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Toaster position="top-right" />
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
              onBlur={handleBlur}
              required
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
              onBlur={handleBlur}
              required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <button type="submit" className="login-btn" disabled={!isFormValid || loading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}
          </button>

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
