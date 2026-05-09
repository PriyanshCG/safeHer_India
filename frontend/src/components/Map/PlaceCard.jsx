import React from 'react';

export default function PlaceCard({ poi }) {
    const getIcon = (type) => {
        switch (type) {
            case 'police': return 'shield';
            case 'hospital': return 'local_hospital';
            default: return 'home';
        }
    };

    const getColors = (type) => {
        switch (type) {
            case 'police': return 'bg-blue-100 text-[#4B7FBE]';
            case 'hospital': return 'bg-red-100 text-[#DC2626]';
            default: return 'bg-[#8B4A6A]/10 text-[#8B4A6A]';
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200">
            <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getColors(poi.type)}`}>
                    <span className="material-symbols-outlined">{getIcon(poi.type)}</span>
                </div>
                <div>
                    <h3 className="font-serif font-bold text-sm text-on-surface line-clamp-1">{poi.name}</h3>
                    <p className="font-body text-[10px] font-bold text-on-surface-variant mt-1 tracking-wider uppercase">{poi.type}</p>
                </div>
            </div>
        </div>
    );
}
