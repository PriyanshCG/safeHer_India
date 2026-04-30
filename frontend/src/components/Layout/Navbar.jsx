import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
    Map as MapIcon,
    AlertTriangle,
    Users,
    Leaf,
    Newspaper,
    LayoutDashboard,
    Menu,
    X,
    User,
    Settings,
    LogOut,
    ShieldCheck as Shield
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();

    const navLinks = [
        { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
        { name: 'Safety Map', path: ROUTES.MAP, icon: MapIcon },
        { name: 'SOS Emergency', path: ROUTES.SOS, icon: AlertTriangle },
        { name: 'Guardian Network', path: ROUTES.GUARDIANS, icon: Users },
        { name: 'Wellness Guides', path: ROUTES.WELLNESS, icon: Leaf },
        { name: 'Current Affairs', path: ROUTES.NEWS, icon: Newspaper },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-outline-variant/20 h-[72px] px-6 lg:px-12 flex items-center justify-between">
            {/* Left: Branding */}
            <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="font-headline font-bold text-xl text-primary tracking-tight leading-none uppercase italic">SafeHer India</span>
                    <span className="text-[10px] text-primary/60 font-label font-bold tracking-[0.2em] uppercase">Guardian Network</span>
                </div>
            </Link>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2 text-xs font-bold font-label uppercase tracking-widest transition-all duration-300 ${isActive
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-on-surface/60 hover:text-primary'
                            }`
                        }
                    >
                        <link.icon className="w-4 h-4" />
                        {link.name}
                    </NavLink>
                ))}
            </div>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-6">
                {isAuthenticated ? (
                    <>
                        <Link to={ROUTES.SETTINGS} className="p-2 text-on-surface/60 hover:text-primary transition-colors">
                            <Settings className="w-5 h-5" />
                        </Link>
                        <button
                            onClick={logout}
                            className="px-6 py-2.5 bg-primary/10 text-primary rounded-xl font-label font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-6">
                        <Link to={ROUTES.LOGIN} className="text-xs font-bold font-label text-on-surface/60 hover:text-primary uppercase tracking-widest">Log in</Link>
                        <Link to={ROUTES.SIGNUP} className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 btn-3d">
                            Get Started Free
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Toggle */}
            <button
                className="lg:hidden p-2 text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-white border-b border-outline-variant/30 lg:hidden shadow-2xl animate-in slide-in-from-top-4 p-6">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-6 py-4 rounded-xl font-label font-bold uppercase tracking-widest text-sm ${isActive
                                        ? 'bg-primary text-white'
                                        : 'text-on-surface/60 hover:bg-surface-container-low'
                                    }`
                                }
                            >
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </NavLink>
                        ))}
                        {!isAuthenticated ? (
                            <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-outline-variant/20">
                                <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center font-bold text-on-surface/60 uppercase tracking-widest text-sm">Log in</Link>
                                <Link to={ROUTES.SIGNUP} onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-primary text-white rounded-xl font-bold text-center uppercase tracking-widest text-sm shadow-lg shadow-primary/20">Sign up Free</Link>
                            </div>
                        ) : (
                            <button
                                onClick={() => { logout(); setIsMenuOpen(false); }}
                                className="w-full flex items-center gap-4 px-6 py-4 text-red-500 font-bold uppercase tracking-widest text-sm"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
