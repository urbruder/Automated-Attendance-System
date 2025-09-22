import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FaPlus } from 'react-icons/fa';

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-2xl">&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
};

const CoursesContent = () => {
    const [courses, setCourses] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [newCourseData, setNewCourseData] = useState({ courseName: '', department: '', academicYear: '' });
    const [newScheduleData, setNewScheduleData] = useState({ courseId: '', dayOfWeek: '', startTime: '', endTime: '' });

    const departmentOptions = ['Computer Science', 'Electronics and Communication', 'Mechanical Engineering'];
    const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchCourses();
        fetchSchedule();
    }, []);

    const fetchCourses = async () => {
        const response = await api.get('/courses/mycourses');
        setCourses(response.data.data);
    };

    const fetchSchedule = async () => {
        const response = await api.get('/schedules/myweek');
        setSchedule(response.data.data);
    };

    const handleCourseInputChange = (e) => setNewCourseData({ ...newCourseData, [e.target.name]: e.target.value });
    const handleScheduleInputChange = (e) => setNewScheduleData({ ...newScheduleData, [e.target.name]: e.target.value });

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        await api.post('/courses', newCourseData);
        fetchCourses();
        setIsCourseModalOpen(false);
    };
    
    const handleCreateSchedule = async (e) => {
        e.preventDefault();
        await api.post('/schedules', newScheduleData);
        fetchSchedule();
        setIsScheduleModalOpen(false);
    };

    return (
        <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Courses & Schedule</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Courses Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-slate-800">My Courses</h2>
                        <button onClick={() => setIsCourseModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"><FaPlus /> Add Course</button>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-3">
                        {courses.map(course => (
                            <div key={course._id} className="p-3 border rounded-md">
                                <p className="font-bold">{course.courseName}</p>
                                <p className="text-sm text-gray-500">{course.department} - {course.academicYear}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Schedule Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-2xl font-bold text-slate-800">My Weekly Schedule</h2>
                        <button onClick={() => setIsScheduleModalOpen(true)} className="flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"><FaPlus /> Add Class</button>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-lg space-y-3">
                        {schedule.map(item => (
                            <div key={item._id} className="p-3 border rounded-md">
                                <p className="font-bold">{item.courseId.courseName}</p>
                                <p className="text-sm text-gray-500">{item.dayOfWeek} at {item.startTime} - {item.endTime}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for adding a new course */}
            <Modal isOpen={isCourseModalOpen} onClose={() => setIsCourseModalOpen(false)} title="Add New Course">
                <form onSubmit={handleCreateCourse} className="space-y-4">
                    <input name="courseName" onChange={handleCourseInputChange} placeholder="Course Name" required className="w-full p-2 border rounded"/>
                    <select name="department" onChange={handleCourseInputChange} defaultValue="" required className="w-full p-2 border rounded"><option value="" disabled>Select Department</option>{departmentOptions.map(d => <option key={d} value={d}>{d}</option>)}</select>
                    <select name="academicYear" onChange={handleCourseInputChange} defaultValue="" required className="w-full p-2 border rounded"><option value="" disabled>Select Year</option>{yearOptions.map(y => <option key={y} value={y}>{y}</option>)}</select>
                    <div className="flex justify-end gap-4"><button type="button" onClick={() => setIsCourseModalOpen(false)} className="bg-gray-200 py-2 px-4 rounded">Cancel</button><button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Create</button></div>
                </form>
            </Modal>

            {/* Modal for adding a new scheduled class */}
            <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title="Add New Class to Schedule">
                 <form onSubmit={handleCreateSchedule} className="space-y-4">
                    <select name="courseId" onChange={handleScheduleInputChange} defaultValue="" required className="w-full p-2 border rounded"><option value="" disabled>Select Course</option>{courses.map(c => <option key={c._id} value={c._id}>{c.courseName}</option>)}</select>
                    <select name="dayOfWeek" onChange={handleScheduleInputChange} defaultValue="" required className="w-full p-2 border rounded"><option value="" disabled>Select Day</option>{dayOptions.map(d => <option key={d} value={d}>{d}</option>)}</select>
                    <input name="startTime" type="time" onChange={handleScheduleInputChange} required className="w-full p-2 border rounded"/>
                    <input name="endTime" type="time" onChange={handleScheduleInputChange} required className="w-full p-2 border rounded"/>
                    <div className="flex justify-end gap-4"><button type="button" onClick={() => setIsScheduleModalOpen(false)} className="bg-gray-200 py-2 px-4 rounded">Cancel</button><button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Add</button></div>
                </form>
            </Modal>
        </>
    );
};

export default CoursesContent;