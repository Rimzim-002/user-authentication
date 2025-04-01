require("dotenv").config();
const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js");
const fs = require("fs");
const adminServices = require("../Services/adminservices.js");
const movieService=require("../Services/moviessevices.js")
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

        // Find the movie by ID
        const movie = await adminServices.findMovieById(id); // Assuming you have a method to find the movie

        if (!movie) {
            return Response.error(res, { status: 404, message: Messages.MOVIE.NOT_FOUND });
        }

        // Soft delete the movie by setting the deleted flag to true and updating the deletedAt timestamp
        movie.deleted = true; // Mark as deleted
        movie.deletedAt = new Date(); // Set the deletion timestamp
        await movie.save(); // Save the changes

        return Response.success(res, { status: 200, message: "Movie deleted successfully" });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
    }
};

const addMovie = async (req, res) => {
    try {
        const result = await  movieService.addMovieService (req.body);

        if (result.error) {
            return Response.error(res, { status: 400, message: result.error });
        }

        return Response.success(res, { status: 201, message: "Movie added successfully", data: result.data });
    } catch (error) {
        return Response.error(res, { status: 500, message: "Server Error", error: error.message });
    }
};

// 🎬 Controller for updating a movie by ID
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await movieService.updateMovieByIdService(id, req.body, req.file);

        if (result.error) {
            return Response.error(res, { status: 404, message: result.error });
        }

        return Response.success(res, { status: 200, message: "Movie updated successfully", data: result.data });
    } catch (error) {
        return Response.error(res, { status: 500, message: "Something went wrong, please try again", error: error.message });
    }
};

module.exports={
    movie,movies,deleteMovie,updateMovie,addMovie

}