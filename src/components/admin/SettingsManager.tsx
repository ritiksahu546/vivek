import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Save, RefreshCw, ShieldCheck, Database, Globe, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { testFirebaseConnection } from '../../lib/firebase';

export const SettingsManager: React.FC = () => {
  const { clinic, updateClinicInfo, isFirebaseConnected, resetToDefaults } = useClinic();
  const [formData, setFormData] = useState({
    seoTitle: clinic.seoTitle || "Dr. Vivek Arora | Pulmonologist & Chest Specialist Bhopal",
    seoDescription: clinic.seoDescription || "Consult Dr. Vivek Arora, experienced Pulmonologist & Chest Specialist in Bhopal for asthma, COPD, chronic cough, and respiratory care. 5.0★ rating.",
    phone: clinic.phone,
    whatsapp: clinic.whatsapp,
    googleMapsEmbedUrl: clinic.googleMapsEmbedUrl
  });

  const [testingFirebase, setTestingFirebase] = useState(false);
  const [testResult, setTestResult] = useState<{ connected: boolean; message: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicInfo({
      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      googleMapsEmbedUrl: formData.googleMapsEmbedUrl
    });

    // Also update document head title & meta if in browser
    document.title = formData.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', formData.seoDescription);
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleTestConnection = async () => {
    setTestingFirebase(true);
    setTestResult(null);
    const res = await testFirebaseConnection();
    setTestingFirebase(false);
    setTestResult(res);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            SEO & System Settings
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure search engine optimization meta tags, contact hotline links, and database synchronization.
          </p>
        </div>

        {isSaved && (
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 animate-fade-in">
            ✓ Settings Saved
          </span>
        )}
      </div>

      {/* SEO Configuration */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <Search className="w-4 h-4 text-teal-600" />
          <span>Search Engine Optimization (SEO)</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Page Title Tag (&lt;title&gt;)
          </label>
          <input
            type="text"
            required
            value={formData.seoTitle}
            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-teal-500 outline-hidden font-medium"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">
            Recommended length: 50-60 characters for optimal Google SERP ranking.
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Meta Description Tag
          </label>
          <textarea
            rows={3}
            required
            value={formData.seoDescription}
            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-teal-500 outline-hidden"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">
            Concise summary displayed in Google search results beneath the clinic title.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Primary Clinic Phone (Used across all CTAs)
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-teal-500 outline-hidden font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              WhatsApp Helpdesk Number
            </label>
            <input
              type="text"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-teal-500 outline-hidden font-mono"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Google Maps Embed URL
          </label>
          <input
            type="url"
            required
            value={formData.googleMapsEmbedUrl}
            onChange={(e) => setFormData({ ...formData, googleMapsEmbedUrl: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-teal-500 outline-hidden font-mono"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all text-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings & Meta Tags</span>
          </button>
        </div>
      </form>

      {/* Cloud Persistence & Diagnostics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Database className="w-4 h-4 text-teal-600" />
            <span>Database & Cloud Architecture Diagnostics</span>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            isFirebaseConnected ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'
          }`}>
            {isFirebaseConnected ? 'Firebase Active' : 'Local Fallback Active'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The application has a hybrid persistence engine. Changes made in this portal are automatically saved to your browser's persistent storage immediately, and automatically sync to Cloud Firestore when live project environment variables are injected.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testingFirebase}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingFirebase ? 'animate-spin' : ''}`} />
            <span>{testingFirebase ? 'Testing Connection...' : 'Test Cloud Connection'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all clinic data to default initial state? This will clear locally edited items.")) {
                resetToDefaults();
              }
            }}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
          >
            <span>Reset Demo Seed Data</span>
          </button>
        </div>

        {testResult && (
          <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 animate-fade-in ${
            testResult.connected ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            {testResult.connected ? (
              <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
