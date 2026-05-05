import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DashboardSidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Safe Zones Map', path: '/map', icon: 'map' },
        { name: 'SOS Alerts', path: '/sos', icon: 'emergency' },
        { name: 'Guardian Network', path: '/guardians', icon: 'group' },
        { name: 'Wellness', path: '/wellness', icon: 'self_improvement' },
        { name: 'Current Affairs', path: '/current-affairs', icon: 'newspaper' },
        { name: 'Settings', path: '/settings', icon: 'settings' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block shrink-0">
            <div className="h-full flex flex-col pt-8">
                <ul className="space-y-2 px-4">
                    {links.map(link => {
                        const isActive = currentPath === link.path;
                        return (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium transition-colors ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-on-surface-variant hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{link.icon}</span>
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto p-4 border-t border-gray-200">
                    <Link to="/pricing" className="flex flex-col gap-1 w-full bg-[#fdf5f8] border border-[#fce4ec] p-4 rounded-xl text-primary hover:bg-[#faeaf0] transition group relative overflow-hidden">
                        <div className="flex items-center gap-2">
                            <span className="animate-spin-slow">⭐</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary">Premium Guardian Plan</span>
                        </div>
                        <span className="font-bold font-serif text-lg">Upgrade to Pro</span>
                        <span className="text-xs font-bold text-[#8B4A6A] mt-1">₹499/mo</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
