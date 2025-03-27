const express = require("express");
const router = express.Router();
const { ROUTES } = require("../Routes/routesEnums"); // ✅ Import ROUTES constants
const { user, users, deleteUser,updateUser} = require("../Controllers/usercontrol");
const { movie,movies,deleteMovie,updateMovie,addMovie} = require("../Controllers/moviescontroller");
const adminmiddleware= require("../Middleware/adminmiddleware")
const app= express();
app.use(adminmiddleware)
// // ✅ USERS ROUTES
router.get(ROUTES.USERS,users);
router.get(ROUTES.USERID,user);
router.delete(ROUTES.DELETE_USER,deleteUser);
router.patch(ROUTES.UPDATE_USER,updateUser)
// // ✅ MOVIES ROUTES
router.get(ROUTES.ALL_MOVIES,movies)
router.get(ROUTES.GET_MOVIE,movie)
router.delete(ROUTES.DELETE_MOVIE,deleteMovie)
router.post(ROUTES.ADD_MOVIE,addMovie)
router.put(ROUTES.UPDATE_MOVIE,updateMovie)







module.exports = router;
