import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ServiceItem } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Stethoscope, Save, X } from 'lucide-react';
import { MedicalIcon } from '../common/MedicalIcon';

export const ServicesManager: React.FC = () => {
  const { services, addService, updateService, deleteService } = useClinic();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    shortDescription: '',
    icon: 'Stethoscope',
    availableAtClinic: true,
    enabled: true,
    order: services.length + 1
  });

  const handleStartEdit = (service: ServiceItem) => {
    setFormData(service);
    setIsEditing(service.id);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    if (isEditing) {
      updateService(isEditing, formData);
      setIsEditing(null);
    } else if (isAdding) {
      addService({
        title: formData.title.trim(),
        shortDescription: formData.shortDescription?.trim() || '',
        icon: formData.icon || 'Stethoscope',
        availableAtClinic: formData.availableAtClinic ?? true,
        enabled: formData.enabled ?? true,
        order: formData.order || services.length + 1
      });
      setIsAdding(false);
    }
    setFormData({
      title: '',
      shortDescription: '',
      icon: 'Stethoscope',
      availableAtClinic: true,
      enabled: true,
      order: services.length + 1
    });
  };

  const iconOptions = ['Stethoscope', 'HeartPulse', 'Wind', 'Activity', 'ShieldCheck', 'Gauge', 'Microscope', 'Sparkles'];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage Clinical Services
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Add, edit, reorder or toggle clinical offerings shown on the website.
          </p>
        </div>

        {!isAdding && !isEditing && (
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData({
                title: '',
                shortDescription: '',
                icon: 'Stethoscope',
                availableAtClinic: true,
                enabled: true,
                order: services.length + 1
              });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal or Inline Panel */}
      {(isAdding || isEditing) && (
        <form onSubmit={handleSave} className="p-6 bg-teal-50/50 rounded-2xl border border-teal-200 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-teal-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              {isEditing ? 'Edit Clinical Service' : 'Add New Clinical Service'}
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
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Service Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Allergy & Airway Evaluation"
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
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Short Description</label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Clinical evaluation and evidence-based therapeutic care..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.availableAtClinic}
                onChange={(e) => setFormData({ ...formData, availableAtClinic: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="font-semibold">Show "Available at clinic" badge</span>
            </label>

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
              Save Service
            </button>
          </div>
        </form>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-2xl border bg-white shadow-2xs flex items-start justify-between gap-3 ${
              service.enabled ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <MedicalIcon name={service.icon} className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">{service.title}</h4>
                  {service.availableAtClinic && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                      Clinic
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{service.shortDescription}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => updateService(service.id, { enabled: !service.enabled })}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  service.enabled ? 'text-teal-700 hover:bg-teal-50' : 'text-slate-400 hover:bg-slate-100'
                }`}
                title={service.enabled ? 'Disable service' : 'Enable service'}
              >
                {service.enabled ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleStartEdit(service)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                title="Edit service"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete service "${service.title}"?`)) {
                    deleteService(service.id);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                title="Delete service"
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
