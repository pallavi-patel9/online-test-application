import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Exams from "./Exams";
import Questions from "./Questions";
import Students from "./Students";
import Teachers from './Teachers';
import SnapshotsList from '../../components/SnapshotsList'; // Import the SnapshotsList component
import { getMe, logout } from '../../services/authService';
import { getStudents } from '../../services/studentService';
import { getTeachers } from '../../services/teacherService';
import examService from '../../services/examService';
import { toast } from "react-toastify";
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalExams: 0,
    activeStudents: 0,
    activeTeachers: 0,
    totalQuestions: 0,
    recentActivity: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const token = localStorage.getItem('token');
        if (token) {
          const loggedInUser = await getMe();
          setUser(loggedInUser);
        }

        // Fetch all data
        const studentsData = await getStudents();
        const teachersData = await getTeachers();
        const examsData = await examService.getExams();

        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setTeachers(Array.isArray(teachersData) ? teachersData : []);
        setExams(Array.isArray(examsData) ? examsData : []);

        // Calculate total questions
        const totalQuestions = examsData.reduce((sum, exam) => sum + (exam.questions?.length || 0), 0);

        // Prepare recent activity
        const recentActivity = [
          {
            type: 'exam',
            action: 'created',
            count: 1,
            timestamp: new Date(Date.now() - 300000)
          },
          {
            type: 'student',
            action: 'registered',
            count: studentsData.length > 3 ? 3 : studentsData.length,
            timestamp: new Date(Date.now() - 3600000)
          },
          {
            type: 'question',
            action: 'added',
            count: totalQuestions > 10 ? 10 : totalQuestions,
            timestamp: new Date(Date.now() - 7200000)
          }
        ];

        setStats({
          totalExams: examsData.length,
          activeStudents: studentsData.length,
          activeTeachers: teachersData.length,
          totalQuestions,
          recentActivity
        });

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Format activity message
  const formatActivityMessage = (activity) => {
    const { type, action, count } = activity;
    const types = {
      exam: { single: 'exam', plural: 'exams' },
      student: { single: 'student', plural: 'students' },
      teacher: { single: 'teacher', plural: 'teachers' },
      question: { single: 'question', plural: 'questions' }
    };

    const typeStr = count === 1 ? types[type].single : types[type].plural;
    const actionStr = action === 'created' ? 'created' :
      action === 'registered' ? 'registered' : 'added';

    return `${count} new ${typeStr} ${actionStr}`;
  };

  // Format time ago
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  };

  // Helper function to get activity icon
  const getActivityIcon = (type) => {
    switch (type) {
      case 'exam': return 'clipboard-list';
      case 'student': return 'user';
      case 'question': return 'question-circle';
      default: return 'info-circle';
    }
  };

  // Helper function to get activity color
  const getActivityColor = (type) => {
    switch (type) {
      case 'exam': return 'primary';
      case 'student': return 'success';
      case 'question': return 'info';
      default: return 'secondary';
    }
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
          className={`col-md-3 col-lg-2 p-0 bg-dark text-white ${sidebarCollapsed ? 'd-none' : ''}`}
          style={{ minHeight: 'calc(100vh - 56px)' }}
        >
          <div className="d-flex flex-column h-100 p-3">
            <div className="mb-4 mt-2 text-center">
              <h5 className="text-white mb-0">Admin Panel</h5>
            </div>

            <ul className="nav nav-pills flex-column gap-2 mb-auto">
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'dashboard' ? 'active bg-primary' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <i className="fas fa-tachometer-alt me-2 white-icons"></i> Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'exams' ? 'active bg-primary' : ''}`}
                  onClick={() => setActiveTab('exams')}
                >
                  <i className="fas fa-clipboard-list me-2 white-icons"></i> Exams
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'questions' ? 'active bg-primary' : ''}`}
                  onClick={() => setActiveTab('questions')}
                >
                  <i className="fas fa-question-circle me-2 white-icons"></i> Questions
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'students' ? 'active bg-primary' : ''}`}
                  onClick={() => setActiveTab('students')}
                >
                  <i className="fas fa-users me-2 white-icons"></i> Students
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'teachers' ? 'active bg-primary' : ''}`}
                  onClick={() => setActiveTab('teachers')}
                >
                  <i className="fas fa-users me-2 white-icons"></i> Teachers
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'snapshots' ? 'active bg-primary' : ''}`}
                  onClick={() => setActiveTab('snapshots')}
                >
                  <i className="fas fa-camera me-2 white-icons"></i> Snapshots
                </button>
              </li>
              <br />
              <li className="nav-item">
                <button
                  className="nav-link text-start w-100 text-white"
                  style={{ backgroundColor: 'red' }}
                  onClick={handleLogout}
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
                            alt="Admin"
                            className="img-fluid rounded-circle border"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-md-9">
                          <h2 className="card-title mb-3">
                            Welcome back, <span className="text-primary">{user?.name?.toUpperCase() || "Admin"}</span>
                          </h2>
                          <p className="text-muted">
                            Manage all system data from this dashboard.
                          </p>
                          <div className="d-flex gap-3">
                            <button
                              className="btn btn-primary"
                              onClick={() => setActiveTab("exams")}
                            >
                              Manage Exams
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => setActiveTab("students")}
                            >
                              View Students
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => setActiveTab("teachers")}
                            >
                              View Teachers
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3 mb-4">
                  <div className="card bg-primary text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Total Exams</h6>
                          <h3 className="mb-0">{stats.totalExams}</h3>
                        </div>
                        <i className="fas fa-clipboard-list fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="card bg-success text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Active Students</h6>
                          <h3 className="mb-0">{stats.activeStudents}</h3>
                        </div>
                        <i className="fas fa-users fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="card bg-success text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Active Teachers</h6>
                          <h3 className="mb-0">{stats.activeTeachers}</h3>
                        </div>
                        <i className="fas fa-users fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="card bg-warning text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Total Questions</h6>
                          <h3 className="mb-0">{stats.totalQuestions}</h3>
                        </div>
                        <i className="fas fa-question-circle fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card shadow-sm">
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
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => setActiveTab("exams")}
                                >
                                  Manage
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                          <h5>No exams found</h5>
                          <p className="text-muted">There are no exams in the system yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card shadow-sm">
                    <div className="card-header bg-white border-0">
                      <h5 className="mb-0">Recent Activity</h5>
                    </div>
                    <div className="card-body">
                      <div className="list-group list-group-flush">
                        {stats.recentActivity.map((activity, index) => (
                          <div className="list-group-item border-0" key={index}>
                            <div className="d-flex align-items-center">
                              <div className={`bg-${getActivityColor(activity.type)} bg-opacity-10 p-2 rounded me-3`}>
                                <i className={`fas fa-${getActivityIcon(activity.type)} text-${getActivityColor(activity.type)} admin-icons`}></i>
                              </div>
                              <div>
                                <h6 className="mb-1">{formatActivityMessage(activity)}</h6>
                                <small className="text-muted">{formatTimeAgo(activity.timestamp)}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "exams" && <Exams />}
          {activeTab === "questions" && <Questions />}
          {activeTab === "students" && <Students />}
          {activeTab === "teachers" && <Teachers />}
          {activeTab === "snapshots" && (
            <SnapshotsList examId="68184a439ed879dd6d400584" userId="681ef14276e1718878cf4978" />  
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;