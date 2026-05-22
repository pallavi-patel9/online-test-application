// authService.js 
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// const register = async (name, email, password, role) => {
//   const response = await axios.post(`${API_URL}/register`, {
//     name, email, password, role,
//   });
//   return response.data;
// };


const register = async (
  name, email, mobile, dob, password, confirmPassword,
  terms, role, university, course, semester,
  tDepartment, tDesignation, expertise
) => {
  const response = await axios.post(`${API_URL}/register`, {
    name, email, mobile, dob, password, confirmPassword,
    terms, role, university, course, semester,
    tDepartment, tDesignation, expertise
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('role', response.data.role);
    // Add user data to localStorage if available
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  }

  return response.data;
};

const logout = () => {
  localStorage.clear();
  toast.success("Logged out successfully!");
  window.location.reload();
  window.location.href = "/";
};

const getMe = async () => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/profile`, config);
  return response.data;
};

export { isAuthenticated, register, login, getMe, logout };