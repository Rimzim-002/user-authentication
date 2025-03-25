// require("dotenv").config();
// const Messages = require("../Utils/messages.js");
// const Response = require("../Utils/apiResponse.js");
// const fs = require("fs");
// const adminServices = require("../Services/adminservices.js");

// // ✅ Get User by ID (Admin)
// const getUserById = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const user = await adminServices.findUserById(_id);
        
//         if (!user) {
//             return Response.error(res, { status: 404, message: Messages.USER.USER_NOT_FOUND });
//         }

//         return Response.success(res, { status: 200, message: "User found", data: user });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Get All Users (Admin)
// const allUsersadmin = async (req, res) => {
//     try {
//         const users = await adminServices.getAllUsers();

//         if (users.length === 0) {
//             return Response.error(res, { status: 404, message: Messages.USER.NO_USERS_FOUND });
//         }

//         return Response.success(res, { 
//             status: 200, 
//             message: "All users with role 'user' and 'admin'",
//             data: { count: users.length, users }
//         });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Delete User
// const deleteUserById = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const user = await adminServices.deleteUserById(_id);

//         if (!user) {
//             return Response.error(res, { status: 404, message: Messages.USER.USER_NOT_FOUND });
//         }

//         return Response.success(res, { status: 200, message: "User deleted successfully", data: user });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Update User
// const updateUserById = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const user = await adminServices.updateUserById(_id, req.body);

//         if (!user) {
//             return Response.error(res, { status: 404, message: Messages.USER.USER_NOT_FOUND });
//         }

//         return Response.success(res, { status: 200, message: "User updated successfully", data: user });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Get All Movies
// const getAllMovies = async (req, res) => {
//     try {
//         const allMovies = await adminServices.getAllMovies();
        
//         return Response.success(res, {
//             status: 200,
//             message: "All movies fetched successfully",
//             data: { count: allMovies.length, movies: allMovies }
//         });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Get Movie by ID
// const getMovie = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const movie = await adminServices.findMovieById(_id);

//         if (!movie) {
//             return Response.error(res, { status: 404, message: Messages.MOVIE.NOT_FOUND });
//         }

//         return Response.success(res, { status: 200, message: "Movie found", data: movie });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Delete Movie
// const deleteMovie = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const movie = await adminServices.deleteMovieById(_id);

//         if (!movie) {
//             return Response.error(res, { status: 404, message: Messages.MOVIE.NOT_FOUND });
//         }

//         return Response.success(res, { status: 200, message: "Movie deleted successfully" });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Add Movie
// const addMovie = async (req, res) => {
//     try {
//         const newMovie = await adminServices.createMovie(req.body);
//         return Response.success(res, { status: 201, message: "Movie added successfully", data: newMovie });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// // ✅ Update Movie
// const updateMovieById = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const updatedMovie = await adminServices.updateMovieById(_id, req.body);

//         if (!updatedMovie) {
//             return Response.error(res, { status: 404, message: Messages.MOVIE.NOT_FOUND });
//         }

//         return Response.success(res, { status: 200, message: "Movie updated successfully", data: updatedMovie });
//     } catch (error) {
//         return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR, error: error.message });
//     }
// };

// module.exports = {
//     allUsersadmin,
//     getUserById,
//     deleteUserById,
//     updateUserById,
//     addMovie,
//     getAllMovies,
//     getMovie,
//     deleteMovie,
//     updateMovieById
// };
