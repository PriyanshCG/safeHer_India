import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  MapPin,
  Users,
  Bell,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Loader2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import useLocation from '../hooks/useLocation';
import CustomMapContainer from '../components/Map/MapContainer';
import StatusCard from '../components/Dashboard/StatusCard';
import { activityAPI, guardianAPI } from '../utils/api';

const AnimatedCounter = ({ label, target, duration, icon: Icon, color, bg, progressBg }) => {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current || target === 0) {
      setCount(target);
      return;
    }
    animatedRef.current = true;
    
    let start = 0;
    const fps = 60;
    const increment = target / (duration * fps);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / fps);
    
    return () => clearInterval(timer);
  }, [target, duration]);

  const percentage = target > 0 ? (count / target) * 100 : 100;

  return (
    <div className="card-premium flex flex-col justify-between p-8 relative overflow-hidden group">
      <div className="flex items-center gap-6 z-10 relative">
        <div className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#6B5B6B] uppercase tracking-[0.2em] mb-1">{label}</p>
          <p className="text-4xl font-black text-[#2D1B2E] tabular-nums">{count}</p>
        </div>
      </div>
      {/* Animated progress bar at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-50">
        <div 
          className={`h-full ${progressBg} transition-all ease-out`} 
          style={{ width: `${percentage}%`, transitionDuration: '100ms' }} 
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const [isSafe, setIsSafe] = useState(true);
  const { location, pois, isLoading: isMapLoading } = useLocation({ radius: 5000, maxEach: 4 });
  const [activities, setActivities] = useState([]);
  const [verifiedGuardians, setVerifiedGuardians] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activityRes, guardianRes] = await Promise.all([
          activityAPI.getActivities(),
          guardianAPI.getGuardians()
        ]);
        if (activityRes.success && activityRes.data) {
          setActivities(activityRes.data.slice(0, 3)); // Top 3
        }
        if (guardianRes.success && guardianRes.data) {
          setVerifiedGuardians(guardianRes.data.filter(g => g.verified).length);
        }
      } catch (e) {
        console.error("Error fetching dashboard data", e);
      }
    };
    fetchData();
  }, []);

  const getRelativeTime = (dateString) => {
    const hoursAgo = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60));
    if (hoursAgo === 0) return "Just now";
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    if (hoursAgo < 48) return "Yesterday";
    return `${Math.floor(hoursAgo / 24)} days ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold font-serif text-[#2D1B2E] tracking-tight">
            Welcome back, <span className="text-[#8B4A6A]">{user?.fullName || 'Priya'}</span>
          </h1>
          <p className="text-[#6B5B6B] font-body mt-2">Your safety journey is active and monitored.</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={() => setIsSafe(!isSafe)} 
            className="text-[10px] font-bold text-gray-400 hover:text-[#8B4A6A] uppercase tracking-widest transition-colors"
          >
            Toggle Demo Mode
          </button>
          <StatusCard isSafe={isSafe} />
        </div>
      </header>

      {/* Safety Score Ring Card */}
      <div className="card-premium p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
              <circle 
                cx="50" cy="50" r="40" 
                stroke="url(#roseGradient)" 
                strokeWidth="8" fill="none" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 * (1 - 0.78)} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B4A6A" />
                  <stop offset="100%" stopColor="#C94A7D" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-[#2D1B2E] leading-none">
                78<span className="text-sm font-bold text-gray-400">/100</span>
              </span>
              <span className="text-[9px] font-bold text-[#6B5B6B] uppercase tracking-widest mt-1">Safety Score</span>
            </div>
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
              Level 1: SECURE
            </span>
            <h3 className="text-xl font-bold font-serif text-[#2D1B2E] mb-2">Excellent Safety Posture</h3>
            <p className="text-sm text-[#6B5B6B]">You are well protected. Your network is active.</p>
          </div>
        </div>
        <div className="space-y-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-bold text-[#2D1B2E]">Location sharing active</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-bold text-[#2D1B2E]">Guardians verified</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-bold text-[#2D1B2E]">No recent incidents</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <AnimatedCounter 
          label="Safe Days" target={user?.createdAt ? Math.max(1, Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))) : 1} duration={1.5} 
          icon={Shield} color="text-green-600" bg="bg-green-50" progressBg="bg-green-500" 
        />
        <AnimatedCounter 
          label="Alerts Triggered" target={activities.filter(a => a.action === 'sos_triggered').length} duration={0.1} 
          icon={Bell} color="text-[#8B4A6A]" bg="bg-[#8B4A6A]/10" progressBg="bg-[#8B4A6A]" 
        />
        <AnimatedCounter 
          label="Verified Guardians" target={verifiedGuardians} duration={0.8} 
          icon={Users} color="text-[#4B7FBE]" bg="bg-[#4B7FBE]/10" progressBg="bg-[#4B7FBE]" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Safety Map Card */}
        <div className="lg:col-span-2 space-y-8">
          <section className="card-premium overflow-hidden !p-0 flex flex-col">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#8B4A6A]" />
                <h3 className="text-xl font-bold font-serif text-[#2D1B2E]">Live Safety Status</h3>
              </div>
              <Link to="/map" className="text-xs font-bold text-[#8B4A6A] hover:text-[#C94A7D] flex items-center gap-1 transition-colors">
                Open Full Map <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="h-80 bg-gray-50 relative z-0">
              {/* Real Mini-Map */}
              {isMapLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50">
                  <Loader2 className="w-8 h-8 animate-spin text-[#8B4A6A]" />
                  <p className="text-sm font-bold text-[#6B5B6B] animate-pulse">Locating you…</p>
                </div>
              ) : (
                <div className="absolute inset-0">
                  <CustomMapContainer location={location} pois={pois} />
                </div>
              )}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="bg-[#2D1B2E] text-white rounded-3xl p-8 relative overflow-hidden group"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
            >
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Need Help?</h4>
                <p className="text-sm text-gray-400 mb-6">Our 24/7 response team is ready to assist you.</p>
                <Link to="/sos" className="inline-block bg-[#DC2626] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-colors">
                  Contact Support
                </Link>
              </div>
              <TrendingUp className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
            </div>
            
            <div 
              className="bg-[#8B4A6A] text-white rounded-3xl p-8 relative overflow-hidden group"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
            >
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Quick Tip</h4>
                <p className="text-sm text-white/80 mb-6">Keep your GPS on for more accurate safety alerts in your local area.</p>
                <Link to="/wellness" className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-white/30 transition-colors">
                  View Guides
                </Link>
              </div>
              <Shield className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
            </div>
          </section>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-1">
          <section className="card-premium h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-5 h-5 text-[#8B4A6A]" />
              <h3 className="text-xl font-bold font-serif text-[#2D1B2E]">Recent Activity</h3>
            </div>
            <div className="flex-1 space-y-10">
              {activities.length === 0 ? (
                <div className="text-center text-gray-400 font-medium py-10">No recent activity</div>
              ) : (
                activities.map((act, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8B4A6A] mt-1 ring-4 ring-[#8B4A6A]/10 relative z-10" />
                      {i !== activities.length - 1 && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+16px)] bg-gray-100" />}
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform">
                      <h4 className="text-sm font-bold text-[#2D1B2E]">{act.action.replace('_', ' ').toUpperCase()}</h4>
                      <p className="text-xs text-gray-400 font-medium mb-1.5">{getRelativeTime(act.timestamp)}</p>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8B4A6A] uppercase tracking-wider bg-[#8B4A6A]/5 px-2 py-1 rounded-md inline-flex">
                        <MapPin className="w-3 h-3" />
                        {act.details?.latitude ? 'Location Recorded' : 'System Event'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className="w-full mt-12 py-3.5 bg-gray-50 text-[#6B5B6B] text-xs font-bold rounded-xl hover:bg-[#8B4A6A] hover:text-white transition-colors uppercase tracking-widest">
              View All History
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
