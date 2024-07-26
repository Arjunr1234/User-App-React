const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userModel = require('../Models/userModel');

const adminAuth = asyncHandler(async(req, res, next) => {
   console.log("Entered into admin Authrization");
     let token 

     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         try {
          
          // console.log("This is req.headers.authorization", req.headers)
           token = req.headers.authorization.split(' ')[1]

          
            const  decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("This is decoded: ", decoded)

            next();
             
          
         } catch (error) {
           
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
         }
     }

     if(!token){
       console.log("no token exist")
       res.status(401)
       throw new Error('Not authorize , no token')
     }
})

module.exports = {adminAuth}