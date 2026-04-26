import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Map from '../pages/Map';
import SOS from '../pages/SOS';
import Dashboard from '../pages/Dashboard';
import Pricing from '../pages/Pricing';
import Payment from '../pages/Payment';
import NotFound from '../pages/NotFound';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null; // or a spinner
    return user ? children : <Navigate to="/login" replace />;
};

// Global Layout wrapper that includes the Navbar
const StandardLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
            {children}
        </main>
    </div>
);

// We disable Navbar on Auth pages per the prompt's implied isolation or common practice
// But the prompt says "Routes: /, /login, /signup... Layout/Navbar.jsx"
// I will include Navbar on standard layout pages.

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StandardLayout><Landing /></StandardLayout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/pricing" element={<StandardLayout><Pricing /></StandardLayout>} />
                <Route path="/payment" element={<StandardLayout><Payment /></StandardLayout>} />

                <Route path="/dashboard" element={<PrivateRoute><StandardLayout><Dashboard /></StandardLayout></PrivateRoute>} />
                <Route path="/map" element={<PrivateRoute><StandardLayout><Map /></StandardLayout></PrivateRoute>} />
                <Route path="/sos" element={<PrivateRoute><StandardLayout><SOS /></StandardLayout></PrivateRoute>} />

                <Route path="*" element={<StandardLayout><NotFound /></StandardLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
