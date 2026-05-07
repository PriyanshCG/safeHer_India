import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export default function PricingSection() {
    const plans = [
        {
            name: 'Basic Haven',
            price: 'Free',
            features: ['Core safety map access', 'Standard SOS alerts', '2 Active Guardians'],
            buttonText: 'Get Started Free',
            variant: 'secondary'
        },
        {
            name: 'Premium Guardian',
            price: '₹499',
            period: '/mo',
            features: ['Live location sharing', 'Priority SOS routing', 'Unlimited guardians', 'Ad-free experience'],
            buttonText: 'Choose Premium',
            variant: 'primary',
            badge: 'MOST TRUSTED'
        },
        {
            name: 'Annual Sanctuary',
            price: '₹4790',
            period: '/yr',
            features: ['All Premium features', '2 months free', 'Offline maps access', 'Priority support'],
            buttonText: 'Choose Annual',
            variant: 'secondary',
            badge: 'BEST VALUE'
        }
    ];

    return (
        <section className="py-24 bg-surface">
            <div className="max-w-[1440px] mx-auto px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-headline text-4xl font-bold text-on-surface mb-6 tracking-tight">Simple, Transparent Pricing</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-6">
                    {plans.map((p, i) => (
                        <div
                            key={i}
                            className={`p-8 rounded-xl shadow-ambient-rose border flex flex-col h-full relative overflow-visible transition-all duration-300 ${p.variant === 'primary'
                                    ? 'bg-primary-container border-primary transform md:-translate-y-4'
                                    : 'bg-surface-container-lowest border-outline-variant/15'
                                }`}
                        >
                            {p.badge && (
                                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 font-label text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-sm z-10 whitespace-nowrap ${p.variant === 'primary' ? 'bg-surface text-primary' : 'bg-primary text-white'
                                    }`}>
                                    {p.badge}
                                </div>
                            )}

                            <h3 className={`font-headline text-2xl font-bold mb-2 ${p.variant === 'primary' ? 'text-white' : 'text-on-surface'}`}>{p.name}</h3>
                            <div className={`text-4xl font-bold mb-6 font-headline ${p.variant === 'primary' ? 'text-white' : 'text-primary'}`}>
                                {p.price}<span className={`text-xl font-normal ${p.variant === 'primary' ? 'opacity-80' : 'text-on-surface-variant'}`}>{p.period}</span>
                            </div>

                            <ul className={`space-y-4 mb-8 flex-grow font-body ${p.variant === 'primary' ? 'text-white/90' : 'text-on-surface-variant'}`}>
                                {p.features.map((feat, fi) => (
                                    <li key={fi} className="flex items-center gap-3">
                                        <span className={`material-symbols-outlined text-[20px] ${p.variant === 'primary' ? 'text-white' : 'text-primary'}`}>check_circle</span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={ROUTES.SIGNUP}
                                className={`w-full font-label font-bold py-4 px-8 rounded-lg text-lg text-center transition-all duration-200 ${p.variant === 'primary'
                                        ? 'bg-white text-primary shadow-3d-primary active:translate-y-[2px] active:shadow-none'
                                        : 'bg-surface-container-high text-primary hover:bg-surface-variant border border-outline-variant/15'
                                    }`}
                            >
                                {p.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
