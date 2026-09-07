import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { PatientReview } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Star, Eye, EyeOff, ShieldAlert, X } from 'lucide-react';

export const ReviewsManager: React.FC = () => {
  const { reviews, addReview, updateReview, deleteReview } = useClinic();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<PatientReview>>({
    patientName: '',
    rating: 5,
    comment: '',
    conditionTreated: 'Asthma Management',
    reviewDate: 'Recent Patient Feedback',
    isVerified: true,
    isApproved: true,
    isPlaceholder: false
  });

  const handleStartEdit = (review: PatientReview) => {
    setFormData(review);
    setIsEditing(review.id);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName?.trim() || !formData.comment?.trim()) return;

    if (isEditing) {
      updateReview(isEditing, formData);
      setIsEditing(null);
    } else if (isAdding) {
      addReview({
        patientName: formData.patientName.trim(),
        rating: formData.rating || 5,
        comment: formData.comment.trim(),
        conditionTreated: formData.conditionTreated || 'Pulmonology Consultation',
        reviewDate: formData.reviewDate || 'Recent',
        isVerified: formData.isVerified ?? true,
        isApproved: formData.isApproved ?? true,
        isPlaceholder: formData.isPlaceholder ?? false
      });
      setIsAdding(false);
    }

    setFormData({
      patientName: '',
      rating: 5,
      comment: '',
      conditionTreated: 'Asthma Management',
      reviewDate: 'Recent Patient Feedback',
      isVerified: true,
      isApproved: true,
      isPlaceholder: false
    });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage Patient Reviews
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish verified patient testimonials or mark internal placeholders. No fake reviews allowed.
          </p>
        </div>

        {!isAdding && !isEditing && (
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData({
                patientName: '',
                rating: 5,
                comment: '',
                conditionTreated: 'Asthma Management',
                reviewDate: 'Recent Feedback',
                isVerified: true,
                isApproved: true,
                isPlaceholder: false
              });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        )}
      </div>

      {/* Warning Notice about ethical medical reviews */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Medical Ethics & Compliance Rule:</span>
          <p className="mt-0.5">
            Do not fabricate patient testimonials. If actual patient reviews are undergoing verification, use the <em>Placeholder</em> label or hide them from the public site using the Approve/Hide toggle.
          </p>
        </div>
      </div>

      {/* Add / Edit Form */}
      {(isAdding || isEditing) && (
        <form onSubmit={handleSave} className="p-6 bg-teal-50/50 rounded-2xl border border-teal-200 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-teal-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              {isEditing ? 'Edit Patient Review' : 'Add New Patient Review'}
            </h3>
            <button
              type="button"
              onClick={() => { setIsAdding(false); setIsEditing(null); }}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Patient Name *</label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="e.g. R. K. Sharma"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rating (1 to 5 Stars)</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Condition Treated</label>
              <input
                type="text"
                value={formData.conditionTreated}
                onChange={(e) => setFormData({ ...formData, conditionTreated: e.target.value })}
                placeholder="e.g. Chronic Asthma, COPD"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Review / Feedback Text *</label>
            <textarea
              rows={3}
              required
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Patient feedback regarding consultation, doctor diagnosis..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isApproved}
                onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="font-semibold">Approved (Show on public website)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="font-semibold">Verified Patient Badge</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPlaceholder}
                onChange={(e) => setFormData({ ...formData, isPlaceholder: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="font-semibold text-amber-800">Mark as Internal Placeholder</span>
            </label>
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
              Save Review
            </button>
          </div>
        </form>
      )}

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className={`p-5 rounded-2xl border bg-white shadow-2xs flex flex-col justify-between space-y-4 ${
              r.isApproved ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  {r.isPlaceholder && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                      Placeholder
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    r.isApproved ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {r.isApproved ? 'Published' : 'Hidden'}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 mt-2.5 leading-relaxed italic">
                "{r.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {r.patientName}
                  {r.isVerified && <CheckCircle className="w-3.5 h-3.5 text-teal-600 inline" />}
                </div>
                <div className="text-[11px] text-slate-400">{r.conditionTreated} • {r.reviewDate}</div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateReview(r.id, { isApproved: !r.isApproved })}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                  title={r.isApproved ? 'Hide from public site' : 'Publish on public site'}
                >
                  {r.isApproved ? <Eye className="w-4 h-4 text-teal-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                </button>

                <button
                  onClick={() => handleStartEdit(r)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                  title="Edit review"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete review from ${r.patientName}?`)) {
                      deleteReview(r.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
