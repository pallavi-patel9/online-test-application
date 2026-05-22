import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getStudents, updateStudent, deleteStudent } from '../../services/studentService';
// import Loader from '../../components/UI/Loader';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchStudents = async () => {
            try {  
                const data = await getStudents(); 
                setStudents(data); 
            } catch (error) {
                toast.error('Failed to load students');
            } 
            finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleEdit = (student) => {
        setEditingId(student._id);
        setEditForm({
            name: student.name,
            email: student.email,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value,
        });
    };

    const handleUpdate = async (id) => {
        try {
            const updatedStudent = await updateStudent(id, editForm);
            setStudents(students.map((s) => (s._id === id ? updatedStudent : s)));
            setEditingId(null);
            toast.success('Student updated successfully');
        } catch (error) {
            toast.error('Failed to update student');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) 
        {
            try {
                await deleteStudent(id);
                setStudents(students.filter((s) => s._id !== id));
                toast.success('Student deleted successfully');
            } catch (error) {
                toast.error('Failed to delete student');
            }
        }
    };

    // if (loading) {
    //     return <Loader />;
    // }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h4">Manage Students</h1>
            </div>

            <div className="card">
                <div className="card-body p-0">
                    <table className="table table-striped mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>
                                        {editingId === student._id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            student.name
                                        )}
                                    </td>
                                    <td>
                                        {editingId === student._id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            student.email
                                        )}
                                    </td>
                                    <td>
                                        {editingId === student._id ? (
                                            <>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleUpdate(student._id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-dark btn-sm me-2"
                                                    onClick={() => handleEdit(student)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(student._id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Students;
