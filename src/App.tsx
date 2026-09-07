/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { TrustBar } from './components/home/TrustBar';
import { AboutDoctor } from './components/home/AboutDoctor';
import { ConditionsGrid } from './components/home/ConditionsGrid';
import { ConditionModal } from './components/home/ConditionModal';
import { ServicesGrid } from './components/home/ServicesGrid';
import { WhyChooseSection } from './components/home/WhyChooseSection';
import { ReviewsSection } from './components/home/ReviewsSection';
import { ClinicSection } from './components/home/ClinicSection';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/layout/Footer';
import { AppointmentModal } from './components/home/AppointmentModal';
import { FloatingActionButtons } from './components/common/FloatingActionButtons';
import { Toast } from './components/common/Toast';
import { LegalModal } from './components/legal/LegalModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';

const MainContent: React.FC = () => {
  const { adminUser } = useClinic();
  const [isViewingAdmin, setIsViewingAdmin] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenAdmin = () => {
    if (adminUser) {
      setIsViewingAdmin(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  if (isViewingAdmin) {
    return (
      <AdminLayout onBackToSite={() => setIsViewingAdmin(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Toast Notifications */}
      <Toast />

      {/* Navigation Header */}
      <Navbar
        onOpenAdmin={handleOpenAdmin}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <AboutDoctor />
        <ConditionsGrid />
        <ServicesGrid />
        <WhyChooseSection />
        <ReviewsSection />
        <ClinicSection />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Sticky Bottom Mobile Bar & Floating WhatsApp */}
      <FloatingActionButtons />

      {/* Interactive Modals */}
      <AppointmentModal />
      <ConditionModal />
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => setIsViewingAdmin(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ClinicProvider>
      <MainContent />
    </ClinicProvider>
  );
}
