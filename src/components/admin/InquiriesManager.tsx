import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { MessageSquare, Phone, CheckCircle, Clock, Trash2 } from 'lucide-react';

export const InquiriesManager: React.FC = () => {
  const { inquiries, markInquiryContacted, deleteInquiry } = useClinic();

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Patient Messages & Inquiries
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Questions and callback inquiries submitted via website contact form.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 text-sky-800">
          Total Messages: {inquiries.length}
        </div>
      </div>

      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`bg-white rounded-2xl p-5 border transition-all space-y-3 ${
              inquiry.isContacted
                ? 'border-slate-200 bg-slate-50/50'
                : 'border-teal-300 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  inquiry.isContacted ? 'bg-slate-200 text-slate-600' : 'bg-teal-100 text-teal-800'
                }`}>
                  {inquiry.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900">{inquiry.name}</span>
                  <div className="text-xs text-slate-500">Received: {inquiry.createdAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${inquiry.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {inquiry.phone}</span>
                </a>

                <button
                  onClick={() => markInquiryContacted(inquiry.id, !inquiry.isContacted)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                    inquiry.isContacted
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{inquiry.isContacted ? 'Mark Uncontacted' : 'Mark Contacted'}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete message from ${inquiry.name}?`)) {
                      deleteInquiry(inquiry.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
              "{inquiry.message}"
            </p>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No patient inquiries yet.
          </div>
        )}
      </div>
    </div>
  );
};
