import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface AppointmentFormProps {
  onSuccess?: () => void;
  inline?: boolean;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSuccess, inline = false }) => {
  const { submitAppointment, clinic, doctor } = useClinic();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    reason: 'Asthma / Respiratory Consultation',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const reasonOptions = [
    "Asthma Consultation",
    "COPD / Chronic Bronchitis",
    "Chronic Cough Evaluation",
    "Breathing Difficulty (Shortness of Breath)",
    "Pneumonia / Lung Infection Follow-up",
    "Spirometry / Pulmonary Function Test",
    "Chest Tightness / Pain Evaluation",
    "Allergy & Respiratory Issues",
    "General Pulmonology Review",
    "Other Respiratory Condition"
  ];

  const timeOptions = [
    "Morning (10:00 AM - 1:00 PM)",
    "Evening (5:30 PM - 8:30 PM)"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!formData.patientName.trim()) {
      setErrorMessage('Please enter the patient name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid phone number (minimum 8-10 digits).');
      return;
    }
    if (!formData.preferredDate) {
      setErrorMessage('Please select a preferred consultation date.');
      return;
    }

    setIsSubmitting(true);

    const result = await submitAppointment({
      patientName: formData.patientName.trim(),
      phone: formData.phone.trim(),
      age: formData.age.trim() || "Not specified",
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      reason: formData.reason,
      message: formData.message.trim()
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } else {
      setErrorMessage(result.error || 'Failed to submit appointment request. Please try again or call the clinic.');
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-teal-200 text-slate-800 space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Appointment Request Received!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-slate-900">{formData.patientName}</strong>. Your consultation request has been submitted to Dr. Vivek Arora's Chest Care Clinic reception.
        </p>
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 max-w-sm mx-auto text-xs text-teal-900 space-y-1 text-left">
          <div className="font-bold">Consultation Slot:</div>
          <div>Date: {formData.preferredDate}</div>
          <div>Timing: {formData.preferredTime}</div>
          <div>Contact: {formData.phone}</div>
        </div>
        <p className="text-xs text-slate-500">
          Our clinic receptionist will call or message you on WhatsApp to confirm your token timing.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              patientName: '',
              phone: '',
              age: '',
              preferredDate: '',
              preferredTime: 'Morning (10:00 AM - 1:00 PM)',
              reason: 'Asthma / Respiratory Consultation',
              message: ''
            });
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline pt-2 cursor-pointer"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  // Get tomorrow's date for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Patient Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Verma"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden transition-all text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              required
              placeholder="e.g. 98260 12345"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden transition-all text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Age & Reason */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Patient Age
          </label>
          <input
            type="number"
            min="1"
            max="120"
            placeholder="e.g. 45"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden transition-all text-slate-900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Reason for Consultation <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden transition-all text-slate-900"
          >
            {reasonOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Preferred Date & Preferred Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="date"
              required
              min={minDateStr}
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden transition-all text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Time Slot
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden transition-all text-slate-900"
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Brief Symptom Details / Message (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="e.g. Cough for 3 weeks, aggravated at night, wheezing on walking..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden transition-all text-slate-900 resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-50 shadow-md shadow-teal-700/20 transition-all text-base cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span>{isSubmitting ? 'Submitting Request...' : 'Request Appointment'}</span>
        </button>
      </div>

      {/* Security and Privacy Notice */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 justify-center">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
        <span>Your data is stored securely. No spam, only direct clinic consultation confirmation.</span>
      </div>
    </form>
  );
};
