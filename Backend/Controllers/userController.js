const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');



const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password, phone} = req.body;
  console.log("This is console form backend req.body: ", req.body)

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExist = await userModel.findOne({email});
  if(userExist){
    res.status(400);
    throw new Error('User already Exists')
  }
  const userWithPhone = await userModel.findOne({phone});
  if(userWithPhone){
    res.status(400);
    throw new Error('Phone number already Exists!!')
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    name,
    email,
    password:hashedPassword,
    phone
  })
  if(user){
    res.status(201).json({
        _id:user.id,
        name:user.name,
        phone:user.phone,
        email:user.email,
        password:user.password,
        token:genetateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid User')
  }

  // res.json({message:'Register user'})
})

const loginUser = asyncHandler(async(req, res) => {
  
  const {email, password} = req.body;
  
  const user = await userModel.findOne({email})
  if(user.isActive){

    if(user && (await bcrypt.compare(password, user.password))){
      res.json({
       _id:user.id,
       name:user.name,
       email:user.email,
       image:user.image,
       phone:user.phone,
       token:genetateToken(user.id)
      })
   }else{
     res.status(400)
     throw new Error('Inalid credentials')
   } 
  }else{
    res.status(400).json({
      status:false,
      message:"User is Blocked!!!"
    })
  }

  


})

const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user);
})

const genetateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
     expiresIn: '30d'
  })
}

const addImage = asyncHandler(async (req, res) => {
  try {
    const imgName = req.file.filename;
    const { userId } = req.body;
    
    const user = await userModel.findByIdAndUpdate(
      userId,
      {$set:{ image: imgName }},
      {new:true}
    );
   

    if (!user) {
      return res.status(404).json({
        message: "User not found or image not updated",
      });
    }

    const { password, ...data } = user.toObject();
   
    const token = genetateToken(userId)
    data.token = token
    
    res.json({ data });
  } catch (error) {
   
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const profileEdit = asyncHandler(async (req, res) => {
  console.log("Entered the profileEdit");
  console.log("This is the body: ", req.body);

  const { name, phone } = req.body.formData;
  const { userId } = req.body;

  try {
    const updateUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          name,
          phone,
        },
      },
      { new: true } 
    );

    if (updateUser) {
      const data = {};
      const Data = updateUser.toObject(); 

      for (let key in Data) {
        if (key !== "password") {
          data[key] = Data[key];
        }
      }
      const token = genetateToken(userId)
      data.token = token
      console.log("This is the sent data: ", data);
      res.json({
        data:data,
        
      });
    } else {
      res.status(400);
      throw new Error('User not updated');
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: error.message });
  }
});





module.exports = {
     registerUser,
     loginUser,
     getMe,
     addImage,
     profileEdit
}