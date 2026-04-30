import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Bell, Shield, Info, CheckCircle, Loader2 } from 'lucide-react';
import { userAPI } from '../utils/api';

export default function SettingsPage() {
    const { user, logout, refreshUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    
    // Profile State
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    // Toast auto-hide
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await userAPI.updateProfile(formData);
            if (response.success) {
                await refreshUser();
                showToast('Profile updated successfully!');
            }
        } catch (error) {
            showToast(error.message || 'Failed to update profile', 'error');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
        { id: 'about', label: 'About', icon: Info },
    ];

    return (
        <div className="max-w-7xl mx-auto px-8 py-12 relative">
            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                    <CheckCircle className={`w-5 h-5 ${toast.type === 'error' ? 'text-red-400' : 'text-green-400'}`} />
                    <span className="font-label text-sm font-semibold">{toast.message}</span>
                </div>
            )}

            <header className="mb-10">
                <h1 className="text-4xl font-bold font-serif text-[#8B4A6A] mb-3 tracking-tight">Settings</h1>
                <p className="text-[#6B5B6B] font-body text-lg">Manage your account preferences and personal information.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all text-left ${
                                    activeTab === tab.id
                                        ? 'bg-[#8B4A6A] text-white shadow-lg shadow-[#8B4A6A]/20'
                                        : 'bg-white text-[#6B5B6B] hover:bg-[#FDF0F6] hover:text-[#8B4A6A]'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 min-h-[500px]">
                        
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-2xl font-bold font-serif text-[#2D1B2E] mb-6">Profile Information</h2>
                                <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#6B5B6B] uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8B4A6A] outline-none transition-all text-[#2D1B2E]"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#6B5B6B] uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8B4A6A] outline-none transition-all text-[#2D1B2E]"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#6B5B6B] uppercase tracking-wider">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8B4A6A] outline-none transition-all text-[#2D1B2E]"
                                            placeholder="+91 XXXXXXXXXX"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="mt-4 py-3.5 px-8 bg-[#8B4A6A] hover:bg-[#6d3a53] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#8B4A6A]/20 disabled:opacity-70 flex items-center gap-2"
                                    >
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-2xl font-bold font-serif text-[#2D1B2E] mb-6">Notification Preferences</h2>
                                <div className="space-y-2">
                                    {[
                                        { label: 'SOS Alerts', desc: 'Get notified for emergency alerts', default: true },
                                        { label: 'Guardian Updates', desc: 'Notifications from your guardian network', default: true },
                                        { label: 'Safety Tips', desc: 'Daily safety tips and news', default: false },
                                        { label: 'App Updates', desc: 'New features and improvements', default: false },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                                            <div>
                                                <p className="font-bold text-[#2D1B2E]">{item.label}</p>
                                                <p className="text-sm text-[#6B5B6B]">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B4A6A]"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === 'privacy' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-10">
                                <div>
                                    <h2 className="text-2xl font-bold font-serif text-[#2D1B2E] mb-6">Privacy & Security</h2>
                                    <div className="space-y-2">
                                        {[
                                            { label: 'Share location with guardians', desc: 'Allow guardians to see your live location', default: true },
                                            { label: 'Anonymous reporting', desc: 'Hide your identity when reporting incidents', default: false },
                                            { label: 'Two-factor authentication', desc: 'Add extra security to your account', default: false },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                                                <div>
                                                    <p className="font-bold text-[#2D1B2E]">{item.label}</p>
                                                    <p className="text-sm text-[#6B5B6B]">{item.desc}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B4A6A]"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="pt-8 border-t border-red-100">
                                    <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                                    <p className="text-sm text-[#6B5B6B] mb-4">Logging out will stop background tracking and real-time notifications on this device.</p>
                                    <button
                                        onClick={logout}
                                        className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Log Out Securely
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* About Tab */}
                        {activeTab === 'about' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-2xl font-bold font-serif text-[#2D1B2E] mb-6">About SafeHer India</h2>
                                <div className="bg-[#FDF0F6] rounded-2xl p-6 border border-[#8B4A6A]/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Shield className="w-8 h-8 text-[#8B4A6A]" />
                                        <h3 className="text-xl font-bold font-serif text-[#8B4A6A]">SafeHer India</h3>
                                    </div>
                                    <p className="text-[#6B5B6B] leading-relaxed mb-6">
                                        SafeHer India is a comprehensive women's safety platform designed to provide real-time protection, community support, and rapid emergency assistance across the country.
                                    </p>
                                    <div className="space-y-3 text-sm font-medium">
                                        <div className="flex justify-between py-2 border-b border-white/50">
                                            <span className="text-[#6B5B6B]">Version</span>
                                            <span className="text-[#2D1B2E] font-bold">1.0.0 (Beta)</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/50">
                                            <span className="text-[#6B5B6B]">Built By</span>
                                            <span className="text-[#2D1B2E] font-bold">SafeHer Team</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/50">
                                            <span className="text-[#6B5B6B]">Privacy Policy</span>
                                            <a href="#" className="text-[#8B4A6A] hover:underline">View Policy</a>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-[#6B5B6B]">Terms of Service</span>
                                            <a href="#" className="text-[#8B4A6A] hover:underline">View Terms</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
