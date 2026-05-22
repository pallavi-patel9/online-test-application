const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: 
    {
      type: String,
      required: true,
    }, 
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Snapshot', snapshotSchema);