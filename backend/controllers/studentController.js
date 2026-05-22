const User = require('../models/User');

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin 
const getStudents = async (req, res) => { 
  try { 
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id

// @access  Private/Admin
const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');

    if (student && student.role === 'student') 
      res.json(student);
    else 
      res.status(404).json({ message: 'Student not found' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
// const updateStudent = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     const student = await User.findById(req.params.id);

//     if (student && student.role === 'student') {
//       student.name = name || student.name;
//       student.email = email || student.email;

//       const updatedStudent = await student.save();
//       res.json({
//         _id: updatedStudent._id,
//         name: updatedStudent.name,
//         email: updatedStudent.email,
//         role: updatedStudent.role,
//       });
//     } else {
//       res.status(404).json({ message: 'Student not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

const updateStudent = async (req, res) => { 
  try {
    const { name, email, mobile, dob, studentDetails } = req.body;

    const student = await User.findById(req.params.id);

    if (student && student.role === 'student') {
      // Update fields only if provided in the request, otherwise keep existing values
      student.name = name || student.name;
      student.email = email || student.email;
      student.mobile = mobile || student.mobile;
      student.dob = dob || student.dob;

      // Update studentDetails if provided, otherwise preserve existing
      if (studentDetails) {
        student.studentDetails = student.studentDetails || {};
        student.studentDetails.university = studentDetails.university || student.studentDetails.university;
        student.studentDetails.course = studentDetails.course || student.studentDetails.course;
        student.studentDetails.semester = studentDetails.semester || student.studentDetails.semester;
      }

      const updatedStudent = await student.save();

      // Return all relevant fields to the frontend
      res.json({
        _id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        mobile: updatedStudent.mobile,
        dob: updatedStudent.dob,
        role: updatedStudent.role,
        avatar: updatedStudent.avatar,
        createdAt: updatedStudent.createdAt,
        studentDetails: updatedStudent.studentDetails,
      });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (student && student.role === 'student') {
      let deleteStudent = await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Student removed' });
    }
    else
      res.status(404).json({ message: 'Student not found' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
}; 