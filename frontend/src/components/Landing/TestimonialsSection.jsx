import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
    const TESTIMONIALS = [
        {
            name: 'Aditi Rao',
            role: 'Student, Delhi',
            quote: 'SafeHer has given me the confidence to attend late-night study sessions. The live map is incredibly accurate.',
            rating: 5,
            img: 'https://i.pravatar.cc/100?img=32'
        },
        {
            name: 'Meera Kapoor',
            role: 'Software Engineer, Bangalore',
            quote: 'The guardian network is a lifesaver. Knowing my mom gets an instant alert makes me feel so much safer during commutes.',
            rating: 5,
            img: 'https://i.pravatar.cc/100?img=33'
        },
        {
            name: 'Sneha Patel',
            role: 'Traveler, Mumbai',
            quote: 'I used the SOS feature once in an unfamiliar neighborhood, and the response was almost instantaneous. Truly reliable.',
            rating: 5,
            img: 'https://i.pravatar.cc/100?img=34'
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-[#F5F1E8]">
            <div className="max-w-7xl mx-auto px-8 text-center mb-20 space-y-4">
                <h2 className="text-4xl font-bold font-serif text-[#2D1B2E]">What Women Say About Us</h2>
                <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 fill-[#C94A7D] text-[#C94A7D]" />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm relative border border-gray-100 flex flex-col items-center text-center">
                        <Quote className="absolute top-6 left-6 w-10 h-10 text-gray-100 fill-current" />
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border-4 border-[#F5F1E8]">
                            <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[#2D1B2E] font-body italic mb-6 leading-relaxed">
                            "{t.quote}"
                        </p>
                        <div>
                            <p className="font-serif font-bold text-[#8B4A6A]">{t.name}</p>
                            <p className="text-[10px] text-[#6B5B6B] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
