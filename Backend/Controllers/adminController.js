const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const login = async (req, res) => {
  try {
    console.log("Enter into the adminLogin controller");
    
    const { email, password } = req.body;
    console.log("This is the received Email and Password:", email, password);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    console.log("Admin Email and Password:", adminEmail, adminPassword);

    
    if (adminEmail === email) {
    
      if (adminPassword === password) {
        
        const token = generateToken(process.env.ADMIN_ID);
        console.log("This is the admin token:", token);

        
        const userData = await userModel.find({});
        res.json({ token, userData });
      } else {
        res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      res.status(401).json({ message: "Invalid Email" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createUser = asyncHandler(async(req, res) => {
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
  const userWithPhone = await userModel.findOne({phone})
  if(userWithPhone){
    res.status(400);
    throw new Error('Phone number already Exists!!')
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("This is hashed password: ", hashedPassword)
  const user = await userModel.create({
    name,
    email,
    password:hashedPassword,
    phone
  })
   console.log("This is that user: ", user)
  if(user){
    const usersData = await userModel.find({})
    res.status(201).json({
       data:usersData
    })
  }else{
    res.status(400)
    throw new Error('Invalid User')
  }

  
});

const blockUser = async (req, res) => {
  try {
    console.log("Entered into block User of admin controller");
    const { userId } = req.body;
    console.log("This is req.body in block user: ", userId);

    const user = await userModel.findById(userId);
    console.log("This is the user to be blocked/unblocked: ", user);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found"
      });
      return;
    }

    const newStatus = !user.isActive;
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { isActive: newStatus } },
      { new: true }
    );
    console.log("This is the updated user's isActive status: ", updateUser.isActive);

    if (updateUser) {
      res.json({
        status: newStatus ? "unBlocked" : "blocked",
        success: true
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to update user status"
      });
    }
  } catch (error) {
    console.error("Error blocking/unblocking user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to block/unblock user"
    });
  }
};


const updateUser = async (req, res) => {
  console.log("Enter into updateUser /////////////////////////////////////////////////");

  const { userId, name, phone } = req.body;

  try {
    // Find a user with the provided phone number but exclude the current user being updated
    const userWithPhone = await userModel.findOne({ phone, _id: { $ne: userId } });
    console.log("This is the userWithsamephone: ", userWithPhone)
    if (userWithPhone) {
      res.status(400).json({ error: "Phone number already exists!!" });
      return;
    }

    const updateUser = await userModel.updateOne(
      { _id: userId },
      { $set: { name, phone } }
    );

    if (updateUser.nModified === 0) {
      res.status(404).json({ error: 'User not found or no changes made.' });
      return;
    }

    console.log("This is the updateUser: ", updateUser);
    res.json({ message: 'User updated successfully.', updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};





module.exports = {
  login,
  createUser,
  blockUser,
  updateUser
};
