const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getTeachers, 
  getTeacherById,
  updateTeacher,
  deleteTeacher, 
} = require('../controllers/teacherController');

router.route('/teachers')
  .get(protect, admin, getTeachers);

router.route('/teachers/:id')
  .get(protect, admin, getTeacherById)
  .put(protect, updateTeacher)
  .delete(protect, admin, deleteTeacher);

module.exports = router; 
