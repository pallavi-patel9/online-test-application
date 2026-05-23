// snapshotService.js
import axios from 'axios';
import { getMe } from '../services/authService';

const API_URL = import.meta.env.VITE_API_URL;

const snapshotService = {
  uploadSnapshot: async (examId, imageBase64) => {

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const user = await getMe();

    await axios.post(`${API_URL}/snapshots`, {
      examId,
      studentId: user._id,
      imageBase64
    }, config);
  }
};

const getSnapshotsByExamAndUser = async (examId, userId) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(
    `${API_URL}/snapshots/${examId}/${userId}`,
    config
  );

  return response.data;
};

export default snapshotService;
export { getSnapshotsByExamAndUser };