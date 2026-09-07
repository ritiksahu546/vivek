import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useClinic();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-teal-900/90 border-teal-500 text-teal-50',
    error: 'bg-rose-900/90 border-rose-500 text-rose-50',
    info: 'bg-sky-900/90 border-sky-500 text-sky-50'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md animate-fade-in">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-xl backdrop-blur-md ${bgColors[toast.type]}`}>
        {icons[toast.type]}
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
