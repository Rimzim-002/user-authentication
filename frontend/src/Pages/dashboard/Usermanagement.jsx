import React, { useEffect, useState } from "react";
import { fetchAdminUsers, deleteUser, updateUser } from "../../Utils/api";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaTrash, FaEdit } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import "../styles/Usermanagement.css"; // Ensure CSS file is imported

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(""); // Store the selected role separately

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetchAdminUsers();
                console.log("🛠 API Response:", data?.data?.users); // Debugging

                setUsers(
                    data?.data?.users.map(user => ({
                        userId: user._id, // ✅ Store _id as userId
                        username: user.username,
                        email: user.email,
                        role: user.role
                    })) || []
                );
            } catch (error) {
                console.error("❌ Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // ✅ Handle Delete User
    const handleDelete = async (userId) => {
        if (!userId) {
            console.error("❌ Error: userId is undefined. Check API response.");
            return;
        }

        try {
            console.log(`🗑 Deleting user with ID: ${userId}`);
            await deleteUser(userId);
            setUsers(users.filter(user => user.userId !== userId)); // ✅ Correct reference
            console.log(`✅ User with ID ${userId} deleted successfully.`);
        } catch (error) {
            console.error("❌ Error deleting user:", error);
        }
    };

    // ✅ Handle Edit Role Only
    const handleEdit = (user) => {
        setEditUser(user); // Open modal for this user
        setSelectedRole(user.role); // Pre-select the current role
    };

    // ✅ Handle Save Edit (Only Role Change)
    const handleSaveEdit = async () => {
        if (!editUser || !editUser.userId) {
            console.error("❌ Error: Missing userId or editUser data.");
            return;
        }
    
        try {
            console.log(`📤 Updating user ID: ${editUser.userId}`);
    
            // ✅ Update user in the database
            await updateUser(editUser.userId, {
                username: editUser.username,
                email: editUser.email,
                role: selectedRole
            });
    
            // ✅ Fetch the updated user list from the backend
            const updatedData = await fetchAdminUsers();
            setUsers(
                updatedData?.data?.users.map(user => ({
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                })) || []
            );
    
            setEditUser(null); // ✅ Close modal after update
            console.log(`✅ User Updated Successfully.`);
        } catch (error) {
            console.error("❌ Error updating user:", error);
        }
    };
    
    

    
    

    return (
        <>
            <Navbar />
            <div className="user-management-container">
                <h1 className="title">User Management</h1>

                {/* Users Cards Section */}
                <div className="cards-container">
                    {users.map((user, index) => (
                        <motion.div
                            key={user.userId}
                            className="card main-box"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="user-icon">
                                <FaUser size={40} />
                            </div>
                            <h3 className="user-name">
                                <FaUser className="icon" /> {user.username}
                            </h3>
                            <p className="user-email" title={user.email}>
                                <FaEnvelope className="icon email-icon" /> {user.email}
                            </p>

                            {/* Role Display */}
                            <p className="user-role"><strong>Role:</strong> {user.role}</p>

                            {/* Actions */}
                            <div className="card-actions">
                                <button className="edit-btn" onClick={() => handleEdit(user)}>
                                    <FaEdit /> Edit Role
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(user.userId)}>
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Edit Role Modal */}
                {editUser && (
                    <div className="edit-modal">
                        <div className="edit-modal-content">
                            <h3>Edit User Role</h3>
                            <label>Role:</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                            <button className="cancel-btn" onClick={() => setEditUser(null)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserManagement;
