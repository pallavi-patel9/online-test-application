// import snapshotService from '../services/snapshotService';

const Snapshot = require('../models/Snapshot');

exports.saveSnapshots = async (req, res) => {
  try {
    const { examId, studentId, imageBase64 } = req.body;

    if (!examId || !studentId || !imageBase64) {
      return res.status(400).json({ message: 'Exam ID, User ID, and image are required' });
    }

    const newShot = new Snapshot({
      exam: examId, // Map examId to exam
      user: studentId, // Map studentId to user
      image: imageBase64, // Map imageBase64 to image
    });

    await newShot.save();

    res.status(201).json({ message: 'Snapshot saved successfully' });
  } catch (error) {
    console.error('Error saving snapshot:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSnapshotsByExamAndUser = async (req, res) => {
  try {
    const { examId, userId } = req.params;

    const snapshots = await Snapshot.find({ exam: examId, user: userId });

    if (!snapshots.length) {
      return res.status(404).json({ message: 'No snapshots found for this exam and user' });
    }

    res.status(200).json(snapshots);
  } catch (error) {
    console.error('Error fetching snapshots:', error);
    res.status(500).json({ message: 'Server error' });
  }
};