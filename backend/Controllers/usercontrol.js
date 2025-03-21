require("dotenv").config();
const Movie = require("../Models/movies.js");
const mongoose= require("mongoose")
const allMovie = async (req, res) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json({
            success: true,
            message: "Movies found successfully",
            movies,
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        let movie;

        // ✅ Check if `id` is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(id)) {
            movie = await Movie.findById(id).populate("createdBy updatedBy", "name email");
        } 
        
        // ✅ If no movie found with `_id`, search by `movieId` (Nano ID)
        if (!movie) {
            movie = await Movie.findOne({ movieId: id }).populate("createdBy updatedBy", "name email");
        }

        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        return res.status(200).json({ success: true, movie });
    } catch (error) {
        console.error("Error fetching movie:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



module.exports = { allMovie, getMovie };
