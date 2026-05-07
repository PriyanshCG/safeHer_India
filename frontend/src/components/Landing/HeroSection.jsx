import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export default function HeroSection() {
    return (
        <section className="gradient-hero min-h-[921px] flex items-center bg-white relative overflow-hidden">
            {/* Decorative gradient overlay handled by CSS in index.css (gradient-hero::after) */}
            <div className="max-w-[1440px] mx-auto px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 py-16">
                <div className="lg:col-span-7 space-y-8 animate-in slide-in-from-left duration-700">
                    <div className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full shadow-ambient-rose">
                        <span className="material-symbols-outlined text-primary text-sm material-symbols-fill">security</span>
                        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Women-first Safety Platform</span>
                    </div>

                    <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-tight tracking-[-0.02em]">
                        Travel <span className="text-primary italic">Fearlessly</span><br />Across India
                    </h1>

                    <p className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                        Real-time safety map, SOS alerts, and guardian network — built specifically to empower and protect solo women travelers in every journey.
                    </p>

                    <div className="flex flex-wrap gap-6 pt-4">
                        <Link
                            to={ROUTES.SIGNUP}
                            className="bg-primary-container text-white font-label font-bold py-4 px-8 rounded-lg shadow-3d-primary text-lg active:translate-y-[2px] active:shadow-none transition-all duration-200"
                        >
                            Get Started Free
                        </Link>
                        <button className="bg-surface-container-high text-primary font-label font-bold py-4 px-8 rounded-lg text-lg hover:bg-surface-variant transition-colors duration-200 border border-outline-variant/15">
                            See How It Works
                        </button>
                    </div>

                    <div className="flex items-center gap-4 pt-8">
                        <div className="flex -space-x-3">
                            {[
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuCp9uc3RuW3E3R3sYCHw1Wt8Vi9rOKUwf-gge4H3dfASy863ezKo54QIO0OsYsWpLDLwoUZSVhx1WWXmvZ7rKdc2mVZr4CYk_x_3K9W-5AnGpMI2LGpKUidDQePbzcu0LcYKzRe6uUSgnYoDChtm224OsCa_Rcu_gQHqaD9M96aF3rJCcZeZoEPCKp6yGmQ5ieTHJd2Af8uNWQ336U04S3n_-tdhyks24erpPZ2OAIpubPQlU_cBSusXqGAiCVNkLb_K6N85Bb5ZHQX",
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuB939moER2ZG6cduuQx5MFuT6OtAuQ7XaFy9bhrqTAkl-jPIp_h3KTpFAqoC9O9CC7eYaJw3yeQZpmRODkNPfVAa4uWW9WglSV1aOS96FT1aIo_0qO-zFZj708Z0CEUvS2OqXMWABecW4tPQo-1J4YEUaHgmpj2YcVlPMsfkDBeO-J9QHIQYpdHwPrrOvJEAKtxZA6IJEtdRaWsMbpRvAKuKNxY9MI294L4AKWJv-gnpSRJ6_OnEVXnmxs-uwfS8bRr6C1e1haj7dvC",
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuBnyc9pWrUEJlxm9-31aD5MTOCXf0W7XYcRcMzQHWvn_r6aoRPDoicbcfi6GOLl0SPEF_P-lII86Ig48E8eL9Z5fFxV0QZgDpseH5DglokravtPYswVo3IFnqd4UFnyopwz3cH1pcnTO8bZoeTaqVO79DliWOllUTTuvoslRNiAPq40XfbayG4gmR9lDRVTJ87KZidBAP8l6GbJDyz3dHnAMdwsSPDIO3zqQ4PmazGePGex7tdDojDDHnY3CE273HqhtbjMJmJUBsC3"
                            ].map((url, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center overflow-hidden">
                                    <img className="w-full h-full object-cover" src={url} alt="user" />
                                </div>
                            ))}
                        </div>
                        <div className="font-label text-sm text-on-surface-variant">
                            <span className="font-bold text-primary">✓ 10,000+</span> Women Protected
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 relative hidden lg:block animate-in fade-in zoom-in duration-1000">
                    <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-ambient-rose bg-surface-container-lowest border border-outline-variant/15 p-4">
                        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative flex items-center justify-center p-2">
                            <img
                                alt="Empowering Illustration"
                                className="w-full h-full object-contain"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo9iFNi-2DFldxsi8LpM0eRqRvQc0DuhkLpEqv6LWIhIEVxgG35khmpXom2sXOrgOAO4gCvutStirDLJAuxWyiG-d6qcwrF1jpv6lIv9A6PEpLDiMOZZjrmErIgGexD-TZBR-v0FvF9QbPKIQVj0OoF-HyAXaSx1VMErdtB5XXtkWdTjtlRbKLbp5rAF6-rHaW_BZFb2wb8QtqXqVnKCD43B6qrfmdzPSwFQS47A8wDa11L7aSKaE5Ji0OI4Bnx_Uaq9-L2S4orzIx"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
