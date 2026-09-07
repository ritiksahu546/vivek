import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Building2,
  AlertTriangle
} from 'lucide-react';

export const ClinicSection: React.FC = () => {
  const { clinic, doctor, setIsAppointmentModalOpen } = useClinic();

  return (
    <section id="clinic" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
            Facility & Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Clinic Information & Consultation Timings
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Conveniently situated in Bhopal with sanitized diagnostic areas, spirometry facilities, and dedicated patient assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Clinic Details Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between text-left">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {clinic.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-teal-700">
                    {clinic.tagline}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Verified Clinic Location • Bhopal, MP</span>
                  </div>
                </div>
              </div>

              {/* Clinic Address & Hours */}
              <div className="space-y-4 pt-2">
                {/* Address */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Clinic Address
                    </div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {clinic.address}
                    </p>
                    <span className="inline-block text-[11px] text-teal-700 font-medium mt-1">
                      Landmark: Near Rani Kamlapati Station, Bhopal
                    </span>
                  </div>
                </div>

                {/* Consultation Hours */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Consultation Timings
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {clinic.consultationTimings}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Days: {clinic.workingDays}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Reception Desk
                    </div>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {clinic.phone}
                    </p>
                    <p className="text-xs text-slate-500">
                      WhatsApp Helpdesk: {clinic.whatsapp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {clinic.emergencyNote}
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap gap-3">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all text-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={clinic.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
              >
                <Navigation className="w-4 h-4 text-teal-600" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${clinic.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center p-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
                title="Call Clinic"
              >
                <Phone className="w-4 h-4 text-teal-600" />
              </a>
            </div>

          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-3 border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="relative w-full h-[380px] lg:h-full min-h-[350px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <iframe
                title="Chest Care Clinic Bhopal Location Map"
                src={clinic.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              
              {/* Overlay Map Quick Link */}
              <div className="absolute top-3 right-3">
                <a
                  href={clinic.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-slate-800 text-xs font-bold shadow-md hover:bg-white transition-all border border-slate-200"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                </a>
              </div>
            </div>

            {/* Map Caption */}
            <div className="p-3 text-left flex items-center justify-between text-xs text-slate-500">
              <span>Dr. Vivek Arora's Chest Care Clinic • Bhopal, MP</span>
              <a
                href={clinic.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 font-semibold hover:underline"
              >
                Open Google Maps →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
