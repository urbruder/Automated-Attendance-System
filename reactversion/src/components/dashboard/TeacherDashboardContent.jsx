import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

// 1. Make sure the component accepts 'setActivePage' as a prop
const TeacherDashboardContent = ({ setActivePage }) => {
    const { user } = useAuth();
    const [todaysSchedule, setTodaysSchedule] = useState([]);

    const professorSurname = user?.name ? user.name.split(' ').pop() : '';

    useEffect(() => {
        const fetchTodaysSchedule = async () => {
            try {
                const response = await api.get('/schedules/mytoday');
                setTodaysSchedule(response.data.data);
            } catch (error) {
                console.error("Failed to fetch today's schedule:", error);
            }
        };

        if (user) {
            fetchTodaysSchedule();
        }
    }, [user]);

    return (
        <>
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome, Prof. {professorSurname}!
                </h1>
                <div className="flex items-center gap-4 text-gray-500">
                    <FaSearch className="text-xl cursor-pointer hover:text-gray-800" />
                    <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-800" />
                </div>
            </header>

            {/* Today's Schedule Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Today's Schedule</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-4">Class</th>
                                <th className="p-4">Time</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todaysSchedule.length > 0 ? (
                                todaysSchedule.map(item => (
                                    <tr key={item._id} className="border-b">
                                        <td className="p-4">{item.courseId.courseName}</td>
                                        <td className="p-4">{item.startTime} - {item.endTime}</td>
                                        <td className="p-4">
                                            {/* 2. Add the onClick handler to the button */}
                                            <button 
                                                onClick={() => setActivePage('scanning')} 
                                                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Start Scanning
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-gray-500">
                                        No classes scheduled for today.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                    <h3 className="font-bold text-gray-800">Monthly Attendance</h3>
                    <p className="text-4xl font-bold my-2 text-green-500">92%</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Based on last 30 days</span>
                        <span className="font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">Good</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
                    <h3 className="font-bold text-gray-800">Pending Grade Reports</h3>
                    <p className="text-4xl font-bold my-2 text-orange-500">3</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Submit by Friday</span>
                        <span className="font-semibold px-2 py-1 rounded-full bg-gray-200 text-gray-800">Pending</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDashboardContent;