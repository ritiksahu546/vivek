import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { FaqItem } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, HelpCircle, X } from 'lucide-react';

export const FaqManager: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useClinic();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<FaqItem>>({
    question: '',
    answer: '',
    category: 'General',
    enabled: true,
    order: faqs.length + 1
  });

  const handleStartEdit = (faq: FaqItem) => {
    setFormData(faq);
    setIsEditing(faq.id);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question?.trim() || !formData.answer?.trim()) return;

    if (isEditing) {
      updateFaq(isEditing, formData);
      setIsEditing(null);
    } else if (isAdding) {
      addFaq({
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category || 'General',
        enabled: formData.enabled ?? true,
        order: formData.order || faqs.length + 1
      });
      setIsAdding(false);
    }

    setFormData({
      question: '',
      answer: '',
      category: 'General',
      enabled: true,
      order: faqs.length + 1
    });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage FAQs & Patient Guidance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit questions and medically accurate answers for prospective patients and search engines.
          </p>
        </div>

        {!isAdding && !isEditing && (
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData({
                question: '',
                answer: '',
                category: 'General',
                enabled: true,
                order: faqs.length + 1
              });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || isEditing) && (
        <form onSubmit={handleSave} className="p-6 bg-teal-50/50 rounded-2xl border border-teal-200 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-teal-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              {isEditing ? 'Edit FAQ Item' : 'Add New FAQ Item'}
            </h3>
            <button
              type="button"
              onClick={() => { setIsAdding(false); setIsEditing(null); }}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Question *</label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g. What is spirometry and how is it done?"
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Medically Concise Answer *</label>
            <textarea
              rows={3}
              required
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Detailed explanation..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              >
                <option value="General">General Consultation</option>
                <option value="Conditions">Conditions (Asthma / COPD)</option>
                <option value="Diagnostics">Diagnostics & Testing</option>
                <option value="Clinic">Clinic & Appointments</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span>Show on public website</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => { setIsAdding(false); setIsEditing(null); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700"
            >
              Save FAQ
            </button>
          </div>
        </form>
      )}

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`p-4 rounded-2xl border bg-white shadow-2xs space-y-2 ${
              faq.enabled ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{faq.question}</h4>
                  <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                    {faq.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => updateFaq(faq.id, { enabled: !faq.enabled })}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                  title={faq.enabled ? 'Disable FAQ' : 'Enable FAQ'}
                >
                  {faq.enabled ? <CheckCircle2 className="w-4 h-4 text-teal-600" /> : <XCircle className="w-4 h-4 text-slate-400" />}
                </button>

                <button
                  onClick={() => handleStartEdit(faq)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete FAQ "${faq.question}"?`)) {
                      deleteFaq(faq.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 pl-6 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
