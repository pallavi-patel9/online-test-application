import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ExamBuilder({ onSave, onCancel, initialExam }) {
  const [examName, setExamName] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [questions, setQuestions] = useState([{ question: '', choices: ['', ''], correct: '' }]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (initialExam) {
      setExamName(initialExam.name);
      // You would need to map your exam data to the questions format
      // This is a placeholder - adjust according to your actual data structure
      setTotalTime(initialExam.totalTime || 0);
      setQuestions(initialExam.questions || [{ question: '', choices: ['', ''], correct: '' }]);
    }
  }, [initialExam]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const addChoice = (index) => {
    const updated = [...questions];
    updated[index].choices.push('');
    setQuestions(updated);
  };

  const deleteChoice = (qIndex, cIndex) => {
    const updated = [...questions];
    if (updated[qIndex].choices.length > 2) {
      updated[qIndex].choices.splice(cIndex, 1);
      setQuestions(updated);
    } else {
      toast.warning('Each question must have at least 2 choices.');
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', choices: ['', ''], correct: '' }]);
  };

  const deleteQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const validateExam = () => {
    if (!examName.trim()) return false;
    if (totalTime <= 0) return false;
    for (let q of questions) {
      if (!q.question.trim() || q.choices.length < 2 || !q.correct.trim()) return false;
      for (let c of q.choices) {
        if (!c.trim()) return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validateExam()) {
      toast.warning('Please fill in all fields correctly and ensure total time is greater than 0.');
      return;
    }
    onSave({
      name: examName,
      totalTime: parseInt(totalTime),
      questions,
      questionCount: questions.length
    });
  };

  return (
    <div className="container mt-4">
      <div className="card border-success mb-3">
        <div className="card-header bg-success text-white">1 Exam Details :</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Exam Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Name Of The Exam..."
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Time (minutes)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter total time in minutes..."
              value={totalTime}
              onChange={(e) => setTotalTime(Math.max(0, parseInt(e.target.value) || 0))}
              min="1"
            />
          </div>  
          </div>
        </div>
        <div className="card border-success">
          <div className="card-header bg-success text-white">2 Exam Questions :</div>
          <div className="card-body">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-4 border p-3 rounded">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <strong>Question {qIndex + 1}</strong>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
                </div>
                <input
                  type="text"
                  className="form-control mt-1 mb-3"
                  placeholder="Your Question Here..."
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                />
                <div className="mb-2">
                  <strong>Choices</strong>
                  {q?.choices?.map((choice, cIndex) => (
                    <div key={cIndex} className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">{String.fromCharCode(65 + cIndex)}:</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Add Choice ${cIndex + 1}`}
                        value={choice}
                        onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                      />
                      <button className="btn btn-outline-danger" onClick={() => deleteChoice(qIndex, cIndex)}>&times;</button>
                    </div>
                  ))}
                  <button className="btn btn-success" onClick={() => addChoice(qIndex)}>Add a New Choice</button>
                </div>
                <div>
                  <strong>Correct Answer</strong>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Add the correct answer..."
                    value={q.correct}
                    onChange={(e) => handleQuestionChange(qIndex, 'correct', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button className="btn btn-outline-success" onClick={addQuestion}>Add a New Question</button>
          </div>
        </div>

        <div className="mt-3 text-center">
          <button className="btn btn-secondary mx-2" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary mx-2" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Edit Mode' : 'Preview Exam'}
          </button>
          <button className="btn btn-success mx-2" onClick={handleSave}>Save Exam</button>
        </div>

        {previewMode && (
          <div className="card mt-4">
            <div className="card-header bg-info text-white">Preview Mode</div>
            <div className="card-body">
              <h5>{examName}</h5>
              {questions.map((q, i) => (
                <div key={i} className="mb-3">
                  <strong>Q{i + 1}: {q.question}</strong>
                  <ul>
                    {q.choices.map((c, ci) => (
                      <li key={ci}>{String.fromCharCode(65 + ci)}. {c}</li>
                    ))}
                  </ul>
                  <em>Correct: {q.correct}</em>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      );
}

