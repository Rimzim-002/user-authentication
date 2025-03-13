const express = require('express');
const { loginUser, signUpUser, allUsers, getUserById, } = require('../Controllers/usercontroller.js');
const router = express.Router();
// const  authmiddleware= require("../Middleware/authmiddleware.js")
// AUTH ROUTES
router.post('/signup', signUpUser);
router.post('/login', loginUser);
//USER ROUTERS
router.get('/users', allUsers);
router.get('/user/:id', getUserById);


module.exports = router;
