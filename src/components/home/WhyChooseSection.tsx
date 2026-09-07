import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Stethoscope,
  HeartPulse,
  FileCheck,
  Activity,
  ClipboardList,
  CalendarClock,
  ShieldCheck
} from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const { doctor, clinic } = useClinic();

  const benefits = [
    {
      title: "Specialized Respiratory Care",
      description: "Dedicated focus on adult respiratory medicine, chest disorders, and chronic lung care guided by Dr. Vivek Arora.",
      icon: <Stethoscope className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Patient-Centered Consultation",
      description: "Generous consultation appointments prioritizing attentive listening, detailed symptom history, and patient comfort.",
      icon: <HeartPulse className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Detailed Clinical Evaluation",
      description: "Thorough physical chest examination, breath sound auscultation, and rigorous review of prior radiological films.",
      icon: <FileCheck className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Modern Diagnostic Approach",
      description: "Utilization of standardized lung function testing (spirometry) and evidence-based diagnostic protocols.",
      icon: <Activity className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Personalized Treatment Planning",
      description: "Tailored inhaler molecule selection, customized lifestyle advice, and hands-on inhalation technique education.",
      icon: <ClipboardList className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Easy Appointment Booking",
      description: "Direct clinic phone assistance, prompt WhatsApp communication, and simple web appointment requests.",
      icon: <CalendarClock className="w-6 h-6 text-teal-600" />
    }
  ];

  return (
    <section id="why-choose" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
            Clinical Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Why Patients Trust Our Respiratory Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Committed to medical integrity, scientific rigor, and respectful communication without unsupported claims or exaggerated guarantees.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="mt-12 p-4 rounded-2xl bg-white border border-slate-200/90 max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
          <span>
            Ethical pulmonary practice adhering to the Medical Council of India and Indian Chest Society clinical guidelines.
          </span>
        </div>

      </div>
    </section>
  );
};
