import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // ✅ Corrected import
import Signup from '../src/Pages/auth/Signup';
import Login from '../src/Pages/auth/Login';

function App() {
  return (
    <Router>  
      <Routes>
      <Route path="/" element={<Signup />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
