import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Star,
  ShieldCheck,
  Calendar,
  Phone,
  CheckCircle2,
  Wind,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { doctor, clinic, setIsAppointmentModalOpen } = useClinic();

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Subtle organic lung / airflow accent background graphic */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Doctor Identity, Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust badge pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span>Verified Pulmonary Medicine Specialist • Bhopal</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {doctor.headline || "Expert Pulmonary & Respiratory Care in Bhopal"}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                {doctor.subheadline || "Consult Dr. Vivek Arora for comprehensive diagnosis and treatment of respiratory and chest-related conditions."}
              </p>
            </div>

            {/* Doctor Profile Mini-Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-xl">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    {doctor.name}
                    <ShieldCheck className="w-5 h-5 text-teal-600 inline" />
                  </h2>
                  <p className="text-sm font-semibold text-teal-700">
                    {doctor.specialty} • {doctor.subSpecialty}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {doctor.location}
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-medium">{doctor.qualifications}</span>
                  </p>
                </div>

                {/* Rating Badge */}
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3.5 py-2 text-center shrink-0">
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-slate-900 text-base">{doctor.rating.toFixed(1)}★</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 block mt-0.5">
                    {doctor.reviewCount}+ Google Reviews
                  </span>
                </div>
              </div>

              {/* Verified Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Evidence-Based Pulmonology</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Asthma & COPD Clinical Protocols</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Spirometry Lung Function Testing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Reg. No: {doctor.registrationNumber}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-md shadow-teal-700/20 transition-all cursor-pointer text-base"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${clinic.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all text-base"
              >
                <Phone className="w-5 h-5 text-teal-600" />
                <span>Call Clinic</span>
              </a>

              <a
                href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}?text=Hello%20Dr.%20Vivek%20Arora%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20pulmonology%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all text-sm"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Consultation Timings Preview */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Timings: {clinic.consultationTimings} • Mon–Sat</span>
            </div>

          </div>

          {/* Right Column: High-Res Medical Doctor Imagery & Clinical Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-teal-500/20 via-sky-300/20 to-teal-700/10 shadow-xl border border-white/60">
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-4/5 shadow-inner">
                  <img
                    src={doctor.photoUrl}
                    alt={`${doctor.name} - Pulmonologist Bhopal`}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Doctor Overlay badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{doctor.name}</div>
                        <div className="text-xs font-semibold text-teal-700">MD Pulmonary Medicine</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{clinic.name} • Bhopal</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                        <Wind className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Trust Card Top-Left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Wind className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Pulmonary Care</div>
                  <div className="text-[11px] text-slate-500">Lungs • Airway • Chest</div>
                </div>
              </div>

              {/* Floating Reviews Tag Bottom-Right */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">5.0 ★ Rating</div>
                  <div className="text-[11px] text-slate-500">169+ Patient Reviews</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
