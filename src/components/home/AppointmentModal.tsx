import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AppointmentForm } from './AppointmentForm';
import { X, Calendar, Stethoscope } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { isAppointmentModalOpen, setIsAppointmentModalOpen, doctor, clinic } = useClinic();

  if (!isAppointmentModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAppointmentModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 mb-6 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Request Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              With {doctor.name} • {clinic.name} ({clinic.location})
            </p>
          </div>
        </div>

        {/* Appointment Form */}
        <AppointmentForm onSuccess={() => setIsAppointmentModalOpen(false)} />
      </div>
    </div>
  );
};
