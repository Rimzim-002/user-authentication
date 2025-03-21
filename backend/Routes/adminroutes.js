const express = require('express');
const router = express.Router();
const upload = require("../Middleware/upload"); // Import Multer middleware
const adminMiddleware = require('../Middleware/adminmiddleware');

// ✅ Import Correct Controllers
const { 
    allUsersadmin, 
    getUserById, 
    deleteUserById, 
    updateUserById, 
    addMovie, 
    getAllMovies, 
    getMovie, 
    deleteMovie, 
    updateMovieById, 
} = require('../Controllers/admincontroller');

router.use(adminMiddleware); // ✅ Apply admin middleware to all routes

// 📌 ✅ User Management
router.get('/adminusers', allUsersadmin);
router.get('/getuser/:_id', getUserById);
router.delete('/deleteuser/:_id', deleteUserById);
router.patch('/edituser/:_id', updateUserById);

// 📌 ✅ Movie Management
router.post("/addmovies", upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "picture", maxCount: 5 } // Allow multiple pictures
]), addMovie);

router.get("/getallmovies", getAllMovies);
router.get("/getMovie/:_id", getMovie);
router.delete("/deleteMovie/:_id", deleteMovie);
router.put("/movie/:_id", upload.single("poster"), updateMovieById);

// 📌 ✅ Admin Logout

module.exports = router;
