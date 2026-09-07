import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { clinic, doctor } = useClinic();

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left max-h-[85vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 pr-10">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {type === 'privacy' ? 'Patient Privacy Policy' : 'Terms of Medical Consultation'}
            </h3>
            <p className="text-xs text-slate-500">
              {clinic.name} • Dr. Vivek Arora, Pulmonologist, Bhopal
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>{clinic.name}</strong>, headed by Dr. Vivek Arora, we are committed to upholding the confidentiality, dignity, and privacy of all individuals who consult with us online or in person.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">1. Collection of Contact Details</h4>
              <p>
                We only collect basic contact information (such as patient full name, mobile number, age, and preferred appointment time) through our website form. We explicitly do NOT solicit or store sensitive financial or confidential diagnostic data on public forms.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">2. Use of Information</h4>
              <p>
                Patient phone numbers and communication details are used solely by our authorized clinic reception staff to confirm appointment schedules, coordinate token timings, or provide directions to our Bhopal clinic. We never sell, share, or monetize patient records with commercial third parties.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">3. Clinical Confidentiality</h4>
              <p>
                All in-person medical consultations, spirometry results, and pulmonary prescriptions are bound by statutory medical confidentiality norms established by the Medical Council of India and applicable national healthcare legislation.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">4. Security Safeguards</h4>
              <p>
                Data stored within our electronic databases is shielded by role-based authentication and secure Firestore encryption protocols.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to the official website of <strong>{doctor.name}</strong>, Pulmonologist & Chest Specialist at <strong>{clinic.name}</strong>, Bhopal, Madhya Pradesh. By browsing this website, you agree to the following terms:
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">1. Educational Purpose Only</h4>
              <p>
                All content, educational overviews of respiratory conditions (such as asthma, COPD, pneumonia, and bronchiectasis), and diagnostic descriptions published on this website are provided solely for general public education. They do not constitute an individualized medical prescription, official medical diagnosis, or patient-doctor relationship.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">2. In-Person Consultation Required</h4>
              <p>
                Accurate pulmonary diagnosis requires physical chest auscultation, medical history review, and laboratory/imaging tests. An online appointment request represents a tentative scheduling reservation that must be confirmed by the clinic reception.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">3. Medical Emergencies Notice</h4>
              <p>
                This website and its appointment booking forms are not intended for acute medical emergencies. If you or a family member are experiencing acute severe breathlessness, hemoptysis (coughing blood), or severe chest tightness, please proceed immediately to the nearest hospital casualty or emergency department in Bhopal.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-3">4. Intellectual Property</h4>
              <p>
                All text, doctor branding, and website content are the intellectual property of {clinic.name} and Dr. Vivek Arora.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
