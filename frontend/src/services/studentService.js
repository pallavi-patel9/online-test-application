// Importing axios for making HTTP requests
import axios from 'axios';

// Get all students
const getStudents = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await axios.get('http://localhost:3000/students', config); // Send a GET request to fetch all students
  return response.data; // Return the response data
};

// Get student by ID
const getStudentById = async (id) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config); // Send a GET request to fetch a specific student by ID
  return response.data; // Return the response data
};

// Update student 
const updateStudent = async (id, studentData) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: { 
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  console.log(studentData);

  const response = await axios.put(`http://localhost:3000/students/${id}`, studentData, config); // Send a PUT request to update a student's details
  return response.data; // Return the response data
};

// Delete student
const deleteStudent = async (id) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await axios.delete(`http://localhost:3000/students/${id}`, config); // Send a DELETE request to remove a student
  return response.data; // Return the response data
};

// Exporting the functions for use in other parts of the application
export {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};