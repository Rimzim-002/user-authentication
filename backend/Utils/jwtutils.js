const jwt = require("jsonwebtoken");
require("dotenv").config();

class Tokenhandle {
    static generateToken(user) {
        return jwt.sign(
            { 
                id: user._id.toString(),  // ✅ Ensure `_id` is stored as a string
                email: user.email, 
                role: user.role ,
                username: user.username,  
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
}

module.exports = Tokenhandle;
