const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { adminAuth } = require('../Middleware/adminAuth');




router.post('/admin-login', adminController.login);
router.post('/create-user',adminAuth, adminController.createUser);
router.post('/block-user',adminAuth,  adminController.blockUser);
router.post('/update-user',adminAuth, adminController.updateUser);




module.exports = router