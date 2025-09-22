import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Import both sidebars
import StudentSidebar from '../components/shared/StudentSidebar';
import TeacherSidebar from '../components/shared/TeacherSidebar';

// Import all possible content components
import Header from '../components/shared/Header';
import StudentDashboardContent from '../components/dashboard/StudentDashboardContent';
import TeacherDashboardContent from '../components/dashboard/TeacherDashboardContent';
import MyStudentsContent from '../components/dashboard/MyStudentsContent';
import AttendanceContent from '../components/dashboard/AttendanceContent';
import ScheduleContent from '../components/dashboard/ScheduleContent';
import TaskContent from '../components/dashboard/TaskContent';
import SettingsContent from '../components/dashboard/SettingsContent';
import ScanningContent from '../components/dashboard/ScanningContent';
import AssignmentsContent from '../components/dashboard/AssignmentsContent';

const DashboardPage = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const { user, loading } = useAuth(); // Get user and loading state from context

    // This function renders the correct content based on the active page
    const renderContent = () => {
        if (activePage === 'dashboard') {
            return user.role === 'teacher' ? <TeacherDashboardContent /> : <StudentDashboardContent />;
        }
        
        switch (activePage) {
            // Shared Pages
            case 'attendance':
                return <AttendanceContent />;
            case 'settings':
                return <SettingsContent />;
            
            // Student-specific Pages
            case 'schedule':
                return <ScheduleContent />;
            case 'task':
                return <TaskContent />; // <-- Corrected this line

            // Teacher-specific Pages
            case 'mystudents':
                return <MyStudentsContent />;
            case 'scanning':
                return <ScanningContent />;
            case 'assignments':
                return <AssignmentsContent />;

            default:
                return user.role === 'teacher' ? <TeacherDashboardContent /> : <StudentDashboardContent />;
        }
    };

    // Display a loading state while the user's role is being verified
    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Conditionally render the correct sidebar based on the user's role */}
            {user.role === 'teacher' ? (
                <TeacherSidebar activePage={activePage} setActivePage={setActivePage} />
            ) : (
                <StudentSidebar activePage={activePage} setActivePage={setActivePage} />
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;