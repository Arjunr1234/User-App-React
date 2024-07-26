const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userModel = require('../Models/userModel');

const userAuth = asyncHandler(async(req, res, next) => {
   console.log("Entered into protect");
     let token 

     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         try {
           // get token from header
           console.log("This is req.headers.authorization", req.headers)
           token = req.headers.authorization.split(' ')[1]

           // verify token
            const  decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("This is decoded: ", decoded)

            // GET user from the token
             req.user = await userModel.findById(decoded.id).select('-password');

             console.log("This is req.user: ", req.user)

             if(req.user.isActive){

                   next();

             }else{
                 res.status(401)
                 throw new Error("User is Blocked")
             }

             
          
         } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
         }
     }

     if(!token){
       res.status(401)
       throw new Error('Not authorize , no token')
     }
})

module.exports = {userAuth}