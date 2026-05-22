const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { saveSnapshots, getSnapshotsByExamAndUser } = require('../controllers/snapshotController');

router.post('/snapshots', protect, saveSnapshots); // Save multiple snapshots
router.get('/snapshots/:examId/:userId', protect, getSnapshotsByExamAndUser); // Fetch snapshots

module.exports = router; 