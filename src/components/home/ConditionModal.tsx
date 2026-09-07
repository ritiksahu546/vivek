import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { X, Calendar, CheckCircle2, AlertCircle, Wind } from 'lucide-react';
import { MedicalIcon } from '../common/MedicalIcon';

export const ConditionModal: React.FC = () => {
  const { selectedConditionModal, setSelectedConditionModal, setIsAppointmentModalOpen } = useClinic();

  if (!selectedConditionModal) return null;

  const handleBookForCondition = () => {
    setSelectedConditionModal(null);
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedConditionModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-100/80 text-teal-800 flex items-center justify-center shrink-0">
            <MedicalIcon name={selectedConditionModal.icon} className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Educational Respiratory Overview
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              {selectedConditionModal.name}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {selectedConditionModal.shortSummary}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 text-sm text-slate-700 border-t border-slate-100 pt-5">
          {/* Detailed Overview */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1.5 text-base">Clinical Overview</h4>
            <p className="leading-relaxed text-slate-600">
              {selectedConditionModal.overview}
            </p>
          </div>

          {/* Common Symptoms */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2 text-base">Common Symptoms to Watch For</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedConditionModal.commonSymptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-xs font-medium text-slate-800">{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Care Approach */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80">
            <h4 className="font-bold text-teal-900 mb-1 text-sm flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-teal-700" />
              <span>Pulmonology Care Approach</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedConditionModal.careApproach}
            </p>
          </div>

          {/* Medical Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-normal">
              Educational notice: Symptoms vary per individual. A formal in-person clinical assessment by Dr. Vivek Arora is necessary for accurate diagnosis and prescription.
            </p>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="mt-7 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setSelectedConditionModal(null)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleBookForCondition}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Consult for {selectedConditionModal.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
