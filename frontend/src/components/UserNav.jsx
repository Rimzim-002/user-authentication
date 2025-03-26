import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, User, ShoppingBag } from "lucide-react"; // Import icons
import brandlogo from "../Assests/brandlogo.png"; // Ensure correct path
import "../Pages/styles/usernavbar.css"; // Import custom CSS
import { jwtDecode } from "jwt-decode";
import { APP_ROUTES } from "../Routes/routes";

function UserNav() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Retrieve token and decode username
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded,"decoded")
                setUserName(decoded.username || "User"); // Default if username is missing
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate(APP_ROUTES.LOGIN);
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                {/* Glowing Brand Logo */}
                <Link className="navbar-brand d-flex align-items-center" to={APP_ROUTES.USER_DASHBOARD}>
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
                        <NavItem to={APP_ROUTES.USER_DASHBOARD} icon={<Home size={18} />} text="Home" />
                        
                        {/* User Dropdown */}
                        <li className="nav-item dropdown">
                            <button 
                                className="nav-link dropdown-toggle d-flex align-items-center profile-btn" 
                                id="userDropdown" 
                                data-bs-toggle="dropdown"
                            >
                                <User size={18} />
                                <span className="ms-2 fs-7">{userName}</span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                <li>
                                    <Link className="dropdown-item" to={APP_ROUTES.PROFILE}>
                                        <User size={16} className="me-2" /> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={APP_ROUTES.ORDERS}>
                                        <ShoppingBag size={16} className="me-2" /> My Orders
                                    </Link>
                                </li>
                                <li>
                                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                        <LogOut size={16} className="me-2" /> Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
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
