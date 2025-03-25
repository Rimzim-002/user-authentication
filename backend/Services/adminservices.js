const User = require("../Models/user.js");
const Movies = require("../Models/movies.js");
const mongoose = require("mongoose");
const fs = require("fs");

// ✅ Fetch a user by ID (Admin)
const findUserById = async (_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error("Invalid User ID");
    }
    const user = await User.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(_id) } }]);
    return user.length ? user[0] : null;
};

// ✅ Fetch all users (only users & admins)
const getAllUsers = async () => {
    return await User.find({ role: { $in: ["user", "admin"] } });
};

// ✅ Delete a user by ID
const deleteUserById = async (_id) => {
    return await User.findByIdAndDelete(_id);
};

// ✅ Update a user by ID
const updateUserById = async (_id, updateData) => {
    return await User.findByIdAndUpdate(_id, updateData, { new: true });
};

// ✅ Fetch all movies
const getAllMovies = async () => {
    return await Movies.find();
};

// ✅ Fetch a single movie by ID
const findMovieById = async (_id) => {
    return await Movies.findById(_id);
};

// ✅ Delete a movie by ID
const deleteMovieById = async (_id) => {
    const movie = await Movies.findById(_id);
    if (!movie) return null;

    // Delete poster file if it exists
    if (movie.poster) {
        const posterPath = `./public${movie.poster}`;
        if (fs.existsSync(posterPath)) {
            fs.unlinkSync(posterPath);
        }
    }

    return await Movies.findByIdAndDelete(_id);
};

// ✅ Add a new movie
const createMovie = async (movieData) => {
    const newMovie = new Movies({
        ...movieData,
        genre: movieData.genre.split(","), // Convert genre string to array
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return await newMovie.save();
};

// ✅ Update movie by ID
const updateMovieById = async (_id, updateData) => {
    return await Movies.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
};

module.exports = {
    findUserById,
    getAllUsers,
    deleteUserById,
    updateUserById,
    getAllMovies,
    findMovieById,
    deleteMovieById,
    createMovie,
    updateMovieById
};
