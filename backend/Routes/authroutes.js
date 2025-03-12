const express = require('express');
const { loginUser, signUpUser, allUsers, getUserById, } = require('../Controllers/usercontroller.js');
const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/users', allUsers);
router.get('/user/:id', getUserById);


module.exports = router;
