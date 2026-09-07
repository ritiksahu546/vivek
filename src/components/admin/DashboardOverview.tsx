import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Calendar,
  MessageSquare,
  Star,
  Users,
  Clock,
  Phone,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AdminTab } from './AdminLayout';

interface DashboardOverviewProps {
  onNavigate: (tab: AdminTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const { doctor, clinic, appointments, inquiries, reviews, services, conditions, updateAppointmentStatus } = useClinic();

  const newAppointments = appointments.filter(a => a.status === 'New');
  const confirmedAppointments = appointments.filter(a => a.status === 'Confirmed');
  const unreadInquiries = inquiries.filter(i => !i.isContacted);

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-700 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Medical Practice Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome, {doctor.name}
          </h2>
          <p className="text-sm text-teal-100 mt-1 max-w-xl">
            Manage your patient appointment requests, reviews, clinic timings, and respiratory content for {clinic.name} Bhopal.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('appointments')}
            className="px-4 py-2 rounded-xl bg-white text-teal-800 font-bold text-xs hover:bg-teal-50 transition-colors cursor-pointer"
          >
            Review Appointments ({newAppointments.length})
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Appointments */}
        <div
          onClick={() => onNavigate('appointments')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Requests</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">
            {newAppointments.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {confirmedAppointments.length} confirmed • {appointments.length} total
          </div>
        </div>

        {/* Patient Inquiries */}
        <div
          onClick={() => onNavigate('inquiries')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inquiries</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">
            {unreadInquiries.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {inquiries.length} total messages
          </div>
        </div>

        {/* Reviews */}
        <div
          onClick={() => onNavigate('reviews')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Rating</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3 flex items-baseline gap-2">
            <span>{doctor.rating.toFixed(1)}★</span>
            <span className="text-xs font-medium text-slate-500">({doctor.reviewCount}+ total)</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {reviews.length} managed testimonials
          </div>
        </div>

        {/* Clinical Services */}
        <div
          onClick={() => onNavigate('services')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services & Conditions</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">
            {services.length + conditions.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {services.length} services • {conditions.length} conditions
          </div>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Appointment Requests</h3>
            <p className="text-xs text-slate-500">Patients waiting for clinic schedule confirmation</p>
          </div>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-xs font-bold text-teal-600 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {appointments.slice(0, 5).map((app) => (
            <div key={app.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{app.patientName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    app.status === 'New' ? 'bg-amber-100 text-amber-800' :
                    app.status === 'Confirmed' ? 'bg-teal-100 text-teal-800' :
                    app.status === 'Completed' ? 'bg-slate-100 text-slate-700' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Age: {app.age}</span>
                </div>

                <div className="text-xs text-slate-600">
                  <strong className="text-slate-800">Reason:</strong> {app.reason}
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span>Slot: {app.preferredDate} ({app.preferredTime})</span>
                  <span>•</span>
                  <span>Contact: {app.phone}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${app.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call</span>
                </a>
                
                {app.status === 'New' && (
                  <button
                    onClick={() => updateAppointmentStatus(app.id, 'Confirmed')}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No appointment requests yet.
            </div>
          )}
        </div>
      </div>

      {/* Quick Setup and Clinic Info Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Clinic Information</h4>
          <p className="text-xs text-slate-600 mb-4">Current location, contact and timings displayed to patients:</p>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div><strong>Clinic:</strong> {clinic.name}</div>
            <div><strong>Address:</strong> {clinic.address}</div>
            <div><strong>Phone:</strong> {clinic.phone}</div>
            <div><strong>Timings:</strong> {clinic.consultationTimings}</div>
          </div>
          <button
            onClick={() => onNavigate('clinic')}
            className="mt-4 text-xs font-bold text-teal-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            Edit Clinic Info →
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Doctor Profile</h4>
          <p className="text-xs text-slate-600 mb-4">Credentials & bio displayed on website:</p>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div><strong>Name:</strong> {doctor.name}</div>
            <div><strong>Specialty:</strong> {doctor.specialty}</div>
            <div><strong>Qualifications:</strong> {doctor.qualifications}</div>
            <div><strong>Reg Number:</strong> {doctor.registrationNumber}</div>
          </div>
          <button
            onClick={() => onNavigate('doctor')}
            className="mt-4 text-xs font-bold text-teal-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            Edit Doctor Profile →
          </button>
        </div>
      </div>
    </div>
  );
};
