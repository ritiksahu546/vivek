import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { MedicalIcon } from '../common/MedicalIcon';
import { ChevronRight, Wind, Search, AlertCircle } from 'lucide-react';

export const ConditionsGrid: React.FC = () => {
  const { conditions, setSelectedConditionModal } = useClinic();
  const [searchTerm, setSearchTerm] = useState('');

  const enabledConditions = conditions
    .filter(c => c.enabled)
    .sort((a, b) => a.order - b.order);

  const filtered = enabledConditions.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.shortSummary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="conditions" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
            Respiratory Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Conditions & Pulmonary Treatments
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Evidence-based diagnosis, symptom control, and individualized disease management for acute and chronic chest disorders in Bhopal.
          </p>

          {/* Quick Search / Filter */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search condition (e.g., Asthma, COPD, Cough)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/50 outline-hidden text-sm transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((condition) => (
            <div
              key={condition.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between text-left group"
            >
              <div>
                {/* Icon & Title */}
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <MedicalIcon name={condition.icon} className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {condition.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {condition.shortSummary}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedConditionModal(condition)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span>Know More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="text-[11px] font-medium text-slate-400">
                  Clinical Care
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 mt-6">
            <p className="text-slate-500 text-sm">No respiratory conditions matching "{searchTerm}".</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-xs font-bold text-teal-600 hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Educational Note */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Medical content is strictly for patient education and does not replace in-person pulmonary auscultation and diagnostic testing.
          </span>
        </div>

      </div>
    </section>
  );
};
