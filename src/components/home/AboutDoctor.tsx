import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  ShieldCheck,
  Award,
  Languages,
  FileBadge,
  CheckCircle2,
  Calendar,
  Stethoscope,
  HeartPulse,
  FileCheck,
  ClipboardList
} from 'lucide-react';
import { MedicalIcon } from '../common/MedicalIcon';

export const AboutDoctor: React.FC = () => {
  const { doctor, clinic, setIsAppointmentModalOpen } = useClinic();

  const whyChooseCards = [
    {
      title: "Patient-Focused Consultation",
      description: "Ample consultation time dedicated to listening to your symptoms, illness timeline, and personal medical history.",
      icon: "HeartPulse"
    },
    {
      title: "Respiratory Disease Management",
      description: "Structured protocols for managing acute flare-ups and chronic respiratory conditions like asthma and COPD.",
      icon: "Wind"
    },
    {
      title: "Evidence-Based Approach",
      description: "Diagnostics and clinical regimens governed strictly by validated international respiratory medicine guidelines.",
      icon: "ShieldCheck"
    },
    {
      title: "Comprehensive Chest Care",
      description: "Holistic evaluation of lung parenchyma, pleura, airway reactivity, and seasonal environmental allergy impacts.",
      icon: "Stethoscope"
    },
    {
      title: "Clear Explanation of Diagnosis & Treatment",
      description: "Transparent, jargon-free explanations of your diagnosis, medication purposes, and correct inhaler usage techniques.",
      icon: "FileCheck"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
            Specialist Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            About {doctor.name}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Pulmonologist & Chest Specialist in Bhopal, Madhya Pradesh
          </p>
        </div>

        {/* Doctor Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Doctor Clinical Portrait & Verification Badges */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
              <img
                src={doctor.photoUrl}
                alt={`${doctor.name} - Pulmonologist Bhopal`}
                className="w-full h-80 sm:h-96 object-cover object-top"
                loading="lazy"
              />
              <div className="p-5 bg-slate-50 border-t border-slate-200 text-left">
                <div className="font-bold text-slate-900 text-lg">{doctor.name}</div>
                <div className="text-sm font-semibold text-teal-700">{doctor.specialty} / Chest Specialist</div>
                <div className="text-xs text-slate-500 mt-0.5">{clinic.name} • {doctor.location}</div>
              </div>
            </div>

            {/* Verified Credentials Box */}
            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-left space-y-3">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span>Verified Clinical Credentials</span>
              </div>
              
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0">Qualifications:</span>
                  <span>{doctor.qualifications}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0">Specialty:</span>
                  <span>{doctor.specialty} & {doctor.subSpecialty}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0">Registration:</span>
                  <span>{doctor.registrationNumber} (Verified Medical Council)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0">Experience:</span>
                  <span>{doctor.experienceYears}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0">Languages:</span>
                  <span>{doctor.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio & Professional Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4 leading-relaxed text-base sm:text-lg">
              <p className="font-medium text-slate-900">
                "Dr. Vivek Arora is a Pulmonologist / Chest Specialist based in Bhopal, Madhya Pradesh, providing consultation and care for respiratory and chest-related conditions."
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                With a strong dedication to clinical excellence and compassionate patient care, Dr. Arora evaluates patients suffering from breathing difficulties, persistent coughs, asthma attacks, and chronic airway obstruction.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                His practice emphasizes careful physical examination, objective diagnostic testing such as spirometry when indicated, and empowering patients with clear knowledge about their lung health and preventive measures.
              </p>
            </div>

            {/* Quick Qualification Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-teal-600 mb-1">
                  <FileBadge className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900">MBBS & MD</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Pulmonary Medicine</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-teal-600 mb-1">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900">5.0 ★ Rated</div>
                <div className="text-[11px] text-slate-500 mt-0.5">169+ Google Reviews</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-teal-600 mb-1">
                  <Languages className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900">Consultation in</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Hindi & English</div>
              </div>
            </div>

            {/* In-clinic Booking CTA */}
            <div className="pt-3">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all text-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation with Dr. Vivek Arora</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Section: Why Patients Choose Dr. Vivek Arora */}
        <div className="mt-14 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Patients Choose Dr. Vivek Arora
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Principled healthcare founded on clinical accuracy, patient empathy, and transparent communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {whyChooseCards.map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-teal-200 hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-3">
                    <MedicalIcon name={card.icon} className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
