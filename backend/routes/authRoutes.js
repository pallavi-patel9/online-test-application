const express = require('express');
const router = express.Router();
const { validateRegisterInput, validateLoginInput } = require('../middleware/validate');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', validateRegisterInput, registerUser);
router.post('/login', validateLoginInput, loginUser);
router.get('/profile', protect, getUserProfile);
  
module.exports = router;    