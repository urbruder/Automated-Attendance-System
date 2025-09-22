import React from 'react';
import { 
    FaUserCircle, 
    FaThLarge, 
    FaUsers,
    FaStar, 
    FaCamera, 
    FaTasks, 
    FaCog 
} from 'react-icons/fa';

const menuItems = [
    { id: 'dashboard', icon: <FaThLarge />, label: 'Dashboard' },
    { id: 'mystudents', icon: <FaUsers />, label: 'My Students' },
    { id: 'attendance', icon: <FaStar />, label: 'Attendance' },
    { id: 'scanning', icon: <FaCamera />, label: 'Scanning' },
    { id: 'assignments', icon: <FaTasks />, label: 'Assignments' },
    { id: 'settings', icon: <FaCog />, label: 'Settings' },
];

const TeacherSidebar = ({ activePage, setActivePage }) => {
    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex-col hidden md:flex">
             <div className="flex items-center p-5 text-white border-b border-slate-800">
                <FaUserCircle className="text-4xl mr-4" />
                <div>
                    <span className="text-lg font-bold">SmartTrack</span>
                    <span className="block text-xs text-slate-300 font-medium">CAMPUS</span>
                </div>
            </div>
            <nav className="mt-5">
                <ul>
                    {menuItems.map(item => (
                        <li 
                            key={item.id} 
                            onClick={() => setActivePage(item.id)} 
                            className={`flex items-center py-4 px-5 cursor-pointer border-l-4 transition-all duration-200 ${
                                activePage === item.id 
                                    ? 'bg-slate-800 text-white border-green-400' 
                                    : 'border-transparent hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <span className={`mr-4 text-lg ${activePage === item.id ? 'text-green-400' : ''}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default TeacherSidebar;