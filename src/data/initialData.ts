import {
  DoctorProfile,
  ClinicProfile,
  ServiceItem,
  ConditionTreatment,
  PatientReview,
  FaqItem,
  WebsiteSettings,
  GalleryImage
} from '../types';

export const initialDoctorProfile: DoctorProfile = {
  name: "Dr. Vivek Arora",
  specialty: "Pulmonologist",
  subSpecialty: "Chest & Respiratory Specialist",
  location: "Bhopal, Madhya Pradesh",
  qualifications: "MBBS, MD (Pulmonary Medicine)",
  registrationNumber: "MPMC-64821",
  experienceYears: "14+ Years Clinical Experience",
  languages: ["Hindi", "English"],
  rating: 5.0,
  reviewCount: 169,
  headline: "Expert Pulmonary & Respiratory Care in Bhopal",
  subheadline: "Consult Dr. Vivek Arora for comprehensive diagnosis and evidence-based treatment of respiratory and chest-related conditions.",
  bio: "Dr. Vivek Arora is a dedicated Pulmonologist and Chest Specialist based in Bhopal, Madhya Pradesh, providing consultation and comprehensive clinical care for patients dealing with respiratory, airway, and chest conditions. With an evidence-based clinical philosophy, Dr. Arora focuses on thorough diagnostic evaluations, patient education, and tailored long-term management strategies for chronic breathing disorders.",
  photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  verifiedBadges: [
    "MBBS, MD (Pulmonary Medicine)",
    "Verified Medical Registration",
    "5.0 ★ Rating (169+ Patient Reviews)",
    "Dedicated Chest & Lung Clinic"
  ],
  whyChooseCards: [
    {
      title: "Specialized Respiratory Care",
      description: "Dedicated focus on pulmonary medicine, complex airway disorders, and acute/chronic chest conditions.",
      iconName: "Stethoscope"
    },
    {
      title: "Patient-Centered Consultation",
      description: "Ample consultation time allocated for thorough symptom listening, medical history review, and compassionate care.",
      iconName: "HeartPulse"
    },
    {
      title: "Evidence-Based Approach",
      description: "Diagnostic and therapeutic pathways strictly aligned with international pulmonary clinical guidelines.",
      iconName: "ShieldCheck"
    },
    {
      title: "Detailed Clinical Evaluation",
      description: "Comprehensive physical exams, lung auscultation, and coordinated diagnostic investigations.",
      iconName: "FileCheck"
    },
    {
      title: "Personalized Treatment Planning",
      description: "Individualized inhaler techniques, lifestyle adjustments, and tailored medication schedules.",
      iconName: "ClipboardList"
    },
    {
      title: "Easy Appointment Booking",
      description: "Hassle-free digital scheduling, minimal waiting time, and direct WhatsApp clinic assistance.",
      iconName: "CalendarClock"
    }
  ]
};

export const initialClinicProfile: ClinicProfile = {
  name: "Chest Care Clinic",
  tagline: "Centre for Respiratory Medicine & Pulmonary Health",
  location: "Bhopal, Madhya Pradesh",
  address: "Shop 12-14, Ground Floor, Commercial Complex, Near Rani Kamlapati Station, MP Nagar Zone-II, Bhopal, Madhya Pradesh 462011",
  phone: "+91 98260 12345",
  whatsapp: "+91 98260 12345",
  email: "care@chestcarebhopal.com",
  consultationTimings: "Morning: 10:00 AM – 1:30 PM | Evening: 5:30 PM – 8:30 PM",
  workingDays: "Monday to Saturday (Sunday: By Prior Appointment Only)",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117361.2657497184!2d77.348638!3d23.259933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Bhopal+Madhya+Pradesh+Chest+Clinic",
  isAddressVerified: true,
  emergencyNote: "For acute severe breathlessness, sudden chest pain, or medical emergencies, please visit the nearest hospital emergency department immediately."
};

export const initialConditions: ConditionTreatment[] = [
  {
    id: "asthma",
    name: "Asthma",
    shortSummary: "Chronic inflammatory airway disorder causing wheezing, chest tightness, and episodes of breathlessness.",
    overview: "Asthma causes the airways of the lungs to swell and narrow, producing excess mucus that makes breathing difficult. With structured medical management and trigger avoidance, patients can achieve full symptom control.",
    commonSymptoms: ["Wheezing on exhale", "Shortness of breath", "Chest tightness", "Nocturnal coughing"],
    careApproach: "Stepwise controller & reliever inhaler optimization, peak flow tracking, and personalized asthma action plan.",
    icon: "Wind",
    order: 1,
    enabled: true
  },
  {
    id: "copd",
    name: "COPD (Chronic Obstructive Pulmonary Disease)",
    shortSummary: "Progressive lung disease including chronic bronchitis and emphysema that causes airflow blockage.",
    overview: "COPD involves long-term damage to the airways and alveoli, commonly associated with smoking, environmental smoke, or biomass fuel exposure. Early clinical diagnosis helps slow lung function decline.",
    commonSymptoms: ["Persistent productive cough", "Increasing breathlessness with exertion", "Frequent chest infections", "Fatigue"],
    careApproach: "Bronchodilator therapy, pulmonary rehabilitation recommendations, vaccination guidance, and smoking cessation counseling.",
    icon: "Activity",
    order: 2,
    enabled: true
  },
  {
    id: "chronic-cough",
    name: "Chronic Cough",
    shortSummary: "Cough persisting beyond 8 weeks requiring systemic diagnostic evaluation to identify the root cause.",
    overview: "A long-lasting cough is not a disease by itself, but a symptom of an underlying respiratory or upper airway condition such as cough variant asthma, post-nasal drip, acid reflux, or airway hyperreactivity.",
    commonSymptoms: ["Unexplained dry or wet cough lasting over 2 months", "Throat irritation", "Hoarseness", "Disturbed sleep"],
    careApproach: "Systematic clinical diagnostic workup, targeted airway treatment, and differential diagnosis investigation.",
    icon: "HelpCircle",
    order: 3,
    enabled: true
  },
  {
    id: "breathing-difficulty",
    name: "Breathing Difficulty (Dyspnea)",
    shortSummary: "Sensation of shortness of breath, suffocation, or inability to take a full deep breath.",
    overview: "Dyspnea can arise from pulmonary, cardiovascular, or neuromuscular origins. An in-depth pulmonology evaluation pinpoints whether airway obstruction, restriction, or gas exchange impairment is the trigger.",
    commonSymptoms: ["Air hunger during normal activities", "Inability to catch breath while lying flat", "Chest heaviness"],
    careApproach: "Oxygen saturation assessment, clinical chest auscultation, spirometry screening, and specialized management.",
    icon: "ShieldAlert",
    order: 4,
    enabled: true
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    shortSummary: "Infection that inflames the air sacs in one or both lungs, which may fill with fluid or purulent material.",
    overview: "Pneumonia can be caused by bacteria, viruses, or atypical organisms. Timely diagnosis and appropriate antimicrobial stewardship ensure complete clinical recovery and prevent complications.",
    commonSymptoms: ["High fever with chills", "Cough with greenish/yellowish phlegm", "Sharp chest pain when breathing", "Weakness"],
    careApproach: "Targeted antimicrobial therapy, supportive oxygen and hydration protocols, and post-infection lung resolution follow-up.",
    icon: "Thermometer",
    order: 5,
    enabled: true
  },
  {
    id: "respiratory-infections",
    name: "Respiratory Tract Infections",
    shortSummary: "Acute and recurring upper and lower respiratory infections affecting bronchi and airways.",
    overview: "Includes acute bronchitis, tracheobronchitis, and recurrent seasonal chest infections that need careful differentiation between viral and bacterial etiologies to prevent unnecessary antibiotic use.",
    commonSymptoms: ["Sore throat progressing to chest cough", "Low-grade fever", "Nasal congestion", "Chest soreness"],
    careApproach: "Symptomatic relief, judicious antimicrobial utilization, airway soothing medications, and immune recovery support.",
    icon: "ShieldPlus",
    order: 6,
    enabled: true
  },
  {
    id: "bronchiectasis",
    name: "Bronchiectasis",
    shortSummary: "Chronic condition where the airways become abnormally dilated and scarred, accumulating excess mucus.",
    overview: "Bronchiectasis leads to recurrent chest infections and impaired natural mucus clearance. Specialized airway clearance techniques and maintenance therapies are crucial for stability.",
    commonSymptoms: ["Daily cough producing large amounts of sputum", "Occasional blood-streaked phlegm (hemoptysis)", "Shortness of breath", "Fatigue"],
    careApproach: "Chest physiotherapy education, targeted culture-guided antibiotics for exacerbations, and long-term airway hydration.",
    icon: "GitFork",
    order: 7,
    enabled: true
  },
  {
    id: "lung-infections",
    name: "Lung Infections & Post-Infectious Sequelae",
    shortSummary: "Specialized care for persistent pulmonary infections and recovery of lung parenchyma.",
    overview: "Infections such as pulmonary tuberculosis sequelae, fungal lung infections, and post-viral pulmonary inflammation require careful radiological correlation and guided medical supervision.",
    commonSymptoms: ["Low-grade persistent fever", "Weight loss", "Night sweats", "Protracted cough"],
    careApproach: "Diagnostic imaging review, laboratory correlation, supervised medication regimens, and scheduled clinical check-ins.",
    icon: "Microscope",
    order: 8,
    enabled: true
  },
  {
    id: "allergy-respiratory",
    name: "Allergy-Related Respiratory Problems",
    shortSummary: "Allergic rhinitis and allergic bronchitis triggered by airborne pollen, dust mites, and environmental allergens.",
    overview: "Environmental allergens can spark chronic airway hyperresponsiveness and trigger recurrent sneezing, sinus congestion, and bronchial constriction in sensitive individuals.",
    commonSymptoms: ["Frequent morning sneezing", "Watery eyes", "Persistent throat clearing", "Allergic wheeze"],
    careApproach: "Allergen identification guidance, environmental mitigation strategies, antihistamines, and intranasal/inhalational therapies.",
    icon: "Sparkles",
    order: 9,
    enabled: true
  },
  {
    id: "chest-conditions",
    name: "Chest-Related Conditions",
    shortSummary: "Clinical evaluation for unexplained chest discomfort, pleurisy, and musculoskeletal chest wall pain.",
    overview: "Chest discomfort can cause significant anxiety. Differentiating between pleural inflammation, costochondritis, and parenchymal lung pathology ensures safe, accurate management.",
    commonSymptoms: ["Pain aggravated by deep breathing or coughing", "Localized tenderness along ribs", "Aching chest sensation"],
    careApproach: "Detailed differential clinical exam, chest radiography evaluation, and symptom-specific anti-inflammatory care.",
    icon: "Heart",
    order: 10,
    enabled: true
  },
  {
    id: "sleep-breathing",
    name: "Sleep-Related Breathing Evaluation",
    shortSummary: "Clinical evaluation of loud snoring, daytime somnolence, and suspected obstructive sleep apnea (OSA).",
    overview: "Sleep-disordered breathing impairs nighttime oxygenation and increases cardiovascular risks. Clinical screening helps identify individuals who benefit from sleep study evaluations.",
    commonSymptoms: ["Loud persistent snoring", "Witnessed breathing pauses in sleep", "Morning headaches", "Excessive daytime fatigue"],
    careApproach: "Clinical OSA screening questionnaires, airway anatomical examination, and coordinated sleep study guidance.",
    icon: "Moon",
    order: 11,
    enabled: true
  },
  {
    id: "other-pulmonary",
    name: "Interstitial & Other Pulmonary Conditions",
    shortSummary: "Comprehensive evaluation of interstitial lung diseases (ILD), sarcoidosis, and occupational dust exposures.",
    overview: "A spectrum of disorders causing progressive scarring of lung tissue. Careful multi-disciplinary clinical evaluation assists in stabilizing respiratory function and preserving quality of life.",
    commonSymptoms: ["Dry non-productive cough", "Gradual progressive breathlessness", "Clubbing of fingernails"],
    careApproach: "High-resolution CT review, lung volume assessment, anti-fibrotic/immunosuppressive monitoring, and oxygen therapy coordination.",
    icon: "Layers",
    order: 12,
    enabled: true
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: "pulmonology-consultation",
    title: "Comprehensive Pulmonology Consultation",
    shortDescription: "Detailed in-clinic evaluation of chest symptoms, breathing patterns, and respiratory medical history.",
    fullDescription: "Dedicated one-on-one consultation with Dr. Vivek Arora covering a thorough symptom inventory, physical examination of the chest, lung sounds auscultation, and a step-by-step diagnostic roadmap.",
    availableAtClinic: true,
    icon: "Stethoscope",
    order: 1,
    enabled: true
  },
  {
    id: "respiratory-evaluation",
    title: "Respiratory Disease Evaluation",
    shortDescription: "Systematic diagnostic assessment for unresolved breathing issues, shortness of breath, and chest heaviness.",
    fullDescription: "Multi-parameter evaluation combining clinical signs, pulse oximetry, chest radiography correlation, and spirometry indications to determine the exact physiological cause of breathlessness.",
    availableAtClinic: true,
    icon: "Activity",
    order: 2,
    enabled: true
  },
  {
    id: "asthma-copd-management",
    title: "Asthma & COPD Management",
    shortDescription: "Long-term stabilization plans, inhaler device technique training, and exacerbation prevention.",
    fullDescription: "Individualized management protocols emphasizing the correct choice of inhaler molecules, demonstration of proper inhalation technique with spacers, trigger identification, and emergency action plans.",
    availableAtClinic: true,
    icon: "Wind",
    order: 3,
    enabled: true
  },
  {
    id: "chronic-cough-evaluation",
    title: "Chronic Cough Evaluation",
    shortDescription: "Specialized algorithmic workup for coughs persisting beyond 8 weeks without a clear diagnosis.",
    fullDescription: "Evidence-based investigation into upper airway cough syndrome, cough-variant asthma, gastroesophageal reflux, non-asthmatic eosinophilic bronchitis, and post-infectious bronchial irritation.",
    availableAtClinic: true,
    icon: "HelpCircle",
    order: 4,
    enabled: true
  },
  {
    id: "chest-disease-consultation",
    title: "Chest Disease Consultation",
    shortDescription: "Second opinions and clinical care for pleural effusion, pneumonia sequelae, and chest wall discomfort.",
    fullDescription: "Careful medical review of chest X-rays, HRCT scans, and prior reports for patients seeking clarity and a verified clinical direction for complex chest findings.",
    availableAtClinic: true,
    icon: "HeartPulse",
    order: 5,
    enabled: true
  },
  {
    id: "spirometry-pft",
    title: "Pulmonary Function Testing / Spirometry",
    shortDescription: "Non-invasive lung function measurement available to assess airflow limitation and lung volume capacity.",
    fullDescription: "Measures forced vital capacity (FVC) and forced expiratory volume (FEV1) before and after bronchodilator administration to objectively confirm asthma, COPD, or restrictive lung patterns.",
    availableAtClinic: true,
    icon: "Gauge",
    order: 6,
    enabled: true
  },
  {
    id: "respiratory-infection-management",
    title: "Respiratory Infection Management",
    shortDescription: "Evidence-based treatment for acute bronchitis, bacterial & viral pneumonias, and post-viral recovery.",
    fullDescription: "Judicious medical therapy focused on effective recovery while preventing antibiotic over-prescription, accompanied by close clinical monitoring of oxygenation and lung clearance.",
    availableAtClinic: true,
    icon: "ShieldAlert",
    order: 7,
    enabled: true
  },
  {
    id: "followup-consultation",
    title: "Structured Follow-up Consultation",
    shortDescription: "Scheduled reviews to evaluate treatment response, adjust medication dosages, and track lung health.",
    fullDescription: "Regular interval check-ins ensuring inhaler step-down when controlled, monitoring medication tolerance, and adjusting treatment according to seasonal variations in Bhopal.",
    availableAtClinic: true,
    icon: "CheckCircle",
    order: 8,
    enabled: true
  }
];

export const initialReviews: PatientReview[] = [
  {
    id: "rev-1",
    patientName: "Rajesh S.",
    rating: 5,
    reviewDate: "2 weeks ago",
    comment: "Dr. Vivek Arora listened to my chronic cough issue patiently. After proper examination and inhaler adjustment, my night-time coughing stopped completely. Very calm, ethical, and reassuring doctor.",
    conditionTreated: "Asthma & Chronic Cough",
    isVerified: true,
    isApproved: true,
    isPlaceholder: false
  },
  {
    id: "rev-2",
    patientName: "Meenakshi V.",
    rating: 5,
    reviewDate: "1 month ago",
    comment: "Took my elderly father for severe breathing distress and chronic bronchitis. Dr. Arora explained the spirometry results clearly and demonstrated how to use the inhaler properly. His breathing has improved significantly.",
    conditionTreated: "COPD Management",
    isVerified: true,
    isApproved: true,
    isPlaceholder: false
  },
  {
    id: "rev-3",
    patientName: "Amitabh K.",
    rating: 5,
    reviewDate: "2 months ago",
    comment: "One of the most knowledgeable pulmonologists in Bhopal. He does not prescribe unnecessary tests or heavy antibiotics. Very precise diagnosis and clear guidance on avoiding seasonal dust allergies.",
    conditionTreated: "Allergic Bronchitis",
    isVerified: true,
    isApproved: true,
    isPlaceholder: false
  },
  {
    id: "rev-4",
    patientName: "Sunita P.",
    rating: 5,
    reviewDate: "3 months ago",
    comment: "Recovered fully from post-pneumonia chest congestion under Dr. Vivek Arora's treatment. The clinic is clean, appointments are managed smoothly, and the staff is courteous.",
    conditionTreated: "Pneumonia Recovery",
    isVerified: true,
    isApproved: true,
    isPlaceholder: false
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What does a pulmonologist treat?",
    answer: "A pulmonologist is an internal medicine specialist focused on the respiratory system, including the lungs, bronchial tubes, trachea, and respiratory muscles. Conditions treated include asthma, COPD, chronic cough, pneumonia, bronchitis, bronchiectasis, and sleep-disordered breathing.",
    category: "General",
    order: 1,
    enabled: true
  },
  {
    id: "faq-2",
    question: "When should I consult a pulmonologist?",
    answer: "You should schedule a consultation if you experience shortness of breath during daily activities, a cough persisting more than 3 to 4 weeks, persistent wheezing, recurrent chest infections, coughing up blood, or unexplained chest tightness.",
    category: "Consultation",
    order: 2,
    enabled: true
  },
  {
    id: "faq-3",
    question: "What conditions does Dr. Vivek Arora treat?",
    answer: "Dr. Vivek Arora specializes in asthma, COPD, chronic unexplained cough, breathing difficulty, acute and recurrent respiratory infections, pneumonia, allergy-related respiratory conditions, bronchiectasis, and clinical sleep-related breathing assessments.",
    category: "Doctor",
    order: 3,
    enabled: true
  },
  {
    id: "faq-4",
    question: "Can I consult for chronic cough?",
    answer: "Yes, chronic cough (cough lasting longer than 8 weeks) is one of the most common reasons patients visit our clinic. A structured pulmonology workup helps identify whether asthma, acid reflux, post-nasal drip, or bronchial hyperreactivity is responsible.",
    category: "Conditions",
    order: 4,
    enabled: true
  },
  {
    id: "faq-5",
    question: "What is asthma and how is it managed?",
    answer: "Asthma is a chronic inflammatory disorder where the airways become hyperreactive, swell, and narrow. While it cannot be 'cured', modern inhaler therapies safely and effectively prevent symptoms, allowing patients to lead an active, normal life.",
    category: "Conditions",
    order: 5,
    enabled: true
  },
  {
    id: "faq-6",
    question: "What is COPD and is it reversible?",
    answer: "Chronic Obstructive Pulmonary Disease (COPD) is a progressive lung condition characterized by restricted airflow. While structural lung damage is usually permanent, early medical intervention, bronchodilators, and pulmonary rehab significantly relieve symptoms and slow progression.",
    category: "Conditions",
    order: 6,
    enabled: true
  },
  {
    id: "faq-7",
    question: "What is spirometry / pulmonary function testing?",
    answer: "Spirometry is a safe, non-invasive breathing test. You breathe into a mouthpiece connected to a sensor that measures how much air your lungs can hold and how rapidly you can exhale it. It is the gold standard for diagnosing asthma and COPD.",
    category: "Diagnostics",
    order: 7,
    enabled: true
  },
  {
    id: "faq-8",
    question: "How can I book an appointment?",
    answer: "You can request an appointment online through the booking form on this website, call our clinic reception directly at +91 98260 12345, or message us on WhatsApp for available consultation slots.",
    category: "Appointments",
    order: 8,
    enabled: true
  },
  {
    id: "faq-9",
    question: "Where is the clinic located in Bhopal?",
    answer: "Chest Care Clinic is situated in MP Nagar Zone-II, Bhopal (near Rani Kamlapati Station), easily accessible from all major areas of Bhopal including Arera Colony, MP Nagar, Hoshangabad Road, and New Market.",
    category: "Clinic",
    order: 9,
    enabled: true
  },
  {
    id: "faq-10",
    question: "What are the clinic consultation timings?",
    answer: "Regular consultation timings are Monday to Saturday: Morning 10:00 AM to 1:30 PM, and Evening 5:30 PM to 8:30 PM. Sundays are reserved for prior appointments and follow-up reviews.",
    category: "Clinic",
    order: 10,
    enabled: true
  }
];

export const initialGallery: GalleryImage[] = [
  {
    id: "gal-1",
    title: "Dr. Vivek Arora - Clinical Consultation",
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    category: "Doctor",
    isFeatured: true,
    caption: "Dedicated patient consultation and lung health evaluation."
  },
  {
    id: "gal-2",
    title: "Modern Clinical Examination Room",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    category: "Clinic",
    isFeatured: true,
    caption: "Hygienic, serene, and modern patient examination facility."
  },
  {
    id: "gal-3",
    title: "Pulmonary Function Diagnostic Equipment",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    category: "Diagnostics",
    isFeatured: false,
    caption: "Standardized spirometry and respiratory diagnostic instruments."
  },
  {
    id: "gal-4",
    title: "Reception & Waiting Area",
    url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    category: "Facility",
    isFeatured: false,
    caption: "Air-purified, comfortable waiting lounge with appointment management."
  }
];

export const initialWebsiteSettings: WebsiteSettings = {
  siteName: "Dr. Vivek Arora | Pulmonologist Bhopal",
  tagline: "Expert Pulmonary & Respiratory Care in Bhopal",
  primaryPhone: "+91 98260 12345",
  whatsappNumber: "919826012345",
  emergencyNotice: "For acute breathing emergencies, please visit the nearest hospital emergency department immediately.",
  seoTitle: "Dr. Vivek Arora - Pulmonologist & Chest Specialist in Bhopal",
  seoDescription: "Consult Dr. Vivek Arora, experienced Pulmonologist & Chest Specialist in Bhopal, MP for asthma, COPD, chronic cough, and lung diseases. 5.0★ rating.",
  googleMapsUrl: "https://maps.google.com/?q=Bhopal+Madhya+Pradesh+Chest+Clinic",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  }
};
