import React from 'react';
import { Link } from 'react-router-dom';

export default function PricingCard({ title, price, highlighted, features }) {
    const isPremium = highlighted;

    return (
        <div className={`rounded-xl p-8 shadow-md border ${isPremium ? 'border-primary bg-[#F5F1E8]' : 'border-gray-200 bg-white'} relative flex flex-col`}>
            {isPremium && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                </span>
            )}

            <h3 className="font-serif text-2xl font-bold text-on-surface mb-2">{title}</h3>
            <div className="mb-6">
                <span className="font-serif text-4xl font-extrabold text-primary">{price}</span>
                {price !== 'Free' && <span className="font-body text-on-surface-variant">/mo</span>}
            </div>

            <ul className="space-y-4 flex-grow mb-8 text-on-surface-variant font-body">
                {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-sm mt-0.5">check_circle</span>
                        <span>{feat}</span>
                    </li>
                ))}
            </ul>

            <Link to="/payment" className={`text-center py-3 rounded-lg font-semibold transition mt-auto ${isPremium ? 'bg-primary text-white hover:bg-[#6B2A4A]' : 'border-2 border-primary text-primary hover:bg-gray-50'}`}>
                Choose {title}
            </Link>
        </div>
    );
}
