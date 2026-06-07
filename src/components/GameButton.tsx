"use client";

import React from 'react';

interface GameButtonProps {
  label: string;
  subLabel?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  label, 
  subLabel, 
  onClick, 
  variant = 'secondary', 
  icon,
  className = '',
  disabled = false
}) => {
  
  const baseStyles = "relative group flex items-center justify-center transform transition-all duration-150 ease-out active:scale-95 clip-path-slant font-bold uppercase tracking-wider border-2";
  
  const variants = {
    // Changed primary to Red Theme (was yellow)
    primary: "bg-red-600 border-red-400 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)]", 
    secondary: "bg-blue-600/80 border-blue-400 text-white hover:bg-blue-500 hover:border-white shadow-[0_0_15px_rgba(37,99,235,0.3)] backdrop-blur-sm",
    danger: "bg-red-600/90 border-red-400 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]",
    ghost: "bg-slate-800/60 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-400 backdrop-blur-md"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
    >
      <div className="px-8 py-3 flex flex-col items-center">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xl md:text-2xl font-gaming drop-shadow-md">{label}</span>
        </div>
        {subLabel && (
          <span className="text-xs font-semibold opacity-80 mt-1 tracking-widest">{subLabel}</span>
        )}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50" />
    </button>
  );
};