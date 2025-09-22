import React from 'react';

const ScheduleContent = () => {
    return (
        <>
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Class Schedule</h1>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full text-center">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            {['Day', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '1:00 - 2:00', '2:00 - 3:00'].map(header => (
                                <th key={header} className="p-4 font-semibold">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-800">Monday</td>
                            <td className="p-4 text-gray-600">Calculus I</td>
                            <td className="p-4 text-gray-600">Modern History</td>
                            <td className="p-4 text-gray-600">Data Structures</td>
                            <td className="p-4 text-gray-400 italic">Break</td>
                            <td className="p-4 text-gray-600">Web Dev</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-800">Tuesday</td>
                            <td className="p-4 text-gray-600">Physics</td>
                            <td className="p-4 text-gray-600">Ethics</td>
                            <td className="p-4 text-gray-600">Calculus I</td>
                            <td className="p-4 text-gray-400 italic">Break</td>
                            <td className="p-4 text-gray-600">Data Structures</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ScheduleContent;