import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(ROUTES.DASHBOARD);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-surface text-on-surface font-body antialiased flex overflow-hidden relative">
      {/* LEFT COLUMN - LOGIN FORM (50% width) */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center relative bg-white">
        <div className="bg-texture"></div>

        {/* Mobile Header */}
        <div className="lg:hidden absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-white/80 backdrop-blur-md">
          <h1 className="font-headline text-2xl font-bold text-primary tracking-tight">SafeHer India</h1>
        </div>

        <div className="w-full max-w-[420px] bg-white rounded-[24px] p-10 relative z-10" style={{ boxShadow: "0 10px 40px -10px rgba(138, 43, 87, 0.12)" }}>
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-2 tracking-tight">Welcome back</h2>
            <p className="font-body text-base text-on-surface-variant">Access your personal safety sanctuary</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-label text-sm font-semibold text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-outline">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </span>
                <input
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm text-on-surface"
                  id="email"
                  placeholder="priya@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-label text-sm font-semibold text-on-surface" htmlFor="password">Password</label>
                <button type="button" className="font-label text-xs text-primary font-medium hover:underline transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-outline">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </span>
                <input
                  className="w-full pl-11 pr-11 py-3 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm text-on-surface"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100 text-center font-medium">
                {error}
              </div>
            )}
            <button 
              className="w-full mt-2 h-[52px] bg-primary text-white font-headline font-semibold text-lg rounded-xl transition-all hover:bg-primary/90 active:scale-[0.98] flex justify-center items-center shadow-lg shadow-primary/20 disabled:opacity-70" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="flex items-center w-full gap-4">
              <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
              <span className="font-label text-xs text-outline uppercase tracking-widest">or</span>
              <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface font-label text-sm font-semibold shadow-sm" type="button">
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continue with Google
            </button>

            <p className="font-label text-sm text-on-surface-variant text-center">
              New here? <Link className="text-primary font-bold hover:underline" to={ROUTES.SIGNUP}>Create Free Account</Link>
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 flex items-center justify-center gap-2 text-outline/60">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="font-label text-[12px] font-medium uppercase tracking-wider">End-to-end encrypted for your safety</span>
        </div>
      </div>

      {/* RIGHT COLUMN - VISUAL PANEL (50% width) */}
      <div className="hidden lg:flex w-1/2 relative flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Three happy Indian women traveling together"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQfbHtUDsY34cJ3jS7FouKIDYSuqsBj6U6tkmrX8uH80Laqh4uJxnKtLn7yF5X6lHXBeMXXIS-p5J0fSCaQOEKfxCPkz6zTyrELHRmeNqUg-4Wrt3KJlhxJf0crMEmKtkOxUZedbzl3s20visD2e1KL8HxXLGSuDec3cMBpOicGlMkExVDa63H6V2V-ux_b7sP97N2Y3p8ZRj1_jWj8vGwkINagxFnMNgW3E6x2Omm81V6hip0waIWKl8naIpg-gbIk54bWwgoWUjl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e0021]/90 via-[#3e0021]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#3e0021]/30 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col p-12 justify-start">
          <div className="flex items-center gap-4 mb-32">
            <h1 className="font-headline text-3xl font-bold text-white tracking-tight">SafeHer India</h1>
            <div className="h-4 w-[1px] bg-white/40"></div>
            <span className="font-label text-xs text-white/80 uppercase tracking-widest">Your Safety. Our Priority.</span>
          </div>

          <div className="max-w-lg mb-auto">
            <h2 className="font-headline text-6xl leading-[1.1] text-white font-bold tracking-tight mb-6">
              A sanctuary in<br />your pocket.
            </h2>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-sm mb-8">
              Trusted by 10,000+ women traveling solo across India's vibrant landscapes.
            </p>

            <div className="flex flex-wrap gap-3">
              {['50+ Cities', '24/7 Support', '112 Connected'].map((pill, i) => (
                <div key={i} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                  <span className="font-label text-xs font-bold text-white uppercase tracking-wider">{pill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-[20px] p-6 rounded-2xl border border-white/20 max-w-sm ml-auto shadow-2xl">
            <div className="flex gap-0.5 text-[#f0e8c8] mb-3">
              {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-lg material-symbols-fill">star</span>)}
            </div>
            <p className="font-body italic text-sm text-white mb-5 leading-relaxed">
              "The Guardian Shield feature gave me the confidence to explore Jaipur alone at dusk. Truly a lifesaver app."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3k-g5onhN-SOg7bUMKf7GwwuE02Z0cK1UklkHj1zFUqAmcffTOlYj27xLAmjS_4Nyxta4Jx23CrUo1DNRkNKWxd8VBuTWhX0TE3QT4oV3IioYrQiV2y28b0wMfteC78RmbkH9EJKLvhqlN3dAQ34Zkt-RPDVSbBetRV3-6oAo2VJH10ZPjScyw7fyQj_dwD2VoEK1r3fD0HuE4CisbBenxYwKT0OQ2OZf0mG0r3yTRAaFgrfmm0yFTkG0H8E0KX0MU6oBdkBiwVLR')] bg-cover"></div>
              <div>
                <p className="font-label text-sm font-bold text-white">Priya Sharma</p>
                <p className="font-label text-[11px] text-white/60 uppercase tracking-widest">Solo Traveler</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
