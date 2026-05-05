import React from 'react';

export default function FeaturesSection() {
    const features = [
        {
            title: 'Live Safety Map',
            desc: 'Crowdsourced, real-time insights on neighborhood safety, well-lit routes, and verified safe zones.',
            icon: 'map'
        },
        {
            title: 'SOS Emergency',
            desc: 'Instantly alert your trusted circle and local authorities with a discrete, single-tap mechanism.',
            icon: 'sos'
        },
        {
            title: 'Guardian Network',
            desc: 'Build a curated circle of trusted contacts who can monitor your journey progress in real-time.',
            icon: 'group'
        }
    ];

    return (
        <section className="py-24 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-headline text-4xl font-bold text-on-surface mb-6 tracking-tight">Your Sovereign Sanctuary</h2>
                    <p className="font-body text-lg text-on-surface-variant">A suite of curated tools designed to provide peace of mind without compromising your independence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-ambient-rose border border-outline-variant/15 group hover:bg-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-500 cursor-default">
                            <div className="w-16 h-16 rounded-full bg-[#FDF0F6] flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-white">
                                <span className="material-symbols-outlined text-2xl text-primary transition-all duration-500 group-hover:scale-110">
                                    {f.icon}
                                </span>
                            </div>
                            <h3 className="font-headline text-2xl font-bold text-on-surface mb-4 group-hover:text-white transition-colors duration-500">{f.title}</h3>
                            <p className="font-body text-on-surface-variant leading-relaxed group-hover:text-white/80 transition-colors duration-500">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
