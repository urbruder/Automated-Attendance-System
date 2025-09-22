import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css'; // Using a simpler theme

const AttendanceContent = () => {
    const [activeView, setActiveView] = useState('month');
    const [date, setDate] = useState(null); // Set initial date to null for placeholder

    const TabButton = ({ view, label }) => (
        <button
            onClick={() => setActiveView(view)}
            className={`py-2 px-5 rounded text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                activeView === view 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
        >
            {label}
        </button>
    );

    const Present = () => <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">Present</span>
    const Absent = () => <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded">Absent</span>
    
    const statisticsData = {
        percentage: '88%',
        totalClasses: 60,
        absences: 12,
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Attendance</h1>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Controls Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b border-gray-200">
                    <div className="flex gap-2">
                        <TabButton view="month" label="Month" />
                        <TabButton view="week" label="Week" />
                        <TabButton view="day" label="Day" />
                    </div>
                    <div>
                        <Flatpickr
                            value={date}
                            onChange={([newDate]) => setDate(newDate)}
                            className="p-2 border border-gray-300 rounded text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Select Date"
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className={`${activeView !== 'month' ? 'hidden' : ''}`}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Subject</th>
                                    {[1, 2, 3, 6, 7, 10, 30, 31].map(day => (
                                        <th key={day} className="py-3 px-2 text-center text-sm font-semibold">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                               <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 whitespace-nowrap text-left font-medium text-gray-700">Calculus I</td>
                                    <td><Absent /></td><td><Present /></td><td><Present /></td><td><Absent /></td>
                                    <td><Present /></td><td><Present /></td><td><Absent /></td><td><Absent /></td>
                               </tr>
                               <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 whitespace-nowrap text-left font-medium text-gray-700">Data Structures</td>
                                    <td><Present /></td><td><Present /></td><td><Present /></td><td><Present /></td>
                                    <td><Present /></td><td><Present /></td><td><Present /></td><td><Present /></td>
                               </tr>
                               <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 whitespace-nowrap text-left font-medium text-gray-700">Web Dev</td>
                                    <td><Present /></td><td><Present /></td><td><Absent /></td><td><Absent /></td>
                                    <td><Present /></td><td><Present /></td><td><Absent /></td><td><Present /></td>
                               </tr>
                               <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 whitespace-nowrap text-left font-medium text-gray-700">Ethics</td>
                                    <td><Absent /></td><td><Absent /></td><td><Present /></td><td><Absent /></td>
                                    <td><Present /></td><td><Present /></td><td><Present /></td><td><Present /></td>
                               </tr>
                               <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 whitespace-nowrap text-left font-medium text-gray-700">Physics</td>
                                    <td><Present /></td><td><Present /></td><td><Absent /></td><td><Present /></td>
                                    <td><Present /></td><td><Present /></td><td><Absent /></td><td><Present /></td>
                               </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Statistics</h3>
                <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-medium">Monthly Percentage:</span>
                        <span>{statisticsData.percentage}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Total Classes:</span>
                        <span>{statisticsData.totalClasses}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Absences:</span>
                        <span>{statisticsData.absences}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttendanceContent;