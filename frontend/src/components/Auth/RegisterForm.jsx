// import { useState } from 'react';
// import { register } from '../../services/authService';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import '../../styles/Register.css';

// const RegisterForm = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('student');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const registeredUser = await register(name, email, password, role);
//             toast.success('Registration Successful');
//             navigate('/login');
//             return registeredUser;
//         } catch (error) {
//             console.log(error);
//             console.log(error.response?.data);
//             toast.error('Registration failed');
//         } finally {
//             setLoading(false);
//         }
//     }; 

//     return (
//         <div className="register-container">
//             <div className="card register-card">
//                 <div className="register-header">
//                     <h3 className="mb-0">Create Account</h3>
//                     <p className="small mt-2">Join our platform today</p>
//                 </div>
//                 <div className="card-body p-4">
//                     <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//                         <div className="mb-3 form-floating">
//                             <input
//                                 type="text"
//                                 id="name"
//                                 required
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="form-control"
//                                 placeholder="Name"
//                             />
//                             <label htmlFor="name">Name</label>
//                             <div className="invalid-feedback">Please provide a valid name.</div>
//                         </div>

//                         <div className="mb-3 form-floating">
//                             <input
//                                 type="email"
//                                 id="email"
//                                 required
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="form-control"
//                                 placeholder="Email"
//                             />
//                             <label htmlFor="email">Email</label>
//                             <div className="invalid-feedback">Please provide a valid email.</div>
//                         </div>

//                         <div className="mb-3 form-floating">
//                             <input
//                                 type="password"
//                                 id="password"
//                                 required
//                                 minLength="6"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="form-control"
//                                 placeholder="Password"
//                             />
//                             <label htmlFor="password">Password</label>
//                             <div className="invalid-feedback">Password must be at least 6 characters.</div>
//                         </div>

//                         <div className="mb-3 form-floating">
//                             <select
//                                 id="role"
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                                 className="form-select"
//                             >
//                                 <option value="student">Student</option>
//                                 <option value="admin">Admin</option>
//                                 <option value="teacher">Teacher</option>
//                             </select>
//                             <label htmlFor="role">Role</label>
//                         </div>

//                         <div className="mb-3">
//                             <button type="submit" disabled={loading} className="btn w-100" id='register-btn'>
//                                 {loading ? (
//                                     <>
//                                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                         Registering...
//                                     </>
//                                 ) : (
//                                     'Register'
//                                 )}
//                             </button>
//                         </div>

//                         <p className="text-center text-muted">
//                             Have an account? <Link to="/login" className="link-primary">Login</Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterForm;



import { useState, useEffect } from 'react';
import { register } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './RegisterForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        dob: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        university: '',
        course: '',
        semester: '',
        tDepartment: '',
        tDesignation: '',
        expertise: [],
        terms: false,
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [expertiseInput, setExpertiseInput] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'password') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        setPasswordStrength(strength);
    };

    const addExpertise = () => {
        if (expertiseInput.trim()) {
            setFormData(prev => ({
                ...prev,
                expertise: [...prev.expertise, expertiseInput.trim()]
            }));
            setExpertiseInput('');
        }
    };

    const removeExpertise = (index) => {
        setFormData(prev => ({
            ...prev,
            expertise: prev.expertise.filter((_, i) => i !== index)
        }));
    };

    const togglePasswordVisibility = (id) => {
        const input = document.getElementById(id);
        const icon = input.nextElementSibling.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        const { name, email, mobile, dob, password, confirmPassword, terms, role } = formData;
 
        if (!name) newErrors.name = 'Please enter your full name';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
        if (!mobile || !/^\+?\d{10,}$/.test(mobile)) newErrors.mobile = 'Please enter a valid mobile number';
        if (!dob) newErrors.dob = 'Please select your date of birth';
        if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!terms) newErrors.terms = 'You must agree to the terms and conditions';

        if (role === 'student') {
            if (!formData.university) newErrors.university = 'Please select your university';
            if (!formData.course) newErrors.course = 'Please select your course';
            if (!formData.semester) newErrors.semester = 'Please select your semester';
        } else if (role === 'teacher') {
            if (!formData.tDepartment) newErrors.tDepartment = 'Please select department';
            if (!formData.tDesignation) newErrors.tDesignation = 'Please select designation';
        } 

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        toast.error('Please fill all required fields correctly');
        return;
    }
 
    setLoading(true);
    try {
        const {
            name, email, mobile, dob, password, confirmPassword,
            terms, role, university, course, semester,
            tDepartment, tDesignation, expertise
        } = formData;

        const registeredUser = await register(
            name, email, mobile, dob, password, confirmPassword,
            terms, role, university, course, semester,
            tDepartment, tDesignation, expertise
        );

        toast.success('Registration Successful');
        navigate('/login');
        return registeredUser;
    } catch (error) {
        console.error(error);
        toast.error('Registration failed');
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            university: '',
            course: '',
            semester: '',
            tDepartment: '',
            tDesignation: '',
            expertise: [],
        }));
        setExpertiseInput('');
        setErrors({});
    }, [formData.role]);

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className={`card-header text-white text-center ${formData.role === 'admin' ? 'bg-admin' : 'bg-gradient'}`}>
                            <h1 className="card-title mb-0" style={{color: "white"}}>Create Your Account</h1>
                            <p className="small">Join the IBT examination system</p>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                <div className="mb-4">
                                    <h5 className="section-title"><i className="fas fa-user-tag me-2"></i>Select Your Role</h5>
                                    <div className="d-flex flex-column flex-md-row gap-3">
                                        {['student', 'teacher', 'admin'].map(r => (
                                            <div key={r} className="flex-fill">
                                                <input
                                                    type="radio"
                                                    id={`role${r.charAt(0).toUpperCase() + r.slice(1)}`}
                                                    name="role"
                                                    value={r}
                                                    checked={formData.role === r}
                                                    onChange={handleChange}
                                                    className="d-none"
                                                />
                                                <label
                                                    htmlFor={`role${r.charAt(0).toUpperCase() + r.slice(1)}`}
                                                    className={`role-option btn btn-outline-${r} w-100 text-center ${formData.role === r ? `active-${r}` : ''}`}
                                                >
                                                    <i className={`fas fa-${r === 'student' ? 'user-graduate' : r === 'teacher' ? 'chalkboard-teacher' : 'user-shield'} mb-2`}></i>
                                                    <div>{r.charAt(0).toUpperCase() + r.slice(1)}</div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h5 className="section-title"><i className="fas fa-id-card me-2"></i>Basic Information</h5>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                            <input
                                                type="tel"
                                                id="mobile"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                                            <input
                                                type="date"
                                                id="dob"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                                        </div>
                                    </div>
                                </div>

                                {formData.role === 'student' && (
                                    <div className="mb-4">
                                        <h5 className="section-title"><i className="fas fa-graduation-cap me-2"></i>Academic Details</h5>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="university" className="form-label">University</label>
                                                <select
                                                    id="university"
                                                    name="university"
                                                    value={formData.university}
                                                    onChange={handleChange}
                                                    className={`form-select ${errors.university ? 'is-invalid' : ''}`}
                                                    required
                                                >
                                                    <option value="">Select University</option>
                                                    <option value="bbdu">Babu Banarasi Das University</option>
                                                </select>
                                                {errors.university && <div className="invalid-feedback">{errors.university}</div>}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="course" className="form-label">Course</label>
                                                <select
                                                    id="course"
                                                    name="course"
                                                    value={formData.course}
                                                    onChange={handleChange}
                                                    className={`form-select ${errors.course ? 'is-invalid' : ''}`}
                                                    required
                                                >
                                                    <option value="">Select Course</option>
                                                    <option value="BCA">BCA</option>
                                                    <option value="BCA-DS">BCA (Data Science & Artificial Intelligence)</option>
                                                    <option value="BCA-CS">BCA (Cyber Security & Forensic)</option>
                                                    <option value="BSc">B.Sc (Computer Science)</option>
                                                    <option value="MCA">MCA</option>
                                                    <option value="MCA-DS">MCA (Data Science & Artificial Intelligence)</option>
                                                    <option value="MCA-CS">MCA (Cyber Security & Forensic)</option>
                                                    <option value="B-Tech">B-Tech</option>
                                                </select>
                                                {errors.course && <div className="invalid-feedback">{errors.course}</div>}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="semester" className="form-label">Semester</label>
                                                <select
                                                    id="semester"
                                                    name="semester"
                                                    value={formData.semester}
                                                    onChange={handleChange}
                                                    className={`form-select ${errors.semester ? 'is-invalid' : ''}`}
                                                    required
                                                >
                                                    <option value="">Select Semester</option>
                                                    {[...Array(8)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                                                    ))}
                                                </select>
                                                {errors.semester && <div className="invalid-feedback">{errors.semester}</div>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {formData.role === 'teacher' && (
                                    <div className="mb-4">
                                        <h5 className="section-title text-teacher"><i className="fas fa-chalkboard me-2"></i>Professional Details</h5>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="tDepartment" className="form-label">Department</label>
                                                <select
                                                    id="tDepartment"
                                                    name="tDepartment"
                                                    value={formData.tDepartment}
                                                    onChange={handleChange}
                                                    className={`form-select ${errors.tDepartment ? 'is-invalid' : ''}`}
                                                    required
                                                >
                                                    <option value="">Select Department</option>
                                                    <option value="computer-science">Computer Science</option>
                                                    <option value="mathematics">Mathematics</option>
                                                    <option value="physics">Physics</option>
                                                    <option value="commerce">Commerce</option>
                                                    <option value="english">English</option>
                                                </select>
                                                {errors.tDepartment && <div className="invalid-feedback">{errors.tDepartment}</div>}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="tDesignation" className="form-label">Designation</label>
                                                <select
                                                    id="tDesignation"
                                                    name="tDesignation"
                                                    value={formData.tDesignation}
                                                    onChange={handleChange}
                                                    className={`form-select ${errors.tDesignation ? 'is-invalid' : ''}`}
                                                    required
                                                >
                                                    <option value="">Select Designation</option>
                                                    <option value="professor">Professor</option>
                                                    <option value="associate">Associate Professor</option>
                                                    <option value="assistant">Assistant Professor</option>
                                                    <option value="lecturer">Lecturer</option>
                                                    <option value="visiting">Visiting Faculty</option>
                                                </select>
                                                {errors.tDesignation && <div className="invalid-feedback">{errors.tDesignation}</div>}
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="expertiseInput" className="form-label">Areas of Expertise</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        id="expertiseInput"
                                                        value={expertiseInput}
                                                        onChange={(e) => setExpertiseInput(e.target.value)}
                                                        className="form-control"
                                                        placeholder="E.g: Database Systems, AI"
                                                    />
                                                    <button type="button" className="btn expertise-btn" onClick={addExpertise}>Add</button>
                                                </div>
                                                <div className="mt-2 d-flex flex-wrap gap-2">
                                                    {formData.expertise.map((exp, index) => (
                                                        <span key={index} className="badge expertise-data">
                                                            {exp}
                                                            <i
                                                                className="fas fa-times ms-2 cursor-pointer expertise-data-btn"
                                                                onClick={() => removeExpertise(index)}
                                                            ></i>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}



                                <div className="mb-4">
                                    <h5 className="section-title"><i className="fas fa-lock me-2"></i>Account Security</h5>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <div className="input-group">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    required
                                                />
                                                <span className="input-group-text">
                                                    <i className="fas fa-eye cursor-pointer" onClick={() => togglePasswordVisibility('password')}></i>
                                                </span>
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>
                                            <div className="progress mt-2" style={{ height: '4px' }}>
                                                <div
                                                    className={`progress-bar ${passwordStrength <= 25 ? 'bg-danger' : passwordStrength <= 50 ? 'bg-warning' : passwordStrength <= 75 ? 'bg-info' : 'bg-success'}`}
                                                    style={{ width: `${passwordStrength}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <div className="input-group">
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                    required
                                                />
                                                <span className="input-group-text">
                                                    <i className="fas fa-eye cursor-pointer" onClick={() => togglePasswordVisibility('confirmPassword')}></i>
                                                </span>
                                                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4 form-check">
                                    <input
                                        type="checkbox"
                                        id="terms" 
                                        name="terms"
                                        checked={formData.terms}
                                        onChange={handleChange}
                                        className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    <label htmlFor="terms" className="form-check-label">
                                        I agree to the <a href="#" className={`text-${formData.role}`}>Terms and Conditions</a>
                                    </label>
                                    {errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}
                                </div>

                                <button type="submit" disabled={loading} className={"btn w-100 mb-3 register-btn"}  style={{ backgroundColor: ' limegreen', color: 'white' }}>
                                    {loading ? 'Registering...' : 'Create Account'}
                                </button>

                                <p className="text-center text-muted">
                                    Already have an account? <Link to="/login" className={`text-${formData.role} text-decoration-none`}>Log In</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;