import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#4a1532] w-full pt-16 pb-8 text-sm font-body">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 max-w-[1440px] mx-auto">
                <div className="col-span-1 md:col-span-1">
                    <div className="text-xl font-bold text-white font-headline mb-4 tracking-tight">SafeHer India</div>
                    <p className="text-stone-300 mb-6 italic">The Sovereign Sanctuary.</p>
                    <p className="text-stone-300 text-xs">© 2024 SafeHer India. All rights reserved.</p>
                </div>
                <div className="col-span-1">
                    <h4 className="text-white font-bold mb-4 font-label uppercase tracking-wider text-xs">Legal</h4>
                    <ul className="space-y-3">
                        <li><a className="text-stone-300 hover:text-white transition-all" href="#">Privacy Policy</a></li>
                        <li><a className="text-stone-300 hover:text-white transition-all" href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <h4 className="text-white font-bold mb-4 font-label uppercase tracking-wider text-xs">Support</h4>
                    <ul className="space-y-3">
                        <li><a className="text-stone-300 hover:text-white transition-all" href="#">Contact Us</a></li>
                        <li><a className="text-stone-300 hover:text-white transition-all" href="#">Emergency Hub</a></li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <p className="text-stone-300 italic">Made with purpose for the women of India.</p>
                </div>
            </div>
        </footer>
    );
}
