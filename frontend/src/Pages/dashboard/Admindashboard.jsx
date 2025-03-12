import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { fetchAdminUsers } from "../../Utils/api";

function Admindashboard() {
    const navigate = useNavigate(); // ✅ Initialize navigation

    const [adminData, setAdminData] = useState({
        count: 0,
        movies: 50,
        totalRevenue: 50000
    });

    const [cursorPosition, setCursorPosition] = useState({ x: "50%", y: "50%" });

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await fetchAdminUsers(); // ✅ Call API function
                
                setAdminData({
                    count: data?.data?.count || 0,
                    movies: data?.data?.movies || 0,
                    totalRevenue: data?.data?.TotalRevenue || 0
                });

            } catch (error) {
                console.error("Error fetching admin users:", error);
            }
        };
    
        fetchdata();
    }, []);

    // Track cursor movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: `${e.clientX}px`, y: `${e.clientY}px` });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleCardClick = (type) => {
        if (type === "Total Users") {
            navigate("/admindashboard/allusers"); // ✅ Redirect to users page
        } else if (type === "Total Movies") {
            navigate("/admin/movies"); // ✅ Redirect to movies page
        } else if (type === "Total Revenue") {
            navigate("/admin/revenue"); // ✅ Redirect to revenue page
        }
    };

    return (
        <>
            <Navbar/>
            <div className="home-container">
                <h1 className="dashboard-title">Admin Dashboard</h1>

                {/* Light Effect Following Cursor */}
                <div className="cursor-light" style={{ left: cursorPosition.x, top: cursorPosition.y }}></div>

                {/* Cards Section */}
                <div className="cards-container">
                    {["Total Users", "Total Movies", "Total Revenue"].map((title, index) => {
                        const values = [adminData.count, adminData.movies, `$${adminData.totalRevenue}`];

                        return (
                            <motion.div
                                key={title}
                                className="card main-box clickable-card" // ✅ Added clickable class
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleCardClick(title)} // ✅ Click event
                                style={{ cursor: "pointer" }} // ✅ Indicate clickability
                            >
                                <h3>{title}</h3>
                                <p>{values[index]}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Admindashboard;
