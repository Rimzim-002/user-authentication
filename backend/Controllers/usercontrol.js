require("dotenv").config();
const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js");
const userservices = require("../Services/userservices.js");

// ✅ Get User 
const user = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userservices.findUserById(id);
        
        if (!user) {
            return Response.error(res, { status: 404, message: Messages.USER.USER_NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "User found", data: user });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ Get All Users (Admin)
const users= async (req, res) => {
    try {
        const users = await userservices.getAllUsers();

        if (users.length === 0) {
            return Response.error(res, { status: 404, message: Messages.USER.NO_USERS_FOUND });
        }

        return Response.success(res, { 
            status: 200, 
            message: "All users with role 'user' and 'admin'",
            data: { count: users.length, users }
        });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userservices.deleteUserById(id);

        if (!user) {
            return Response.error(res, { status: 404, message: Messages.USER.USER_NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "User deleted successfully", data: user });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ Update User
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userservices.updateUserById(id, req.body);

        if (!user) {
            return Response.error(res, { status: 404, message: Messages.USER.USER_NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "User updated successfully", data: user });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};
module.exports={
    user,users,deleteUser,updateUser
}