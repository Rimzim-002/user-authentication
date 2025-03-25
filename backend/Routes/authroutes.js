const express = require("express");
const router = express.Router();
const { ROUTES } = require("../Routes/routesEnums"); // ✅ Import ROUTES constants
const { loginUser, signUpUser} = require("../Controllers/authcontroller");

// ✅ AUTH ROUTES
router.post(ROUTES.SIGNUP, signUpUser);
router.post(ROUTES.LOGIN, loginUser);

module.exports = router;
