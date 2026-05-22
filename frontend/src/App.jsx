import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Protect, PublicRoute } from './components/UI/ProtectRoute';
import Navbar from './components/UI/Navbar';
import Home from './pages/Home';
import Login from './components/Auth/LoginForm';
import Register from './components/Auth/RegisterForm';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import AdminDashboard from './pages/Admin/Dashboard'; 
import Exams from './pages/Admin/Exams';
import Questions from './pages/Admin/Questions'; 
import Students from './pages/Admin/Students'; 
import Teachers from './pages/Admin/Teachers';
import PageNotFound from './components/UI/404';
import Forbidden from './components/UI/403';
import Footer from './components/UI/Footer'; 
import ContactSupport from './pages/ContactSupport';
import PrivacySecurity from './pages/PrivacySecurity';
import About from './pages/About';

function App() {
  // Use useLocation to get the current path
  const location = useLocation();

  // Render Footer only when the path is "/"
  const showFooter = location.pathname === '/';

  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacySecurity />} />
        <Route path="/contact" element={<ContactSupport />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        
        {/* Nested Admin Routes */}
        <Route path="/admin" element={<Protect role="admin"><AdminDashboard /></Protect>}>
          <Route path="exams" element={<Exams />} />
          <Route path="questions" element={<Questions />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
        </Route>

        {/* Nested Teacher Routes */}
        <Route path="/teacher" element={<Protect role="teacher"><TeacherDashboard /></Protect>}>
          <Route path="exams" element={<Exams />} />
          <Route path="questions" element={<Questions />} />
          <Route path="students" element={<Students />} /> 
        </Route>

        {/* Nested Student Routes */}
        <Route path="/student" element={<Protect role="student"><StudentDashboard /></Protect>} /> 

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {showFooter && <Footer />}
      <ToastContainer />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}