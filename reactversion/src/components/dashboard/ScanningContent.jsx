import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ScanningContent = () => {
    const [markedStudents, setMarkedStudents] = useState([
        'Student 1',
        'Student 2',
        'Student 3'
    ]);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(/ /g, ' ');
        setCurrentDate(date.toUpperCase());
    }, []);

    return (
        <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Live Attendance</h1>

            {/* Information Headers */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-white p-3 rounded-lg shadow-sm font-semibold text-gray-700">
                    Dept - ECE SEC A
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm font-semibold text-gray-700">
                    Date - {currentDate}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel: Camera Feed */}
                <div className="bg-black rounded-xl shadow-lg flex items-center justify-center min-h-[400px]">
                    <p className="text-white text-2xl font-semibold tracking-wider">
                        LIVE FEED FROM CAMERA
                    </p>
                </div>

                {/* Right Panel: Marked Students */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-4">
                        Marked Students
                    </h3>
                    <ul className="space-y-4">
                        {markedStudents.map((student, index) => (
                            <li key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="font-medium text-gray-800">{student} Marked</span>
                                <FaCheckCircle className="text-green-500 text-xl" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ScanningContent;