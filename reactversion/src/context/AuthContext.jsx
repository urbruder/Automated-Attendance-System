import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

// This helper function takes the nested user object from the backend
// and creates a simple, "flat" object for our frontend state.
const processUserData = (backendUser) => {
    if (!backendUser || !backendUser.profileId) {
        return null;
    }
    
    return {
        ...backendUser.profileId, // Spreads the profile fields (like name, rollNumber, department)
        _id: backendUser._id,     // We want the main User ID, not the profile ID
        email: backendUser.email,
        role: backendUser.role,
        settings: backendUser.settings,
    };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/auth/me')
                .then(response => {
                    const flatUser = processUserData(response.data.data);
                    setUser(flatUser);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        const flatUser = processUserData(response.data.user);
        setUser(flatUser);
        return response;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = { user, login, logout, isAuthenticated: !!user, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
