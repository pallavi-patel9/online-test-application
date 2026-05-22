const express = require('express');
const router = express.Router();
const { protect, auther } = require('../middleware/auth');
const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,   
} = require('../controllers/examController');  
 
router.route('/exams')
  .post(protect, auther, createExam)
  .get(protect, getExams);

router.route('/exams/:id')
  .get(protect, auther, getExamById)
  .put(protect, auther, updateExam)
  .delete(protect, auther, deleteExam);
 

module.exports = router;