import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { GalleryImage } from '../../types';
import { Plus, Trash2, Image, Star, X } from 'lucide-react';

export const GalleryManager: React.FC = () => {
  const { gallery, addGalleryImage, deleteGalleryImage } = useClinic();
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Clinic',
    caption: '',
    isFeatured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;

    addGalleryImage({
      title: formData.title.trim(),
      url: formData.url.trim(),
      category: formData.category,
      caption: formData.caption.trim(),
      isFeatured: formData.isFeatured
    });

    setFormData({
      title: '',
      url: '',
      category: 'Clinic',
      caption: '',
      isFeatured: false
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Clinic Photography & Gallery
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage photos of consultation rooms, spirometry equipment, and clinic facility in Bhopal.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Clinic Photo</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 bg-teal-50/50 rounded-2xl border border-teal-200 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-teal-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Add Clinic Photo</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Photo Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Consultation Suite"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
              >
                <option value="Clinic">Clinic & Facility</option>
                <option value="Consultation">Consultation Room</option>
                <option value="Equipment">Spirometry / Equipment</option>
                <option value="Reception">Reception & Waiting Area</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL *</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Caption</label>
            <input
              type="text"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Brief description of the room or equipment..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:border-teal-500 outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700"
            >
              Save Photo
            </button>
          </div>
        </form>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gallery.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                {photo.category}
              </span>
            </div>

            <div className="p-4 flex items-center justify-between border-t border-slate-100">
              <div>
                <h4 className="font-bold text-xs text-slate-900">{photo.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{photo.caption}</p>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Delete photo "${photo.title}"?`)) {
                    deleteGalleryImage(photo.id);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                title="Delete photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {gallery.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No gallery images added yet.
          </div>
        )}
      </div>
    </div>
  );
};
