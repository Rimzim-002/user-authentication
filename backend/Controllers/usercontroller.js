require("dotenv").config();
const User = require("../Models/user.js");
const bcrypt = require("bcryptjs");
const tokenhandle = require("../Utils/jwtutils.js"); 
const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js");

const signUpUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return Response.error(res, { status: 400, message: Messages.USER.ALREADY_EXISTS });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // Success response
        return Response.success(res, { status: 201, message: Messages.USER.SIGNUP_SUCCESS, data: newUser });

    } catch (error) {
        // Internal server error response
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};




const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return Response.error(res, { status: 404, message: Messages.USER.NOT_FOUND });
        }

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return Response.error(res, { status: 401, message: Messages.USER.INVALID_PASSWORD });
        }

        // ✅ Generate JWT token
        const token = tokenhandle.generateToken(user);

        // ✅ Send success response
        return Response.success(res, {
            status: 200,
            message: Messages.USER.LOGIN_SUCCESS,
            data: { user, token }
        });

    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};

module.exports = {
    signUpUser, loginUser
};
