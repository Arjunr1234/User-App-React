const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');



router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me',protect, userController.getMe);

module.exports = router