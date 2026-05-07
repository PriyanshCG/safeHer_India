import React from 'react';
import { Link } from 'react-router-dom';

export default function StatusCard({ isSafe = true }) {
    return (
        <div className={`p-8 rounded-xl border-l-[6px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${isSafe ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
            <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isSafe ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    <span className="material-symbols-outlined text-3xl">{isSafe ? 'verified_user' : 'warning'}</span>
                </div>
                <div>
                    <h2 className="font-serif text-2xl font-bold text-on-surface mb-1">
                        {isSafe ? 'You are within a Safe Zone.' : 'Alert Active.'}
                    </h2>
                    <p className="font-body text-on-surface-variant">
                        {isSafe ? 'Your background tracking is active. Real-time updates are being shared with your primary guardians.' : 'SOS Alert has been broadcasting. Responders arriving soon.'}
                    </p>
                </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
                <Link to="/sos" className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-md ${isSafe ? 'bg-[#DC2626] text-white hover:bg-black shadow-red-600/20' : 'bg-white text-[#DC2626] border-2 border-[#DC2626] hover:bg-red-50'}`}>
                    <span className="material-symbols-outlined mr-2">{isSafe ? 'emergency' : 'close'}</span>
                    {isSafe ? 'Trigger SOS' : 'Cancel SOS'}
                </Link>
            </div>
        </div>
    );
}
