import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#FDF0F6] to-white">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#8A2B57]/10 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl text-[#8A2B57]">notifications_active</span>
        </div>

        <h2 className="font-headline text-3xl lg:text-4xl font-bold text-[#3e0021] tracking-tight mb-3">
          Stay Updated on Safety Alerts
        </h2>
        <p className="font-body text-[#37003C]/60 mb-8 leading-relaxed">
          Get monthly safety reports, app updates, and women's safety tips directly in your inbox.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl py-5 px-6 mb-6">
            <p className="font-label text-sm text-green-700 font-semibold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              You're subscribed! Welcome to the SafeHer community.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-lg border border-[#8A2B57]/20 bg-white font-body text-sm text-[#3e0021] placeholder-[#37003C]/30 focus:outline-none focus:ring-2 focus:ring-[#8A2B57]/30 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#8A2B57] text-white font-label font-bold text-sm rounded-lg hover:bg-[#6d2245] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-[#8A2B57]/20 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="font-label text-xs text-[#37003C]/40 mb-3 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-sm">lock</span>
          No spam. Unsubscribe anytime. Your privacy is sacred.
        </p>
        <p className="font-label text-xs text-[#8A2B57]/60 font-semibold">
          Join 5,000+ women already subscribed
        </p>
      </div>
    </section>
  );
}
