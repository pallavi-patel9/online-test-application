import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/authService';
import { useState, useEffect } from 'react';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
 
  useEffect(() => {
    setIsLoggedIn(isAuthenticated()); 
    setRole(localStorage.getItem('role'));

    const handleStorageChange = () => {
      setIsLoggedIn(isAuthenticated());
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-custom">
      <div className="container" id='nav-container'>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="brand-primary">IBT</span>
          <span className="brand-dark ms-1">Exams</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {isLoggedIn && role && (
              <li className="nav-item">
                <Link className="nav-link" to={`/${role}`}>Dashboard</Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/privacy">Privacy</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link logout-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link to="/login" className="btn btn-outline-primary btn-nav">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-primary-custom btn-nav">
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;