import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, ArrowRight, Bookmark, Share2, CheckCircle, Heart, Sparkles, Shield, Compass, Dumbbell, Brain } from 'lucide-react';
export default function WellnessPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [savedGuides, setSavedGuides] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [toast, setToast] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const CATEGORIES = [
        { name: 'All', icon: Sparkles },
        { name: 'Mental Health', icon: Brain },
        { name: 'Physical Safety', icon: Shield },
        { name: 'Travel Tips', icon: Compass },
        { name: 'Self Defense', icon: Dumbbell }
    ];
    const GUIDES = [
        {
            id: 1,
            title: 'Active Awareness: Daily Safety Habits',
            category: 'Physical Safety',
            desc: 'Simple routines you can incorporate into your daily life to stay alert and prepared for any situation.',
            time: '5 min read',
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400',
            accent: '#E67E22'
        },
        {
            id: 2,
            title: 'Healing Through Community',
            category: 'Mental Health',
            desc: 'Understanding the power of safe spaces and sisterhood in overcoming anxiety and trauma.',
            time: '8 min read',
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400',
            accent: '#2ECC71'
        },
        {
            id: 3,
            title: 'Safe Solo Travel in India',
            category: 'Travel Tips',
            desc: 'A comprehensive guide to navigating public transport, accommodation, and late-night travel safely.',
            time: '12 min read',
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400',
            accent: '#3498DB'
        },
        {
            id: 4,
            title: 'Basics of De-escalation',
            category: 'Self Defense',
            desc: 'How to use verbal techniques and body language to defuse potentially dangerous confrontations.',
            time: '6 min read',
            image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&q=80&w=400',
            accent: '#9B59B6'
        },
        {
            id: 5,
            title: 'The "Invisible Shield" Technique',
            category: 'Self Defense',
            desc: 'Psychological strategies to project confidence and deter unwanted attention in crowded spaces.',
            time: '7 min read',
            image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400',
            accent: '#E74C3C'
        },
        {
            id: 6,
            title: 'Managing Panic in Crisis',
            category: 'Mental Health',
            desc: 'Quick breathing exercises and grounding techniques used by first responders to stay calm.',
            time: '4 min read',
            image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=400',
            accent: '#1ABC9C'
        }
    ];
    const filteredGuides = GUIDES.filter(g => {
        const matchesCategory = activeCategory === 'All' || g.category === activeCategory;
        const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase())
            || g.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    const toggleBookmark = (id) => {
        if (savedGuides.includes(id)) {
            setSavedGuides(savedGuides.filter(savedId => savedId !== id));
        } else {
            setSavedGuides([...savedGuides, id]);
        }
    };
    const handleShare = async (guide) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: guide.title,
                    text: guide.desc,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setToast('Link copied!');
            setTimeout(() => setToast(null), 2000);
        }
    };
    return (
        <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF0F5 50%, #F5F0FF 100%)' }}>
            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-label text-sm font-semibold">{toast}</span>
                </div>
            )}
            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #F0A5C0, transparent)' }} />
            <div className="absolute top-96 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #A78BFA, transparent)' }} />
            <div className="absolute bottom-40 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #FBBF24, transparent)' }} />
            <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
                {/* Hero Header */}
                <header className="mb-16 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #FDF2F8, #EDE9FE)', border: '1px solid rgba(139,74,106,0.15)' }}>
                        <Heart className="w-4 h-4 text-[#C94A7D]" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B4A6A]">Your Wellness Hub</span>
                        {savedGuides.length > 0 && (
                            <span className="bg-[#C94A7D] text-white px-2 py-0.5 rounded-full text-[10px] font-bold ml-1">
                                {savedGuides.length} saved
                            </span>
                        )}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold font-serif text-[#2D1B2E] tracking-tight leading-[1.1] mb-6">
                        Wellness & Safety<br />
                        <span style={{ background: 'linear-gradient(135deg, #8B4A6A, #C94A7D, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Guides</span>
                    </h1>
                    <p className="text-lg text-[#6B5B6B] font-body max-w-xl mx-auto leading-relaxed">
                        Expert-vetted resources for your physical safety and mental well-being. Curated with care for women across India.
                    </p>
                    {/* Search */}
                    <div className="relative w-full max-w-md mx-auto mt-8">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search wellness guides..."
                            className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl outline-none focus:border-[#C94A7D] focus:shadow-lg focus:shadow-[#C94A7D]/10 transition-all text-sm"
                            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                        />
                    </div>
                </header>
                {/* Featured Article — Immersive Hero Card */}
                <div className="mb-16 relative rounded-[2rem] overflow-hidden group cursor-pointer" style={{ minHeight: '420px', boxShadow: '0 25px 60px rgba(45,27,46,0.2)' }}>
                    <img
                        src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200"
                        alt="Featured Guide"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(45,27,46,0.92) 0%, rgba(45,27,46,0.7) 40%, rgba(45,27,46,0.3) 100%)' }} />
                    <div className="relative z-10 p-12 md:p-16 flex flex-col justify-end h-full" style={{ minHeight: '420px' }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] w-fit mb-6" style={{ background: 'linear-gradient(135deg, #C94A7D, #A855F7)', color: 'white' }}>
                            <Sparkles className="w-3.5 h-3.5" /> Featured Guide
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4 max-w-2xl">
                            The Modern Woman's Handbook to Safe Commuting
                        </h2>
                        <p className="text-gray-300 font-body text-lg leading-relaxed max-w-xl mb-8">
                            From cab protocols to transit apps, we break down every layer of safety needed for your daily journey.
                        </p>
                        {/* Expandable Content */}
                        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                            <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
                                <p className="text-gray-300 font-body text-sm leading-relaxed mb-4">
                                    Navigating daily commutes in bustling cities requires more than just awareness—it requires a system. Before entering any cab, always verify the driver's details against your app. Cross-check the license plate, the driver's photo, and ensure the child lock on your door is disabled.
                                </p>
                                <p className="text-gray-300 font-body text-sm leading-relaxed mb-4">
                                    Public transit poses different challenges. Stick to well-lit compartments and sit near the exit or transit staff. If you feel uneasy, trust your gut. Move to another carriage or get off at the next populated stop.
                                </p>
                                <p className="text-gray-300 font-body text-sm leading-relaxed">
                                    Finally, always share your live location with at least one trusted Guardian. SafeHer India's background tracking ensures your safety network always knows your last known location, even if your phone loses signal.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest w-fit transition-all duration-300 group/btn"
                            style={{ background: 'linear-gradient(135deg, #C94A7D, #A855F7)', color: 'white', boxShadow: '0 8px 32px rgba(201,74,125,0.35)' }}
                        >
                            {isExpanded ? 'Collapse Article' : 'Read Full Article'}
                            <ArrowRight className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-90' : 'group-hover/btn:translate-x-1'}`} />
                        </button>
                    </div>
                </div>
                {/* Category Pills — Floating style */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {CATEGORIES.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat.name
                                        ? 'text-white shadow-lg scale-105'
                                        : 'bg-white/70 backdrop-blur-sm border border-gray-200/60 text-[#6B5B6B] hover:border-[#C94A7D]/40 hover:bg-white'
                                    }`}
                                style={activeCategory === cat.name ? { background: 'linear-gradient(135deg, #8B4A6A, #C94A7D)', boxShadow: '0 8px 24px rgba(201,74,125,0.3)' } : {}}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.name}
                                <span className={`text-xs ${activeCategory === cat.name ? 'text-white/70' : 'text-gray-400'}`}>
                                    ({cat.name === 'All' ? GUIDES.length : GUIDES.filter(g => g.category === cat.name).length})
                                </span>
                            </button>);
                    })}               </div>
                <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">
                    {filteredGuides.length} guide{filteredGuides.length !== 1 && 's'} available
                </p>
                {/* Guides Grid — Staggered Bento Style */}
                {filteredGuides.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-[#2D1B2E] mb-2">No guides found</h3>
                        <p className="text-[#6B5B6B] max-w-sm">We couldn't find any guides matching "{searchQuery}". Try adjusting your search or category filter.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGuides.map((guide, index) => (
                            <div
                                key={guide.id}
                                className={`group relative bg-white/70 backdrop-blur-xl rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${index === 0 ? 'md:col-span-2 md:row-span-1' : ''
                                    }`}
                                style={{
                                    boxShadow: hoveredCard === guide.id
                                        ? `0 20px 50px ${guide.accent}25, 0 0 0 1px ${guide.accent}20`
                                        : '0 4px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
                                    border: '1px solid rgba(255,255,255,0.6)'
                                }}
                                onMouseEnter={() => setHoveredCard(guide.id)}
                                onMouseLeave={() => setHoveredCard(null)}  >
                                <div className={`relative overflow-hidden ${index === 0 ? 'h-56 md:h-64' : 'h-48'}`}>
                                    <img
                                        src={guide.image}
                                        alt={guide.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    {/* Category chip */}
                                    <span
                                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md"
                                        style={{ background: `${guide.accent}CC` }}
                                    >
                                        {guide.category}
                                    </span>

                                    {/* Read time */}
                                    <span className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-white bg-black/40 backdrop-blur-md">
                                        <Clock className="w-3 h-3" /> {guide.time}
                                    </span>
                                </div>
                                <div className="p-6 space-y-3">
                                    <h3 className={`font-bold font-serif text-[#2D1B2E] group-hover:text-[#8B4A6A] transition-colors leading-tight ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                                        {guide.title}
                                    </h3>
                                    <p className="text-sm text-[#6B5B6B] line-clamp-2 font-body leading-relaxed">
                                        {guide.desc}
                                    </p>
                                    <div className="flex items-center justify-between pt-4">
                                        <button className="flex items-center gap-2 text-[#8B4A6A] font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                                            Read More <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => toggleBookmark(guide.id)}
                                                className={`p-2 rounded-xl transition-all ${savedGuides.includes(guide.id) ? 'bg-[#FDF0F6] text-[#C94A7D] scale-110' : 'text-gray-400 hover:text-[#C94A7D] hover:bg-gray-50'}`}
                                            >
                                                <Bookmark className="w-4 h-4" fill={savedGuides.includes(guide.id) ? '#C94A7D' : 'none'} />
                                            </button>
                                            <button
                                                onClick={() => handleShare(guide)}
                                                className="p-2 text-gray-400 hover:text-[#8B4A6A] hover:bg-gray-50 rounded-xl transition-all"
                                            >
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-10 rounded-[2rem]" style={{ background: 'linear-gradient(135deg, rgba(139,74,106,0.06), rgba(168,85,247,0.06))', border: '1px solid rgba(139,74,106,0.1)' }}>
                        <Shield className="w-8 h-8 text-[#8B4A6A]" />
                        <h3 className="text-2xl font-serif font-bold text-[#2D1B2E]">Want to contribute a guide?</h3>
                        <p className="text-[#6B5B6B] max-w-md text-sm">Share your safety tips and wellness advice to help women across India stay informed and empowered.</p>
                        <button className="mt-2 px-8 py-3 rounded-xl text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #8B4A6A, #C94A7D)', boxShadow: '0 8px 24px rgba(201,74,125,0.3)' }}>
                            Submit a Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}