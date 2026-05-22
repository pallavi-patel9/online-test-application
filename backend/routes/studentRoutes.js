const express = require('express');
const router = express.Router();
const { protect, auther } = require('../middleware/auth');
const {
  getStudents, 
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

router.route('/students')
  .get(protect, auther, getStudents);

router.route('/students/:id')
  .get(protect, auther, getStudentById)
  .put(protect, updateStudent)
  .delete(protect, auther, deleteStudent);

module.exports = router; 
