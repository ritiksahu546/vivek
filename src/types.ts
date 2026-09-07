export interface DoctorProfile {
  name: string;
  specialty: string;
  subSpecialty: string;
  location: string;
  qualifications: string;
  registrationNumber: string;
  experienceYears: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  headline: string;
  subheadline: string;
  bio: string;
  photoUrl: string;
  verifiedBadges: string[];
  whyChooseCards: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export interface ClinicProfile {
  name: string;
  tagline: string;
  location: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  consultationTimings: string;
  workingDays: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  isAddressVerified: boolean;
  emergencyNote: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  availableAtClinic: boolean;
  icon: string;
  order: number;
  enabled: boolean;
}

export interface ConditionTreatment {
  id: string;
  name: string;
  shortSummary: string;
  overview: string;
  commonSymptoms: string[];
  careApproach: string;
  icon: string;
  order: number;
  enabled: boolean;
}

export type RespiratoryCondition = ConditionTreatment;

export interface PatientReview {
  id: string;
  patientName: string;
  rating: number;
  reviewDate: string;
  comment: string;
  conditionTreated: string;
  isVerified: boolean;
  isApproved: boolean;
  isPlaceholder: boolean;
}

export type AppointmentStatus = 'New' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface AppointmentRequest {
  id: string;
  patientName: string;
  phone: string;
  age: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
  adminNotes?: string;
}

export type AppointmentRecord = AppointmentRequest;

export type InquiryStatus = 'New' | 'Contacted' | 'Resolved';

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  enabled: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: 'Doctor' | 'Clinic' | 'Facility' | 'Diagnostics';
  isFeatured: boolean;
  caption?: string;
}

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  primaryPhone: string;
  whatsappNumber: string;
  emergencyNotice: string;
  seoTitle: string;
  seoDescription: string;
  googleMapsUrl: string;
  analyticsId?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface AdminUser {
  email: string;
  role: 'admin';
  name: string;
}
