import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { motion } from "framer-motion";
import { fetchAdminUsers, getAllMovies } from "../../../Services/adminservices";
import { Users, Film, DollarSign } from "lucide-react";
import { APP_ROUTES } from "../../../Routes/routes";

function Admindashboard() {
    const navigate = useNavigate();

    const [adminData, setAdminData] = useState({
        count: 0,
        movies: 0,
        totalRevenue: 0, // ✅ Default is 0
    });

    const [cursorPosition, setCursorPosition] = useState({ x: "50%", y: "50%" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchAdminUsers();
                const moviesData = await getAllMovies();

                // ✅ Calculate total revenue from all movies
                const totalRevenue = moviesData?.movies?.reduce((acc, movie) => acc + (movie.pricing?.totalRevenue || 0), 0);

                setAdminData({
                    count: userData?.data?.count || 0,
                    movies: moviesData?.movies?.length || 0, // ✅ Ensure correct count
                    totalRevenue: totalRevenue || 0, // ✅ Store total revenue
                });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
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
            navigate(APP_ROUTES.ADMIN_USERS);
        } else if (type === "Total Movies") {
            navigate(APP_ROUTES.ADMIN_MOVIES);
        } else if (type === "Total Revenue") {
            navigate(APP_ROUTES.ADMIN_TOTAL_REVENUE);
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
                        { title: "Total Revenue", value: `₹${adminData.totalRevenue.toLocaleString()}`, icon: <DollarSign size={30} /> }
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
                            <div className="card-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p className="fs-6">{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Admindashboard;
