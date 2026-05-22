// snapshotService.js
import axios from 'axios';
import { getMe } from '../services/authService'; // Assuming getMe is a function that fetches the current user

const snapshotService = {
  uploadSnapshot: async (examId, imageBase64) => {

    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const user = await getMe();  
    // console.log('imageBase64:', imageBase64);

    await axios.post("http://localhost:3000/snapshots", {
      examId,
      studentId: user._id,
      imageBase64
    }, config);
  }
};

const getSnapshotsByExamAndUser = async (examId, userId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.get(`http://localhost:3000/snapshots/${examId}/${userId}`, config);
  return response.data;
};

export default snapshotService;
export { getSnapshotsByExamAndUser };