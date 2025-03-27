const express = require("express");
const app=express();
const router = express.Router();
const { ROUTES } = require("../Routes/routesEnums"); // ✅ Import ROUTES constants
const { movies, movie } = require("../Controllers/moviescontroller");
const {createBooking, updatePaymentStatus, getUserOrders} =require("../Controllers/ordercontroller")
const authMiddleware=require("../Middleware/authmiddleware")
// ✅ AUTH ROUTES

router.get( ROUTES.ALL_MOVIES,authMiddleware,movies);
router.get(ROUTES.GET_MOVIE,authMiddleware,movie)
router.post(ROUTES.BOOKING,authMiddleware,createBooking)
router.post(ROUTES.CONFIRM_PAYMENT,authMiddleware,updatePaymentStatus)
router.get(ROUTES.GET_ORDERS,authMiddleware,getUserOrders)


module.exports = router;
