import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { MedicalIcon } from '../common/MedicalIcon';
import { CheckCircle2, Calendar, Stethoscope } from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  const { services, setIsAppointmentModalOpen } = useClinic();

  const enabledServices = services
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
            Clinical Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Specialized Pulmonology Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Delivering thorough chest evaluations, advanced spirometry assessments, and personalized respiratory therapy at Chest Care Clinic Bhopal.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enabledServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-teal-200 hover:shadow-md transition-all flex flex-col justify-between text-left group"
            >
              <div>
                {/* Header Icon + Availability Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <MedicalIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  {service.availableAtClinic && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-[11px] font-semibold text-teal-700 border border-teal-200">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      Available at clinic
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              {/* Booking CTA */}
              <div className="mt-5 pt-4 border-t border-slate-200/60">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 group-hover:underline cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In-Clinic Facility Highlight */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>In-Clinic Diagnostic Capability</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Pulmonary Function Testing & Spirometry
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Accurate, non-invasive airflow obstruction testing to confirm asthma, determine COPD stage, and objectively monitor therapeutic response.
            </p>
          </div>

          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 shadow-md transition-all shrink-0 text-sm cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule PFT / Spirometry</span>
          </button>
        </div>

      </div>
    </section>
  );
};
