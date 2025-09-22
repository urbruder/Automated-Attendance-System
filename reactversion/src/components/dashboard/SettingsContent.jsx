import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { FaUser, FaShieldAlt, FaBell } from 'react-icons/fa';

const ToggleSwitch = ({ label, enabled, setEnabled, onToggle }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-700">{label}</span>
        <button
            onClick={() => {
                setEnabled(!enabled);
                if (onToggle) onToggle(!enabled);
            }}
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
    const { user, login } = useAuth(); // Assuming login function can update the context's user state
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [settings, setSettings] = useState({
        tfaEnabled: false,
        notifications: {
            email: true,
            assignments: true,
            schedule: false,
        }
    });
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // Populate form with user data from context on component load
    useEffect(() => {
        if (user) {
            setProfileData({ name: user.name || '', email: user.email || '' });
            if (user.settings) {
                setSettings(user.settings);
            }
        }
    }, [user]);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('/users/me/profile', profileData);
            // Optionally, update the user in the context if the backend sends back the updated user
            setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'Failed to update profile.' });
        }
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000); // Clear message after 3 seconds
    };
    
    const handleSettingsUpdate = async (updatedSettings) => {
        try {
            await api.put('/users/me/settings', updatedSettings);
            setSettings(updatedSettings); // Update local state
            setStatusMessage({ type: 'success', text: 'Settings saved!' });
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'Failed to save settings.' });
        }
         setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
    };


    return (
        <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Settings</h1>

            {statusMessage.text && (
                 <div className={`p-4 mb-6 rounded-md text-center ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {statusMessage.text}
                </div>
            )}

            <div className="space-y-10">
                {/* Profile Information Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="flex items-center text-2xl font-bold text-slate-800 mb-6">
                        <FaUser className="mr-3 text-blue-500" />
                        Profile Information
                    </h3>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" name="name" id="name" value={profileData.name} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" id="email" value={profileData.email} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                            </div>
                        </div>
                        <div className="pt-4 text-right">
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700">
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
                    <div className="space-y-4">
                        <ToggleSwitch 
                            label="Two-Factor Authentication (2FA)" 
                            enabled={settings.tfaEnabled} 
                            setEnabled={(val) => handleSettingsUpdate({ ...settings, tfaEnabled: val })}
                        />
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="flex items-center text-2xl font-bold text-slate-800 mb-6">
                        <FaBell className="mr-3 text-yellow-500" />
                        Notifications
                    </h3>
                    <div className="space-y-4">
                        <ToggleSwitch 
                            label="Email Notifications" 
                            enabled={settings.notifications.email} 
                            setEnabled={(val) => handleSettingsUpdate({ ...settings, notifications: { ...settings.notifications, email: val }})}
                        />
                        <ToggleSwitch 
                            label="New Assignment Alerts" 
                            enabled={settings.notifications.assignments}
                            setEnabled={(val) => handleSettingsUpdate({ ...settings, notifications: { ...settings.notifications, assignments: val }})}
                        />
                        <ToggleSwitch 
                            label="Class Schedule Changes" 
                            enabled={settings.notifications.schedule}
                            setEnabled={(val) => handleSettingsUpdate({ ...settings, notifications: { ...settings.notifications, schedule: val }})}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsContent;