import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-900/50 bg-slate-800/50">
          <h2 className="text-3xl font-gaming text-white uppercase tracking-wider glow-text">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X size={32} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto text-slate-300">
          {children}
        </div>

        {/* Decorative corner - Changed Yellow to Red */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400" />
      </div>
    </div>
  );
};