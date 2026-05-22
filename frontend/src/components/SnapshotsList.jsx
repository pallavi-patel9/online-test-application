import React, { useState, useEffect } from 'react';
import { getSnapshotsByExamAndUser } from '../services/snapshotService'; // Adjust the import path as necessary

const SnapshotsList = ({ examId, userId }) => {
  const [snapshots, setSnapshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        setLoading(true);

        const response = await getSnapshotsByExamAndUser(examId, userId);
        console.log('Fetched snapshots:', response);

        if (!response || response.length === 0) {
          throw new Error('No snapshots found');
        }
        setSnapshots(response); // Directly set the response as it is already an array
      } catch (err) {
        setError('Failed to fetch snapshots. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSnapshots();
  }, [examId, userId]);

  if (loading) {
    return <p>Loading snapshots...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Snapshots</h2>
      <ul>
        {snapshots.map((snapshot, index) => (
          <li key={index}>
            <img
              src={`${snapshot.image}`}
              alt={`Snapshot ${index + 1}`}
              style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
            />
            <p>Student ID: {snapshot.user}</p>
            <p>Exam ID: {snapshot.exam}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnapshotsList;