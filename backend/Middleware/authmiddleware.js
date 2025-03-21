const Messages = require("../Utils/messages.js");
const response = require("../Utils/apiResponse.js");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        
        if (!authToken) {
            return response.error(res, { status: 403, message: Messages.AUTH.TOKEN_MISSING });
        }

        const token = authToken.split(" ")[1];

        if (!process.env.JWT_SECRET_KEY) {
            return response.error(res, { status: 500, message: "JWT_SECRET_KEY is missing in environment variables" });
        }

        // ✅ Decode Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log("Decoded Token:", decoded); // ✅ Debugging

        if (!decoded.id) {
            return response.error(res, { status: 401, message: "Invalid token: User ID is missing" });
        }

        // ✅ Fetch User from Database
        const user = await User.findById(decoded.id).select("-password");
        console.log("User from DB:", user); // ✅ Debugging

        if (!user) {
            return response.error(res, { status: 401, message: "Unauthorized: User not found in database" });
        }

        req.user = user; // ✅ Attach user to `req.user`
        next();

    } catch (error) {
        return response.error(res, { status: 401, message: Messages.AUTH.TOKEN_INVALID, error: error.message });
    }
};

module.exports = authMiddleware;
    