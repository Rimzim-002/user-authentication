import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { fetchAdminUsers, getAllMovies } from "../../Utils/api";
import { Users, Film, DollarSign } from "lucide-react"; // ✅ Import icons

function Admindashboard() {
    const navigate = useNavigate(); // ✅ Initialize navigation

    const [adminData, setAdminData] = useState({
        count: 0,
        movies: 0,
        totalRevenue: 50000
    });

    const [cursorPosition, setCursorPosition] = useState({ x: "50%", y: "50%" });

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await fetchAdminUsers();
                const moviesdata = await getAllMovies();

                setAdminData({
                    count: data?.data?.count || 0,
                    movies: moviesdata?.count || 0, // ✅ Fixed movies count
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
            navigate("/admindashboard/allusers");
        } else if (type === "Total Movies") {
            navigate("/admindashboard/allmovies");
        } else if (type === "Total Revenue") {
            navigate("/admin/revenue");
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
                    {[
                        { title: "Total Users", value: adminData.count, icon: <Users size={30} /> },
                        { title: "Total Movies", value: adminData.movies, icon: <Film size={30} /> },
                        { title: "Total Revenue", value: `$${adminData.totalRevenue}`, icon: <DollarSign size={30} /> }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            className="card main-box clickable-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleCardClick(item.title)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-icon">{item.icon}</div> {/* ✅ Icon Added */}
                            <h3>{item.title}</h3>
                            <p>{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Admindashboard;
