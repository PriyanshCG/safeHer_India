import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, ShieldAlert, Users, Settings } from 'lucide-react';

export default function MobileBottomNav() {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/map', icon: MapIcon, label: 'Map' },
        { path: '/sos', icon: ShieldAlert, label: 'SOS', isCenter: true },
        { path: '/guardians', icon: Users, label: 'Guardians' },
        { path: '/settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full h-[64px] bg-white border-t border-[#8B4A6A]/10 md:hidden z-50 flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = currentPath === item.path;
                const Icon = item.icon;

                if (item.isCenter) {
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className="relative -mt-6 flex flex-col items-center justify-center group"
                        >
                            <div className="w-[52px] h-[52px] bg-red-600 rounded-full flex items-center justify-center shadow-xl shadow-red-600/30 group-hover:scale-105 transition-transform animate-pulse">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-red-600 mt-1 uppercase tracking-widest">{item.label}</span>
                        </Link>
                    );
                }

                return (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${isActive ? 'text-[#8B4A6A]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <Icon className="w-6 h-6" />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-[#8B4A6A]' : 'text-gray-400'}`}>
                            {item.label}
                        </span>
                        {/* Active dot indicator */}
                        <div className={`w-1 h-1 rounded-full mt-0.5 transition-all ${isActive ? 'bg-[#8B4A6A] scale-100' : 'bg-transparent scale-0'}`} />
                    </Link>
                );
            })}
        </nav>
    );
}
