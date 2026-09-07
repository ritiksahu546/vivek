import React from 'react';
import {
  Stethoscope,
  HeartPulse,
  Wind,
  Activity,
  ShieldCheck,
  ShieldAlert,
  ShieldPlus,
  HelpCircle,
  Thermometer,
  GitFork,
  Microscope,
  Sparkles,
  Heart,
  Moon,
  Layers,
  Gauge,
  CheckCircle,
  Clock,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  Award,
  FileCheck,
  ClipboardList,
  CalendarClock,
  AlertCircle
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const MedicalIcon: React.FC<IconProps> = ({ name, className = "w-6 h-6" }) => {
  switch (name.toLowerCase()) {
    case 'stethoscope':
      return <Stethoscope className={className} />;
    case 'heartpulse':
      return <HeartPulse className={className} />;
    case 'wind':
      return <Wind className={className} />;
    case 'activity':
      return <Activity className={className} />;
    case 'shieldcheck':
      return <ShieldCheck className={className} />;
    case 'shieldalert':
      return <ShieldAlert className={className} />;
    case 'shieldplus':
      return <ShieldPlus className={className} />;
    case 'helpcircle':
      return <HelpCircle className={className} />;
    case 'thermometer':
      return <Thermometer className={className} />;
    case 'gitfork':
      return <GitFork className={className} />;
    case 'microscope':
      return <Microscope className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'moon':
      return <Moon className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'gauge':
      return <Gauge className={className} />;
    case 'checkcircle':
      return <CheckCircle className={className} />;
    case 'clock':
      return <Clock className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    case 'phone':
      return <Phone className={className} />;
    case 'messagecircle':
      return <MessageCircle className={className} />;
    case 'mappin':
      return <MapPin className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'filecheck':
      return <FileCheck className={className} />;
    case 'clipboardlist':
      return <ClipboardList className={className} />;
    case 'calendarclock':
      return <CalendarClock className={className} />;
    default:
      return <Activity className={className} />;
  }
};
