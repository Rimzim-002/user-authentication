const express = require("express");
const app=express();
const router = express.Router();
const authMiddleware=require("../Middleware/authmiddleware")
const { ROUTES } = require("../Routes/routesEnums"); // ✅ Import ROUTES constants
const { movies, movie } = require("../Controllers/moviescontroller");
const {createBooking, updatePaymentStatus, getUserOrders} =require("../Controllers/ordercontroller")
// ✅ AUTH ROUTES
// app.use(authMiddleware)
router.get( ROUTES.ALL_MOVIES,movies);
router.get(ROUTES.GET_MOVIE,movie)
router.post(ROUTES.BOOKING,authMiddleware,createBooking)
router.post(ROUTES.CONFIRM_PAYMENT,updatePaymentStatus)
router.get(ROUTES.GET_ORDERS,authMiddleware,getUserOrders)


module.exports = router;
