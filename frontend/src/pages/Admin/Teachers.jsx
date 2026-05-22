import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTeachers, updateTeacher, deleteTeacher } from '../../services/teacherService';
// import Loader from '../../components/UI/Loader';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchTeachers = async () => {
            try {  
                const data = await getTeachers(); 
                setTeachers(data); 
            } catch (error) {
                toast.error('Failed to load teachers');
            } 
            // finally {
            //     setLoading(false);
            // }
        };

        fetchTeachers();
    }, []);

    const handleEdit = (teacher) => {
        setEditingId(teacher._id);
        setEditForm({
            name: teacher.name,
            email: teacher.email,
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
            const updatedTeacher = await updateTeacher(id, editForm);
            setTeachers(teachers.map((s) => (s._id === id ? updatedTeacher : s)));
            setEditingId(null);
            toast.success('Teacher updated successfully');
        } catch (error) {
            toast.error('Failed to update teacher');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) 
        {
            try {
                await deleteTeacher(id);
                setTeachers(teachers.filter((s) => s._id !== id));
                toast.success('Teacher deleted successfully');
            } catch (error) {
                toast.error('Failed to delete teacher');
            }
        }
    };

    // if (loading) {
    //     return <Loader />;
    // }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h4">Manage Teachers</h1>
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
                            {teachers.map((teacher) => (
                                <tr key={teacher._id}>
                                    <td>
                                        {editingId === teacher._id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            teacher.name
                                        )}
                                    </td>
                                    <td>
                                        {editingId === teacher._id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            teacher.email
                                        )}
                                    </td>
                                    <td>
                                        {editingId === teacher._id ? (
                                            <>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleUpdate(teacher._id)}
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
                                                    onClick={() => handleEdit(teacher)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(teacher._id)}
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

export default Teachers;
