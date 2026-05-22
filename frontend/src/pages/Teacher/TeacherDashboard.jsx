import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Exams from "../Admin/Exams";
import Questions from "../Admin/Questions";
import Students from "../Admin/Students";
import { getMe, logout } from '../../services/authService';
import { getStudents } from '../../services/studentService';
import { updateTeacher } from '../../services/teacherService';
import examService from '../../services/examService';
import { toast } from "react-toastify";
import '../../styles/TeacherDashboard.css';

const TeacherDashboard = () => {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    department: '',
    designation: '',
    expertise: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (token) {
          const loggedInUser = await getMe();
          setUser(loggedInUser);
          setEditProfileForm({
            name: loggedInUser.name || '',
            email: loggedInUser.email || '',
            mobile: loggedInUser.mobile || '',
            dob: loggedInUser.dob ? new Date(loggedInUser.dob).toISOString().split('T')[0] : '',
            department: loggedInUser.teacherDetails?.department || '',
            designation: loggedInUser.teacherDetails?.designation || '',
            expertise: loggedInUser.teacherDetails?.expertise?.join(', ') || ''
          });
        }

        const examsData = await examService.getExams();
        setExams(Array.isArray(examsData) ? examsData : []);

        const studentsData = await getStudents();
        setStudents(Array.isArray(studentsData) ? studentsData : []);
      } catch (error) {
        console.error('Error loading data:', error);
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

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    // Validate expertise input
    if (name === "expertise" && value.includes(",,") || value.trim() === "") {
      toast.error("Invalid expertise format. Please enter valid comma-separated values.");
      return;
    }

    setEditProfileForm({
      ...editProfileForm,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
  try {
    const updatedData = {
      name: editProfileForm.name || user.name,
      email: editProfileForm.email || user.email,
      mobile: editProfileForm.mobile || user.mobile,
      dob: editProfileForm.dob || user.dob,
      teacherDetails: {
        department: editProfileForm.department || user.teacherDetails?.department,
        designation: editProfileForm.designation || user.teacherDetails?.designation,
        expertise: editProfileForm.expertise
          ? editProfileForm.expertise.split(',').map(item => item.trim()).filter(Boolean)
          : user.teacherDetails?.expertise
      }
    };

    const updatedTeacher = await updateTeacher(user._id, updatedData);
    setUser(updatedTeacher);
    setIsEditingProfile(false);
    toast.success('Profile updated successfully');
  } catch (error) {
    console.error('Update Profile Error:', error);
    toast.error(error.response?.data?.message || 'Failed to update profile');
  }
};

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditProfileForm({
      name: user.name || '',
      email: user.email || '',
      mobile: user.mobile || '',
      dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      department: user.teacherDetails?.department || '',
      designation: user.teacherDetails?.designation || '',
      expertise: user.teacherDetails?.expertise?.join(', ') || ''
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
              <h5 className="text-white mb-0">Teacher Panel</h5>
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
                  <i className="fas fa-clipboard-list me-2 white-icons"></i> Exams
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'questions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('questions')}
                >
                  <i className="fas fa-question-circle me-2 white-icons"></i> Questions
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 text-white ${activeTab === 'students' ? 'active' : ''}`}
                  onClick={() => setActiveTab('students')}
                >
                  <i className="fas fa-users me-2 white-icons"></i> Students
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
                            alt="Teacher"
                            className="img-fluid rounded-circle border"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-md-9">
                          <h2 className="card-title mb-3">
                            Welcome back, <span className="text-primary">{user?.name?.toUpperCase() || "Teacher"}</span>
                          </h2>
                          <p className="text-muted">
                            Manage your exams, questions, and students from this dashboard.
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
                          <h6 className="text-white-50">Total Exams</h6>
                          <h3 className="mb-0">{exams.length}</h3>
                        </div>
                        <i className="fas fa-clipboard-list fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card bg-success text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Active Students</h6>
                          <h3 className="mb-0">{students.length}</h3>
                        </div>
                        <i className="fas fa-users fa-2x opacity-50 admin-icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card bg-warning text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-white-50">Total Questions</h6>
                          <h3 className="mb-0">
                            {exams.reduce((sum, exam) => sum + (exam.questions?.length || 0), 0)}
                          </h3>
                        </div>
                        <i className="fas fa-question-circle fa-2x opacity-50 admin-icons"></i>
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
                      <h5>No exams created</h5>
                      <p className="text-muted">You haven't created any exams yet.</p>
                    </div>
                  )}
                </div>
              </div>

              {students.length > 0 && (
                <div className="card shadow-sm mt-4">
                  <div className="card-header bg-white border-0">
                    <h5 className="mb-0">Recent Students</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      {students.slice(0, 3).map((student, index) => (
                        <div key={index} className="list-group-item border-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{student.name}</h6>
                              <small className="text-muted">
                                {student.email}
                              </small>
                            </div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => setActiveTab("students")}
                            >
                              View
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

          {activeTab === "exams" && <Exams />}
          {activeTab === "questions" && <Questions />}
          {activeTab === "students" && <Students />}

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
                        <h2 className="card-title">{user?.name || "Teacher"}</h2>
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
                                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Teacher"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Department</h6>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="department"
                                  value={editProfileForm.department}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">{user?.teacherDetails?.department || "Not provided"}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Designation</h6>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="designation"
                                  value={editProfileForm.designation}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">{user?.teacherDetails?.designation || "Not provided"}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="text-muted">Expertise</h6>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="expertise"
                                  value={editProfileForm.expertise}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                  placeholder="Comma-separated values"
                                />
                              ) : (
                                <p className="mb-0 fw-bold">{user?.teacherDetails?.expertise?.join(", ") || "Not provided"}</p>
                              )}
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

export default TeacherDashboard;