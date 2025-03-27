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
const users = async (req, res) => {
    try {
        const usersByStatus = await userservices.getAllUsers();

        if (usersByStatus.length === 0) {
            return Response.error(res, { status: 404, message: Messages.USER.NO_USERS_FOUND });
        }

        return Response.success(res, {
            status: 200,
            message: "Users categorized by active and inactive status",
            data: { count: usersByStatus.length, users: usersByStatus }
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

        return Response.success(res, { status: 200, message: "User deactivated successfully", data: user });
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