import { useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await authAPI.getCurrentUser();
            if (response.success && response.data) {
                setUser(response.data);
            } else {
                localStorage.removeItem('authToken');
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            // Don't log out immediately on network error, but if it's 401 we should
            if (error.message && error.message.includes('token') || error.message.includes('auth')) {
                localStorage.removeItem('authToken');
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await authAPI.login({ email, password });
            if (response.success && response.data?.token) {
                localStorage.setItem('authToken', response.data.token);
                // Also response usually returns user data, let's set it
                if (response.data.user) {
                    setUser(response.data.user);
                } else {
                    await fetchUser();
                }
                return { success: true };
            }
            return { success: false, message: response.message || 'Login failed' };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: error.message || 'An error occurred during login' };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (e) {
            console.error("Logout API failed, continuing local logout:", e);
        }
        localStorage.removeItem('authToken');
        setUser(null);
        window.location.href = '/';
    };

    return { 
        user, 
        login, 
        logout, 
        loading, 
        isAuthenticated: !!user,
        refreshUser: fetchUser
    };
};
