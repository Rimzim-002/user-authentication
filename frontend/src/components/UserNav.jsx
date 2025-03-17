import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, User } from "lucide-react"; // Import icons
import brandlogo from "../Assests/brandlogo.png"; // Ensure correct path
import "../Pages/styles/usernavbar.css"; // Import custom CSS

function UserNav() {
    const navigate = useNavigate(); // ✅ Hook to redirect user

    const handleLogout = () => {
        localStorage.removeItem("token"); // ✅ Remove auth token
        localStorage.removeItem("role"); // ✅ Remove role (if stored)

        navigate("/login"); // ✅ Redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                {/* Glowing Brand Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={brandlogo} alt="brand-logo" className="brand-logo me-2" />
                </Link>

                {/* Navbar Toggle Button (for mobile) */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavItem to="/user/dashboard" icon={<Home size={18} />} text="Home" />
                        <li className="nav-item">
                            <button className="nav-link d-flex align-items-center logout-btn" onClick={handleLogout}>
                                <LogOut size={18} /> <span className="ms-2 fs-7">Logout</span>
                            </button>
                        </li>
                        <NavItem to="/profile" icon={<User size={18} />} text="Profile" />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

// Reusable Navigation Item Component
const NavItem = ({ to, icon, text }) => (
    <li className="nav-item">
        <Link className="nav-link d-flex align-items-center" to={to}>
            {icon} <span className="ms-2 fs-7">{text}</span>
        </Link>
    </li>
);

export default UserNav;
