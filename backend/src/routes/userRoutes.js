const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authenticate = require('../middleware/auth');

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);

module.exports = router;