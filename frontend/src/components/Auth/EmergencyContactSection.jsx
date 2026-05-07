import React from 'react';
import FormInput from './FormInput';

export default function EmergencyContactSection({ contactName, setContactName, contactPhone, setContactPhone }) {
    return (
        <div className="bg-[#F5F1E8] border-[1.5px] border-[#8B4A6A]/20 rounded-[10px] p-5 mt-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-sm">contact_emergency</span>
                <h4 className="font-serif font-bold text-primary text-sm">Primary Emergency Contact</h4>
            </div>
            <div className="space-y-4">
                <FormInput
                    id="contactName"
                    type="text"
                    placeholder="Contact Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
                <FormInput
                    id="contactPhone"
                    type="tel"
                    placeholder="Phone Number"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
            </div>
        </div>
    );
}
