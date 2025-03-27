const Movie = require("../Models/movies");
const mongoose = require("mongoose");

// ✅ Get All Movies using Aggregation
const getAllMovies = async () => {
    return await Movie.aggregate([
        { 
            $project: { 
                _id: 1, 
                title: 1, 
                genre: 1, 
                releaseDate: 1, 
                status: 1, 
                ticketPrice: 1, 
                availableTickets: 1,
                createdAt: 1,
                updatedAt: 1
            } 
        }
    ]);
};

// ✅ Find Movie by ID using Aggregation
const findMovieById = async (_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;

    const result = await Movie.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(_id) } },
        { 
            $project: { 
                _id: 1, 
                title: 1, 
                genre: 1, 
                releaseDate: 1, 
                status: 1, 
                ticketPrice: 1, 
                availableTickets: 1,
                createdAt: 1,
                updatedAt: 1
            } 
        }
    ]);

    return result.length > 0 ? result[0] : null;
};

// ✅ Delete Movie by ID
const deleteMovieById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const result = await Movie.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } }
    ]);

    if (result.length === 0) return null;

    await Movie.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    return result[0];
};

// ✅ Add Movie using Aggregation
// services/movieService.js

const addMovieService = async (movieData) => {
    try {
        const {
            title, year, genre, rating, trailer, runtime, country, language, production,
            status, pricePerTicket, totalTickets, poster
        } = movieData;

        if (!pricePerTicket || !totalTickets) {
            return { error: "Price per ticket and total tickets are required." };
        }

        if (!poster) {
            return { error: "Movie poster URL is required." };
        }

        const newMovie = new Movie({
            title,
            year,
            genre: genre.split(","), // Ensure genre is stored as an array
            rating,
            trailer,
            runtime,
            country,
            language,
            production,
            poster, // Directly store poster URL
            status,
            tickets: {
                total: totalTickets,
                available: totalTickets,
                sold: 0
            },
            pricing: {
                pricePerTicket,
                totalRevenue: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newMovie.save();
        return { success: true, data: newMovie };
    } catch (error) {
        return { error: error.message };
    }
};

const updateMovieByIdService = async (movieId, updateData, file) => {
    try {
        const existingMovie = await Movie.findById(movieId);
        if (!existingMovie) {
            return { error: "No movie found to update" };
        }

        // Check if a new poster file is uploaded
        if (file) {
            if (existingMovie.poster) {
                const oldPosterPath = `./public${existingMovie.poster}`;
                if (fs.existsSync(oldPosterPath)) {
                    fs.unlinkSync(oldPosterPath); // Remove old image
                }
            }
            updateData.poster = `/uploads/${file.filename}`;
        }

        // Convert genre to an array if it's a string
        if (updateData.genre && typeof updateData.genre === "string") {
            updateData.genre = updateData.genre.split(",");
        }

        // Set updated timestamp
        updateData.updatedAt = new Date();

        // Update movie
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true, runValidators: true });

        return { success: true, data: updatedMovie };
    } catch (error) {
        return { error: error.message };
    }
};



module.exports = {
    getAllMovies,
    findMovieById,
    deleteMovieById,
    addMovieService,
    updateMovieByIdService
};
