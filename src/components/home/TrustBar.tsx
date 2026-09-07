import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Star, Award, Stethoscope, MapPin, Wind } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const { doctor, clinic } = useClinic();

  const trustItems = [
    {
      icon: <Star className="w-6 h-6 text-amber-500 fill-amber-400" />,
      title: `${doctor.rating.toFixed(1)} ★ Rating`,
      subtitle: "Verified Patient Score"
    },
    {
      icon: <Award className="w-6 h-6 text-teal-600" />,
      title: `${doctor.reviewCount}+ Patient Reviews`,
      subtitle: "Independent Feedback"
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-teal-600" />,
      title: "Pulmonary Medicine Specialist",
      subtitle: doctor.qualifications
    },
    {
      icon: <MapPin className="w-6 h-6 text-teal-600" />,
      title: "Bhopal, Madhya Pradesh",
      subtitle: clinic.name
    },
    {
      icon: <Wind className="w-6 h-6 text-teal-600" />,
      title: "Comprehensive Respiratory Care",
      subtitle: "Asthma, COPD & Lung Health"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-8 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <div className="text-sm sm:text-base font-bold text-slate-100 tracking-tight leading-tight">
                  {item.title}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
