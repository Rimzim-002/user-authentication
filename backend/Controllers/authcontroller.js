require("dotenv").config();
const bcrypt = require("bcryptjs");
const tokenhandle = require("../Utils/jwtutils.js");
const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js");
const authServices = require("../Services/authservices.js");

// ✅ SIGN UP
const signUpUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // ✅ Validate required fields
        if (!email || !username || !password) {
            return Response.error(res, { status: 400, message: Messages.VALIDATION.REQUIRED_FIELDS });
        }

        // ✅ Check if user already exists
        const isUserExist = await authServices.findUserByEmail(email.toLowerCase());
        if (isUserExist) {
            if (!existingUser.isActive) {
                return Response.error(res, { status: 400, message: Messages.AUTH.ACCOUNT_INACTIVE });

              }
            return Response.error(res, { status: 400, message: Messages.USER.USER_ALREADY_EXISTS });
        }

        // ✅ Hash password securely
        const hashedPassword = await bcrypt.hash(password, 12);

        // ✅ Create new user
        const newUser = await authServices.createUser(username, email.toLowerCase(), hashedPassword);

        return Response.success(res, { status: 201, message: Messages.USER.SIGNUP_SUCCESS, data: newUser });

    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Validate required fields
        if (!email || !password) {
            return Response.error(res, { status: 400, message: Messages.VALIDATION.REQUIRED_FIELDS });
        }

        // ✅ Find user by email
        const user = await authServices.findUserByEmail(email.toLowerCase());
        if (!user) {
            return Response.error(res, { status: 404, message: Messages.USER.USER_NOT_FOUND });
        }
        if (!user.isActive) {
            return Response.error(res, { status: 403, message:Messages.AUTH.ACCOUNT_INACTIVE });
        }
        // ✅ Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return Response.error(res, { status: 401, message: Messages.USER.PASSWORD_INCORRECT });
        }

        // ✅ Generate JWT Token
        const token = tokenhandle.generateToken(user);

        return Response.success(res, {
            status: 200,
            message: Messages.USER.LOGIN_SUCCESS,
            data: { 
                user: { 
                    id: user._id,
                    username: user.username, 
                    email: user.email,
                    role: user.role
                }, 
                token
            }
        });

    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};


// USER CONTROLLER

module.exports = {
    signUpUser,
    loginUser,
   
};
