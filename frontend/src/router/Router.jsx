import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import Navbar from '../components/Layout/Navbar';
import MobileBottomNav from '../components/Layout/MobileBottomNav';

// Pages - Direct imports for debugging
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import SOS from '../pages/SOS';
import Map from '../pages/Map';
import GuardianNetwork from '../pages/GuardianNetworkPage';
import Wellness from '../pages/WellnessPage';
import News from '../pages/CurrentAffairsPage';
import Settings from '../pages/SettingsPage';
import NotFound from '../pages/NotFound';

// Global Layout wrapper
const StandardLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col pt-[72px] pb-16 md:pb-0">
            {children}
        </main>
        <MobileBottomNav />
    </div>
);

// Protected Route Component (TEMPORARILY DISABLED FOR FIGMA IMPORT)
const PrivateRoute = ({ children }) => {
    return children;
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<StandardLayout><Landing /></StandardLayout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<PrivateRoute><StandardLayout><Dashboard /></StandardLayout></PrivateRoute>} />
                <Route path="/sos" element={<PrivateRoute><StandardLayout><SOS /></StandardLayout></PrivateRoute>} />
                <Route path="/map" element={<PrivateRoute><StandardLayout><Map /></StandardLayout></PrivateRoute>} />
                <Route path="/guardians" element={<PrivateRoute><StandardLayout><GuardianNetwork /></StandardLayout></PrivateRoute>} />
                <Route path="/wellness" element={<PrivateRoute><StandardLayout><Wellness /></StandardLayout></PrivateRoute>} />
                <Route path="/current-affairs" element={<PrivateRoute><StandardLayout><News /></StandardLayout></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><StandardLayout><Settings /></StandardLayout></PrivateRoute>} />

                {/* 404 */}
                <Route path="*" element={<StandardLayout><NotFound /></StandardLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
