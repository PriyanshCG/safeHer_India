import React from 'react';

export default function AppDownloadSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#8A2B57] to-[#4a1532] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column — Text & Buttons */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 mb-8">
              <span className="material-symbols-outlined text-sm text-white">
                phone_iphone
              </span>
              <span className="font-label text-xs font-bold text-white uppercase tracking-widest">
                Now Available
              </span>
            </div>

            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              Keep SafeHer India<br />In Your Pocket
            </h2>

            <p className="font-body text-lg text-rose-200/80 leading-relaxed mb-10 max-w-md">
              Download the app and carry your safety network everywhere you go.
              Available on iOS and Android.
            </p>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {/* App Store */}
              <button className="flex items-center gap-3 bg-black/80 hover:bg-black px-6 py-3.5 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/60 font-label leading-none">
                    Download on the
                  </p>
                  <p className="text-white font-label font-bold text-sm leading-tight">
                    App Store
                  </p>
                </div>
              </button>

              {/* Google Play */}
              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-6 py-3.5 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.609-.92V2.734a1 1 0 0 1 .609-.92zM14.852 13.06l2.36 2.36-9.97 5.67 7.61-8.03zm3.91-2.13l2.15 1.22a1 1 0 0 1 0 1.7l-2.15 1.22-2.6-2.07 2.6-2.07zM7.242 3.91l9.97 5.67-2.36 2.36-7.61-8.03z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/60 font-label leading-none">
                    Get it on
                  </p>
                  <p className="text-white font-label font-bold text-sm leading-tight">
                    Google Play
                  </p>
                </div>
              </button>
            </div>

            <p className="font-label text-xs text-rose-200/50 tracking-wide">
              4.9 ★ Rating · 10K+ Downloads · Free to use
            </p>
          </div>

          {/* Right column — Phone mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-[280px]">
              {/* Phone frame */}
              <div className="bg-[#1a0a12] rounded-[40px] p-3 shadow-2xl shadow-black/40 border border-white/10">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a0a12] rounded-b-2xl z-20"></div>

                {/* Screen */}
                <div className="bg-[#FFF7FA] rounded-[28px] overflow-hidden">
                  {/* Status bar */}
                  <div className="h-10 bg-[#4a1532] flex items-center justify-between px-5">
                    <span className="text-[10px] text-white/60 font-label">9:41</span>
                    <div className="flex gap-1.5">
                      <div className="w-3.5 h-2 bg-white/40 rounded-sm"></div>
                      <div className="w-3.5 h-2 bg-white/40 rounded-sm"></div>
                      <div className="w-3.5 h-2 bg-white/40 rounded-sm"></div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-5 pt-4 pb-3 bg-white border-b border-[#FDF0F6]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#8A2B57] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs text-white">shield</span>
                      </div>
                      <span className="font-label text-xs font-bold text-[#3e0021]">SafeHer India</span>
                    </div>
                  </div>

                  {/* Fake map */}
                  <div className="h-48 bg-gradient-to-br from-[#FDF0F6] to-[#e8d5df] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-[#8A2B57]/20">map</span>
                    </div>
                    {/* Map dots */}
                    <div className="absolute top-8 left-10 w-2.5 h-2.5 bg-[#8A2B57] rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-12 w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="absolute bottom-12 left-1/2 w-2 h-2 bg-amber-400 rounded-full"></div>
                  </div>

                  {/* SOS Button */}
                  <div className="px-5 py-5 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-red-600 shadow-lg shadow-red-600/40 flex items-center justify-center">
                      <span className="font-label text-xs font-bold text-white uppercase tracking-wider">SOS</span>
                    </div>
                    <p className="font-label text-[10px] text-[#37003C]/40 text-center">Tap for emergency alert</p>
                  </div>

                  {/* Bottom nav */}
                  <div className="flex justify-around px-4 py-3 border-t border-[#FDF0F6]">
                    {['home', 'map', 'sos', 'group', 'person'].map((ic, i) => (
                      <span key={i} className={`material-symbols-outlined text-lg ${i === 0 ? 'text-[#8A2B57]' : 'text-[#37003C]/30'}`}>{ic}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reflection */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-white/5 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
