import React, { useState } from 'react';
import { FaUser, FaShieldAlt, FaBell } from 'react-icons/fa';

// A reusable toggle switch component for this page
const ToggleSwitch = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-700">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                enabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);

const SettingsContent = () => {
    // State for interactive toggles
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [assignmentAlerts, setAssignmentAlerts] = useState(true);
    const [scheduleChanges, setScheduleChanges] = useState(false);

    return (
        <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Settings</h1>

            <div className="space-y-10">
                {/* Profile Information Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="flex items-center text-2xl font-bold text-slate-800 mb-6">
                        <FaUser className="mr-3 text-blue-500" />
                        Profile Information
                    </h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="fullName" defaultValue="Alex Doe" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" defaultValue="alex.doe@example.com" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="pt-4 text-right">
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Security Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="flex items-center text-2xl font-bold text-slate-800 mb-6">
                        <FaShieldAlt className="mr-3 text-green-500" />
                        Security
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-800">Change Password</h4>
                                <p className="text-sm text-gray-500">It's a good idea to use a strong password that you're not using elsewhere.</p>
                            </div>
                            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                                Change
                            </button>
                        </div>
                         <div className="p-4 border rounded-lg">
                            <ToggleSwitch label="Two-Factor Authentication (2FA)" enabled={tfaEnabled} setEnabled={setTfaEnabled} />
                            <p className="text-sm text-gray-500 mt-2">Add an extra layer of security to your account.</p>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="flex items-center text-2xl font-bold text-slate-800 mb-6">
                        <FaBell className="mr-3 text-yellow-500" />
                        Notifications
                    </h3>
                    <div className="space-y-4">
                        <ToggleSwitch label="Email Notifications" enabled={emailNotifications} setEnabled={setEmailNotifications} />
                        <ToggleSwitch label="New Assignment Alerts" enabled={assignmentAlerts} setEnabled={setAssignmentAlerts} />
                        <ToggleSwitch label="Class Schedule Changes" enabled={scheduleChanges} setEnabled={setScheduleChanges} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsContent;