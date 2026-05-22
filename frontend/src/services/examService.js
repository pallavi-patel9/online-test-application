import axios from 'axios';

const API_URL = 'http://localhost:3000/exams';

const examService = { 
  getExams: async () => {
    const token = localStorage.getItem('token');
    const config = { 
      headers: { Authorization: `Bearer ${token}` } 
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  }, 
 
  getExamById: async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }; 
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  },

  createExam: async (examData) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(API_URL, examData, config);
    return response.data;
  },

  updateExam: async (id, examData) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.put(`${API_URL}/${id}`, examData, config);
    return response.data;
  },

  deleteExam: async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  },

  updateExamStats: async (id, successRate) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.patch(
      `${API_URL}/${id}/stats`,
      { successRate },
      config
    );
    return response.data;
  },

  saveExamResult: async (resultData) => {
    const token = localStorage.getItem('token');
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post('http://localhost:3000/results', resultData, config);
    return response.data;
  },

  getUserResults: async (userId) => {
    if (!userId) {
      throw new Error('User ID is required to fetch results.');
    }
    // console.log(userId);
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`http://localhost:3000/results/${userId}`, config);
    return response.data;
  },  
}

export default examService;