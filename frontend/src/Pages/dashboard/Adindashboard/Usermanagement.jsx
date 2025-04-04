import React, { useEffect, useState } from "react";
import { fetchAdminUsers, deleteUser, updateUser } from "../../../Services/adminservices";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaTrash, FaEdit } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import { ClipLoader } from "react-spinners"; // ✅ Import Loader
import { toast, Toaster } from "react-hot-toast"; // ✅ Import Toast
import "../../styles/Usermanagement.css"; 

function UserManagement() {
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [loading, setLoading] = useState(true); // ✅ State for Loader

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true); // ✅ Start loader
        try {
            const data = await fetchAdminUsers();
            console.log("🛠 API Response:", data?.users);

            const active = data?.users?.filter(user => user.isActive !== false) || [];
            const inactive = data?.users?.filter(user => user.isActive === false) || [];

            setActiveUsers(active);
            setInactiveUsers(inactive);
        } catch (error) {
            toast.error(" Failed to fetch users.");
            console.error(" Error fetching users:", error);
        } finally {
            setLoading(false); // ✅ Stop loader
        }
    };

    // ✅ Handle Move to Inactive (Instead of Delete)
    const handleMoveToInactive = async (userId) => {
        if (!userId) return console.error(" Error: userId is undefined.");

        try {
            console.log(`🗑 Moving user ID: ${userId} to inactive.`);
            await deleteUser(userId);
            
            toast.success(" User marked as Inactive."); // ✅ Toast Message

            fetchUsers(); // Refresh list
        } catch (error) {
            toast.error(" Error marking user inactive.");
            console.error(" Error moving user to inactive:", error);
        }
    };

    // ✅ Handle Edit Role
    const handleEdit = (user) => {
        setEditUser(user);
        setSelectedRole(user.role);
    };

    // ✅ Handle Save Edit
    const handleSaveEdit = async () => {
        if (!editUser || !editUser._id) return console.error(" Error: Missing userId or editUser data.");

        try {
            console.log(` Updating user ID: ${editUser._id}`);

            await updateUser(editUser._id, { role: selectedRole });

            setEditUser(null);
            toast.success(" User role updated successfully."); // ✅ Toast Message

            fetchUsers(); // Refresh list
        } catch (error) {
            toast.error(" Error updating user role.");
            console.error(" Error updating user:", error);
        }
    };

    return (
        <>
            <Navbar />
            <Toaster position="top-right" /> {/* ✅ Ensure Toaster is included */}

            <div className="user-management-container">
                <h1 className="title">User Management</h1>

                {/* ✅ Show Loader while fetching data */}
                {loading ? (
                    <div className="loader-container">
                        <ClipLoader size={50} color="#007bff" />
                        <p>Loading Users...</p>
                    </div>
                ) : (
                    <>
                        {/* Active Users Section */}
                        <h2 className="section-title">Active Users</h2>
                        <div className="cards-container">
                            {activeUsers.length > 0 ? (
                                activeUsers.map((user, index) => (
                                    <motion.div
                                        key={user._id}
                                        className="card main-box active"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="user-icon">
                                            <FaUser size={40} />
                                        </div>
                                        <h3 className="user-name">{user.username}</h3>
                                        <p className="user-email">
                                            <FaEnvelope className="icon email-icon" /> {user.email}
                                        </p>
                                        <p className="user-role"><strong>Role:</strong> {user.role}</p>

                                        <div className="card-actions">
                                            <button className="edit-btn" onClick={() => handleEdit(user)}>
                                                <FaEdit /> Edit Role
                                            </button>
                                            <button className="delete-btn" onClick={() => handleMoveToInactive(user._id)}>
                                                <FaTrash /> Mark Inactive
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="no-users">No Active Users</p>
                            )}
                        </div>

                        {/* Inactive Users Section */}
                        <h2 className="section-title">Inactive Users</h2>
                        <div className="cards-container">
                            {inactiveUsers.length > 0 ? (
                                inactiveUsers.map((user, index) => (
                                    <motion.div
                                        key={user._id}
                                        className="card main-box inactive"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="user-icon">
                                            <FaUser size={40} />
                                        </div>
                                        <h3 className="user-name">{user.username}</h3>
                                        <p className="user-email">
                                            <FaEnvelope className="icon email-icon" /> {user.email}
                                        </p>
                                        <p className="user-role"><strong>Role:</strong> {user.role}</p>
                                        <p className="user-inactive-status"><strong>Status:</strong> Inactive</p>

                                        <div className="card-actions">
                                           
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="no-users">No Inactive Users</p>
                            )}
                        </div>

                        {/* Edit Role Modal */}
                        {editUser && (
                            <div className="edit-modal">
                                <div className="edit-modal-content">
                                    <h3>Edit User Role</h3>
                                    <label>Role:</label>
                                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                                    <button className="cancel-btn" onClick={() => setEditUser(null)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default UserManagement;
