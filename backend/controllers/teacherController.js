const User = require('../models/User');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin 
const getTeachers = async (req, res) => { 
  try { 
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.json(teachers);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get teacher by ID
// @route   GET /api/teachers/:id

// @access  Private/Admin
const getTeacherById = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id).select('-password');

    if (teacher && teacher.role === 'teacher') 
      res.json(teacher);
    else 
      res.status(404).json({ message: 'Teacher not found' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Private/Admin
const updateTeacher = async (req, res) => { 
  try {
    const { name, email, mobile, dob, teacherDetails } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const teacher = await User.findById(req.params.id);

    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update fields
    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.mobile = mobile || teacher.mobile;
    teacher.dob = dob || teacher.dob;

    // Update teacherDetails
    if (teacherDetails) {
      teacher.teacherDetails = teacher.teacherDetails || {};
      teacher.teacherDetails.department = teacherDetails.department || teacher.teacherDetails.department;
      teacher.teacherDetails.designation = teacherDetails.designation || teacher.teacherDetails.designation;
      
      // Handle expertise array conversion
      if (teacherDetails.expertise) {
        teacher.teacherDetails.expertise = Array.isArray(teacherDetails.expertise) 
          ? teacherDetails.expertise 
          : teacherDetails.expertise.split(',').map(item => item.trim());
      }
    }

    const updatedTeacher = await teacher.save();

    res.json({
      _id: updatedTeacher._id,
      name: updatedTeacher.name,
      email: updatedTeacher.email,
      mobile: updatedTeacher.mobile,
      dob: updatedTeacher.dob,
      role: updatedTeacher.role,
      avatar: updatedTeacher.avatar,
      createdAt: updatedTeacher.createdAt,
      teacherDetails: updatedTeacher.teacherDetails,
    });
  } catch (error) {
    console.error('Update Teacher Error:', error);
    res.status(500).json({ 
      message: 'Server Error',
      error: error.message 
    });
  }
};

// @desc    Delete teacher 
// @route   DELETE /api/teachers/:id
// @access  Private/Admin
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);

    if (teacher && teacher.role === 'teacher') {
      let deleteTeacher = await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Teacher removed' });
    }
    else
      res.status(404).json({ message: 'Teacher not found' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
}; 