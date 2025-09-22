import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const RegisterPage = () => {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollNumber: '',
        department: '',
        academicYear: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const departmentOptions = ['Computer Science', 'Electronics and Communication', 'Mechanical Engineering', 'Civil Engineering'];
    const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const payload = { ...formData, role };
        if (role === 'teacher') {
            delete payload.rollNumber;
            delete payload.academicYear;
        }

        try {
            const response = await api.post('/auth/register', payload);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    // This is the fully implemented RoleTab component
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
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">SmartTrack CAMPUS</h1>
            </div>

            <div className="w-full max-w-md">
                <div className="flex rounded-t-xl overflow-hidden">
                    <RoleTab userRole="student" label="I am a Student" />
                    <RoleTab userRole="teacher" label="I am a Teacher" />
                </div>

                <div className="bg-white rounded-b-xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />
                        <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />
                        <input type="password" name="password" placeholder="Password (min. 6 characters)" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />

                        {role === 'student' ? (
                            <>
                                <input type="text" name="rollNumber" placeholder="Roll Number" required onChange={handleInputChange} className="w-full p-3 border rounded-md" />
                                
                                <select name="department" required onChange={handleInputChange} className="w-full p-3 border rounded-md" defaultValue="">
                                    <option value="" disabled>Select your department</option>
                                    {departmentOptions.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                </select>

                                <select name="academicYear" required onChange={handleInputChange} className="w-full p-3 border rounded-md" defaultValue="">
                                    <option value="" disabled>Select academic year</option>
                                    {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                                </select>
                            </>
                        ) : (
                            <select name="department" required onChange={handleInputChange} className="w-full p-3 border rounded-md" defaultValue="">
                                <option value="" disabled>Select your department</option>
                                {departmentOptions.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
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