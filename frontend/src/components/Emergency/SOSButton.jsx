import React from 'react';

export default function SOSButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-error flex flex-col items-center justify-center text-white shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform group border-8 border-[#FCA5A5]/20"
        >
            <div className="absolute inset-0 rounded-full animate-ping bg-error/30 z-0" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 rounded-full animate-ping bg-error/20 z-0" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>

            <span className="material-symbols-outlined text-[80px] mb-2 z-10">warning</span>
            <span className="font-serif font-black text-4xl tracking-widest z-10">SOS</span>
            <span className="font-body text-sm mt-3 opacity-90 z-10 tracking-widest uppercase">Tap to alert</span>
        </button>
    );
}
