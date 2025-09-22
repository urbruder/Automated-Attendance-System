import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const MyStudentsContent = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch the teacher's courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses/mycourses');
                setCourses(response.data.data);
                if (response.data.data.length > 0) {
                    setSelectedCourse(response.data.data[0]._id); // Select the first course by default
                }
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch students whenever the selected course changes
    useEffect(() => {
        if (!selectedCourse) return;

        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/students?courseId=${selectedCourse}`);
                setStudents(response.data.data);
            } catch (error) {
                console.error("Failed to fetch students", error);
                setStudents([]); // Clear students on error
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [selectedCourse]);

    return (
        <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">My Students</h1>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="mb-4">
                    <label htmlFor="courseFilter" className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Course
                    </label>
                    <select
                        id="courseFilter"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
                    >
                        {courses.map(course => (
                            <option key={course._id} value={course._id}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold">Name</th>
                                <th className="py-3 px-4 text-left font-semibold">Roll Number</th>
                                <th className="py-3 px-4 text-left font-semibold">Email</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="3" className="text-center py-4">Loading...</td></tr>
                            ) : (
                                students.map(student => (
                                    <tr key={student._id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4">{student.name}</td>
                                        <td className="py-3 px-4">{student.rollNumber}</td>
                                        <td className="py-3 px-4">{student.userId?.email || 'N/A'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyStudentsContent;