import React, { useState, useEffect } from 'react';
import { FaUsers, FaClipboardList, FaPercentage } from 'react-icons/fa';
import api from '../../api/axios';

const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
        <div className={`mr-4 p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const TeacherDashboardContent = () => {
    const [stats, setStats] = useState({ studentCount: 0 });

    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const response = await api.get('/students');
                setStats(prevStats => ({ ...prevStats, studentCount: response.data.count }));
            } catch (error) { // <-- CORRECTED: Added curly braces around the catch block
                console.error("Failed to fetch student count", error);
            }
        };
        fetchStudentCount();
    }, []);

    return (
        <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Teacher's Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    icon={<FaUsers className="text-white text-2xl" />} 
                    title="Total Students" 
                    value={stats.studentCount}
                    color="bg-blue-500"
                />
                <StatCard 
                    icon={<FaClipboardList className="text-white text-2xl" />} 
                    title="Classes Today" 
                    value="4" 
                    color="bg-orange-500"
                />
                <StatCard 
                    icon={<FaPercentage className="text-white text-2xl" />} 
                    title="Avg. Attendance" 
                    value="92%" 
                    color="bg-green-500"
                />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700">
                        Mark Attendance
                    </button>
                     <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">
                        View Reports
                    </button>
                </div>
            </div>
        </>
    );
};

export default TeacherDashboardContent;