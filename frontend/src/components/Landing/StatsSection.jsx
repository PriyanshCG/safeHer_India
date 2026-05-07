import React, { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const STATS = [
  {
    icon: 'shield_person',
    value: 10000,
    suffix: '+',
    label: 'Women Protected',
  },
  {
    icon: 'speed',
    value: 98,
    suffix: '%',
    label: 'SOS Response Rate',
  },
  {
    icon: 'location_city',
    value: 500,
    suffix: '+',
    label: 'Cities Covered',
  },
  {
    icon: 'timer',
    value: 30,
    prefix: '< ',
    suffix: 'sec',
    label: 'Average Alert Time',
  },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#4a1532] to-[#3e0021] relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#8A2B57]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8A2B57]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <p className="font-label text-xs uppercase tracking-[0.25em] text-rose-300/80 mb-4">
            Trusted by women across India
          </p>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Impact in Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#8A2B57]/30 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl text-rose-300">
                  {stat.icon}
                </span>
              </div>
              <div className="font-headline text-4xl lg:text-5xl font-extrabold text-white mb-2 tabular-nums">
                {stat.prefix || ''}
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-label text-sm text-rose-200/80 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
