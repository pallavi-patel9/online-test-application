const Result = require('../models/Result');
const Exam = require('../models/Exam');

// Save exam result
exports.saveResult = async (req, res) => {
  try {
    const { examId, score, totalQuestions, timeSpent, answers, attempts } = req.body;
    
    const result = new Result({
      user: req.user._id,
      exam: examId,
      score, 
      totalQuestions,
      timeSpent,
      answers,
      attempts
    });

    // console.log(result);

    await result.save();
    
    // Update exam statistics
    const successRate = Math.round((score / totalQuestions) * 100);
    await Exam.findByIdAndUpdate(examId, {
      $inc: { totalAttempts: 1 },
      $push: { successRates: successRate }
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 
// Get user's results
exports.getUserResults = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'Invalid user' });
    }
     
    const results = await Result.find({ user: req.user._id });
    
    res.json(results.length ? results : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single result
exports.getResult = async (req, res) => {
  try {
    const result = await Result.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('exam');

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};