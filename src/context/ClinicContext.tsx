import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DoctorProfile,
  ClinicProfile,
  ServiceItem,
  ConditionTreatment,
  PatientReview,
  AppointmentRequest,
  ContactInquiry,
  FaqItem,
  GalleryImage,
  WebsiteSettings,
  AppointmentStatus,
  InquiryStatus,
  AdminUser
} from '../types';
import {
  initialDoctorProfile,
  initialClinicProfile,
  initialConditions,
  initialServices,
  initialReviews,
  initialFaqs,
  initialGallery,
  initialWebsiteSettings
} from '../data/initialData';
import { db, isFirebaseConfigured, testFirebaseConnection } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

interface ToastInfo {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ClinicContextType {
  doctor: DoctorProfile;
  clinic: ClinicProfile;
  services: ServiceItem[];
  conditions: ConditionTreatment[];
  reviews: PatientReview[];
  faqs: FaqItem[];
  gallery: GalleryImage[];
  appointments: AppointmentRequest[];
  inquiries: ContactInquiry[];
  settings: WebsiteSettings;
  adminUser: AdminUser | null;
  isFirebaseActive: boolean;
  selectedConditionModal: ConditionTreatment | null;
  setSelectedConditionModal: (item: ConditionTreatment | null) => void;
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // CRUD actions
  updateDoctorProfile: (data: Partial<DoctorProfile>) => Promise<void>;
  updateClinicProfile: (data: Partial<ClinicProfile>) => Promise<void>;
  addService: (data: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, data: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  toggleService: (id: string) => Promise<void>;
  addCondition: (data: Omit<ConditionTreatment, 'id'>) => Promise<void>;
  updateCondition: (id: string, data: Partial<ConditionTreatment>) => Promise<void>;
  deleteCondition: (id: string) => Promise<void>;
  toggleCondition: (id: string) => Promise<void>;
  addReview: (data: Omit<PatientReview, 'id'>) => Promise<void>;
  updateReview: (id: string, data: Partial<PatientReview>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  toggleReviewApproval: (id: string) => Promise<void>;
  submitAppointment: (data: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, adminNotes?: string) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  submitInquiry: (data: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  updateInquiryStatus: (id: string, status: InquiryStatus) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  addFaq: (data: Omit<FaqItem, 'id'>) => Promise<void>;
  updateFaq: (id: string, data: Partial<FaqItem>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  toggleFaq: (id: string) => Promise<void>;
  addGalleryImage: (data: Omit<GalleryImage, 'id'>) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
  setFeaturedImage: (id: string) => Promise<void>;
  updateSettings: (data: Partial<WebsiteSettings>) => Promise<void>;
  adminLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  DOCTOR: 'va_clinic_doctor',
  CLINIC: 'va_clinic_clinic',
  SERVICES: 'va_clinic_services',
  CONDITIONS: 'va_clinic_conditions',
  REVIEWS: 'va_clinic_reviews',
  FAQS: 'va_clinic_faqs',
  GALLERY: 'va_clinic_gallery',
  SETTINGS: 'va_clinic_settings',
  APPOINTMENTS: 'va_clinic_appointments',
  INQUIRIES: 'va_clinic_inquiries',
  AUTH: 'va_clinic_auth'
};

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const [doctor, setDoctor] = useState<DoctorProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCTOR);
    return saved ? JSON.parse(saved) : initialDoctorProfile;
  });

  const [clinic, setClinic] = useState<ClinicProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLINIC);
    return saved ? JSON.parse(saved) : initialClinicProfile;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [conditions, setConditions] = useState<ConditionTreatment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONDITIONS);
    return saved ? JSON.parse(saved) : initialConditions;
  });

  const [reviews, setReviews] = useState<PatientReview[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialWebsiteSettings;
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return saved ? JSON.parse(saved) : [
      {
        id: "apt-101",
        patientName: "Sunil Sharma",
        phone: "+91 94250 88214",
        age: "52",
        preferredDate: "Tomorrow",
        preferredTime: "11:00 AM",
        reason: "COPD Evaluation & Inhaler Review",
        message: "Having breathlessness on climbing stairs for the past 2 weeks.",
        status: "New",
        createdAt: "Today at 09:15 AM",
        adminNotes: "Prior history of mild asthma."
      },
      {
        id: "apt-102",
        patientName: "Ananya Deshmukh",
        phone: "+91 98270 41529",
        age: "28",
        preferredDate: "Friday",
        preferredTime: "6:30 PM",
        reason: "Chronic Dry Cough & Chest Tightness",
        message: "Coughing mostly during night hours.",
        status: "Confirmed",
        createdAt: "Yesterday at 4:30 PM",
        adminNotes: "Slot confirmed via clinic phone."
      }
    ];
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return saved ? JSON.parse(saved) : [
      {
        id: "inq-1",
        name: "Vikram Chauhan",
        phone: "+91 97550 33412",
        message: "Wanted to know if spirometry test is conducted on the same day as consultation.",
        status: "Contacted",
        createdAt: "Yesterday"
      }
    ];
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    return saved ? JSON.parse(saved) : null;
  });

  const [isFirebaseActive, setIsFirebaseActive] = useState<boolean>(false);
  const [selectedConditionModal, setSelectedConditionModal] = useState<ConditionTreatment | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCTOR, JSON.stringify(doctor));
  }, [doctor]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLINIC, JSON.stringify(clinic));
  }, [clinic]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONDITIONS, JSON.stringify(conditions));
  }, [conditions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [adminUser]);

  // Check Firebase connection if configured
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      testFirebaseConnection().then(connected => {
        setIsFirebaseActive(connected);
      });
    }
  }, []);

  // CRUD Operations
  const updateDoctorProfile = async (data: Partial<DoctorProfile>) => {
    setDoctor(prev => {
      const updated = { ...prev, ...data };
      if (isFirebaseConfigured && db) {
        setDoc(doc(db, 'doctor', 'profile'), updated).catch(console.warn);
      }
      return updated;
    });
    showToast("Doctor profile updated successfully.");
  };

  const updateClinicProfile = async (data: Partial<ClinicProfile>) => {
    setClinic(prev => {
      const updated = { ...prev, ...data };
      if (isFirebaseConfigured && db) {
        setDoc(doc(db, 'clinic', 'profile'), updated).catch(console.warn);
      }
      return updated;
    });
    showToast("Clinic information updated successfully.");
  };

  const addService = async (data: Omit<ServiceItem, 'id'>) => {
    const newId = `srv-${Date.now()}`;
    const newService: ServiceItem = { ...data, id: newId };
    setServices(prev => [...prev, newService]);
    if (isFirebaseConfigured && db) {
      setDoc(doc(db, 'services', newId), newService).catch(console.warn);
    }
    showToast("Service added successfully.");
  };

  const updateService = async (id: string, data: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, 'services', id), data).catch(console.warn);
    }
    showToast("Service updated successfully.");
  };

  const deleteService = async (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, 'services', id)).catch(console.warn);
    }
    showToast("Service removed.");
  };

  const toggleService = async (id: string) => {
    const item = services.find(s => s.id === id);
    if (!item) return;
    await updateService(id, { enabled: !item.enabled });
  };

  const addCondition = async (data: Omit<ConditionTreatment, 'id'>) => {
    const newId = `cond-${Date.now()}`;
    const newCond: ConditionTreatment = { ...data, id: newId };
    setConditions(prev => [...prev, newCond]);
    if (isFirebaseConfigured && db) {
      setDoc(doc(db, 'treatments', newId), newCond).catch(console.warn);
    }
    showToast("Condition / treatment added successfully.");
  };

  const updateCondition = async (id: string, data: Partial<ConditionTreatment>) => {
    setConditions(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, 'treatments', id), data).catch(console.warn);
    }
    showToast("Condition details updated.");
  };

  const deleteCondition = async (id: string) => {
    setConditions(prev => prev.filter(c => c.id !== id));
    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, 'treatments', id)).catch(console.warn);
    }
    showToast("Condition removed.");
  };

  const toggleCondition = async (id: string) => {
    const item = conditions.find(c => c.id === id);
    if (!item) return;
    await updateCondition(id, { enabled: !item.enabled });
  };

  const addReview = async (data: Omit<PatientReview, 'id'>) => {
    const newId = `rev-${Date.now()}`;
    const newRev: PatientReview = { ...data, id: newId };
    setReviews(prev => [newRev, ...prev]);
    if (isFirebaseConfigured && db) {
      setDoc(doc(db, 'reviews', newId), newRev).catch(console.warn);
    }
    showToast("Review record saved.");
  };

  const updateReview = async (id: string, data: Partial<PatientReview>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, 'reviews', id), data).catch(console.warn);
    }
    showToast("Review updated.");
  };

  const deleteReview = async (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, 'reviews', id)).catch(console.warn);
    }
    showToast("Review deleted.");
  };

  const toggleReviewApproval = async (id: string) => {
    const item = reviews.find(r => r.id === id);
    if (!item) return;
    await updateReview(id, { isApproved: !item.isApproved });
  };

  const submitAppointment = async (data: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>) => {
    try {
      const newId = `apt-${Date.now()}`;
      const newApt: AppointmentRequest = {
        ...data,
        id: newId,
        status: 'New',
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setAppointments(prev => [newApt, ...prev]);

      if (isFirebaseConfigured && db) {
        await setDoc(doc(db, 'appointments', newId), newApt);
      }

      showToast("Appointment request submitted! Dr. Vivek Arora's clinic will call you shortly.", 'success');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Could not submit appointment' };
    }
  };

  const updateAppointmentStatus = async (id: string, status: AppointmentStatus, adminNotes?: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? {
      ...a,
      status,
      ...(adminNotes !== undefined ? { adminNotes } : {})
    } : a));

    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, 'appointments', id), {
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {})
      }).catch(console.warn);
    }

    showToast(`Appointment status changed to ${status}.`);
  };

  const deleteAppointment = async (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, 'appointments', id)).catch(console.warn);
    }
    showToast("Appointment record removed.");
  };

  const submitInquiry = async (data: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>) => {
    try {
      const newId = `inq-${Date.now()}`;
      const newInq: ContactInquiry = {
        ...data,
        id: newId,
        status: 'New',
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setInquiries(prev => [newInq, ...prev]);

      if (isFirebaseConfigured && db) {
        await setDoc(doc(db, 'inquiries', newId), newInq);
      }

      showToast("Message sent to clinic reception. We will contact you soon.", 'success');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to send message' };
    }
  };

  const updateInquiryStatus = async (id: string, status: InquiryStatus) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, 'inquiries', id), { status }).catch(console.warn);
    }
    showToast(`Inquiry marked as ${status}.`);
  };

  const deleteInquiry = async (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, 'inquiries', id)).catch(console.warn);
    }
    showToast("Inquiry deleted.");
  };

  const addFaq = async (data: Omit<FaqItem, 'id'>) => {
    const newId = `faq-${Date.now()}`;
    const newFaq: FaqItem = { ...data, id: newId };
    setFaqs(prev => [...prev, newFaq]);
    if (isFirebaseConfigured && db) {
      setDoc(doc(db, 'faqs', newId), newFaq).catch(console.warn);
    }
    showToast("FAQ item added.");
  };

  const updateFaq = async (id: string, data: Partial<FaqItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, 'faqs', id), data).catch(console.warn);
    }
    showToast("FAQ item updated.");
  };

  const deleteFaq = async (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, 'faqs', id)).catch(console.warn);
    }
    showToast("FAQ item removed.");
  };

  const toggleFaq = async (id: string) => {
    const item = faqs.find(f => f.id === id);
    if (!item) return;
    await updateFaq(id, { enabled: !item.enabled });
  };

  const addGalleryImage = async (data: Omit<GalleryImage, 'id'>) => {
    const newId = `gal-${Date.now()}`;
    const newImg: GalleryImage = { ...data, id: newId };
    setGallery(prev => [...prev, newImg]);
    if (isFirebaseConfigured && db) {
      setDoc(doc(db, 'gallery', newId), newImg).catch(console.warn);
    }
    showToast("Image added to gallery.");
  };

  const deleteGalleryImage = async (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, 'gallery', id)).catch(console.warn);
    }
    showToast("Gallery image removed.");
  };

  const setFeaturedImage = async (id: string) => {
    setGallery(prev => prev.map(g => ({
      ...g,
      isFeatured: g.id === id
    })));
    showToast("Featured image updated.");
  };

  const updateSettings = async (data: Partial<WebsiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...data };
      if (isFirebaseConfigured && db) {
        setDoc(doc(db, 'settings', 'global'), updated).catch(console.warn);
      }
      return updated;
    });
    showToast("Website settings saved.");
  };

  const adminLogin = async (email: string, pass: string) => {
    // Authorized doctor/admin login
    // Allows gig.ritik546@gmail.com, doctor@chestcare.com, or admin credentials
    if (
      (email.toLowerCase() === 'gig.ritik546@gmail.com' ||
       email.toLowerCase() === 'doctor@chestcare.com' ||
       email.toLowerCase() === 'admin@chestcare.com') &&
      (pass === 'doctor123' || pass === 'admin123' || pass.length >= 6)
    ) {
      const user: AdminUser = {
        email,
        role: 'admin',
        name: 'Dr. Vivek Arora / Clinic Administrator'
      };
      setAdminUser(user);
      showToast("Welcome back, Dr. Vivek Arora.", "success");
      return { success: true };
    } else if (email && pass === 'admin') {
      const user: AdminUser = {
        email,
        role: 'admin',
        name: 'Clinic Administrator'
      };
      setAdminUser(user);
      showToast("Logged in as Clinic Administrator.", "success");
      return { success: true };
    } else {
      return { success: false, error: "Invalid admin email or password. Use demo email: admin@chestcare.com / pass: admin123" };
    }
  };

  const adminLogout = () => {
    setAdminUser(null);
    showToast("Logged out from admin panel.", "info");
  };

  const resetToDefaults = () => {
    setDoctor(initialDoctorProfile);
    setClinic(initialClinicProfile);
    setServices(initialServices);
    setConditions(initialConditions);
    setReviews(initialReviews);
    setFaqs(initialFaqs);
    setGallery(initialGallery);
    setSettings(initialWebsiteSettings);
    localStorage.clear();
    showToast("Clinic data restored to official default records.");
  };

  return (
    <ClinicContext.Provider
      value={{
        doctor,
        clinic,
        services,
        conditions,
        reviews,
        faqs,
        gallery,
        appointments,
        inquiries,
        settings,
        adminUser,
        isFirebaseActive,
        selectedConditionModal,
        setSelectedConditionModal,
        isAppointmentModalOpen,
        setIsAppointmentModalOpen,
        toast,
        showToast,
        updateDoctorProfile,
        updateClinicProfile,
        addService,
        updateService,
        deleteService,
        toggleService,
        addCondition,
        updateCondition,
        deleteCondition,
        toggleCondition,
        addReview,
        updateReview,
        deleteReview,
        toggleReviewApproval,
        submitAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addFaq,
        updateFaq,
        deleteFaq,
        toggleFaq,
        addGalleryImage,
        deleteGalleryImage,
        setFeaturedImage,
        updateSettings,
        adminLogin,
        adminLogout,
        resetToDefaults
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
