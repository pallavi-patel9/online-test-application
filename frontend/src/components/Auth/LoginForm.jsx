import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../services/authService';
import '../../styles/Login.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loggedUser = await login(email, password);
            toast.success('Login Successful');

            if (loggedUser?.role === 'admin') navigate('/admin');
            else if (loggedUser?.role === 'teacher') navigate('/teacher');
            else if (loggedUser?.role === 'student') navigate('/student');
            else {
                toast.error('Login failed: Unauthorized role');
                return;
            }

            window.location.reload();
            return loggedUser;
        } catch (error) {
            toast.error('Login failed: Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="card login-card">
                <div className="login-header">
                    <h3 className="mb-0">Welcome Back</h3>
                    <p className="small mt-2">Sign in to your account</p>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3 form-floating">
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Email"
                            />
                            <label htmlFor="email">Email</label>
                            <div className="invalid-feedback">Please provide a valid email.</div>
                        </div>
 
                        <div className="mb-3 form-floating">
                            <input
                                type="password" 
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Password"
                            />
                            <label htmlFor="password">Password</label>
                            <div className="invalid-feedback">Please provide a valid password.</div>
                        </div>

                        <div className="mb-3">
                            <button type="submit" disabled={loading} className="btn w-100" id='login-btn'>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>

                        <p className="text-center text-muted">
                            Don't have an account? <Link to="/register" className="link-primary">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;