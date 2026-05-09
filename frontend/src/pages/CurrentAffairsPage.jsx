import React, { useState, useEffect } from 'react';
import { Newspaper, Bell, MapPin, Share2, Calendar, ShieldAlert, TrendingUp, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CurrentAffairsPage() {
    const [activeAlert, setActiveAlert] = useState(true);
    const [tickerIndex, setTickerIndex] = useState(0);
    const [tickerFade, setTickerFade] = useState(true);
    const [expandedArticle, setExpandedArticle] = useState(null);

    const NEWS = [
        {
            id: 1,
            title: 'Ahmedabad Police Launches "She Team" for Women Safety Patrol',
            date: 'Apr 26, 2026',
            category: 'Ahmedabad',
            location: 'Ahmedabad, Gujarat',
            excerpt: 'Ahmedabad Police Commissioner announces dedicated "She Teams" to patrol high-footfall areas like CG Road, Manek Chowk, and Law Garden for women\'s safety during evening hours.',
            fullStory: 'The Ahmedabad City Police has officially launched dedicated "She Teams" — specialized women safety patrol units — across 8 zones of the city. These teams will be deployed at key locations including CG Road, Law Garden Night Market, Manek Chowk, SG Highway, and Sabarmati Riverfront, particularly during evening and late-night hours.\n\nThe initiative comes after a series of community safety audits conducted in collaboration with women\'s organizations. Each She Team will consist of 4 trained female officers equipped with body cameras, GPS-enabled devices, and direct radio access to the nearest PCR van.\n\nCommissioner of Police stated: "Our goal is to ensure every woman in Ahmedabad feels safe whether she is commuting, shopping, or simply enjoying her city at any hour."\n\nCitizens can also reach She Teams via a dedicated WhatsApp helpline and through the Ahmedabad Police mobile app.',
            image: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://ahmedabadmirror.com'
        },
        {
            id: 2,
            title: 'Gujarat Govt Approves ₹200 Cr for Women Safety Infrastructure',
            date: 'Apr 25, 2026',
            category: 'Gujarat',
            location: 'Gandhinagar, Gujarat',
            excerpt: 'The Gujarat state government sanctions a major budget allocation for installing CCTV cameras, emergency call booths, and better street lighting across all 33 districts.',
            fullStory: 'In a landmark decision, the Gujarat State Government has approved a ₹200 crore special budget for upgrading women safety infrastructure across all 33 districts. The funds will be used for:\n\n• Installing 50,000+ AI-enabled CCTV cameras at bus stops, railway stations, and college campuses\n• Setting up 2,000 emergency SOS call booths along highways and isolated stretches\n• Upgrading street lighting on 1,200 km of roads identified as "dark zones" in safety audits\n• Deploying panic button-enabled smart poles in 15 cities including Ahmedabad, Surat, Vadodara, and Rajkot\n\nThe Chief Minister stated that the initiative is part of the "Mission Shakti Gujarat" program aimed at making Gujarat the safest state for women by 2028. Implementation will begin in Ahmedabad and Surat within 60 days.',
            image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://timesofindia.indiatimes.com'
        },
        {
            id: 3,
            title: 'BRTS Ahmedabad Introduces Women-Only Night Buses',
            date: 'Apr 24, 2026',
            category: 'Ahmedabad',
            location: 'Ahmedabad, Gujarat',
            excerpt: 'Ahmedabad\'s BRTS launches dedicated women-only night bus services on 5 major routes from 9 PM to midnight with onboard marshals and live GPS tracking.',
            fullStory: 'The Ahmedabad Janmarg Limited (AJL) has introduced women-only BRTS bus services that will operate on 5 high-demand routes from 9:00 PM to 12:00 AM every day. The routes include:\n\n1. RTO to Maninagar via Ashram Road\n2. Gota to Naroda via SG Highway\n3. Satellite to Vastral via CG Road\n4. Thaltej to Odhav via Science City\n5. Bopal to Kalupur Railway Station\n\nEach bus will have:\n• A trained female marshal onboard\n• Live GPS tracking visible to passengers via the BRTS app\n• Emergency panic buttons at every seat\n• Well-lit interiors with CCTV cameras\n\nThe service is free for the first month as part of the promotional launch. Regular fares will apply from June 2026.',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://indianexpress.com'
        },
        {
            id: 4,
            title: 'Supreme Court Mandates Self-Defense Training in All Girls\' Schools',
            date: 'Apr 23, 2026',
            category: 'National',
            location: 'New Delhi, India',
            excerpt: 'In a historic ruling, the Supreme Court of India directs all state governments to make self-defense training compulsory for girls from Class 6 onwards in every school.',
            fullStory: 'The Supreme Court of India has passed a landmark directive mandating that all state governments must integrate self-defense training into the physical education curriculum for girls from Class 6 (age 11) onwards.\n\nThe ruling came in response to a PIL filed by the National Commission for Women highlighting the lack of preparedness training for young women. The bench, headed by the Chief Justice, observed:\n\n"Every girl child has the fundamental right to feel safe. Equipping them with basic self-defense skills is not optional — it is a constitutional obligation of the state."\n\nKey directives include:\n• Trained martial arts instructors must be appointed in every government school within 1 year\n• Private schools must comply within 18 months\n• Budget allocation from MHRD\'s Samagra Shiksha Abhiyan\n• Annual self-defense proficiency assessments\n\nThe Women and Child Development Ministry has welcomed the order and announced a ₹500 crore implementation plan.',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://livelaw.in'
        },
        {
            id: 5,
            title: 'Ahmedabad\'s Sabarmati Riverfront Declared "Safe Zone" with 24/7 Patrol',
            date: 'Apr 22, 2026',
            category: 'Ahmedabad',
            location: 'Ahmedabad, Gujarat',
            excerpt: 'AMC designates the entire 11-km Sabarmati Riverfront as an official Safe Zone with round-the-clock police presence, emergency kiosks, and AI-powered surveillance.',
            fullStory: 'The Ahmedabad Municipal Corporation (AMC) has officially designated the 11.5 km Sabarmati Riverfront as a "Certified Safe Zone" for women, families, and solo visitors. The declaration comes with a comprehensive safety upgrade:\n\n• 24/7 police patrol with both male and female officers\n• 120 emergency SOS kiosks installed along the stretch\n• AI-powered CCTV surveillance with real-time anomaly detection\n• Well-lit jogging tracks with motion-sensor lighting\n• Dedicated women\'s rest areas with washroom facilities\n• Direct integration with SafeHer India app for real-time alerts\n\nThe Riverfront, which attracts over 50,000 visitors daily, has seen a 78% reduction in safety complaints since the pilot program began in January.\n\nMayor stated: "We want the Sabarmati Riverfront to be a model for public space safety that other cities in India can replicate."',
            image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://ahmedabadmirror.com'
        },
        {
            id: 6,
            title: 'New Women Helpline 181 Gets AI Upgrade Across India',
            date: 'Apr 21, 2026',
            category: 'National',
            location: 'India',
            excerpt: 'The Women Helpline 181 is being upgraded with AI-driven voice recognition and multi-language support to handle emergency calls faster and more accurately.',
            fullStory: 'The Ministry of Women and Child Development has announced a major AI upgrade to the Women Helpline 181 across all Indian states. The upgraded system features:\n\n• AI-powered voice recognition that can detect distress even in whispered or coded messages\n• Support for 22 official Indian languages plus English\n• Automatic location detection from mobile calls within 10-second accuracy\n• Integration with local police control rooms for immediate dispatch\n• Callback verification within 60 seconds for dropped calls\n\nThe upgrade is being rolled out in phases, with Gujarat, Maharashtra, Karnataka, and Delhi being the first states to go live. The system has already reduced average response time from 8 minutes to under 2 minutes in pilot testing.\n\nWomen can reach the helpline by dialing 181 from any phone, including landlines. The service is free and available 24/7.',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://ndtv.com'
        },
        {
            id: 7,
            title: 'IIM Ahmedabad Students Build Free Safety App for Domestic Workers',
            date: 'Apr 20, 2026',
            category: 'Ahmedabad',
            location: 'Ahmedabad, Gujarat',
            excerpt: 'A team from IIM Ahmedabad develops a free mobile safety app specifically designed for domestic workers, featuring voice-activated SOS and employer verification.',
            fullStory: 'Students from IIM Ahmedabad\'s Centre for Innovation, Incubation, and Entrepreneurship (CIIE) have developed "GharSafe" — a free mobile application designed specifically for domestic workers\' safety.\n\nKey features include:\n• Voice-activated SOS that works even when the phone is locked (command: "Help SafeHer")\n• Employer verification system with Aadhaar-linked profiles\n• Automatic check-in/check-out logging when entering employer homes\n• Missed check-out alerts sent to emergency contacts\n• Built-in audio recording for evidence preservation\n• Works on basic smartphones with minimal data usage\n\nThe app is available in Gujarati, Hindi, and English. The team has already onboarded 5,000 domestic workers in Ahmedabad through partnerships with local NGOs.\n\nThe project won the "Social Impact Innovation Award" at the National Startup Summit.',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://yourstory.com'
        },
        {
            id: 8,
            title: 'Railways Introduce "Meri Saheli" Initiative on Gujarat Routes',
            date: 'Apr 19, 2026',
            category: 'Gujarat',
            location: 'Gujarat',
            excerpt: 'Indian Railways expands the "Meri Saheli" initiative across all Gujarat-origin trains with dedicated female RPF teams accompanying women travelers.',
            fullStory: 'Indian Railways has expanded its successful "Meri Saheli" initiative to cover all trains originating from Gujarat\'s major stations — Ahmedabad, Surat, Vadodara, and Rajkot.\n\nUnder this initiative:\n• Dedicated teams of female Railway Protection Force (RPF) personnel will be assigned to each train\n• Women traveling alone can register via the RailMadad app for priority assistance\n• Regular compartment checks will be conducted during night hours (10 PM - 6 AM)\n• Emergency intercoms in every women\'s coach directly connected to RPF\n• Safe waiting rooms at all major Gujarat stations open 24/7\n\nThe initiative was first launched as a pilot on the Ahmedabad-Mumbai Shatabdi Express and saw zero safety incidents over 6 months. Based on its success, it is now being expanded to cover over 200 trains.\n\nPassengers can reach RPF at 182 or through the RailMadad app.',
            image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&q=80&w=600',
            sourceUrl: 'https://indianrailways.gov.in'
        }
    ];

    const BREAKING_TICKER = [
        '🔴 Ahmedabad Police launches 24/7 women helpdesk at all 48 police stations',
        '🟢 Gujarat ranked #2 safest state for women in NCRB 2025 report',
        '🔵 New CCTV cameras installed at 500+ bus stops across Ahmedabad',
        '🟡 Self-defense workshops starting this weekend at Sabarmati Ashram — Free Entry',
        '🔴 Women-only parking zones introduced at Alpha One Mall and Ahmedabad One',
        '🟢 181 Women Helpline response time reduced to under 90 seconds in Gujarat',
        '🔵 IIM Ahmedabad launches free cyber-safety course for women — Register now',
        '🟡 Night cabs for women get ₹50 subsidy under "Safe Ride" scheme in Ahmedabad'
    ];

    const TRENDING_ALERTS = [
        'Ahmedabad: She Teams deployed at CG Road & Law Garden',
        'Gujarat: ₹200 Cr sanctioned for women safety infra',
        'Women-only BRTS night buses launched on 5 routes',
        'Sabarmati Riverfront declared official Safe Zone',
        'Meri Saheli initiative expanded to all Gujarat trains',
        'Free self-defense training at Kankaria Lake this Sunday'
    ];

    // Auto-rotating ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setTickerFade(false);
            setTimeout(() => {
                setTickerIndex(prev => (prev + 1) % BREAKING_TICKER.length);
                setTickerFade(true);
            }, 400);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleShare = async (item) => {
        const shareText = `${item.title} — ${item.excerpt}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: item.title, text: shareText, url: window.location.href });
            } catch (err) { /* user cancelled */ }
        } else {
            navigator.clipboard.writeText(shareText);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-8 py-12 relative">

            {/* ===== BREAKING NEWS TICKER ===== */}
            <div className="mb-10 bg-[#2D1B2E] rounded-2xl overflow-hidden shadow-xl">
                <div className="flex items-center">
                    <div className="bg-[#DC2626] px-5 py-4 flex items-center gap-2 shrink-0">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Breaking</span>
                    </div>
                    <div className="flex-1 px-6 py-4 flex items-center justify-between overflow-hidden">
                        <p className={`text-white font-medium text-sm transition-all duration-400 ${tickerFade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
                            {BREAKING_TICKER[tickerIndex]}
                        </p>
                        <div className="flex items-center gap-1 ml-4 shrink-0">
                            <button
                                onClick={() => { setTickerFade(false); setTimeout(() => { setTickerIndex(prev => (prev - 1 + BREAKING_TICKER.length) % BREAKING_TICKER.length); setTickerFade(true); }, 200); }}
                                className="p-1.5 text-white/40 hover:text-white transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-white/30 text-[10px] font-mono tabular-nums">{tickerIndex + 1}/{BREAKING_TICKER.length}</span>
                            <button
                                onClick={() => { setTickerFade(false); setTimeout(() => { setTickerIndex(prev => (prev + 1) % BREAKING_TICKER.length); setTickerFade(true); }, 200); }}
                                className="p-1.5 text-white/40 hover:text-white transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Ticker progress bar */}
                <div className="h-0.5 bg-white/5">
                    <div className="h-full bg-[#C94A7D] transition-all ease-linear" style={{ width: `${((tickerIndex + 1) / BREAKING_TICKER.length) * 100}%`, transitionDuration: '300ms' }} />
                </div>
            </div>

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4 text-[#C94A7D]">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">Latest Updates</span>
                </div>
                <h1 className="text-4xl font-bold font-serif text-[#8B4A6A] leading-tight tracking-tight">Safety News & Alerts</h1>
            </header>

            {/* Safety Alert Banner */}
            {activeAlert && (
                <div className="mb-12 p-6 bg-red-50 border-l-4 border-[#DC2626] rounded-r-2xl flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <ShieldAlert className="w-6 h-6 text-[#DC2626]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#DC2626] mb-1 font-serif">High Priority Alert — Ahmedabad</h3>
                            <p className="text-sm text-red-800 font-body">Avoid SG Highway near Sola Bridge between 11 PM–5 AM due to ongoing road construction. Use SafeHer Verified alternate routes via Science City Road.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setActiveAlert(false)}
                        className="text-red-400 hover:text-red-700 p-1 shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main News Feed */}
                <div className="lg:col-span-2 space-y-10">
                    {NEWS.map((item) => (
                        <article key={item.id} className="flex flex-col md:flex-row gap-8 group">
                            <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden rounded-2xl relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg ${item.category === 'Ahmedabad' ? 'bg-[#C94A7D]' :
                                    item.category === 'Gujarat' ? 'bg-[#8B4A6A]' :
                                        item.category === 'National' ? 'bg-[#4B7FBE]' :
                                            'bg-[#DC2626]'
                                    }`}>
                                    {item.category}
                                </span>
                            </div>
                            <div className="md:w-2/3 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-3 text-xs text-gray-400 font-bold">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.date}</span>
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {item.location}</span>
                                </div>
                                <h3 className="text-2xl font-bold font-serif text-[#2D1B2E] leading-snug mb-4 group-hover:text-[#8B4A6A] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[#6B5B6B] font-body text-sm leading-relaxed mb-6">
                                    {item.excerpt}
                                </p>
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setExpandedArticle(expandedArticle === item.id ? null : item.id)}
                                        className="text-[#8B4A6A] font-bold text-sm hover:underline decoration-2 underline-offset-4 flex items-center gap-1.5"
                                    >
                                        {expandedArticle === item.id ? 'Close Story' : 'Read Full Story'}
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleShare(item)}
                                        className="text-gray-400 hover:text-[#8B4A6A] transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Expanded Full Story */}
                                {expandedArticle === item.id && (
                                    <div className="mt-6 p-6 bg-[#FDF0F6] rounded-2xl border border-[#8B4A6A]/10 animate-in slide-in-from-top-2">
                                        <div className="prose prose-sm max-w-none">
                                            {item.fullStory.split('\n\n').map((para, idx) => (
                                                <p key={idx} className="text-[#2D1B2E] font-body text-sm leading-relaxed mb-4 last:mb-0">
                                                    {para.startsWith('•') || para.startsWith('1.') ? (
                                                        <span className="whitespace-pre-line">{para}</span>
                                                    ) : (
                                                        para
                                                    )}
                                                </p>
                                            ))}
                                        </div>
                                        {item.sourceUrl && (
                                            <a
                                                href={item.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 mt-4 text-[#8B4A6A] font-bold text-xs uppercase tracking-widest hover:underline"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                Visit Source
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-10">
                    <section className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
                        <h4 className="text-xl font-bold font-serif text-[#8B4A6A] mb-6 flex items-center gap-3">
                            <Newspaper className="w-5 h-5 font-bold" />
                            Trending Safety Alerts
                        </h4>
                        <div className="space-y-6 text-sm font-body">
                            {TRENDING_ALERTS.map((alert, i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                    <span className="text-[#8B4A6A] font-bold text-lg leading-none pt-1">0{i + 1}.</span>
                                    <p className="text-[#2D1B2E] leading-relaxed group-hover:text-[#8B4A6A] transition-colors font-medium">
                                        {alert}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-[#F5F1E8] text-[#8B4A6A] font-bold rounded-xl hover:bg-[#8B4A6A] hover:text-white transition-all text-sm uppercase tracking-widest">
                            View All Alerts
                        </button>
                    </section>

                    {/* Quick Safety Numbers */}
                    <section className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
                        <h4 className="text-xl font-bold font-serif text-[#8B4A6A] mb-6 flex items-center gap-3">
                            <Bell className="w-5 h-5" />
                            Emergency Numbers
                        </h4>
                        <div className="space-y-4">
                            {[
                                { name: 'Women Helpline', number: '181', color: 'bg-[#C94A7D]' },
                                { name: 'Police Emergency', number: '112', color: 'bg-[#DC2626]' },
                                { name: 'Ahmedabad Women Cell', number: '079-25507225', color: 'bg-[#8B4A6A]' },
                                { name: 'Railway RPF', number: '182', color: 'bg-[#4B7FBE]' },
                            ].map((item, i) => (
                                <a key={i} href={`tel:${item.number}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                                            <span className="text-white text-xs font-black">{i + 1}</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#2D1B2E] group-hover:text-[#8B4A6A] transition-colors">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-mono font-bold text-[#8B4A6A]">{item.number}</span>
                                </a>
                            ))}
                        </div>
                    </section>
                    <section className="p-8 bg-[#2D1B2E] text-white rounded-3xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-4">Stay Vigilant, Stay Safe</h4>
                            <p className="text-sm text-gray-300 font-body mb-6 leading-relaxed">
                                Join our real-time notification network to receive critical safety updates for Ahmedabad and your specific routes.
                            </p>
                            <button className="btn-secondary w-full">Enable Notifications</button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#8B4A6A]/20 blur-3xl" />
                    </section>
                </div>
            </div>
        </div>
    );
}