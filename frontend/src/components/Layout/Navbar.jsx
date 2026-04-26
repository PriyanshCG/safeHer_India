import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-background border-b-[4px] border-accent shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo LEFT */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-[24px] font-bold font-serif text-primary">
                            SafeHer India
                        </Link>
                    </div>

                    {/* Links CENTER */}
                    <div className="hidden md:flex space-x-8 text-on-surface font-body font-medium">
                        <Link to="/map" className="hover:text-primary transition-colors">Safety Features</Link>
                        <Link to="/#resources" className="hover:text-primary transition-colors">Resources Centre</Link>
                        <Link to="/#community" className="hover:text-primary transition-colors">Community</Link>
                        <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    </div>

                    {/* CTA RIGHT */}
                    <div className="hidden md:flex items-center">
                        <Link to="/signup" className="bg-secondary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#A93A6D] transition flex items-center">
                            Get Started Free
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex md:hidden items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-primary focus:outline-none">
                            <span className="material-symbols-outlined text-3xl">
                                {isOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background border-t border-gray-200">
                    <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col font-body">
                        <Link to="/map" className="block px-3 py-2 text-on-surface hover:text-primary hover:bg-gray-50 rounded-md">Safety Features</Link>
                        <Link to="/#resources" className="block px-3 py-2 text-on-surface hover:text-primary hover:bg-gray-50 rounded-md">Resources Centre</Link>
                        <Link to="/#community" className="block px-3 py-2 text-on-surface hover:text-primary hover:bg-gray-50 rounded-md">Community</Link>
                        <Link to="/pricing" className="block px-3 py-2 text-on-surface hover:text-primary hover:bg-gray-50 rounded-md">Pricing</Link>
                        <div className="mt-4 px-3">
                            <Link to="/signup" className="w-full text-center bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A93A6D] transition block">
                                Get Started Free
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
