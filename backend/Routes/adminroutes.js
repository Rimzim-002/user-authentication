const express = require('express');
const { allUsersadmin ,getUserById, deleteUserById, updateUserById} = require('../Controllers/admincontroller');
const router = express.Router();
const adminMiddleware = require('../Middleware/adminmiddleware')
router.get('/adminusers',adminMiddleware, allUsersadmin);
router.get('/getuser/:_id', getUserById);
router.delete('/deleteuser/:_id', deleteUserById);
router.patch('/edituser/:_id',updateUserById)



module.exports = router;