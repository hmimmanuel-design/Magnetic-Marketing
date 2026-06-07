"use client";

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc-key sluit modal + lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border-2 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-900/50 bg-slate-800/50">
          <h2 id="modal-title" className="text-2xl md:text-3xl font-gaming text-white uppercase tracking-wider glow-text">
            {title}
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Sluit venster"
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white min-w-11 min-h-11 flex items-center justify-center"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto text-slate-300">
          {children}
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 pointer-events-none" />
      </div>
    </div>
  );
};
