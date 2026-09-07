import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  UserCheck,
  Building2,
  Stethoscope,
  Wind,
  Star,
  Image as ImageIcon,
  HelpCircle,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { DashboardOverview } from './DashboardOverview';
import { AppointmentsManager } from './AppointmentsManager';
import { InquiriesManager } from './InquiriesManager';
import { DoctorProfileEditor } from './DoctorProfileEditor';
import { ClinicEditor } from './ClinicEditor';
import { ServicesManager } from './ServicesManager';
import { TreatmentsManager } from './TreatmentsManager';
import { ReviewsManager } from './ReviewsManager';
import { GalleryManager } from './GalleryManager';
import { FaqManager } from './FaqManager';
import { SettingsManager } from './SettingsManager';

interface AdminLayoutProps {
  onBackToSite: () => void;
}

export type AdminTab =
  | 'overview'
  | 'appointments'
  | 'inquiries'
  | 'doctor'
  | 'clinic'
  | 'services'
  | 'treatments'
  | 'reviews'
  | 'gallery'
  | 'faqs'
  | 'settings';

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToSite }) => {
  const { doctor, clinic, appointments, inquiries, adminUser, logoutAdmin, isFirebaseConnected } = useClinic();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingAppointmentsCount = appointments.filter(a => a.status === 'New').length;
  const unreadInquiriesCount = inquiries.filter(i => !i.isContacted).length;

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" />, badge: pendingAppointmentsCount },
    { id: 'inquiries', label: 'Patient Inquiries', icon: <MessageSquare className="w-4 h-4" />, badge: unreadInquiriesCount },
    { id: 'doctor', label: 'Doctor Profile', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'clinic', label: 'Clinic Information', icon: <Building2 className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'treatments', label: 'Conditions & Care', icon: <Wind className="w-4 h-4" /> },
    { id: 'reviews', label: 'Patient Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'gallery', label: 'Clinic Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'settings', label: 'SEO & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview onNavigate={setActiveTab} />;
      case 'appointments':
        return <AppointmentsManager />;
      case 'inquiries':
        return <InquiriesManager />;
      case 'doctor':
        return <DoctorProfileEditor />;
      case 'clinic':
        return <ClinicEditor />;
      case 'services':
        return <ServicesManager />;
      case 'treatments':
        return <TreatmentsManager />;
      case 'reviews':
        return <ReviewsManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'faqs':
        return <FaqManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardOverview onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">
                Dr. Vivek Arora Admin Console
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                {clinic.name} • {clinic.location}
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cloud sync status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            <span className={`w-2 h-2 rounded-full ${isFirebaseConnected ? 'bg-teal-500 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isFirebaseConnected ? 'Cloud Firestore Connected' : 'Local Storage Sync Active'}</span>
          </div>

          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onBackToSite();
            }}
            className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Admin User Info */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-sm">
              VA
            </div>
            <div className="text-left overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{doctor.name}</div>
              <div className="text-[10px] text-teal-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Specialist Admin</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-left">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3.5 border-t border-slate-800 text-[11px] text-slate-500 text-left">
            <div>Bhopal Respiratory Practice</div>
            <div className="text-slate-400 font-mono mt-0.5 text-[10px]">{adminUser?.email || 'Logged in'}</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
};
