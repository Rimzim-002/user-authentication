const express = require('express');
const { loginUser, signUpUser } = require('../Controllers/usercontroller.js');
const router = express.Router();

//     }
// class APIResponse {
//     success(res, data =  {status :  200, message  :  "OK",  data: {}}){
//         return res.status(data.status).json(data);
//     }
//     error(res,data){
//         return res.status(data.status).json(data);
// }
// const Response  = new  APIResponse()
// const authMiddleware = (req, res,  next)=>{
//     console.log("rew", req.headers)
//     const authToken =  req.headers.authorization
//     if(!authToken){
//        return res.status(403).json({})
//     //   return Response.success(res, {status: 402,  message: "" , data: {}})
//     //    return Response.error(res, {status: 402,  message: "" , error: {}})
//     }

//     // Verification of token and get user data
//     // const user  =  {_id: 1, name: "sanjeev"}

//     //  req.user = user

// }

router.post('/signup',   signUpUser);
router.post('/login',loginUser);

module.exports = router;
