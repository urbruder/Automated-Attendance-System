import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios'; // <-- It IMPORTS and USES your axios file

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If a token exists, verify it by fetching user data
            api.get('/auth/me')
                .then(response => {
                    // If the token is valid, set the user
                    setUser(response.data.data);
                })
                .catch(() => {
                    // If the token is invalid or expired, remove it
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => {
                    // Stop loading once the check is complete
                    setLoading(false);
                });
        } else {
            setLoading(false); // No token, stop loading
        }
    }, []);

    const login = async (email, password) => {
        // Use the 'api' instance to make the login request
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        // The user object from your backend has a nested 'profileId'
        const userData = {
            ...response.data.user.profileId, // Spread the profile details (name, etc.)
            email: response.data.user.email, // Add the email from the main user object
            role: response.data.user.role,   // Add the role
        };
        setUser(userData);
        return response;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // The value provided to consuming components
    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user, // A simple boolean to check if user is logged in
        loading
    };

    // Don't render the app until the initial token check is complete
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the auth context in other components
export const useAuth = () => useContext(AuthContext);