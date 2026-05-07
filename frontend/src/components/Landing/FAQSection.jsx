import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: 'Is SafeHer India free to use?',
    answer: 'Yes! Our Basic Haven plan is completely free. You get access to the safety map, standard SOS alerts, and up to 2 guardians at no cost.',
  },
  {
    question: 'How does the SOS feature work?',
    answer: 'When you tap the SOS button, the app immediately sends your real-time GPS location, a pre-recorded audio clip, and an emergency alert to all your registered guardians and optionally to local emergency services (112).',
  },
  {
    question: 'Who can see my live location?',
    answer: 'Only the guardians you have explicitly approved. Your location data is end-to-end encrypted and never shared with third parties.',
  },
  {
    question: 'Does it work without internet?',
    answer: 'Premium and Annual plan users can download offline maps for their region. The SOS feature can also send an SMS alert as a fallback when internet is unavailable.',
  },
  {
    question: 'How is SafeHer India different from other safety apps?',
    answer: 'SafeHer India is built specifically for Indian women with India-specific data — crowdsourced safety ratings for Indian neighborhoods, integration with 112, and a UI designed for quick one-hand use in stressful situations.',
  },
  {
    question: 'Is my personal data safe?',
    answer: 'Absolutely. We are ISO 27001 certified, DPDP Act compliant, and your data is stored on servers within India. We never sell or share user data.',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`border-b border-[#8A2B57]/8 transition-colors duration-300 ${isOpen ? 'bg-[#FDF0F6]/50' : ''}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between py-6 px-6 text-left">
        <h3 className={`font-headline text-base lg:text-lg font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-[#8A2B57]' : 'text-[#3e0021]'}`}>
          {item.question}
        </h3>
        <span className={`material-symbols-outlined text-xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#8A2B57]' : 'text-[#37003C]/40'}`}>
          keyboard_arrow_down
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? '200px' : '0px' }}>
        <p className="px-6 pb-6 font-body text-[#37003C]/60 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-[#3e0021] tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="font-body text-lg text-[#37003C]/60">Everything you need to know about SafeHer India.</p>
        </div>
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#8A2B57]/8 overflow-hidden">
          {FAQ_DATA.map((item, i) => (
            <FAQItem key={i} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
