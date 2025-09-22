import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye } from 'react-icons/fa';
import api from '../../api/axios';

const AssignmentsContent = () => {
    const [assignments, setAssignments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '', description: '' });

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await api.get('/assignments');
                setAssignments(response.data.data);
            } catch (error) {
                console.error("Failed to fetch assignments", error);
            }
        };
        fetchAssignments();
    }, []);

    const handleInputChange = (e) => {
        setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/assignments', newAssignment);
            setAssignments([...assignments, response.data.data]); // Add new assignment to the list
            setIsModalOpen(false); // Close modal
            setNewAssignment({ title: '', course: '', dueDate: '', description: '' }); // Reset form
        } catch (error) {
            console.error("Failed to create assignment", error);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">Assignments</h1>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg">
                    <FaPlus /> Create New
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Published Assignments</h3>
                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <p className="font-bold">{assignment.title}</p>
                                <p className="text-sm text-gray-500">{assignment.course} | Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                            </div>
                            <button className="flex items-center gap-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm"><FaEye /> View</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">New Assignment</h2>
                        <form onSubmit={handleCreateAssignment} className="space-y-4">
                            <input name="title" value={newAssignment.title} onChange={handleInputChange} placeholder="Title" required className="w-full p-2 border rounded"/>
                            <input name="course" value={newAssignment.course} onChange={handleInputChange} placeholder="Course (e.g., CS-101)" required className="w-full p-2 border rounded"/>
                            <input name="dueDate" value={newAssignment.dueDate} onChange={handleInputChange} type="date" required className="w-full p-2 border rounded"/>
                            <textarea name="description" value={newAssignment.description} onChange={handleInputChange} placeholder="Description (optional)" className="w-full p-2 border rounded"></textarea>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 py-2 px-4 rounded">Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AssignmentsContent;