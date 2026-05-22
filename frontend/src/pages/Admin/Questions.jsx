import { useState, useEffect } from 'react';
import examService from '../../services/examService';
import { toast } from 'react-toastify';

const Questions = () => {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await examService.getExams();
                setExams(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching exams:', error);
                toast.error('Failed to load exams');
                setLoading(false);
            }
        };
        fetchExams();
    }, []);

    useEffect(() => {
        if (selectedExam) {
            const examQuestions = selectedExam.questions && Array.isArray(selectedExam.questions)
                ? selectedExam.questions
                : [];
            setQuestions(examQuestions);
            // console.log('Selected exam questions:', examQuestions);
        }
    }, [selectedExam]);

    const handleExamSelect = (examId) => {
        const exam = exams.find(e => e._id === examId);
        setSelectedExam(exam);
        setExpandedQuestion(null);
    };

    const toggleQuestionExpand = (questionId) => {
        setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="mb-0">Question Bank</h2>
                    <p className="text-muted">View questions for your exams</p>
                </div>
            </div>

            <div className="row">
                {/* Exam Selection Card */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Select Exam</h5>
                        </div>
                        <div className="card-body">
                            <div className="list-group">
                                {exams.map(exam => (
                                    <button
                                        key={exam._id}
                                        className={`list-group-item list-group-item-action ${selectedExam?._id === exam._id ? 'active' : ''}`}
                                        onClick={() => handleExamSelect(exam._id)}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{exam.name}</span>
                                            <span className="badge bg-primary rounded-pill">
                                                {exam.questions?.length || 0}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions Card */}
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">
                                {selectedExam ? `${selectedExam.name} Questions` : 'Select an exam to view questions'}
                            </h5>
                        </div>

                        {selectedExam ? (
                            <div className="card-body">
                                {questions.length > 0 ? (
                                    <div className="list-group">
                                        {questions.map((question, index) => {
                                            // find correct index
                                            const correctIndex = question.choices?.findIndex(choice => choice === question.correct);

                                            return (
                                                <div key={question._id} className="list-group-item mb-2 rounded">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <span className="badge bg-secondary me-2 text-capitalize">
                                                                {index + 1}
                                                            </span>
                                                            <span>{question.question || 'No question text'}</span>
                                                        </div>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => toggleQuestionExpand(question._id)}
                                                        >
                                                            {expandedQuestion === question._id ? '▲' : '▼'}
                                                        </button>
                                                    </div>

                                                    {expandedQuestion === question._id && (
                                                        <div className="mt-3 p-3 bg-light rounded">
                                                            <h6>Options:</h6>
                                                            <ul className="list-group">
                                                                {(question.choices || []).map((option, idx) => (
                                                                    <li
                                                                        key={idx}
                                                                        className={`list-group-item ${idx === correctIndex ? 'list-group-item-success' : ''}`}
                                                                    >
                                                                        <strong>{String.fromCharCode(65 + idx)}) </strong>
                                                                        {option || `Option ${idx + 1}`}
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            {/* Display Correct Option Separately */}
                                                            <div className="mt-3">
                                                                {correctIndex !== -1 ? (
                                                                    <h6 className="text-success">
                                                                        Correct Option: <strong>{String.fromCharCode(65 + correctIndex)})</strong> {question.choices[correctIndex]}
                                                                    </h6>
                                                                ) : (
                                                                    <h6 className="text-danger">Correct option not available</h6>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="alert alert-info mb-0">
                                        No questions found for this exam
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="card-body text-center py-5">
                                <div className="text-muted">
                                    <i className="fas fa-clipboard-question fa-3x mb-3"></i>
                                    <p>Please select an exam to view questions</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;   