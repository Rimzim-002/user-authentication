import React from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion"; // Import animation library
import { useEffect } from "react";
import axios from "axios";
// Sample users data
// const users = [
//     { id: 1, name: "John Doe", email: "john@example.com" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com" },
//     { id: 3, name: "Michael Brown", email: "michael@example.com" },
//     { id: 4, name: "Emily Johnson", email: "emily@example.com" },
// ];

function Userdashboard() {
    
    const token = localStorage.getItem("authToken");
    
    // useEffect(() => {
    //     const fetchAdminUsers = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/admin/adminusers", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`, 
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    
    //             console.log(JSON.stringify(response.data, null, 2)); // Pretty-print response
    //         } catch (error) {
    //             console.error("Error fetching admin users:", error);
    //         }
    //     };
    
    //     fetchAdminUsers();
    // }, []);
    
    return (
        <>
            <Navbar />
            <div className="home-container">
                <h1>Welcome to Home  User Dash Board</h1>
                {/* <div className="users-container">
                    {users.map((user, index) => (
                        <motion.div
                            key={user.id}
                            className="user-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.1 }} // Enlarge on hover
                            whileTap={{ scale: 0.9 }} // Press down on click
                            transition={{ duration: 0.3, delay: index * 0.2 }} // Staggered effect
                        >
                            <h3>{user.count}</h3>
                            <p>{user.email}</p>
                        </motion.div>
                    ))}
                </div> */}
            </div>
        </>
    );
}

export default  Userdashboard() 
