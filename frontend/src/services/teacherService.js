// Importing axios for making HTTP requests
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get all teachers
const getTeachers = async () => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/teachers`,
    config
  );

  return response.data;
};

// Get teacher by ID
const getTeacherById = async (id) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/teachers/${id}`,
    config
  );

  return response.data;
};

// Update teacher
const updateTeacher = async (id, teacherData) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/teachers/${id}`,
    teacherData,
    config
  );

  return response.data;
};

// Delete teacher
const deleteTeacher = async (id) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/teachers/${id}`,
    config
  );

  return response.data;
};

// Exporting the functions
export {
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};