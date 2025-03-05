const jwt = require("jsonwebtoken");
require("dotenv").config();

class Tokenhandle {
    static generateToken(user) {
        // if (!process.env.JWT_SECRET_KEY) {
        //     throw new Error("JWT_SECRET_KEY is missing");
        // }

        return jwt.sign(
            { 
                id: user._id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
    }

    // static verifyToken(req, res, next) {
    //     const authToken = req.headers.authorization;

    //     if (!authToken) {
    //         return res.status(403).json({ status: 403, message: "Authorization token is missing" });
    //     }

    //     try {
    //         const token = authToken.split(" ")[1];
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //         req.user = decoded;
    //         next();
    //     } catch (error) {
    //         return res.status(401).json({ status: 401, message: "Invalid or expired token" });
    //     }
    // }

    // static decodeToken(token) {
    //     return jwt.decode(token);
    // }

    // static refreshToken(oldToken) {
    //     const decoded = this.decodeToken(oldToken);
    //     if (!decoded || !decoded.id || !decoded.email) {
    //         return null;
    //     }

    //     return this.generateToken({
    //         _id: decoded.id,
    //         email: decoded.email,
    //         role: decoded.role
    //     });
    // }

    static verifyToken(token){
        return jwt.verify(token,process.env.JWT_SECRET_KEY);
    }
}

module.exports = Tokenhandle;
