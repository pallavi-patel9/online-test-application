// Importing axios for making HTTP requests
import axios from 'axios';

// Get all teachers
const getTeachers = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await axios.get('http://localhost:3000/teachers', config); // Send a GET request to fetch all teachers
  return response.data; // Return the response data
};
 
// Get teacher by ID
const getTeacherById = async (id) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  }; 

  const response = await axios.get(`${API_URL}/${id}`, config); // Send a GET request to fetch a specific teacher by ID
  return response.data; // Return the response data
};

// Update teacher
const updateTeacher = async (id, teacherData) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: { 
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await axios.put(`http://localhost:3000/teachers/${id}`, teacherData, config); // Send a PUT request to update a teacher's details
  return response.data; // Return the response data
};

// Delete teacher
const deleteTeacher = async (id) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await axios.delete(`http://localhost:3000/teachers/${id}`, config); // Send a DELETE request to remove a teacher
  return response.data; // Return the response data
};

// Exporting the functions for use in other parts of the application
export {
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};