require("dotenv").config();
const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js");
const fs = require("fs");
const adminServices = require("../Services/adminservices.js");
const movies = async (req, res) => {
    try {
        const allMovies = await adminServices.getAllMovies();
        
        return Response.success(res, {
            status: 200,
            message: "All movies fetched successfully",
            data: { count: allMovies.length, movies: allMovies }
        });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ Get Movie by ID
const movie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await adminServices.findMovieById(id);

        if (!movie) {
            return Response.error(res, { status: 404, message: Messages.MOVIE.NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "Movie found", data: movie });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ Delete Movie
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await adminServices.deleteMovieById(id);

        if (!movie) {
            return Response.error(res, { status: 404, message: Messages.MOVIE.NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "Movie deleted successfully" });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ Add Movie
const addMovie = async (req, res) => {
    try {
        const newMovie = await adminServices.createMovie(req.body);
        return Response.success(res, { status: 201, message: "Movie added successfully", data: newMovie });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

// ✅ Update Movie
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await adminServices.updateMovieById(id, req.body);

        if (!updatedMovie) {
            return Response.error(res, { status: 404, message: Messages.MOVIE.NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "Movie updated successfully", data: updatedMovie });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};
module.exports={
    movie,movies,deleteMovie,updateMovie,addMovie

}