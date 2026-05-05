import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, Phone, Edit2, Trash2, CheckCircle, Clock, Loader2, Info } from 'lucide-react';
import { guardianAPI } from '../utils/api';
function VerificationButton({ guardian, onVerify }) {
    const [status, setStatus] = useState('idle'); // idle, verifying, cooldown
    const [timeLeft, setTimeLeft] = useState(0);

    const handleClick = () => {
        setStatus('verifying'); setTimeout(() => {
            onVerify(guardian); setStatus('cooldown'); setTimeLeft(60);
        }, 1500);
    };
    useEffect(() => {
        if (status === 'cooldown' && timeLeft > 0) {
            const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(t);
        } else if (status === 'cooldown' && timeLeft === 0) {
            setStatus('idle');
        }
    }, [status, timeLeft]);
    if (status === 'verifying') {
        return <span className="text-[#4B7FBE] font-bold flex items-center gap-2 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Sending...</span>;
    }
    if (status === 'cooldown') {
        return <span className="text-gray-400 font-bold flex items-center gap-2 text-sm"><Clock className="w-4 h-4" /> Resend? ({timeLeft}s)</span>;
    }

    return (
        <button onClick={handleClick} className="text-[#4B7FBE] font-bold hover:underline flex items-center gap-2 text-sm">           <Clock className="w-4 h-4" /> Send Verification       </button>
    );
}

export default function GuardianNetworkPage() {
    const [guardians, setGuardians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ guardianName: '', guardianPhone: '', relationship: 'Friend' });
    const [editingGuardian, setEditingGuardian] = useState(null);
    const [toast, setToast] = useState(null); // { message, type }
    const MAX_GUARDIANS = 5;
    const isLimitReached = guardians.length >= MAX_GUARDIANS;
    useEffect(() => {
        const fetchGuardians = async () => {
            try {
                const response = await guardianAPI.getGuardians();
                if (response.success && response.data) {
                    setGuardians(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch guardians", err);
                showToast("Failed to load guardians", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchGuardians();
    }, []);
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setEditingGuardian(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!formData.guardianName || !formData.guardianPhone || isLimitReached) return;
        try {
            const response = await guardianAPI.addGuardian(formData);
            if (response.success && response.data) {
                setGuardians([...guardians, response.data]); setFormData({ guardianName: '', guardianPhone: '', relationship: 'Friend' }); showToast('Guardian added successfully');
            }
        } catch (err) {
            showToast(err.message || 'Failed to add guardian', 'error');
        }
    };
    const removeGuardian = async (id) => {
        try {
            await guardianAPI.removeGuardian(id);
            setGuardians(guardians.filter(g => (g._id || g.id) !== id));
            showToast('Guardian removed');
        } catch (err) {
            showToast('Failed to remove guardian', 'error');
        }
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingGuardian.guardianName || !editingGuardian.guardianPhone) return;
        try {
            const response = await guardianAPI.updateGuardian(editingGuardian._id || editingGuardian.id, editingGuardian);
            if (response.success && response.data) {
                setGuardians(guardians.map(g => (g._id || g.id) === (editingGuardian._id || editingGuardian.id) ? response.data : g));
                setEditingGuardian(null);
                showToast('Guardian updated successfully');
            }
        } catch (err) {
            showToast('Failed to update guardian', 'error');
        }
    };
    const handleVerifySuccess = (guardian) => {
        showToast(`Verification SMS sent to ${guardian.guardianPhone}`);
    };
    const handleTestAlert = (guardian) => {
        showToast(`Test alert sent to ${guardian.guardianName}`, 'success');
    };
    const getAvatarColor = (rel) => {
        const colors = {
            'Mom': 'bg-[#C94A7D]', 'Dad': 'bg-[#4B7FBE]', 'Sister': 'bg-[#7C3AED]', 'Brother': 'bg-[#EA580C]', 'Friend': 'bg-[#0D9488]', 'Partner': 'bg-[#DB2777]', 'Other': 'bg-[#6B7280]'
        };
        return colors[rel] || colors['Other'];
    };
    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };
    return (
        <div className="max-w-7xl mx-auto px-8 py-12 relative">

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-label text-sm font-semibold">{toast.message}</span>
                </div>)}
            {/* Edit Modal */}
            {editingGuardian && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setEditingGuardian(null)}
                >
                    <div
                        className="bg-white max-w-[480px] w-full rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold font-serif text-[#8B4A6A] mb-6">Edit Guardian</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="form-label text-sm font-bold text-[#6B5B6B]">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#8B4A6A] outline-none"
                                    value={editingGuardian.guardianName || ''}
                                    onChange={(e) => setEditingGuardian({ ...editingGuardian, guardianName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="form-label text-sm font-bold text-[#6B5B6B]">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-input w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#8B4A6A] outline-none"
                                    value={editingGuardian.guardianPhone || ''}
                                    onChange={(e) => setEditingGuardian({ ...editingGuardian, guardianPhone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="form-label text-sm font-bold text-[#6B5B6B]">Relationship</label>
                                <select
                                    className="form-input w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#8B4A6A] outline-none"
                                    value={editingGuardian.relationship}
                                    onChange={(e) => setEditingGuardian({ ...editingGuardian, relationship: e.target.value })}
                                >
                                    <option>Mom</option>                                   <option>Dad</option>                                  <option>Sister</option>                                   <option>Brother</option>                                    <option>Friend</option>                                   <option>Partner</option><option>Other</option>
                                </select>
                            </div>
                            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingGuardian(null)}
                                    className="flex-1 py-3.5 bg-gray-100 text-[#6B5B6B] font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 bg-[#8B4A6A] text-white font-bold rounded-xl hover:bg-[#6d3a53] transition-colors shadow-lg shadow-[#8B4A6A]/20"
                                >
                                    Save Changes
                                </button>
                            </div>                       </form>                    </div>                </div>
            )}
            <header className="mb-10">
                <h1 className="text-4xl font-bold font-serif text-[#8B4A6A] mb-3 tracking-tight">Guardian Network</h1>
                <p className="text-[#6B5B6B] font-body text-lg">Manage your inner circle of trusted people who will be notified in emergencies.</p>
            </header>
            {/* Guardian Limit Indicator */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-bold text-[#2D1B2E] text-lg">Guardian Slots: {guardians.length} / {MAX_GUARDIANS} used</h3>
                    <p className="text-xs font-bold text-[#8B4A6A] mt-1 bg-[#8B4A6A]/10 inline-block px-2 py-1 rounded-md">Upgrade to Premium for unlimited guardians</p>
                </div>
                <div className="w-full md:w-72 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${isLimitReached ? 'bg-[#DC2626]' : 'bg-[#8B4A6A]'}`}
                        style={{ width: `${(guardians.length / MAX_GUARDIANS) * 100}%` }}
                    />
                </div></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <div className="card-premium h-fit border border-gray-100 shadow-xl shadow-[#8B4A6A]/5">
                        <div className="flex items-center gap-3 mb-6 text-[#8B4A6A]">
                            <UserPlus className="w-6 h-6" />
                            <h3 className="text-xl font-bold font-serif text-[#2D1B2E]">Add New Guardian</h3>
                        </div>
                        {isLimitReached ? (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-start gap-3 mb-4">
                                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-bold">Limit reached. Upgrade to Premium to add more trusted contacts.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleAdd} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#6B5B6B] uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8B4A6A] outline-none transition-all"
                                        value={formData.guardianName}
                                        onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#6B5B6B] uppercase tracking-wider">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 XXXXXXXXXX"
                                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8B4A6A] outline-none transition-all"
                                        value={formData.guardianPhone}
                                        onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#6B5B6B] uppercase tracking-wider">Relationship</label>
                                    <select
                                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8B4A6A] outline-none transition-all appearance-none"
                                        value={formData.relationship}
                                        onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                                    >
                                        <option>Mom</option>
                                        <option>Dad</option>
                                        <option>Sister</option>
                                        <option>Brother</option>
                                        <option>Friend</option>
                                        <option>Partner</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full mt-4 py-3.5 bg-[#8B4A6A] hover:bg-[#6d3a53] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#8B4A6A]/20">
                                    Add Guardian
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2 space-y-6">

                    {guardians.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-[#8B4A6A]/10 rounded-full flex items-center justify-center mb-6">
                                <Shield className="w-10 h-10 text-[#8B4A6A]" />
                            </div>
                            <h3 className="text-2xl font-bold font-serif text-[#2D1B2E] mb-2">No Guardians Yet</h3>
                            <p className="text-[#6B5B6B]">Add your first trusted contact using the form.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {guardians.map((guardian) => (
                                <div key={guardian._id || guardian.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group relative hover:border-[#8B4A6A]/30 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-full ${getAvatarColor(guardian.relationship)} flex items-center justify-center text-white font-black text-xl shadow-inner`}>
                                                {getInitials(guardian.guardianName)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-[#2D1B2E]">{guardian.guardianName}</h4>
                                                <p className="text-xs font-bold text-[#6B5B6B] uppercase tracking-wider mt-0.5">{guardian.relationship}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-gray-100 rounded-lg p-1 absolute top-6 right-6">
                                            <button
                                                onClick={() => setEditingGuardian(guardian)}
                                                className="p-2 text-gray-400 hover:text-[#8B4A6A] hover:bg-gray-50 rounded-md transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removeGuardian(guardian._id || guardian.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                title="Remove"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div className="flex items-center gap-3 text-sm text-[#2D1B2E] font-medium bg-gray-50 p-3 rounded-xl">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {guardian.guardianPhone}
                                        </div>

                                        <div className="flex items-center justify-between px-1">
                                            {guardian.isVerified ? (
                                                <span className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                                    <CheckCircle className="w-4 h-4" /> Verified
                                                </span>
                                            ) : (
                                                <VerificationButton guardian={guardian} onVerify={handleVerifySuccess} />
                                            )}
                                        </div>

                                        {guardian.isVerified && (
                                            <button
                                                onClick={() => handleTestAlert(guardian)}
                                                className="w-full py-2.5 bg-[#8B4A6A]/5 hover:bg-[#8B4A6A]/10 text-[#8B4A6A] rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors mt-2"
                                            >
                                                <Shield className="w-4 h-4" /> Send Test Alert
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#6B5B6B]">
                                        <span>Last Alert:</span>
                                        <span className={guardian.lastAlert === 'Never' ? 'text-gray-400' : 'text-[#8B4A6A]'}>{guardian.lastAlert}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="p-8 rounded-3xl bg-[#4B7FBE]/5 border-2 border-dashed border-[#4B7FBE]/20 mt-8">
                        <div className="flex items-start gap-4">
                            <Shield className="w-8 h-8 text-[#4B7FBE] mt-1" />
                            <div>
                                <h4 className="text-lg font-bold text-[#2D1B2E] mb-1">Safety Verification Status</h4>
                                <p className="text-sm text-[#6B5B6B] leading-relaxed">Ensure all guardians have verified their phone numbers to receive real-time SOS alerts via SMS. Unverified guardians will only receive in-app push notifications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}