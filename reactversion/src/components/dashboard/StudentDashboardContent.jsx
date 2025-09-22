import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const Card = ({ title, value, subtext, color }) => (
  <div className={`flex-1 bg-white p-5 rounded-xl shadow-lg relative overflow-hidden border-t-8 ${color}`}>
    <h3 className="font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
  </div>
);

const DashboardContent = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Current Class:" value="Modern History" subtext="10:00 AM" color="border-blue-500" />
        <Card title="Attendance:" value="92%" subtext="This Month" color="border-green-500" />
        <Card title="Recommended Task:" value="Review C++ Syntax" subtext="" color="border-orange-500" />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Upcoming Classes</h3>
        <ul>
          <li className="flex items-center py-3 border-b border-gray-200 text-gray-700">
            <FaChevronRight className="text-gray-400 mr-3 text-sm" /> Physics Lecture
          </li>
          <li className="flex items-center py-3 text-gray-700">
            <FaChevronRight className="text-gray-400 mr-3 text-sm" /> Data Structures Lab
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardContent;