import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AppointmentStatus, AppointmentRecord } from '../../types';
import {
  Calendar,
  Clock,
  Phone,
  User,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock3,
  Trash2,
  FileText
} from 'lucide-react';

export const AppointmentsManager: React.FC = () => {
  const { appointments, updateAppointmentStatus, updateAppointmentNotes, deleteAppointment } = useClinic();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const filteredAppointments = appointments.filter((app) => {
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    const matchesSearch =
      app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSaveNotes = (id: string) => {
    updateAppointmentNotes(id, notesText);
    setEditingNotesId(null);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage Appointment Requests
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming consultation requests, update token status, and coordinate patient schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
            Total: {appointments.length}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            Pending: {appointments.filter(a => a.status === 'New').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by patient name, phone, or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-teal-500 outline-hidden"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'New', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                filterStatus === status
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-2xs transition-all space-y-4"
          >
            {/* Top Row: Patient Info & Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                  {app.patientName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-slate-900">{app.patientName}</span>
                    <span className="text-xs text-slate-400">({app.age ? `Age: ${app.age}` : 'Age not given'})</span>
                  </div>
                  <div className="text-xs text-teal-700 font-semibold mt-0.5">
                    Consultation Reason: {app.reason}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Status Dropdown */}
                <select
                  value={app.status}
                  onChange={(e) => updateAppointmentStatus(app.id, e.target.value as AppointmentStatus)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-hidden cursor-pointer ${
                    app.status === 'New' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                    app.status === 'Confirmed' ? 'bg-teal-50 text-teal-800 border-teal-300' :
                    app.status === 'Completed' ? 'bg-slate-100 text-slate-800 border-slate-300' :
                    'bg-rose-50 text-rose-800 border-rose-300'
                  }`}
                >
                  <option value="New">Status: New Request</option>
                  <option value="Confirmed">Status: Confirmed Slot</option>
                  <option value="Completed">Status: Consultation Completed</option>
                  <option value="Cancelled">Status: Cancelled</option>
                </select>

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete appointment request for ${app.patientName}?`)) {
                      deleteAppointment(app.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle: Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Date:</strong> {app.preferredDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Slot:</strong> {app.preferredTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Phone:</strong> <a href={`tel:${app.phone}`} className="text-teal-700 font-bold hover:underline">{app.phone}</a></span>
              </div>
            </div>

            {/* Patient Message / Symptoms Note */}
            {app.message && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <strong>Patient Description:</strong> "{app.message}"
              </div>
            )}

            {/* Staff / Clinic Notes */}
            <div className="pt-2 border-t border-slate-100 text-xs">
              {editingNotesId === app.id ? (
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    placeholder="Enter internal clinic note (e.g. Token #4 given, advised spirometry, called at 11am)..."
                    className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs focus:border-teal-500 outline-hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveNotes(app.id)}
                      className="px-3 py-1 bg-teal-600 text-white rounded-lg font-bold text-xs"
                    >
                      Save Note
                    </button>
                    <button
                      onClick={() => setEditingNotesId(null)}
                      className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    <strong>Clinic Internal Notes:</strong> {app.adminNotes || 'No notes added.'}
                  </span>
                  <button
                    onClick={() => {
                      setEditingNotesId(app.id);
                      setNotesText(app.adminNotes || '');
                    }}
                    className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{app.adminNotes ? 'Edit Note' : 'Add Note'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No appointment requests matching criteria.
          </div>
        )}
      </div>
    </div>
  );
};
