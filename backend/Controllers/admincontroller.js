require("dotenv").config();
const User = require("../Models/user.js");
const Movies= require("../Models/movies.js")
const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js")
const fs = require("fs"); // ✅ Import file system to delete old images


// USERS=============================
const getUserById = async (req, res) => {
    try {
        const {_id} = req.params;
        const user = await User.findById(_id)

        if (!user) {
            return Response.error(res, { status: 404, message: Messages.USER.NOT_FOUND });
        }

        return Response.success(res, { status: 200, message: "User found", data: user });

    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};
const allUsersadmin = async (req, res) => {
    try {
        // Fetch users with role "user" or "admin"
        const users = await User.find({ role: { $in: ["user", "admin"] } });

        if (users.length === 0) {
            return Response.error(res, { status: 404, message: Messages.USER.NO_USERS_FOUND });
        }

        return Response.success(res, { 
            status: 200, 
            message: "All users with role 'user' and 'admin'", 
            data: { 
                count: users.length, // Add user count
                users: users,
                movies: 50,
                totalRevenue: 50000
            } 
        });
    } catch (error) {
        return Response.error(res, { status: 500, message: Messages.SERVER_ERROR, error: error.message });
    }
};


const deleteUserById = async (req, res) => {
    try {
        const { _id } = req.params;
        
        // Find and delete user
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User Deleted Successfully", data: user });

    } catch (error) {
        console.error("Delete user error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
const updateUserById = async (req, res) => {
    try {
        const { _id } = req.params; 
        const { role, ...updateData } = req.body;

        if (role && !["user", "admin"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role provided" });
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { ...updateData, ...(role && { role }) },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User Updated Successfully", data: user });

    } catch (error) {
        console.error("❌ Update user error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
//MOVIES =========================
const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movies.find();

        if (allMovies.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No movies found",
                data: {
                    count: 0,
                    movies: [],
                    totalRevenue: 0
                }
            });
        }

        // ✅ Dynamically calculate total revenue
        const totalRevenue = allMovies.reduce((sum, movie) => sum + movie.pricing.totalRevenue, 0);

        return res.status(200).json({
            success: true,
            message: "All movies fetched successfully",
            data: {
                count: allMovies.length,
                movies: allMovies,
                totalRevenue
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const getMovie = async (req, res) => {
    try {
        const { _id } = req.params; 

        // ✅ Check if movie exists
        const movie = await Movies.findById(_id);
        if (!movie) {
            return res.status(404).json({ success: false, message: "No movie found" });
        }

        return res.status(200).json({ success: true, message: "Movie found", data: movie });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong, please try again", error: error.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { _id } = req.params;

        const movie = await Movies.findById(_id);
        if (!movie) {
            return res.status(404).json({ success: false, message: "No movie found to delete" });
        }

        // ✅ Delete movie poster from storage
        if (movie.poster) {
            const posterPath = `./public${movie.poster}`;
            if (fs.existsSync(posterPath)) {
                fs.unlinkSync(posterPath);
            }
        }

        // ✅ Delete movie from database
        await Movies.findByIdAndDelete(_id);

        return res.status(200).json({ success: true, message: "Movie deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong, please try again", error: error.message });
    }
};

module.exports = { getAllMovies, getMovie, deleteMovie };

const addMovie = async (req, res) => {
    try {
        const { title, year, genre, rating, trailer, runtime, country, language, production, status, pricePerTicket, totalTickets } = req.body;

        if (!pricePerTicket || !totalTickets) {
            return res.status(400).json({ success: false, message: "Price per ticket and total tickets are required." });
        }

        const poster = req.files?.poster ? `/uploads/${req.files.poster[0].filename}` : null;
        if (!poster) {
            return res.status(400).json({ success: false, message: "Movie poster is required." });
        }

        const newMovie = new Movies({
            title, 
            year, 
            genre: genre.split(","), 
            rating, 
            trailer, 
            runtime, 
            country, 
            language, 
            production,
            poster, 
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
            createdAt: new Date(), // ✅ Set creation timestamp
            updatedAt: new Date()  // ✅ Set initial update timestamp
        });

        await newMovie.save();
        return res.status(201).json({ success: true, message: "Movie added successfully", data: newMovie });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};





const updateMovieById = async (req, res) => {
    try {
        const { _id } = req.params;
        let updateData = req.body;

        const existingMovie = await Movies.findById(_id);
        if (!existingMovie) {
            return res.status(404).json({ success: false, message: "No movie found to update" });
        }

        // ✅ Check if a new poster file is uploaded
        if (req.file) {
            if (existingMovie.poster) {
                const oldPosterPath = `./public${existingMovie.poster}`;
                if (fs.existsSync(oldPosterPath)) {
                    fs.unlinkSync(oldPosterPath); // ✅ Remove old image
                }
            }
            updateData.poster = `/uploads/${req.file.filename}`;
        }

        // ✅ Convert genre to an array if it's a string
        if (updateData.genre && typeof updateData.genre === "string") {
            updateData.genre = updateData.genre.split(",");
        }

        // ✅ Set updated timestamp
        updateData.updatedAt = new Date();

        // ✅ Update movie
        const updatedMovie = await Movies.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

        return res.status(200).json({ success: true, message: "Movie updated successfully", data: updatedMovie });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong, please try again", error: error.message });
    }
};


 



module.exports = {
   
    allUsersadmin,getUserById,deleteUserById,updateUserById,addMovie,getAllMovies,getMovie,deleteMovie
,updateMovieById};
