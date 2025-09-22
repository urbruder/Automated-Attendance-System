import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Your axios instance

const RegisterPage = () => {
    const [role, setRole] = useState('student'); // 'student' or 'teacher'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollNumber: '',
        department: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Construct the payload based on the selected role
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: role,
        };

        if (role === 'student') {
            payload.rollNumber = formData.rollNumber;
        } else {
            payload.department = formData.department;
        }

        try {
            const response = await api.post('/auth/register', payload);
            if (response.data.success) {
                // The backend automatically logs the user in, so save the token
                localStorage.setItem('token', response.data.token);
                // Reload the page to trigger the AuthContext's user check
                window.location.href = '/dashboard';
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const RoleTab = ({ userRole, label }) => (
        <button
            type="button"
            onClick={() => setRole(userRole)}
            className={`w-1/2 py-3 text-sm font-bold transition-colors ${
                role === userRole
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center font-sans p-4">
            <div className="absolute top-5 text-2xl font-bold text-slate-700">
                <span>SmartTrack CAMPUS</span>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex">
                    <RoleTab userRole="student" label="I am a Student" />
                    <RoleTab userRole="teacher" label="I am a Teacher" />
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />
                        <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />
                        <input type="password" name="password" placeholder="Password (min. 6 characters)" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />

                        {/* Conditional Inputs */}
                        {role === 'student' ? (
                            <input type="text" name="rollNumber" placeholder="Roll Number" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />
                        ) : (
                            <input type="text" name="department" placeholder="Department (e.g., Computer Science)" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />
                        )}

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button type="submit" disabled={isLoading} className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-blue-400">
                            {isLoading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-6 text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/" className="font-semibold text-blue-600 hover:underline">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;