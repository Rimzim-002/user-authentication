import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

function Signup() {
  const navigate = useNavigate();
  // use the UseState here for  the require feilds 
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: ""
  })
  // geting the input from the inputs
  const handlechange = async (e) => {
    try{
      const { name, value } = e.target
    setFormdata((prevdata) => ({
      ...prevdata, [name]: value
    }))
    console.log(`${name}:`, value)
  }catch(error){
    console.log(error)
  }

  }
    // submited the form 
  const submitHandler = async (e) => {
    e.preventDefault(); 
    try {
    //   alert(" Data submitted successfuly")
     console.log(" Data submitted successfully", formdata)
   await axios.post(`http://localhost:5000/api/users/signup`,formdata)
  .then(function(response){
    console.log(response)
  })


       setFormdata({
        username:'',
        email:'',
        password:''
       })
    } catch (err) {
      console.log("error",err)
    }

  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" name="username" value={formdata.username} onChange={handlechange} id="exampleInputName" />

            <label htmlFor="exampleInputEmail1" className="form-label mt-3">Email address</label>
            <input type="email" className="form-control" name="email" value={formdata.email} onChange={handlechange} id="exampleInputEmail1" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={formdata.password} onChange={handlechange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>

          <div className="text-center mt-3">
            <p className="mb-0">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
