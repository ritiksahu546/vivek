import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Lock, Mail, Key, ShieldCheck, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { adminUser, loginAdmin, isFirebaseConnected } = useClinic();
  const [email, setEmail] = useState('gig.ritik546@gmail.com');
  const [password, setPassword] = useState('admin123456');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await loginAdmin(email, password);
    setIsSubmitting(false);

    if (result.success) {
      onLoginSuccess();
      onClose();
    } else {
      setError(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md mb-3">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Doctor & Clinic Portal
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Dr. Vivek Arora Chest Care Clinic Admin Console
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@chestcareclinic.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-hidden"
              />
            </div>
          </div>

          {/* Quick Demo Pre-fill note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Doctor / Staff Secure Credentials</span>
            </div>
            <div>Pre-filled with master administrator email: <code className="text-teal-800 font-mono">gig.ritik546@gmail.com</code></div>
            <div>Access role: Master Medical Administrator (RBAC)</div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-50 text-sm shadow-md shadow-teal-700/20 transition-all cursor-pointer"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${isFirebaseConnected ? 'text-teal-700' : 'text-slate-500'}`}>
            <span className={`w-2 h-2 rounded-full ${isFirebaseConnected ? 'bg-teal-500' : 'bg-slate-400'}`} />
            {isFirebaseConnected ? 'Connected to Firebase Cloud Firestore' : 'Running in Secure Local Persistence Mode'}
          </span>
        </div>
      </div>
    </div>
  );
};
