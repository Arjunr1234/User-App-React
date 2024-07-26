const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { userAuth } = require('../Middleware/authMiddleware');
const upload = require('../Middleware/multer');




router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/addImage',userAuth, upload.single('file'),userController.addImage)
router.get('/me',userAuth, userController.getMe);
router.post('/profileEdit',userAuth,userController.profileEdit)


module.exports = router