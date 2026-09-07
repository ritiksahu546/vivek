import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Phone,
  MessageSquare,
  Calendar,
  Navigation,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  AlertCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { clinic, doctor, submitInquiry, setIsAppointmentModalOpen } = useClinic();

  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryError('');

    if (!inquiryData.name.trim() || !inquiryData.phone.trim()) {
      setInquiryError('Please provide your name and phone number.');
      return;
    }

    setIsSending(true);
    const result = await submitInquiry({
      name: inquiryData.name.trim(),
      phone: inquiryData.phone.trim(),
      message: inquiryData.message.trim() || 'General clinic consultation inquiry.'
    });
    setIsSending(false);

    if (result.success) {
      setIsSent(true);
      setInquiryData({ name: '', phone: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } else {
      setInquiryError(result.error || 'Failed to submit inquiry.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Contact Dr. Vivek Arora's Clinic
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Reach out via phone, direct WhatsApp, or submit a query. Our clinic reception in Bhopal is here to assist you.
          </p>
        </div>

        {/* 4 Core Quick Contact Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {/* 1. Call Now */}
          <a
            href={`tel:${clinic.phone.replace(/\s+/g, '')}`}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Direct Phone
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              Call Clinic Now
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {clinic.phone}
            </p>
            <span className="inline-block text-xs font-bold text-teal-600 mt-3 group-hover:underline">
              Tap to call →
            </span>
          </a>

          {/* 2. WhatsApp */}
          <a
            href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}?text=Hello%20Dr.%20Vivek%20Arora%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20pulmonology%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Instant Chat
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              WhatsApp Helpdesk
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {clinic.whatsapp}
            </p>
            <span className="inline-block text-xs font-bold text-emerald-600 mt-3 group-hover:underline">
              Start WhatsApp chat →
            </span>
          </a>

          {/* 3. Book Appointment */}
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Online Booking
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              Book Appointment
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Preferred morning / evening slot
            </p>
            <span className="inline-block text-xs font-bold text-teal-600 mt-3 group-hover:underline">
              Open booking form →
            </span>
          </button>

          {/* 4. Get Directions */}
          <a
            href={clinic.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Navigation className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Navigation
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              Get Directions
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              MP Nagar Zone-II, Bhopal
            </p>
            <span className="inline-block text-xs font-bold text-teal-600 mt-3 group-hover:underline">
              Google Maps route →
            </span>
          </a>
        </div>

        {/* Detailed Contact & Quick Callback Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Clinic Information Summary */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-left space-y-5">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Chest Care Clinic Details
            </h3>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Clinic Address:</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{clinic.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Consultation Timings:</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{clinic.consultationTimings}</p>
                  <p className="text-xs text-slate-500">Working Days: {clinic.workingDays}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Official Email:</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{clinic.email}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 leading-relaxed">
              <strong>Patient Note:</strong> Please bring your prior chest X-rays, HRCT scan reports, blood test results, and current inhaler devices during your consultation for comprehensive evaluation.
            </div>
          </div>

          {/* Quick Callback / Message Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-left">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
              Send a Quick Message
            </h3>
            <p className="text-xs text-slate-600 mb-5">
              Have an inquiry about clinic timings, fees, or testing? Leave your contact details below.
            </p>

            {isSent ? (
              <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
                <h4 className="font-bold text-slate-900">Message Received</h4>
                <p className="text-xs text-slate-600">
                  Our clinic reception will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                {inquiryError && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{inquiryError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Dubey"
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98260 00000"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Question / Inquiry (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Inquiring regarding spirometry timings..."
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-50 text-sm shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Sending...' : 'Send Inquiry to Reception'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
