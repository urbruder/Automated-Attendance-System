import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Reusable Login Box Component
const LoginBox = ({ userType, email, setEmail, password, setPassword, onSubmit, error, isLoading }) => {
  const isStudent = userType === 'Student';
  const bgColor = isStudent ? 'bg-slate-700' : 'bg-gray-200';
  const textColor = isStudent ? 'text-white' : 'text-gray-800';
  const buttonColor = isStudent ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600';

  return (
    <div className={`flex-1 p-10 ${bgColor} ${textColor}`}>
      <h2 className="text-2xl font-bold mb-5">{userType} Login</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Styling for the white text box
            className="w-full p-3 rounded-md border-none outline-none bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Styling for the white text box
            className="w-full p-3 rounded-md border-none outline-none bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-3 rounded-md text-white font-semibold mt-2 transition-colors ${buttonColor} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <a href="#" className="block mt-3 text-sm hover:underline">Forgot Password?</a>
      </form>
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from our context

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use the login function from the context
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    alert("Admin login not implemented yet.");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center font-sans">
      <div className="absolute top-5 text-2xl font-bold text-slate-700">
        <span>SmartTrack CAMPUS</span>
      </div>
      <main className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white">
        <LoginBox
          userType="Student"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleStudentLogin}
          error={error}
          isLoading={isLoading}
        />
        {/* You can implement a separate state for Admin login if needed */}
        <LoginBox
          userType="Admin"
          onSubmit={handleAdminLogin}
        />
      </main>
      
      {/* Link to the Register Page */}
      <div className="mt-6 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-blue-600 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;