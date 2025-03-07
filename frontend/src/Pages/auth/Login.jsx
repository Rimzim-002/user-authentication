import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
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
    console.log(formdata, "data");
  };

  const submitHandle = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formdata);
      console.log(response);
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <form onSubmit={submitHandle}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label mt-3">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={formdata.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>

          <div className="text-center mt-3">
            <p className="mb-0">
              Don't have an account? <Link to="/">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
