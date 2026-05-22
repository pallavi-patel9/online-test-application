import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExamPlayer from "../Admin/ExamPlayer";
import ExamResult from "../Admin/ExamResult";
import examService from "../../services/examService";
import { getMe, logout } from '../../services/authService';
import { updateStudent } from '../../services/studentService';
import { toast } from "react-toastify";
import "../../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingExamId, setPlayingExamId] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    university: '',
    course: '',
    semester: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const loggedInUser = await getMe();
         
          setUser(loggedInUser);
          setEditProfileForm({
            name: loggedInUser.name || '',
            email: loggedInUser.email || '',
            mobile: loggedInUser.mobile || '',
            dob: loggedInUser.dob ? new Date(loggedInUser.dob).toISOString().split('T')[0] : '',
            university: loggedInUser.studentDetails?.university || '',
            course: loggedInUser.studentDetails?.course || '',
            semester: loggedInUser.studentDetails?.semester || ''
          });
        }

        const data = await examService.getExams();
        setExams(Array.isArray(data) ? data : []);

        const loggedInUser = await getMe();
        const resultsData = await examService.getUserResults(loggedInUser._id);
        // console.log(resultsData);
        setResults(Array.isArray(resultsData) ? resultsData : []);

      } catch (error) {
        console.error('Error loading data:', error);
        toast.error("Failed to load exams");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlayExam = (id) => {
    setPlayingExamId(id);
    setExamResult(null);
  };

  const handleReturnToExams = () => {
    setPlayingExamId(null);
    setExamResult(null);
    setActiveTab("exams");
    // window.location.reload();
  };

  const handleExamFinish = async (result) => {
    try {
      const successRate = Math.round((result.score / result.totalQuestions) * 100);
      await examService.updateExamStats(result.exam._id, successRate);
      setExamResult(result);
      setPlayingExamId(null);
      setActiveTab("results");
      // window.location.reload();
    } catch (error) {
      toast.error("Failed to save exam results");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfileForm({
      ...editProfileForm,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      // Merge current user data with form data to preserve fields not in form
      const updatedData = {
        name: editProfileForm.name || user.name,
        email: editProfileForm.email || user.email,
        mobile: editProfileForm.mobile || user.mobile,
        dob: editProfileForm.dob || user.dob,
        studentDetails: {
          university: editProfileForm.university || user.studentDetails?.university,
          course: editProfileForm.course || user.studentDetails?.course,
          semester: editProfileForm.semester || user.studentDetails?.semester
        },
        role: user.role, // Preserve role
        avatar: user.avatar, // Preserve avatar if exists 
        createdAt: user.createdAt // Preserve createdAt
      };

      const updatedStudent = await updateStudent(user._id, updatedData);
      setUser(updatedStudent);
      setIsEditingProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditProfileForm({
      name: user.name || '',
      email: user.email || '',
      mobile: user.mobile || '',
      dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      university: user.studentDetails?.university || '',
      course: user.studentDetails?.course || '',
      semester: user.studentDetails?.semester || ''
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className={`col-md-3 col-lg-2 p-0 sidebar text-white ${sidebarCollapsed ? 'd-none' : ''}`}
          style={{ minHeight: 'calc(100vh - 56px)' }}
        >
          <div className="d-flex flex-column h-100 p-3">
            <div className="mb-4 mt-2 text-center">
              <h5 className="text-white mb-0">Student Portal</h5>
            </div>
            <ul className="nav nav-pills flex-column gap-2 mb-auto">
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <i className="fas fa-tachometer-alt me-2 white-icons"></i> Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'exams' ? 'active' : ''}`}
                  onClick={() => setActiveTab('exams')}
                >
                  <i className="fas fa-book me-2 white-icons"></i> My Exams
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'results' ? 'active' : ''}`}
                  onClick={() => setActiveTab('results')}
                >
                  <i className="fas fa-chart-bar me-2 white-icons"></i> Results
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="fas fa-user me-2 white-icons"></i> Profile
                </button>
              </li>
              <br />
              <li className="nav-item">
                <button
                  className="nav-link text-start w-100 text-white"
                  style={{ backgroundColor: 'red' }}
                  onClick={() => { logout(); }}
                >
                  <i className="fas fa-sign-out-alt me-2 white-icons"></i> Logout
                </button>
              </li>
            </ul>
            <div className="mt-auto pt-3 border-top">
              <div className="text-center">
                <small className="text-white-50">IBT System v1.0</small>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`${sidebarCollapsed ? 'col-md-12' : 'col-md-9 col-lg-10'} p-4`}>
          {activeTab === "dashboard" && (
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-3 text-center">
                          <img
                            src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name}
                            alt="Student"
                            className="img-fluid rounded-circle border"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-md-9">
                          <h2 className="card-title mb-3">
                            Welcome back, <span className="text-primary">{user?.name?.toUpperCase() || "Student"}</span>
                          </h2>
                          <p className="text-muted">
                            Ready to tackle your next exam? Check out the available tests below or review your previous results.
                          </p>
                          <div className="d-flex gap-3">
                            <button
                              className="btn btn-primary"
                              onClick={() => setActiveTab("exams")}
                            >
                              View Exams
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => setActiveTab("results")}
                            >
                              View Results
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-4 mb-4">
                  <div className="card bg-primary text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Available Exams</h6>
                          <h3 className="mb-0">{exams.length}</h3>
                        </div>
                        <i className="fas fa-book fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card bg-success text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Completed Exams</h6>
                          <h3 className="mb-0">{results.length}</h3>
                        </div>
                        <i className="fas fa-chart-bar fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card bg-warning text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Average Score</h6>
                          <h3 className="mb-0">
                            {results.length > 0
                              ? Math.round(
                                results.reduce(
                                  (acc, result) => acc + (result.score / result.totalQuestions),
                                  0
                                ) / results.length * 100
                              ) + '%'
                              : '-'}
                          </h3>
                        </div>
                        <i className="fas fa-chart-bar fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm mt-4">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0">Recent Exams</h5>
                </div>
                <div className="card-body">
                  {exams.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {exams.slice(0, 3).map(exam => (
                        <div key={exam._id} className="list-group-item border-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{exam.name}</h6>
                              
                              <small className="text-muted">{exam.questions?.length || 0} questions</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fas fa-book fa-3x text-muted mb-3"></i>
                      <h5>No exams available</h5>
                      <p className="text-muted">There are currently no exams assigned to you.</p>
                    </div>
                  )}
                </div>
              </div>

              {results.length > 0 && (
                <div className="card shadow-sm mt-4">
                  <div className="card-header bg-white border-0">
                    <h5 className="mb-0">Recent Results</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      {results.slice(0, 3).map((result, index) => (
                        <div key={index} className="list-group-item border-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">
                                {exams.find(e => e._id === result.examId)?.name || 'Exam'}
                              </h6>
                              <small className="text-muted">
                                Score: {result.score}/{result.totalQuestions} • {Math.round((result.score / result.totalQuestions) * 100)}%
                              </small>
                            </div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setExamResult({
                                  exam: exams.find(e => e._id === result.examId),
                                  score: result.score,
                                  totalQuestions: result.totalQuestions
                                });
                                setActiveTab("results");
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "exams" && (
            <div className="container-fluid py-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0">Available Exams</h5>
                </div>
                <div className="card-body">
                  {playingExamId ? (
                    <ExamPlayer
                      exam={exams.find(q => q._id === playingExamId)}
                      onReturnToExams={handleReturnToExams}
                      onFinish={handleExamFinish}
                    />
                  ) : exams.length > 0 ? (
                    <div className="row">
                      {exams.map(exam => (
                        <div key={exam._id} className="col-md-4 mb-4">
                          <div className="card h-100">
                            <div className="card-body">
                              <h5 className="card-title">{exam.name}</h5>
                              <p className="card-text text-muted">
                                {exam.description || "No description available"}
                              </p>
                              <p className="card-text">
                                <small className="text-muted">
                                  {exam.questions?.length || 0} questions • Time limit: {exam.timeLimit || 'No limit'}
                                </small>
                              </p>
                              <button
                                className="btn btn-primary"
                                onClick={() => handlePlayExam(exam._id)}
                              >
                                Start Exam
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fas fa-book fa-3x text-muted mb-3"></i>
                      <h5>No exams available</h5>
                      <p className="text-muted">There are currently no exams assigned to you.</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => setActiveTab("dashboard")}
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="container-fluid py-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0">Exam Results</h5>
                </div>
                <div className="card-body">
                  {examResult ? (
                    <ExamResult
                      result={examResult}
                      onRestart={() => setPlayingExamId(examResult.exam._id)}
                      onReturn={handleReturnToExams}
                    />
                  ) : results.length > 0 ? (
                    <div className="row">
                      {results.map((result, index) => (
                        <div key={index} className="col-md-4 mb-4">
                          <div className="card h-100">
                            <div className="card-body">
                              <h5 className="card-title">
                                {exams.find(e => e._id === result.exam)?.name || `Exam (ID: ${result.examId || 'Unknown'})`}
                              </h5>
                              <p className="card-text">
                                Score: {result.score}/{result.totalQuestions} • {Math.round((result.score / result.totalQuestions) * 100)}%
                              </p>
                              <p className="card-text">
                                <small className="text-muted">
                                  Completed on: {new Date(result.createdAt).toLocaleString()}
                                </small>
                              </p>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setExamResult({
                                    exam: exams.find(e => e._id === result.examId),
                                    score: result.score,
                                    totalQuestions: result.totalQuestions,
                                    savedAnswers: result.answers,
                                    attempts: result.attempts,
                                    timeSpent: result.timeSpent
                                  });
                                }}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                      <h5>No results available</h5>
                      <p className="text-muted">You haven't completed any exams yet.</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => setActiveTab("exams")}
                      >
                        Take an Exam
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="container-fluid py-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-3 text-center">
                      <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name}
                        alt="Profile"
                        className="img-fluid rounded-circle border"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="card-title">{user?.name || "Student"}</h2>
                        {!isEditingProfile && (
                          <button
                            className="btn btn-primary"
                            onClick={handleEditProfile}
                          >
                            Edit Profile
                          </button>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Email</h6>
                              <p className="mb-0 fw-bold">{user?.email || "Not provided"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Role</h6>
                              <p className="mb-0 fw-bold">
                                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Not provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">DOB</h6>
                              {isEditingProfile ? (
                                <input
                                  type="date"
                                  name="dob"
                                  value={editProfileForm.dob}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">
                                  {user?.dob ? new Date(user?.dob).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) : "Not provided"}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Phone no</h6>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="mobile"
                                  value={editProfileForm.mobile}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">
                                  {user?.mobile || "Not provided"}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">University</h6>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="university"
                                  value={editProfileForm.university}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">
                                  {user?.studentDetails?.university.toUpperCase() || "Not provided"}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Course</h6>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="course"
                                  value={editProfileForm.course}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">
                                  {user?.studentDetails?.course.toUpperCase() || "Not provided"}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Semester</h6>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="semester"
                                  value={editProfileForm.semester}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">
                                  {user?.studentDetails?.semester || "Not provided"}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Member Since</h6>
                              <p className="mb-0 fw-bold">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isEditingProfile && (
                        <div className="d-flex gap-2 mt-3">
                          <button
                            className="btn btn-success"
                            onClick={handleUpdateProfile}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {!isEditingProfile && (
                        <button
                          className="btn btn-outline-primary mt-3"
                          onClick={() => setActiveTab("dashboard")}
                        >
                          Back to Dashboard
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;