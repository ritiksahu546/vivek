import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Stethoscope,
  MapPin,
  Phone,
  Clock,
  Mail,
  ShieldCheck,
  AlertCircle,
  Lock,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenLegal }) => {
  const { doctor, clinic, setIsAppointmentModalOpen } = useClinic();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Doctor Identity & Verification (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-white block">
                  {doctor.name}
                </span>
                <span className="text-xs text-teal-400 font-medium">
                  {doctor.specialty} • {doctor.qualifications}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dr. Vivek Arora is a dedicated Pulmonologist / Chest Specialist providing clinical respiratory consultations, asthma management, COPD protocols, and pulmonary assessments in Bhopal, Madhya Pradesh.
            </p>

            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <div>Medical Council Reg: <span className="text-slate-200">{doctor.registrationNumber}</span></div>
              <div>Languages: <span className="text-slate-200">{doctor.languages.join(", ")}</span></div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Dr. Vivek Arora</a></li>
              <li><a href="#conditions" className="hover:text-teal-400 transition-colors">Conditions & Treatments</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Pulmonology Services</a></li>
              <li><a href="#why-choose" className="hover:text-teal-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#reviews" className="hover:text-teal-400 transition-colors">Patient Reviews</a></li>
              <li><a href="#clinic" className="hover:text-teal-400 transition-colors">Clinic & Timings</a></li>
              <li><a href="#faq" className="hover:text-teal-400 transition-colors">Respiratory FAQ</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact Information</a></li>
            </ul>
          </div>

          {/* Column 3: Respiratory Conditions (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Conditions Treated
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Asthma Management</li>
              <li>Chronic Obstructive Pulmonary Disease (COPD)</li>
              <li>Chronic & Unexplained Cough Evaluation</li>
              <li>Shortness of Breath / Breathing Difficulty</li>
              <li>Pneumonia & Lower Respiratory Infections</li>
              <li>Bronchiectasis & Airway Secretions</li>
              <li>Allergy & Environmental Airway Hyperreactivity</li>
              <li>Spirometry & Lung Function Testing</li>
            </ul>
          </div>

          {/* Column 4: Clinic Info & Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Clinic Location & Hours
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{clinic.address}</span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span>{clinic.consultationTimings}</span>
                  <div className="text-slate-500">Days: {clinic.workingDays}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${clinic.phone.replace(/\s+/g, '')}`} className="hover:text-teal-400 transition-colors">
                    {clinic.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={clinic.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Medical Responsibility Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-slate-400 text-xs leading-relaxed flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
          <p>
            <strong>Medical Notice:</strong> Information on this website is for general patient education regarding respiratory conditions and Dr. Vivek Arora's pulmonology practice in Bhopal. It is not intended to substitute for individualized in-person professional medical examination, diagnosis, or prescription. In case of acute breathlessness or emergency, visit the nearest hospital immediately.
          </p>
        </div>

        {/* Bottom Bar: Copyright, Legal & Admin Access */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {clinic.name}. All medical and clinical rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Medical Consultation
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-teal-400 flex items-center gap-1 text-slate-400 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Doctor Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
