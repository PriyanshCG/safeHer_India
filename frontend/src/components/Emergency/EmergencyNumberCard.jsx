import React from 'react';

export default function EmergencyNumberCard({ name, number }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl font-bold">call</span>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-on-surface text-lg">{name}</h4>
                    <p className="font-body text-error font-extrabold text-xl">{number}</p>
                </div>
            </div>

            <a href={`tel:${number}`} className="bg-error text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-[#B91C1C] transition cursor-pointer">
                <span className="material-symbols-outlined text-xl">phone_forwarded</span>
            </a>
        </div>
    );
}
