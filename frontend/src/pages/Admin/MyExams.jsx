import React from "react";

const MyExams = ({ exams, onEditExam, onDeleteExam, onAddExam }) => {
   

  return (
    <div className="container mt-4">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0">
          <h2 className="h4 mb-0 text-dark">My Exams</h2>
        </div>
        <div className="card-body p-0">
          {exams.map((exam) => (
            <div key={exam.id} className="border-bottom p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h5 mb-1 text-dark">{exam.name}</h3>
                  <p className="mb-0 text-muted">
                    {exam.questions.length} question(s) • {exam.totalTime} minutes
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <p className="mb-0 me-3 text-success">
                    <span className="fw-bold">Success rate:</span> {exam.successRate}%
                  </p>
                  <button
                    onClick={() => onEditExam(exam.id)}
                    className="btn btn-sm btn-outline-secondary me-2"
                  >
                    Edit
                  </button>

                  <button
                      onClick={() => onDeleteExam(exam.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                </div>
              </div>
            </div>
          ))}

          <div className="p-3">
            <button onClick={onAddExam} className="btn btn-primary">
              Add a new Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExams;