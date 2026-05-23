// Importing axios for making HTTP requests
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get all students
const getStudents = async () => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/students`,
    config
  );

  return response.data;
};

// Get student by ID
const getStudentById = async (id) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/students/${id}`,
    config
  );

  return response.data;
};

// Update student
const updateStudent = async (id, studentData) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/students/${id}`,
    studentData,
    config
  );

  return response.data;
};

// Delete student
const deleteStudent = async (id) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/students/${id}`,
    config
  );

  return response.data;
};

// Exporting the functions
export {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};