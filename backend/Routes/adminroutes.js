const express = require('express');
const { allUsersadmin ,getUserById, deleteUserById, updateUserById, addMovie, getAllMovies, getMovie, deleteMovie, updateMovieById, logoutadmin, } = require('../Controllers/admincontroller');
const upload = require("../Middleware/upload"); // Import Multer middleware
const router = express.Router();
const adminMiddleware = require('../Middleware/adminmiddleware')
router.use(adminMiddleware)
router.get('/adminusers',adminMiddleware, allUsersadmin);
router.get('/getuser/:_id', getUserById);
router.delete('/deleteuser/:_id', deleteUserById);
router.patch('/edituser/:_id',updateUserById)
//MOVIES
router.post("/addmovies", upload.fields([
    { name: "poster", maxCount: 1 }, 
    { name: "picture", maxCount: 5 } // Allow multiple pictures
]), addMovie);
router.get("/getallmovies",getAllMovies)
router.get("/getMovie/:_id",getMovie)
router.delete("/deleteMovie/:_id",deleteMovie)
router.put("/movie/:_id", upload.single("poster"), updateMovieById);
router.post("/logout",logoutadmin)



module.exports = router;