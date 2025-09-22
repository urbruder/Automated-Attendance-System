import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const TaskContent = () => { // You can rename this component if you like
    const [assignments, setAssignments] = useState([]);

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

    return (
         <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Your Assignments</h1>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="space-y-4">
                    {assignments.length > 0 ? (
                        assignments.map((assignment) => (
                            <div key={assignment._id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-gray-800">{assignment.title}</p>
                                    <span className="text-sm font-medium text-red-600">
                                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{assignment.course}</p>
                                {assignment.description && <p className="text-sm text-gray-500 mt-2">{assignment.description}</p>}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No assignments posted yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default TaskContent;