import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { MessageSquare, Phone, Calendar } from 'lucide-react';

export const FloatingActionButtons: React.FC = () => {
  const { clinic, setIsAppointmentModalOpen } = useClinic();

  const rawPhone = clinic.phone.replace(/\s+/g, '');
  const rawWhatsApp = clinic.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${rawWhatsApp}?text=Hello%20Dr.%20Vivek%20Arora%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20pulmonology%20consultation.`;

  return (
    <>
      {/* Floating Desktop WhatsApp Button (Bottom-Right, above mobile bar on desktop) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-xl shadow-emerald-700/30 transition-all hover:scale-105 group"
          aria-label="Chat on WhatsApp with Dr. Vivek Arora Clinic"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
            </span>
          </div>
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Sticky Bottom Mobile CTA Strip: [ Call ] [ WhatsApp ] [ Appointment ] */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          {/* Call */}
          <a
            href={`tel:${rawPhone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-teal-700 mb-0.5" />
            <span>Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5 fill-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {/* Appointment */}
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-bold transition-colors min-h-[44px] shadow-sm cursor-pointer"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Appointment</span>
          </button>
        </div>
      </div>
    </>
  );
};
