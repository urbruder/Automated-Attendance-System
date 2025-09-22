import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage'; // <-- 1. Import the new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> {/* <-- 2. Add the new route */}
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;