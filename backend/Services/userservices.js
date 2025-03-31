const User = require("../Models/user");
const mongoose = require("mongoose");

// ✅ Find User by ID using Aggregation
const findUserById = async (_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;

    const result = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(_id) } },
        { $project: { password: 0, __v: 0 } } // Excluding password and version fields
    ]);
    
    return result.length > 0 ? result[0] : null;
};

// ✅ Get All Users using Aggregation
const getAllUsers = async () => {
    return await User.aggregate([
        { $match: { role: { $in: ["user", "admin"] } } }, // ✅ Only include "user" and "admin"
        { $project: { password: 0, __v: 0 } } // ✅ Exclude password and version fields
    ]);
};


// ✅ Delete User by ID
const deleteUserById = async (_id) => {
    try {
        const user = await User.findByIdAndUpdate(
            _id,
            { isActive: false },
            { new: true } // Return the updated document
        );
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};


// ✅ Update User by ID
const updateUserById = async (_id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;
    return await User.findByIdAndUpdate(_id, updateData, { new: true, projection: { password: 0, __v: 0 } });
};

module.exports = {
    findUserById,
    getAllUsers,
    deleteUserById,
    updateUserById,
};
