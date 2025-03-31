const User = require("../Models/user");

// ✅ Find user by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email: email.toLowerCase() }).select("+password");
};


// ✅ Create a new user
const createUser = async (username, email, hashedPassword) => {
    return await User.create({ 
        username, 
        email: email.toLowerCase(), 
        password: hashedPassword 
    });
};

module.exports = { findUserByEmail, createUser };
