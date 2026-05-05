import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-50 py-6 bg-[#fff8f8] dark:bg-stone-950 text-[#8a2b57] dark:text-[#a84370] font-['Manrope'] font-medium text-sm tracking-wide w-72 border-r border-stone-100 dark:border-stone-800 shadow-none">
            {/* Header */}
            <div className="px-8 pb-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-container-high border-[0.5px] border-outline-variant flex-shrink-0">
                    <img alt="User Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK30z_cu0MHkmGpdb_mCQWEs2v--wjFAEwMg-Murh_7SV9bVWDDZoW4UqLWCn2VmdQsIAukyk0EDYvIJCH5YwtwsVgD7iVsEL8h08br6o9boqW6J9fTQJfqhE1c7CgtKheuM9xR-DiZEBQ41ueGUbuX6rUk0RG8um0tlSYNgFfWvegSppSREGIAbm9VDGl7zxV32iE7aAGdWL95PuNXN1AlHRNQCGTy4GX44ANgLA4wxg0wcFB6o43luqPJ8n05DQdftlXoLBCTrxJ" />
                </div>
                <div>
                    <h2 className="font-headline text-xl italic text-[#8a2b57]">The Guardian</h2>
                    <p className="text-xs text-on-surface-variant font-label">Sovereign Status</p>
                </div>
            </div>
            {/* Main Nav Tabs */}
            <ul className="flex-1 flex flex-col gap-2 mt-4 pr-6">
                <li>
                    <Link to="/dashboard" className={`flex items-center gap-4 px-8 py-3 rounded-r-full active:scale-98 transition-all duration-300 ${isActive('/dashboard') ? 'text-[#8a2b57] dark:text-[#a84370] font-bold bg-[#f0dee2] dark:bg-[#8a2b57]/20' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 hover:pl-2'}`}>
                        <span className="material-symbols-outlined" data-icon="shield_with_heart">shield_with_heart</span>
                        <span>Sanctuary</span>
                    </Link>
                </li>
                <li>
                    <Link to="/map" className={`flex items-center gap-4 px-8 py-3 rounded-r-full active:scale-98 transition-all duration-300 ${isActive('/map') ? 'text-[#8a2b57] dark:text-[#a84370] font-bold bg-[#f0dee2] dark:bg-[#8a2b57]/20' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 hover:pl-2'}`}>
                        <span className="material-symbols-outlined" data-icon="explore">explore</span>
                        <span>Atelier Maps</span>
                    </Link>
                </li>
                <li>
                    <Link to="/pricing" className={`flex items-center gap-4 px-8 py-3 rounded-r-full active:scale-98 transition-all duration-300 ${isActive('/pricing') ? 'text-[#8a2b57] dark:text-[#a84370] font-bold bg-[#f0dee2] dark:bg-[#8a2b57]/20' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 hover:pl-2'}`}>
                        <span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
                        <span>Pricing</span>
                    </Link>
                </li>
                <li>
                    <Link to="/payment" className={`flex items-center gap-4 px-8 py-3 rounded-r-full active:scale-98 transition-all duration-300 ${isActive('/payment') ? 'text-[#8a2b57] dark:text-[#a84370] font-bold bg-[#f0dee2] dark:bg-[#8a2b57]/20' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 hover:pl-2'}`}>
                        <span className="material-symbols-outlined" data-icon="payment">payment</span>
                        <span>Payment</span>
                    </Link>
                </li>
            </ul>
            {/* Emergency CTA */}
            <div className="px-8 mb-8 mt-auto">
                <Link to="/sos" className="w-full py-4 px-6 bg-error text-on-error rounded-xl font-label font-bold flex items-center justify-center gap-2 shadow-[0_3px_0_#93000a] active:translate-y-[2px] active:shadow-none transition-all">
                    <span className="material-symbols-outlined" data-icon="emergency" data-weight="fill" style={{ fontVariationSettings: "\"FILL\" 1" }}>emergency</span>
                    Emergency SOS
                </Link>
            </div>
            {/* Footer Tabs */}
            <ul className="flex flex-col gap-2 border-t border-surface-variant pt-6 px-8">
                <li>
                    <a className="flex items-center gap-4 py-2 text-stone-600 dark:text-stone-400 hover:pl-2 transition-all duration-300" href="#">
                        <span className="material-symbols-outlined" data-icon="settings">settings</span>
                        <span>Account Settings</span>
                    </a>
                </li>
                <li>
                    <Link to="/login" className="flex items-center gap-4 py-2 text-stone-600 dark:text-stone-400 hover:pl-2 transition-all duration-300">
                        <span className="material-symbols-outlined" data-icon="logout">logout</span>
                        <span>Log Out</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
