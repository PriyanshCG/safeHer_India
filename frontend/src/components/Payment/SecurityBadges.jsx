import React from 'react';

export default function SecurityBadges() {
    return (
        <div className="flex justify-center items-center gap-6 mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col items-center flex-1 max-w-[100px]">
                <span className="material-symbols-outlined text-gray-400 mb-1 text-3xl">lock</span>
                <span className="text-[10px] text-gray-500 font-label text-center">256-bit AES Encryption</span>
            </div>
            <div className="flex flex-col items-center flex-1 max-w-[100px]">
                <span className="material-symbols-outlined text-gray-400 mb-1 text-3xl">verified_user</span>
                <span className="text-[10px] text-gray-500 font-label text-center">RBI Compliant</span>
            </div>
            <div className="flex flex-col items-center flex-1 max-w-[100px]">
                <span className="material-symbols-outlined text-gray-400 mb-1 text-3xl">credit_card</span>
                <span className="text-[10px] text-gray-500 font-label text-center">PCI-DSS Level 1</span>
            </div>
        </div>
    );
}
