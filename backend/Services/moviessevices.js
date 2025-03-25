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
const deleteMovieById = async (_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;

    const result = await Movie.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(_id) } }
    ]);

    if (result.length === 0) return null;

    await Movie.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });

    return result[0];
};

// ✅ Add Movie using Aggregation
const createMovie = async (movieData) => {
    const newMovie = await Movie.create(movieData);

    const result = await Movie.aggregate([
        { $match: { _id: newMovie._id } },
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

// ✅ Update Movie using Aggregation
const updateMovieById = async (_id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;

    await Movie.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, { $set: updateData });

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

module.exports = {
    getAllMovies,
    findMovieById,
    deleteMovieById,
    createMovie,
    updateMovieById
};
