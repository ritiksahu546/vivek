import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { RespiratoryCondition } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Wind, X, Save } from 'lucide-react';
import { MedicalIcon } from '../common/MedicalIcon';

export const TreatmentsManager: React.FC = () => {
  const { conditions, addCondition, updateCondition, deleteCondition } = useClinic();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<RespiratoryCondition>>({
    name: '',
    shortSummary: '',
    icon: 'Wind',
    overview: '',
    commonSymptoms: [],
    careApproach: '',
    enabled: true,
    order: conditions.length + 1
  });

  const [symptomsStr, setSymptomsStr] = useState('');

  const handleStartEdit = (condition: RespiratoryCondition) => {
    setFormData(condition);
    setSymptomsStr(condition.commonSymptoms.join(', '));
    setIsEditing(condition.id);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    const parsedSymptoms = symptomsStr.split(',').map(s => s.trim()).filter(Boolean);

    if (isEditing) {
      updateCondition(isEditing, {
        ...formData,
        commonSymptoms: parsedSymptoms
      });
      setIsEditing(null);
    } else if (isAdding) {
      addCondition({
        name: formData.name.trim(),
        shortSummary: formData.shortSummary?.trim() || '',
        icon: formData.icon || 'Wind',
        overview: formData.overview?.trim() || '',
        commonSymptoms: parsedSymptoms,
        careApproach: formData.careApproach?.trim() || '',
        enabled: formData.enabled ?? true,
        order: formData.order || conditions.length + 1
      });
      setIsAdding(false);
    }

    setFormData({
      name: '',
      shortSummary: '',
      icon: 'Wind',
      overview: '',
      commonSymptoms: [],
      careApproach: '',
      enabled: true,
      order: conditions.length + 1
    });
    setSymptomsStr('');
  };

  const iconOptions = ['Wind', 'HeartPulse', 'Thermometer', 'GitFork', 'Microscope', 'Sparkles', 'Heart', 'Moon', 'Layers', 'Activity'];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage Respiratory Conditions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure educational conditions, symptoms, and care approaches shown on the public site.
          </p>
        </div>

        {!isAdding && !isEditing && (
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData({
                name: '',
                shortSummary: '',
                icon: 'Wind',
                overview: '',
                commonSymptoms: [],
                careApproach: '',
                enabled: true,
                order: conditions.length + 1
              });
              setSymptomsStr('');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Condition</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || isEditing) && (
        <form onSubmit={handleSave} className="p-6 bg-teal-50/50 rounded-2xl border border-teal-200 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-teal-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              {isEditing ? 'Edit Respiratory Condition' : 'Add New Respiratory Condition'}
            </h3>
            <button
              type="button"
              onClick={() => { setIsAdding(false); setIsEditing(null); }}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Condition Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Asthma Management"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Icon Style</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Short Summary (1-2 lines for grid card)</label>
            <input
              type="text"
              required
              value={formData.shortSummary}
              onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
              placeholder="e.g. Comprehensive evaluation of airway hyperreactivity..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Common Symptoms (Comma-separated)</label>
            <input
              type="text"
              value={symptomsStr}
              onChange={(e) => setSymptomsStr(e.target.value)}
              placeholder="Wheezing, Night cough, Chest tightness, Shortness of breath"
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Clinical Overview</label>
            <textarea
              rows={2}
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="Educational clinical description..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pulmonology Care Approach</label>
            <textarea
              rows={2}
              value={formData.careApproach}
              onChange={(e) => setFormData({ ...formData, careApproach: e.target.value })}
              placeholder="In-clinic spirometry, controller therapy, preventive triggers..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="font-semibold">Enabled (Visible to public)</span>
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
              Save Condition
            </button>
          </div>
        </form>
      )}

      {/* Grid of Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conditions.map((c) => (
          <div
            key={c.id}
            className={`p-4 rounded-2xl border bg-white shadow-2xs flex items-start justify-between gap-3 ${
              c.enabled ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <MedicalIcon name={c.icon} className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{c.shortSummary}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.commonSymptoms.slice(0, 3).map((sym, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {sym}
                    </span>
                  ))}
                  {c.commonSymptoms.length > 3 && (
                    <span className="text-[10px] text-slate-400">+{c.commonSymptoms.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => updateCondition(c.id, { enabled: !c.enabled })}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  c.enabled ? 'text-teal-700 hover:bg-teal-50' : 'text-slate-400 hover:bg-slate-100'
                }`}
                title={c.enabled ? 'Disable condition' : 'Enable condition'}
              >
                {c.enabled ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleStartEdit(c)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                title="Edit condition"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete condition "${c.name}"?`)) {
                    deleteCondition(c.id);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                title="Delete condition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
