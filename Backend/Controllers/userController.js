const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');



const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExist = await userModel.findOne({email});
  if(userExist){
    res.status(400);
    throw new Error('User already Exists')
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    name,
    email,
    password:hashedPassword
  })
  if(user){
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        password:user.password,
        token:genetateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid User')
  }

  res.json({message:'Register user'})
})

const loginUser = asyncHandler(async(req, res) => {
  
  const {email, password} = req.body;
  console.log("This is the body :", req.body);
  const user = await userModel.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))){
     res.json({
      _id:user.id,
      name:user.name,
      email:user.email,
      token:genetateToken(user.id)
     })
  }else{
    res.status(400)
    throw new Error('Inalid credentials')
  }


})

const getMe = asyncHandler(async(req, res) => {
    res.json({message:req.user});
})

const genetateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
     expiresIn: '30d'
  })
}

module.exports = {
     registerUser,
     loginUser,
     getMe
}