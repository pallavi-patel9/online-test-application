import React from 'react';

const ExamResult = ({ result = {}, onRestart, onReturn, isSaving }) => {  
  const { 
    score = 0,  
    totalQuestions = 0, 
    savedAnswers = [], 
    attempts = [], 
    timeSpent = 0, 
    totalTime = 0,
    status = 'completed',
    terminationReason = null,
    isNormalCompletion = true,
    exam = { questions: [] }
  } = result;

  const attemptedQuestions = attempts.filter(a => a).length;
  const correctAnswers = savedAnswers.filter((answer, index) => 
    attempts[index] && answer === exam.questions[index]?.correct
  ).length;
  const wrongAnswers = attemptedQuestions - correctAnswers;
  const skipped = totalQuestions - attemptedQuestions;

  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const accuracy = attemptedQuestions > 0 ? Math.min(100, Math.round((correctAnswers / attemptedQuestions) * 100)) : 0;

  const questionResults = exam.questions.map((question, index) => ({
    question: question.question,
    userAnswer: savedAnswers[index],
    correctAnswer: question.correct,
    isCorrect: savedAnswers[index] === question.correct,
    attempted: attempts[index]
  }));

  const progressVariant = (value) => {
    if (value >= 70) return 'bg-success';
    if (value >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Exam Results</h2>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h4>Summary</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Total Questions:</strong> {totalQuestions}
                </li>
                <li className="list-group-item">
                  <strong>Attempted:</strong> {attemptedQuestions}
                </li>
                <li className="list-group-item text-success">
                  <strong>Correct Answers:</strong> {correctAnswers}
                </li>
                <li className="list-group-item text-danger">
                  <strong>Wrong Answers:</strong> {wrongAnswers}
                </li>
                <li className="list-group-item">
                  <strong>Skipped:</strong> {skipped}
                </li>
                {status === 'failed' && !isNormalCompletion && (
                  <li className="list-group-item text-danger">
                    <strong>Status:</strong> Failed - {terminationReason}
                  </li>
                )}
              </ul>
            </div>

            <div className="col-md-6">
              <h4>Performance Metrics</h4>
              <div className="mb-3">
                <h5>Overall Score</h5>
                <div className="progress">
                  <div
                    className={`progress-bar ${progressVariant(percentage)}`}
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {percentage}%
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <h5>Accuracy</h5>
                <div className="progress">
                  <div
                    className={`progress-bar ${progressVariant(accuracy)}`}
                    role="progressbar"
                    style={{ width: `${accuracy}%` }}
                    aria-valuenow={accuracy}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {accuracy}%
                  </div>
                </div>
                <small className="text-muted">(Correct answers from attempted questions)</small>
              </div>
              <div>
                <h5>Time Spent</h5>
                <p>
                  <strong>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</strong> of {Math.floor(totalTime / 60)}m total
                </p>
              </div>
            </div>
          </div>

          <h4>Question Details</h4>
          <ul className="list-group mb-4">
            {questionResults.map((qr, index) => (
              <li
                key={index}
                className={`list-group-item ${qr.attempted ? (qr.isCorrect ? 'list-group-item-success' : 'list-group-item-danger') : ''}`}
              >
                <div className="d-flex justify-content-between">
                  <strong>Q{index + 1}: {qr.question}</strong>
                  <span>
                    {!qr.attempted ? (
                      <span className="text-muted">Skipped</span>
                    ) : qr.isCorrect ? (
                      <span className="text-success">✓ Correct</span>
                    ) : (
                      <span className="text-danger">✗ Wrong</span>
                    )}
                  </span>
                </div>
                {qr.attempted && (
                  <div className="mt-2">
                    <p className="mb-1"><strong>Your answer:</strong> {qr.userAnswer || 'None'}</p>
                    {!qr.isCorrect && (
                      <p className="mb-0"><strong>Correct answer:</strong> {qr.correctAnswer}</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={onReturn}>
              Back to Exams
            </button>
            <div>
              <button className="btn btn-outline-primary me-2" onClick={() => window.print()}>
                Print Results
              </button>
              <button className="btn btn-primary" onClick={onRestart}>
                Retake Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;