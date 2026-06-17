import React from 'react';
import { CharacterConfig } from '../types';
import { Crown, MessageCircle, X, Info } from 'lucide-react';

interface LobbyCharacterProps {
  config: CharacterConfig;
  isLeader?: boolean;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onInfoClick?: () => void;
}

export const LobbyCharacter: React.FC<LobbyCharacterProps> = ({ config, isLeader, isOpen, onToggle, onInfoClick }) => {
  // Use custom image if available, otherwise generate Dicebear URL
  const avatarUrl = config.imageUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${config.avatarSeed}&hairColor=${config.hairColor}&clothingColor=${config.outfitColor}`;

  return (
    <>
      {/* Reduced height to 85vh and width to 30rem to make them smaller again */}
      <div className="group relative flex flex-col items-center justify-end h-[75vh] md:h-[85vh] w-80 md:w-[30rem] transition-transform duration-300 md:hover:scale-105 cursor-pointer z-10">
        
        {/* Mobile Speech Toggle Button - Visible only on mobile 
            - Red accents
            - Slightly larger than before
        */}
        {config.speechText && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(true);
            }}
            className={`md:hidden absolute top-[22%] right-8 z-50 bg-white text-red-600 p-2 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.2)] border-2 border-red-100 transition-all duration-300 active:scale-95 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            aria-label="Open speech"
          >
            <MessageCircle size={20} strokeWidth={2.5} />
          </button>
        )}

        {/* Floating UI above head (Nameplate & Desktop Speech Bubble) */}
        <div className="absolute -top-24 w-full flex flex-col items-center pointer-events-none">
          
          <div className="relative w-full h-40 flex justify-center items-end pb-4">
              
              {/* STATE 1: NAMEPLATE (Default - Hides on Desktop Hover) */}
              <div className="absolute bottom-4 flex flex-col items-center transition-all duration-300 pointer-events-auto opacity-100 md:group-hover:opacity-0 md:group-hover:translate-y-4">
                  {/* Level Badge */}
                  <div className="bg-red-600 text-white font-bold text-xs px-2 py-0.5 rounded-sm mb-1 shadow-lg transform -skew-x-12 border border-white">
                      LVL 99
                  </div>

                  {/* Name Tag */}
                  <div className="bg-slate-900/90 backdrop-blur-md border-2 border-white/30 px-6 py-2 transform skew-x-[-10deg] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      <div className="transform skew-x-[10deg] text-center">
                        <div className="flex items-center gap-2 justify-center">
                            {isLeader && <Crown size={14} className="text-red-500" fill="currentColor" />}
                            <h2 className="text-xl md:text-2xl font-gaming text-white uppercase tracking-wider whitespace-nowrap">
                            {config.name}
                            </h2>
                        </div>
                        <p className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">{config.role}</p>
                      </div>
                  </div>
              </div>

              {/* STATE 2: SPEECH BUBBLE (Desktop Hover Only) */}
              {config.speechText && (
                  <div className="hidden md:block absolute bottom-0 w-[140%] bg-white text-slate-900 p-4 rounded-xl border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 z-50 pointer-events-auto opacity-0 scale-90 translate-y-4 md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:translate-y-0">
                      <p className="text-sm font-semibold leading-relaxed relative z-10 text-center mb-3">
                          {config.speechText}
                      </p>
                      {onInfoClick && (
                          <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                onInfoClick(); 
                            }}
                            className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-lg border border-blue-400/50 flex items-center justify-center mx-auto gap-1 transition-colors uppercase font-bold"
                          >
                            <Info size={12} />
                            Meer informatie voor {config.name.split(' ')[0]}
                          </button>
                      )}
                      {/* Bubble Tail */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-blue-500 transform rotate-45"></div>
                  </div>
              )}
          </div>
        </div>

        {/* Character Image */}
        <div className="relative h-full w-full flex items-end justify-center breathing">
          {/* Floor Highlight */}
          <div className="absolute bottom-0 w-40 h-10 bg-black/50 blur-xl rounded-[100%] md:group-hover:bg-blue-500/30 transition-colors duration-300" />
          
          {/* Character Sprite/Image */}
          <img 
            src={avatarUrl} 
            alt={config.name}
            className="h-[95%] w-auto object-contain drop-shadow-[0_0_5px_rgba(200,230,255,0.4)] transition-all duration-300 md:group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]"
          />
        </div>

        {/* Status Indicators */}
        <div className="absolute bottom-8 right-8 bg-green-500 rounded-full p-1 border-2 border-white shadow-lg opacity-0 md:group-hover:opacity-100 transition-opacity delay-100">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        </div>

      </div>

      {/* MOBILE FULL SCREEN SPEECH OVERLAY (Game Dialog Style) */}
      {isOpen && config.speechText && (
        <div 
          className="fixed inset-0 z-50 md:hidden flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-16 animate-in fade-in duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(false);
          }}
        >
          {/* Dialog Box */}
          <div 
            className="w-full bg-slate-900 border-2 border-blue-400/50 p-6 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] relative animate-in slide-in-from-top-10"
            onClick={(e) => e.stopPropagation()} 
          >
              {/* Floating Name Header */}
              <div className="absolute -top-4 left-4 bg-red-600 text-white font-gaming px-4 py-1 text-lg border border-white shadow-lg transform -skew-x-12">
                  {config.name}
              </div>

              {/* Close Button */}
              <button 
                  onClick={() => onToggle(false)}
                  className="absolute -top-3 -right-3 bg-slate-800 text-white p-2 rounded-full border border-slate-600 hover:bg-red-500 transition-colors shadow-lg"
              >
                  <X size={16} />
              </button>

              {/* Text Content */}
              <p className="text-white text-base leading-relaxed mt-2 mb-4 font-medium font-sans">
                  "{config.speechText}"
              </p>

               {onInfoClick && (
                  <button 
                    onClick={(e) => { 
                        e.preventDefault();
                        e.stopPropagation(); 
                        onInfoClick();
                        setTimeout(() => {
                            onToggle(false);
                        }, 50); 
                    }}
                    className="mt-4 text-sm bg-blue-600 active:bg-blue-700 text-white px-6 py-3 w-full rounded shadow-lg border border-blue-400/50 flex items-center justify-center gap-2 transition-colors uppercase font-bold"
                  >
                    <Info size={16} />
                    Meer informatie voor {config.name.split(' ')[0]}
                  </button>
              )}
              
              {/* Decorative corner accent */}
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-blue-500 opacity-50"></div>
          </div>
        </div>
      )}
    </>
  );
};