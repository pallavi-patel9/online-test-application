const Exam = require('../models/Exam'); 

// @desc    Create a new exam
// @route   POST /api/Exams
// @access  Private
const createExam = async (req, res) => {
  try { 
    const { name, questions } = req.body;
    // console.log("data aa rha hai");
    // console.log(name, questions);              
    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: 'At least one question is required' });
    }
    const invalidQuestions = questions.filter(q => 
      q.choices.length < 2 || !q.correct || !q.question.trim()
    );
    if (invalidQuestions.length > 0) {
      return res.status(400).json({ 
        message: 'Each question must have at least 2 choices, a question text, and a correct answer'
      });
    }
    const exam = new Exam({
      name,
      questions,
      createdBy: req.user._id
    });
    const createdExam = await exam.save();
    res.status(201).json(createdExam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Private
const getExams = async (req, res) => {
  try {
    // const exams = await Exam.find({
    //   $or: [
    //     { createdBy: req.user._id },
    //     { isPublic: true }
    //   ]
    // })
    // .populate('createdBy', 'name email')
    // .sort({ lastUpdated: -1 });

    const exams = await Exam.find();

    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get exam by ID
// @route   GET /api/exams/:id
// @access  Private
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user._id },
        { isPublic: true }
      ]
    }).populate('createdBy', 'name email');

    if (exam) {
      res.json(exam);
    } else {
      res.status(404).json({ message: 'Exam not found or not authorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update exam
// @route   PUT /api/exams/:id
// @access  Private
const updateExam = async (req, res) => {
  try {
    const { name, questions } = req.body;
    // console.log(req.body);
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (exam.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this exam' });
    }

    if (questions) {
      const invalidQuestions = questions.filter(q => 
        q.choices.length < 2 || !q.correct || !q.question.trim()
      );
      
      if (invalidQuestions.length > 0) {
        return res.status(400).json({ 
          message: 'Each question must have at least 2 choices, a question text, and a correct answer'
        });
      }
    }

    exam.name = name || exam.name;
    exam.questions = questions || exam.questions;
    exam.lastUpdated = Date.now();

    const updatedExam = await exam.save();
    res.json(updatedExam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update exam stats
// @route   PATCH /api/exams/:id/stats
// @access  Private
// const updateExamStats = async (req, res) => {
//   try {
//     const { successRate } = req.body;
//     const exam = await Exam.findById(req.params.id);

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     exam.successRate = successRate;
//     exam.lastPlayed = Date.now();

//     await exam.save();
//     res.json({ message: 'Exam stats updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// @desc    Delete exam
// @route   DELETE /api/exams/:id
// @access  Private
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (exam.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this exam' });
    }

    let deletedExam = await Exam.findByIdAndDelete(req.params.id);
    console.log(deletedExam);
    res.json({ message: 'Exam removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
  
module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  // updateExamStats 
};