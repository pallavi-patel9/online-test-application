const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.js');
const { saveResult, getUserResults } = require('../controllers/resultController.js');

// Save exam result
router.post('/results', protect, saveResult);

// Get user's results
router.get('/results/:id', protect, getUserResults);

// Get single result
// router.get('/results/:id', protect, getResult); 

module.exports = router;   