require("dotenv").config();
const User = require("../Models/user.js");

const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js")


// ADMIN
const getUserById = async (req, res) => {
    try {
        const {_id} = req.params;
        const user = await User.findById(_id)

        if (!user) {
            return Response.error(res, { status: 404, message: Messages.USER.NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "User found", data: user });

    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};
const allUsersadmin = async (req, res) => {
    try {
        // Fetch users with role "user" or "admin"
        const users = await User.find({ role: { $in: ["user", "admin"] } });

        if (users.length === 0) {
            return Response.error(res, { status: 404, message: Messages.USER.NO_USERS_FOUND });
        }

        return Response.success(res, { 
            status: 200, 
            message: "All users with role 'user' and 'admin'", 
            data: { 
                count: users.length, // Add user count
                users: users,
                movies: 50,
                totalRevenue: 50000
            } 
        });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};


const deleteUserById = async (req, res) => {
    try {
        const { _id } = req.params;
        
        // Find and delete user
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User Deleted Successfully", data: user });

    } catch (error) {
        console.error("Delete user error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
const updateUserById = async (req, res) => {
    try {
        const { _id } = req.params; 
        const { role, ...updateData } = req.body;

        if (role && !["user", "admin"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role provided" });
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { ...updateData, ...(role && { role }) },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User Updated Successfully", data: user });

    } catch (error) {
        console.error("❌ Update user error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};




module.exports = {
   
    allUsersadmin,getUserById,deleteUserById,updateUserById
};
