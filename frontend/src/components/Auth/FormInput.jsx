import React from 'react';

export default function FormInput({ label, id, type = 'text', placeholder, value, onChange, icon }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="font-label text-sm font-semibold text-[#2D1B2E]" htmlFor={id}>{label}</label>
            <div className="relative">
                {icon && (
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <span className="material-symbols-outlined text-lg">{icon}</span>
                    </span>
                )}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]/20 focus:outline-none transition-colors font-body text-sm text-[#2D1B2E]`}
                />
            </div>
        </div>
    );
}
