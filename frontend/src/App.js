import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./Pages/dashboard/Homepage";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Admindashboard from "./Pages/dashboard/Admindashboard";
import UserManagement from "./Pages/dashboard/Usermanagement";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/admindashboard/allusers" element={<UserManagement />} />



        <Route/>

        
      </Routes>
    </Router>
  );
}

export default App;
