import React from 'react';
import PricingCard from '../components/Pricing/PricingCard';
import FAQAccordion from '../components/Pricing/FAQAccordion';
import Footer from '../components/Common/Footer';

export default function Pricing() {
    const plans = [
        {
            title: 'Free',
            price: 'Free',
            features: ['One-Tap SOS', 'Live Location Sharing', 'Community Safe Maps']
        },
        {
            title: 'Premium',
            price: '₹199',
            highlighted: true,
            features: ['Everything in Free', 'Access to Guardian Network', 'Priority Emergency Routing', 'Offline Maps']
        },
        {
            title: 'Annual',
            price: '₹1499',
            features: ['Everything in Premium', 'Save 35% annually', 'Free Personal Safety Alarm (Hardware)']
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background pt-12">
            <div className="text-center mb-16 px-4">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Invest in your peace of mind</h1>
                <p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto">Choose a plan that fits your security needs. Financial independence shouldn't restrict personal safety.</p>
            </div>

            <div className="max-w-6xl mx-auto px-4 w-full mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {plans.map((plan, idx) => (
                        <PricingCard key={idx} {...plan} />
                    ))}
                </div>

                <div className="mb-8 text-center">
                    <h2 className="font-serif text-3xl font-bold text-primary mb-8">Frequently Asked Questions</h2>
                </div>
                <FAQAccordion />
            </div>

            <Footer />
        </div>
    );
}
