import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Phone, Calendar, Menu, X, ShieldCheck, Stethoscope, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenLegal }) => {
  const { doctor, clinic, setIsAppointmentModalOpen } = useClinic();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Doctor', href: '#about' },
    { label: 'Conditions', href: '#conditions' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose', href: '#why-choose' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Clinic Info', href: '#clinic' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5'
        : 'bg-white border-b border-slate-100 py-3.5'
    }`}>
      {/* Top emergency & trust notification bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Pulmonologist • {doctor.qualifications}
            </span>
            <span className="text-slate-500">|</span>
            <span>{clinic.name}, Bhopal, MP</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-slate-400">Consultation Timings: {clinic.consultationTimings}</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors cursor-pointer"
              title="Clinic Admin Dashboard"
            >
              <Lock className="w-3 h-3" />
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Doctor Title */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:bg-teal-700 transition-colors">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                  {doctor.name}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  MD
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {doctor.specialty} • {clinic.location}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${clinic.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call Clinic</span>
            </a>
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${clinic.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-slate-800 bg-slate-100"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              Call Clinic: {clinic.phone}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAppointmentModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation Slot
            </button>
            <div className="flex justify-between items-center pt-2 px-1 text-xs text-slate-500">
              <button onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} className="hover:text-slate-900 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Doctor / Admin Login
              </button>
              <button onClick={() => { setMobileMenuOpen(false); onOpenLegal('privacy'); }} className="hover:underline">
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
