const express = require('express');
const router = express.Router();
const  authmiddleware= require("../Middleware/authmiddleware.js")
// AUTH ROUTES
const { loginUser, signUpUser, allUsers, getUserById, } = require('../Controllers/usercontroller.js');
router.post('/signup', signUpUser);
router.post('/login', loginUser);
//USER ROUTERS
router.get('/users',authmiddleware, allUsers);
router.get('/user/:id', getUserById);


module.exports = router;
