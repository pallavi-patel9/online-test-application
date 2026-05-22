import axios from 'axios';

const API_URL = 'http://localhost:3000';

const createResult = async (resultData) => {
  try {
    const response = await axios.post(`${API_URL}/results`, resultData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getResultsByStudent = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/results/student/${studentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  createResult,
  getResultsByStudent
};










