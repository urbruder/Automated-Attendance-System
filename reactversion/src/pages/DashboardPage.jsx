import React, { useState } from 'react';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import DashboardContent from '../components/dashboard/DashboardContent';
import AttendanceContent from '../components/dashboard/AttendanceContent';
import ScheduleContent from '../components/dashboard/ScheduleContent';
import TaskContent from '../components/dashboard/TaskContent';
import SettingsContent from '../components/dashboard/SettingsContent';

const DashboardPage = () => {
    const [activePage, setActivePage] = useState('dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardContent />;
            case 'attendance':
                return <AttendanceContent />;
            case 'schedule':
                return <ScheduleContent />;
            case 'task':
                return <TaskContent />;
            case 'settings':
                return <SettingsContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
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