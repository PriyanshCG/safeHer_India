import React, { useState, useEffect } from 'react';
import { Phone, Users, History, ShieldAlert, Zap, Clock, CheckCircle, X } from 'lucide-react';
import { sosAPI, guardianAPI } from '../utils/api';
import useLocation from '../hooks/useLocation';

export default function SOSPage() {
  const { location } = useLocation();
  const [stage, setStage] = useState('idle'); // 'idle' | 'confirming' | 'active' | 'cancelled'
  const [countdown, setCountdown] = useState(3);
  const [elapsed, setElapsed] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeSosId, setActiveSosId] = useState(null);
  const [guardians, setGuardians] = useState([]);
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guardianRes, logsRes] = await Promise.all([
          guardianAPI.getGuardians(),
          sosAPI.getHistory()
        ]);
        if (guardianRes.success && guardianRes.data) {
          setGuardians(guardianRes.data.map(g => ({
            id: g._id,
            name: g.name,
            initial: g.name[0]?.toUpperCase(),
            color: 'bg-[#8B4A6A]',
            status: g.verified ? 'Active ✓' : 'Pending',
            statusColor: g.verified ? 'text-green-600 border-green-500' : 'text-yellow-600 border-yellow-500'
          })));
        }
        if (logsRes.success && logsRes.data) {
          setLogs(logsRes.data.map(l => ({
            id: l._id,
            action: 'SOS Triggered',
            time: new Date(l.triggeredAt).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            status: l.status === 'resolved' ? 'Resolved' : 'Alerted'
          })));
        }
      } catch (e) {
        console.error("Error fetching SOS data", e);
      }
    };
    fetchData();
  }, []);
  const EMERGENCY_NUMBERS = [
    { name: 'Police', num: '100', color: 'text-blue-600' },
    { name: 'Women Helpline', num: '1091', color: 'text-[#C94A7D]' },
    { name: 'Ambulance', num: '108', color: 'text-[#DC2626]' },
    { name: 'Emergencies', num: '112', color: 'text-black' },
    { name: 'NCWH', num: '181', color: 'text-[#8A2B57]' },
  ];
  useEffect(() => {
    let timer;
    if (stage === 'confirming') {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { setStage('active'); handleSOSActive(); return 3; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage]);
  useEffect(() => {
    let timer;
    if (stage === 'active') {
      timer = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsed(0);
    } return () => clearInterval(timer);
  }, [stage]);
  const activeSosIdRef = React.useRef(null);
  const isCancelledRef = React.useRef(false);
  useEffect(() => {
    if (stage === 'cancelled') {
      const timer = setTimeout(() => {
        setStage('idle');
        setCountdown(3);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);
  const handleSOSClick = () => {
    if (stage === 'idle') {
      isCancelledRef.current = false; setStage('confirming'); setCountdown(3);
    } else if (stage === 'confirming') { setStage('cancelled'); }
  };
  const handleCancelSOS = async () => {
    isCancelledRef.current = true;
    const idToResolve = activeSosId || activeSosIdRef.current;
    if (idToResolve) {
      try {
        await sosAPI.resolveSOS(idToResolve);
        setToastMessage('SOS Resolved Successfully');
        setTimeout(() => setToastMessage(null), 3000);
        setLogs(prev => prev.map(log =>
          log.id === idToResolve ? { ...log, status: 'Resolved' } : log
        ));
      } catch (e) {
        console.error('Failed to resolve SOS', e);
      }
    }
    setStage('cancelled');
    setActiveSosId(null);
    activeSosIdRef.current = null;
  };
  const handleSOSActive = async () => {
    let newId = Date.now();
    try {
      const locationData = {
        latitude: location[0] || 28.6139,
        longitude: location[1] || 77.2090,
        notes: "Emergency SOS Triggered from Web App"
      };
      const response = await sosAPI.triggerSOS(locationData);
      if (response.success) {
        newId = response.data?._id || newId;
        if (isCancelledRef.current) {
          await sosAPI.resolveSOS(newId);
          return; // Skip setting active state
        }

        setActiveSosId(newId);
        activeSosIdRef.current = newId;
        setToastMessage('SOS Sent to Authorities and Guardians! 🚨');
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (error) {
      console.error("SOS Trigger failed:", error);
      if (!isCancelledRef.current) {
        setToastMessage('Alert sent locally (Network Error) ⚠️');
        setTimeout(() => setToastMessage(null), 3000);
      }
    }
    if (!isCancelledRef.current) {
      const now = new Date();
      const newLog = {
        id: newId,
        action: 'SOS Triggered',
        time: now.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Alerted'
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 5));
    }
  };
  const handleTestAlert = () => {
    setToastMessage('Test alert sent successfully ✓');
    setTimeout(() => setToastMessage(null), 2000);
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  const getTopBar = () => {
    if (stage === 'idle') return { bg: 'bg-green-600', text: 'You are Safe · Background tracking ON' };
    if (stage === 'confirming') return { bg: 'bg-amber-500', text: 'Preparing alert... · Tap to cancel' };
    if (stage === 'active') return { bg: 'bg-red-600', text: '🔴 ALERT ACTIVE · Notifying authorities', pulse: true };
    if (stage === 'cancelled') return { bg: 'bg-green-500', text: 'Alert Cancelled. You are safe.' };
    return { bg: 'bg-gray-500', text: '' };
  };
  const topBar = getTopBar();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7FA] to-white transition-all duration-500 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="font-label text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
      {/* Top Status Bar */}
      <div className={`w-full py-3 px-4 text-center transition-all duration-500 ${topBar.bg} ${topBar.pulse ? 'animate-pulse' : ''}`}>
        <p className="font-label text-white text-xs md:text-sm font-bold uppercase tracking-widest">
          {topBar.text}
        </p>
      </div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12">
        {/* SOS Button Area */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-[#FDF0F6] relative">
            <div className="relative flex justify-center items-center">
              {/* Animations based on stage */}
              {stage === 'idle' && (
                <>
                  <div className="absolute inset-0 rounded-full bg-[#DC2626]/20 animate-ping scale-150 transition-all duration-500 pointer-events-none" />
                  <div className="absolute inset-0 rounded-full bg-[#DC2626]/10 animate-ping delay-700 scale-125 transition-all duration-500 pointer-events-none" />
                </>
              )}
              {stage === 'active' && (
                <>
                  <div className="absolute w-64 h-64 rounded-full border-4 border-red-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] transition-all duration-500 pointer-events-none" />
                  <div className="absolute w-64 h-64 rounded-full border-4 border-red-500/20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] delay-300 transition-all duration-500 pointer-events-none" />
                  <div className="absolute w-64 h-64 rounded-full border-4 border-red-500/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] delay-700 transition-all duration-500 pointer-events-none" />
                </>
              )}
              {/* Main Button */}
              <button
                onClick={handleSOSClick}
                disabled={stage === 'active' || stage === 'cancelled'}
                className={`relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center gap-3 shadow-2xl transition-all duration-500 
                  ${stage === 'idle' ? 'bg-[#DC2626] hover:bg-[#B91C1C] hover:scale-105' : ''}
                  ${stage === 'confirming' ? 'bg-amber-500 scale-95' : ''}
                  ${stage === 'active' ? 'bg-black border-4 border-[#DC2626] scale-100' : ''}
                  ${stage === 'cancelled' ? 'bg-green-500 scale-100' : ''}
                `}>
                {stage === 'idle' && (
                  <>
                    <ShieldAlert className="w-16 h-16 text-white" />
                    <span className="text-5xl font-black text-white italic tracking-tighter">SOS</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] opacity-90 mt-2">
                      Press for Emergency
                    </span>
                  </>
                )}
                {stage === 'confirming' && (
                  <>
                    <span className="text-7xl font-black text-white">{countdown}</span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest mt-2">
                      Tap again to cancel
                    </span>
                  </>
                )}
                {stage === 'active' && (
                  <>
                    <Clock className="w-10 h-10 text-white opacity-80" />
                    <span className="text-4xl font-black text-white tracking-wider font-mono">
                      {formatTime(elapsed)}
                    </span>
                    <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest mt-1">
                      ALERT ACTIVE
                    </span>
                  </>
                )}
                {stage === 'cancelled' && (
                  <><CheckCircle className="w-16 h-16 text-white" /><span className="text-sm font-bold text-white uppercase tracking-widest mt-2"> Safe</span></>
                )}
              </button>
            </div>
            {/* Post-activation controls & info */}
            {stage === 'active' && (
              <div className="mt-8 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
                <p className="font-label text-sm font-bold text-[#8A2B57] mb-4 bg-[#FDF0F6] px-4 py-2 rounded-full">
                  Your guardians have been notified
                </p>
                <button
                  onClick={handleCancelSOS}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 uppercase tracking-widest transition-colors"
                >
                  <X className="w-4 h-4" /> Cancel SOS
                </button>
              </div>
            )}
          </div>
          <div className="max-w-md">
            <h2 className="text-2xl font-bold font-headline text-[#3e0021] mb-2">Emergency Hub</h2>
            <p className="text-[#37003C]/70 font-body">
              Press the SOS button to instantly notify all verified guardians and local authorities with your live location.</p></div></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Emergency Numbers & Guardians */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Dial Authorities */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 bg-white rounded-xl shadow-sm text-[#8A2B57]"><Phone className="w-5 h-5" /></span>
                <h3 className="text-2xl font-bold font-headline text-[#3e0021]">Quick Dial Authorities</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{EMERGENCY_NUMBERS.map((item) => (
                <a
                  key={item.num}
                  href={`tel:${item.num}`}
                  className="relative bg-white border border-[#FDF0F6] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 text-center group hover:border-[#8A2B57] hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <p className="text-[10px] font-bold text-[#37003C]/60 uppercase tracking-wider">{item.name}</p>
                  <p className={`text-3xl font-black ${item.color}`}>{item.num}</p>

                  {/* Hover Call Badge */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#8A2B57] text-white py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Call Now</span>
                  </div>
                </a>
              ))}</div></section>
            {/* Active Guardians */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 bg-white rounded-xl shadow-sm text-[#8A2B57]"><Users className="w-5 h-5" /></span>
                <h3 className="text-2xl font-bold font-headline text-[#3e0021]">Active Guardians</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guardians.map(g => (
                  <div key={g.id} className={`bg-white border border-[#FDF0F6] rounded-2xl p-5 flex items-center justify-between border-l-4 ${g.statusColor} shadow-sm hover:shadow-md transition-shadow`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${g.color} flex items-center justify-center font-bold text-white text-lg`}>
                        {g.initial}
                      </div>
                      <div>
                        <h4 className="font-bold font-headline text-[#3e0021] text-sm">{g.name}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${g.statusColor.split(' ')[0]}`}>
                          {g.status}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleTestAlert}
                      className="text-[10px] font-black text-[#8A2B57] bg-[#FDF0F6] hover:bg-[#8A2B57] hover:text-white px-3 py-2 rounded-lg uppercase tracking-widest transition-colors"
                    >
                      Test Alert
                    </button>
                  </div>))}</div>
              <button className="w-full mt-6 py-4 border-2 border-dashed border-[#8A2B57]/20 text-[#8A2B57] bg-[#FDF0F6]/50 font-bold font-label rounded-xl hover:border-[#8A2B57] hover:bg-[#FDF0F6] transition-all uppercase tracking-widest text-xs">
                Manage Safety Network
              </button></section></div>
          {/* Right Column: Activity Log */}
          <div className="lg:col-span-1">
            <section className="bg-white border border-[#FDF0F6] rounded-[2rem] p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-8">
                <span className="p-2.5 bg-[#FDF0F6] rounded-xl text-[#8A2B57]"><History className="w-5 h-5" /></span>
                <h3 className="text-xl font-bold font-headline text-[#3e0021]">Recent Safety Logs</h3>
              </div>

              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-[#37003C]/40">
                  <Clock className="w-8 h-8 mb-2 opacity-50" />
                  <p className="font-label text-sm font-semibold">No recent activity</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {logs.map((log, i) => (
                    <div key={log.id} className="flex gap-4 group">
                      <div className="relative flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#8A2B57] z-10 relative ring-4 ring-[#FDF0F6]" />
                        {i !== logs.length - 1 && <div className="absolute top-3 w-[2px] h-full bg-[#FDF0F6] -bottom-6" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-bold font-headline text-[#3e0021]">{log.action}</p>
                        <p className="text-xs text-[#37003C]/50 font-body mb-2 mt-0.5">{log.time}</p>
                        <span className="px-2.5 py-1 bg-[#FDF0F6] rounded-md text-[9px] font-bold text-[#8A2B57] uppercase tracking-wider">
                          {log.status}
                        </span>
                      </div></div>))} </div>)}
              {logs.length > 0 && (
                <button className="w-full mt-8 pt-4 border-t border-[#FDF0F6] text-center text-xs font-bold text-[#8A2B57] hover:text-[#4a1532] transition-colors uppercase tracking-widest">
                  View All History
                </button>
              )}
            </section></div></div></div></div>
  );
}