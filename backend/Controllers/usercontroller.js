require("dotenv").config();
const User = require("../Models/user.js");
const bcrypt = require("bcryptjs");
const tokenhandle = require("../Utils/jwtutils.js");
const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js");

// AUTH CONTROLLER
const signUpUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists (case-insensitive)
        const isUserExist = await User.findOne({ email: email.toLowerCase() });
        if (isUserExist) {
            return Response.error(res, { status: 400, message: Messages.USER.ALREADY_EXISTS });
        }

        // Hash password with increased salt rounds
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        return Response.success(res, { status: 201, message: Messages.USER.SIGNUP_SUCCESS, data: newUser });

    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return Response.error(res, { status: 404, message: "Email already exist" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return Response.error(res, { status: 401, message: Messages.USER.INVALID_PASSWORD });
        }

        // Generate token without password
        const token = tokenhandle.generateToken({ id: user._id, email: user.email, role: user.role });

        return Response.success(res, {
            status: 200,
            message: Messages.USER.LOGIN_SUCCESS,
            data: { user: { id: user._id, username: user.username, email: user.email ,role: user.role}, token }
        });

    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};

// USER CONTROLLER
const allUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude passwords from results

        if (users.length === 0) {
            return Response.error(res, { status: 404, message: Messages.USER.NO_USERS_FOUND });
        }

        return Response.success(res, { status: 200, message: "All users", data: users });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};

// ADMIN
const getUserById = async (req, res) => {
    try {
        const { _id } = req.params;
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
        const users = await User.find({}, "-password"); // Exclude passwords from results

        if (users.length === 0) {
            return Response.error(res, { status: 404, message: Messages.USER.NO_USERS_FOUND });
        }

        return Response.success(res, { status: 200, message: "All users", data: users });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};
module.exports = {
    signUpUser,
    loginUser,
    allUsers,
    getUserById,
    allUsersadmin
};
