import React from 'react';

export default function StatsCard({ title, value, icon, color = 'primary' }) {
    const colorMap = {
        primary: 'text-[#8B4A6A] bg-[#8B4A6A]/10',
        secondary: 'text-[#C94A7D] bg-[#C94A7D]/10',
        accent: 'text-[#4B7FBE] bg-[#4B7FBE]/10',
        error: 'text-[#DC2626] bg-[#DC2626]/10'
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorMap[color]}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <p className="font-body text-sm text-on-surface-variant font-medium">{title}</p>
                <p className="font-serif text-2xl font-bold text-on-surface">{value}</p>
            </div>
        </div>
    );
}
