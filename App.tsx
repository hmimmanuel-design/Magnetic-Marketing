import React, { useState, useEffect } from 'react';
import { Menu, Settings, Monitor, Users, Mail, Phone, Briefcase, Award, X, Snowflake, Sun, Palmtree, Trees, PartyPopper, Target, Search, Globe, Wrench, Smartphone, ChevronDown } from 'lucide-react';
import { ViewState, BackgroundTheme, CharacterConfig } from './types';
import { GameButton } from './components/GameButton';
import { Modal } from './components/Modal';
import { LobbyCharacter } from './components/LobbyCharacter';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LOBBY);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>(BackgroundTheme.CYBER);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileSpeechCharacter, setActiveMobileSpeechCharacter] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
  const [activeProfileModal, setActiveProfileModal] = useState<string | null>(null);

  const [onlineCount, setOnlineCount] = useState(0);
  const [contactForm, setContactForm] = useState({
    business: '',
    service: '',
    budget: ''
  });

  useEffect(() => {
    setOnlineCount(Math.floor(Math.random() * 6));
    let timeoutId: NodeJS.Timeout;
    const scheduleNextUpdate = () => {
      const nextInterval = Math.floor(Math.random() * 20000) + 10000;
      timeoutId = setTimeout(() => {
        setOnlineCount(Math.floor(Math.random() * 6));
        scheduleNextUpdate();
      }, nextInterval);
    };
    scheduleNextUpdate();
    return () => clearTimeout(timeoutId);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Nieuwe Aanvraag via Website");
    const body = encodeURIComponent(
      `Wat voor type bedrijf of dienst verkoopt u?\n${contactForm.business}\n\n` +
      `Naar welke service bent u op zoek?\n${contactForm.service}\n\n` +
      `In wat voor budget range bevindt u zich?\n${contactForm.budget}`
    );
    window.location.href = `mailto:sam@marketing-magnetic.nl?subject=${subject}&body=${body}`;
  };
  
  const characters: CharacterConfig[] = [
    {
      name: "Micha Hasselaar",
      role: "Founder",
      hairColor: "black",
      outfitColor: "blue",
      isReady: true,
      avatarSeed: "micha",
      imageUrl: "https://github.com/hmimmanuel-design/gym-assets/blob/main/micha%20personage.png?raw=true",
      speechText: "Micha, Aangenaam. U kunt altijd bij me terecht voor een sparsessie over de gehele aanpak. Van het karakter wat het bedrijf zelf wilt uitstralen tot aan de marketing strategieën die we kunnen toepassen."
    },
    {
      name: "Sam de Bruin",
      role: "Founder",
      hairColor: "blond",
      outfitColor: "red",
      isReady: true,
      avatarSeed: "sam",
      imageUrl: "https://github.com/hmimmanuel-design/gym-assets/blob/main/sam%20personage.png?raw=true",
      speechText: "Hoi ik ben Sam. Ik ben een groot voorstander van gelijk gas geven. Geen tijd te verspillen. Herkent u zichzelf daarin. Neem contact op dan gaan we aan de gang!"
    }
  ];

  // Render Background based on Theme
  const renderBackground = () => {
    switch (backgroundTheme) {
      case BackgroundTheme.DESERT:
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-amber-700 to-amber-950" />
            
            {/* Pyramid */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 opacity-40">
              <div 
                className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[250px] border-b-amber-900"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}
              />
            </div>
            
            {/* Sun */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-60" />

            {/* Sandstorm Effect */}
            <div className="absolute inset-0 z-0 opacity-50 mix-blend-overlay pointer-events-none overflow-hidden">
               <div className="w-[200%] h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-sandstorm bg-repeat-x" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-40">
              <div 
                className="w-full h-full floor-grid" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.4) 1px, transparent 1px)` 
                }}
              />
            </div>
          </>
        );
      case BackgroundTheme.ANTARCTICA:
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-cyan-900 to-slate-200" />
            
            {/* Snow Storm / Blizzard */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(60)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full animate-blizzard opacity-80"
                  style={{ 
                    left: `${Math.random() * 120 - 10}%`,
                    animationDuration: `${1 + Math.random() * 1.5}s`, // Faster for storm
                    animationDelay: `${Math.random() * 2}s`
                  }} 
                />
              ))}
            </div>
             <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-50">
              <div 
                className="w-full h-full floor-grid" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(207, 250, 254, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(207, 250, 254, 0.4) 1px, transparent 1px)` 
                }}
              />
            </div>
            {/* Cold Fog */}
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
          </>
        );
      case BackgroundTheme.BEACH:
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-yellow-100" />
            
            {/* Bright Sun */}
            <div className="absolute top-10 right-[10%] w-64 h-64 bg-yellow-300 rounded-full blur-[60px] opacity-80" />
            
            {/* Water Reflection / Horizon */}
            <div className="absolute bottom-[20%] inset-x-0 h-[20vh] bg-gradient-to-t from-blue-400/50 to-transparent" />

            {/* Heat Haze particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-20 h-20 bg-white/20 rounded-full blur-xl animate-firefly"
                  style={{ 
                    left: `${Math.random() * 100}%`,
                    top: `${50 + Math.random() * 50}%`,
                    animationDuration: `${5 + Math.random() * 5}s`
                  }} 
                />
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-60">
              <div 
                className="w-full h-full floor-grid" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.3) 1px, transparent 1px)` 
                }}
              />
            </div>
          </>
        );
      case BackgroundTheme.JUNGLE:
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-green-900 to-black" />
            
            {/* Green Fog/Mist */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            
            {/* Fireflies */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-lime-400 rounded-full blur-[1px] animate-firefly shadow-[0_0_5px_rgba(132,204,22,0.8)]"
                  style={{ 
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }} 
                />
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-40">
              <div 
                className="w-full h-full floor-grid" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)` 
                }}
              />
            </div>
          </>
        );
      case BackgroundTheme.PARTY:
        return (
          <>
            {/* Disco Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-purple-900 animate-pulse" style={{ animationDuration: '3s' }} />
            
            {/* Spotlights */}
            <div className="absolute top-0 left-1/4 w-32 h-[120vh] bg-white/5 rotate-[15deg] blur-xl transform origin-top animate-pulse" />
            <div className="absolute top-0 right-1/4 w-32 h-[120vh] bg-white/5 rotate-[-15deg] blur-xl transform origin-top animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Confetti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {[...Array(40)].map((_, i) => {
                 const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-pink-500'];
                 const randomColor = colors[Math.floor(Math.random() * colors.length)];
                 return (
                   <div 
                     key={i}
                     className={`absolute w-2 h-2 ${randomColor} animate-matrix`}
                     style={{ 
                       left: `${Math.random() * 100}%`, 
                       animationDuration: `${2 + Math.random() * 3}s`,
                       animationDelay: `${Math.random() * 5}s`,
                       opacity: 0.7
                     }} 
                   />
                 )
               })}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-50">
              <div 
                className="w-full h-full floor-grid" 
                style={{
                  backgroundImage: `linear-gradient(rgba(232, 121, 249, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 121, 249, 0.4) 1px, transparent 1px)`,
                }}
              />
            </div>
          </>
        );
      case BackgroundTheme.CYBER:
      default:
        return (
          <>
            {/* Lighter Blue Base - Changed from #050a14 */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900" />
            
            {/* Binary Rain Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {[...Array(15)].map((_, i) => (
                 <div 
                   key={i}
                   className="absolute top-0 text-cyan-300/30 font-mono font-bold leading-none select-none animate-matrix flex flex-col items-center gap-0.5"
                   style={{ 
                     left: `${Math.random() * 100}%`, 
                     fontSize: `${10 + Math.random() * 14}px`,
                     animationDuration: `${15 + Math.random() * 20}s`, // Much slower: 15-35s
                     animationDelay: `${Math.random() * 20}s`,
                     textShadow: '0 0 5px rgba(34, 211, 238, 0.2)'
                   }} 
                 >
                   {Array.from({length: 25}).map((_, j) => (
                     <span key={j} style={{ opacity: Math.random() > 0.5 ? 1 : 0.3 }}>
                       {Math.random() > 0.5 ? '1' : '0'}
                     </span>
                   ))}
                 </div>
               ))}
            </div>

            {/* Hacker Floor Grid - Cyan/Teal */}
            <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-70">
              <div 
                className="w-full h-full floor-grid" 
                style={{
                  backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
                  backgroundSize: '60px 60px',
                  boxShadow: 'inset 0 0 100px #000'
                }}
              />
            </div>
            
            {/* Vignette & Scanline noise */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
          </>
        );
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-900 text-white select-none">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000">
        {renderBackground()}
        
        {/* RED ZONE: BIG BACKGROUND TITLE - Repositioned Left next to Menu */}
        {/* Scaled down to be 2x smaller than before (from 12vw/8vw to 6vw/4vw) */}
        <div className="absolute top-[3%] left-[70px] md:top-[4%] md:left-[90px] text-left pointer-events-none z-0">
            <h1 className="text-[6vw] md:text-[4vw] leading-none font-gaming italic text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-white/10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" style={{ animationDuration: '4s' }}>
              MAGNETIC
            </h1>
            <h1 className="text-[6vw] md:text-[4vw] leading-none font-gaming italic text-white/40 -mt-1 md:-mt-4 blur-[1px] mix-blend-overlay">
              MARKETING
            </h1>
            <p className="text-blue-300 font-bold tracking-[0.3em] md:tracking-[0.5em] text-[0.6rem] md:text-xs uppercase mt-2 glow-text bg-slate-900/40 inline-block px-3 py-0.5 rounded backdrop-blur-sm border border-white/10 ml-0.5">
                Don't Chase... ATTRACT
            </p>
        </div>

        {/* GREEN ZONE: ARTIFACT LOGO - Reduced Opacity further to 0.25 */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vh] h-[35vh] md:w-[50vh] md:h-[50vh] pointer-events-none z-0 opacity-25 mix-blend-screen animate-pulse">
             {/* Glow effect behind logo - Reduced intensity */}
             <div className="absolute inset-0 bg-blue-500/05 blur-[60px] rounded-full animate-pulse" />
             <img 
               src="https://github.com/hmimmanuel-design/gym-assets/blob/main/ChatGPT%20Image%203%20feb%202026,%2013_04_53.png?raw=true" 
               alt="Artifact Logo"
               className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] breathing" 
             />
        </div>
      </div>

      {/* 3D SCENE LAYER */}
      <div 
        className="absolute inset-0 z-10 flex items-end justify-center pb-0 gap-4 md:gap-12"
      >
        <LobbyCharacter 
          config={characters[0]} 
          isOpen={activeMobileSpeechCharacter === characters[0].name}
          onToggle={(isOpen) => setActiveMobileSpeechCharacter(isOpen ? characters[0].name : null)}
          onInfoClick={() => setActiveProfileModal('micha')}
        />
        <LobbyCharacter 
          config={characters[1]} 
          isOpen={activeMobileSpeechCharacter === characters[1].name}
          onToggle={(isOpen) => setActiveMobileSpeechCharacter(isOpen ? characters[1].name : null)}
          onInfoClick={() => setActiveProfileModal('sam')}
        />
      </div>

      {/* UI OVERLAY LAYER */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10">
        
        {/* HEADER: Top Bar */}
        <div className="flex justify-between items-start pointer-events-auto w-full">
          <div className="flex items-start gap-4">
             {/* Menu Button - Moved to Left */}
             <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white mt-1"
             >
               <Menu size={32} />
             </button>
             
             {/* Title text removed from here as it is now in Background Layer */}
          </div>

          {/* Top Right: Status & Settings */}
          <div className="flex items-center gap-4">
            {/* Online Counter */}
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              <div className="relative flex h-3 w-3">
                {onlineCount > 0 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${onlineCount > 0 ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
              </div>
              <span className="text-sm font-bold text-slate-300">
                {onlineCount} <span className="hidden sm:inline">People Online</span>
              </span>
            </div>

            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white"
            >
              <Settings size={32} />
            </button>
          </div>
        </div>

        {/* LEFT SIDEBAR: Navigation Buttons - HIDDEN ON MOBILE */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 pointer-events-auto w-48 md:w-64">
          <GameButton 
            label="Services" 
            subLabel="What We Do"
            variant="ghost" 
            onClick={() => setView(ViewState.SERVICES)}
            icon={<Monitor size={20} />}
            className="w-full !justify-start"
          />
          <GameButton 
            label="Register" 
            subLabel="View Our Work"
            variant="ghost" 
            onClick={() => setView(ViewState.PORTFOLIO)}
            icon={<Briefcase size={20} />}
            className="w-full !justify-start"
          />
           <GameButton 
            label="Team" 
            subLabel="About Us"
            variant="ghost" 
            onClick={() => {}} 
            icon={<Users size={20} />}
            className="w-full !justify-start border-l-4 !border-l-red-500 bg-slate-800/80" // Changed yellow-400 to red-500
          />
        </div>

        {/* RIGHT SIDEBAR: "News" or Featured */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 pointer-events-auto w-64">
          <div className="bg-blue-900/60 border border-blue-500/30 p-4 rounded backdrop-blur-sm transform rotate-1 hover:rotate-0 transition-transform cursor-pointer">
            <h3 className="font-bold text-lg leading-tight mb-1">Nieuwe Case Update</h3>
            <p className="text-xs text-blue-200">Hoe we A.I. toepassen en omzetten in concrete resultaten</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-600/30 p-4 rounded backdrop-blur-sm -rotate-1 hover:rotate-0 transition-transform cursor-pointer">
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 inline-block rounded mb-2 uppercase">UPDATE</div>
            <h3 className="font-bold text-lg leading-tight mb-1">Performance Marketing</h3>
            <p className="text-xs text-slate-300">Meetbare groei met campagnes die converteren.</p>
          </div>
        </div>

        {/* FOOTER: Action Bar 
            - Added conditional class to fade out when a mobile speech bubble is active
        */}
        <div className={`relative w-full h-24 pointer-events-auto flex items-end justify-end transition-opacity duration-300 ${activeMobileSpeechCharacter ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Main Call To Action (Bottom Right) */}
          <div className="flex items-center gap-4">
             {/* "Squad" Info (Decorative) */}
            <div className="hidden md:flex flex-col items-end mr-4 text-right">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Party Size</span>
              <span className="text-xl font-gaming text-white">2 / 4</span>
            </div>

            <GameButton 
              label="Neem Contact Op" 
              subLabel="Start Your Project"
              variant="primary" 
              onClick={() => setView(ViewState.CONTACT)}
              className="text-lg md:text-2xl min-w-[250px] md:min-w-[300px] h-16 md:h-20"
            />
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION MENU MODAL (PAUSE MENU) */}
      <Modal 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        title="PAUSE MENU"
      >
        <div className="flex flex-col gap-4 items-center">
            <GameButton 
                label="Services" 
                variant="ghost" 
                onClick={() => { setView(ViewState.SERVICES); setIsMenuOpen(false); }}
                icon={<Monitor size={24} />}
                className="w-full max-w-md"
            />
             <GameButton 
                label="Register" 
                variant="ghost" 
                onClick={() => { setView(ViewState.PORTFOLIO); setIsMenuOpen(false); }}
                icon={<Briefcase size={24} />}
                className="w-full max-w-md"
            />
             <GameButton 
                label="Contact" 
                variant="ghost" 
                onClick={() => { setView(ViewState.CONTACT); setIsMenuOpen(false); }}
                icon={<Mail size={24} />}
                className="w-full max-w-md border-red-500 text-red-200"
            />
             <div className="h-4"></div>
             <button 
                onClick={() => setIsMenuOpen(false)} 
                className="text-slate-500 hover:text-white uppercase tracking-widest text-sm font-bold"
             >
                Close Menu
             </button>
        </div>
      </Modal>


      {/* MODALS */}
      <Modal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        title="Environment Settings"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button 
            onClick={() => { setBackgroundTheme(BackgroundTheme.CYBER); setIsSettingsOpen(false); }}
            className={`p-4 rounded border-2 flex flex-col items-center gap-2 transition-all hover:scale-105 ${backgroundTheme === BackgroundTheme.CYBER ? 'border-blue-500 bg-blue-500/20' : 'border-slate-700 bg-slate-800 hover:border-blue-400'}`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Monitor size={24} className="text-white" />
            </div>
            <span className="font-gaming text-lg tracking-wider">Cyber</span>
          </button>

          <button 
            onClick={() => { setBackgroundTheme(BackgroundTheme.DESERT); setIsSettingsOpen(false); }}
            className={`p-4 rounded border-2 flex flex-col items-center gap-2 transition-all hover:scale-105 ${backgroundTheme === BackgroundTheme.DESERT ? 'border-orange-500 bg-orange-500/20' : 'border-slate-700 bg-slate-800 hover:border-orange-400'}`}
          >
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              <Sun size={24} className="text-white" />
            </div>
            <span className="font-gaming text-lg tracking-wider">Desert</span>
          </button>

          <button 
            onClick={() => { setBackgroundTheme(BackgroundTheme.ANTARCTICA); setIsSettingsOpen(false); }}
            className={`p-4 rounded border-2 flex flex-col items-center gap-2 transition-all hover:scale-105 ${backgroundTheme === BackgroundTheme.ANTARCTICA ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-700 bg-slate-800 hover:border-cyan-400'}`}
          >
             <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              <Snowflake size={24} className="text-white" />
            </div>
            <span className="font-gaming text-lg tracking-wider">Freeze</span>
          </button>

          {/* NEW THEMES */}
          <button 
            onClick={() => { setBackgroundTheme(BackgroundTheme.PARTY); setIsSettingsOpen(false); }}
            className={`p-4 rounded border-2 flex flex-col items-center gap-2 transition-all hover:scale-105 ${backgroundTheme === BackgroundTheme.PARTY ? 'border-fuchsia-500 bg-fuchsia-500/20' : 'border-slate-700 bg-slate-800 hover:border-fuchsia-400'}`}
          >
             <div className="w-12 h-12 rounded-full bg-fuchsia-500 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
              <PartyPopper size={24} className="text-white" />
            </div>
            <span className="font-gaming text-lg tracking-wider">Party</span>
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={view === ViewState.PORTFOLIO} 
        onClose={() => setView(ViewState.LOBBY)}
        title="Register"
      >
        <div className="flex flex-col gap-10">
          {/* Klantregister */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 flex items-center justify-center rounded text-blue-400 flex-shrink-0">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Klantregister</h3>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-lg border-l-4 border-blue-500 shadow-inner">
              <p className="text-sm md:text-base text-slate-300 mb-6">Wij zijn trots op de samenwerkingen die we hebben opgebouwd en de resultaten die we voor onze klanten hebben gerealiseerd. Hieronder vind je een greep uit ons klantregister en de succesvolle projecten die we hebben afgeleverd.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-4 rounded border border-slate-700/50 flex flex-col gap-1">
                  <span className="font-bold text-white">Lale Market</span>
                  <span className="text-sm text-blue-400">Instagram automatisering</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded border border-slate-700/50 flex flex-col gap-1">
                  <span className="font-bold text-white">Bling Style</span>
                  <span className="text-sm text-blue-400">Webshop design & adverteren</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded border border-slate-700/50 flex flex-col gap-1">
                  <span className="font-bold text-white">Supa Shot</span>
                  <span className="text-sm text-blue-400">Social media beheer</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded border border-slate-700/50 flex flex-col gap-1">
                  <span className="font-bold text-white">Joelle Fotografie</span>
                  <span className="text-sm text-blue-400">Website ontwikkeling & onderhoud</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded border border-slate-700/50 flex flex-col gap-1">
                  <span className="font-bold text-white">Sonja Thuiszorg</span>
                  <span className="text-sm text-blue-400">Website ontwikkeling & onderhoud</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded border border-slate-700/50 flex flex-col gap-1">
                  <span className="font-bold text-white">Cadeauhuis Wageningen</span>
                  <span className="text-sm text-blue-400">Website onderhoud & optimalisatie</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Modal>

      {/* NEW PROFILE MODAL FOR MEMBERS */}
      <Modal 
        isOpen={activeProfileModal !== null} 
        onClose={() => setActiveProfileModal(null)}
        title={activeProfileModal === 'sam' ? "Sam de Bruin" : "Micha Hasselaar"}
      >
        <div className="flex flex-col gap-4">
          {activeProfileModal === 'sam' && (
              <div className="px-4 pb-6 pt-6 text-sm md:text-base text-slate-300 space-y-4 leading-relaxed bg-slate-800/80 border-l-4 border-red-500 rounded p-6 shadow-inner">
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://github.com/hmimmanuel-design/Magnetic-marketing-website/blob/main/Profiel%20Foto.jpeg?raw=true" alt="Sam de Bruin" className="w-16 h-16 rounded-full object-cover border-2 border-red-500/50 bg-slate-900" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Sam de Bruin</h3>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Founder</span>
                  </div>
                </div>
                <p>Sam heeft een sterke basis in marketing en sales door zijn opleiding Commerciële Economie in Utrecht. Deze opleiding vormt de kern van zijn strategische inzicht in klantgedrag, positionering en conversie.</p>
                <p>Daarnaast heeft hij op Het Streek Lyceum het vak Cultuur en Media gevolgd, waar hij zich heeft ontwikkeld in contentcreatie en visuele communicatie. Deze combinatie van analytisch denken en creatieve uitvoering maakt hem sterk in het ontwikkelen van effectieve marketingstrategieën die ook daadwerkelijk converteren.</p>
                <div className="pt-2">
                  <strong className="text-white block mb-3 uppercase tracking-wider text-xs">Specialisaties</strong>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-red-300 text-xs font-semibold bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/30">Marketingstrategie</span>
                    <span className="text-red-300 text-xs font-semibold bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/30">Salesgerichte campagnes</span>
                    <span className="text-red-300 text-xs font-semibold bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/30">Contentontwikkeling</span>
                  </div>
                </div>
                
                <img src="https://github.com/hmimmanuel-design/Magnetic-marketing-website/blob/main/Profiel%20Foto.jpeg?raw=true" alt="Sam de Bruin - Portret" className="w-full h-auto mt-6 rounded-lg shadow-lg border border-red-500/30 object-cover" />
              </div>
          )}

          {activeProfileModal === 'micha' && (
              <div className="px-4 pb-6 pt-6 text-sm md:text-base text-slate-300 space-y-4 leading-relaxed bg-slate-800/80 border-l-4 border-blue-500 rounded p-6 shadow-inner">
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://github.com/hmimmanuel-design/Magnetic-marketing-website/blob/main/img_0873-high.webp?raw=true" alt="Micha Hasselaar" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/50 bg-slate-900" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Micha Hasselaar</h3>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Founder</span>
                  </div>
                </div>
                <p>Micha combineert praktijkervaring met een sterke basis in content en media. Hij heeft een jaar gewerkt op kantoor bij een uitzendbureau, waar hij verantwoordelijk was voor social media marketing en tegelijkertijd een leidinggevende rol vervulde op de werkvloer.</p>
                <p>Zijn ervaring ligt in het aansturen van processen, het creëren van content en het optimaliseren van zichtbaarheid via social media. Daarnaast heeft hij op Het Streek Lyceum het vak Cultuur en Media gevolgd, met focus op editen en contentcreatie.</p>
                <p>Deze combinatie zorgt voor een praktische en resultaatgerichte aanpak, waarbij content niet alleen goed oogt, maar ook functioneert.</p>
                <div className="pt-2">
                  <strong className="text-white block mb-3 uppercase tracking-wider text-xs">Specialisaties</strong>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-blue-300 text-xs font-semibold bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30">Social media marketing</span>
                    <span className="text-blue-300 text-xs font-semibold bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30">Contentcreatie</span>
                    <span className="text-blue-300 text-xs font-semibold bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30">Teamleiding</span>
                    <span className="text-blue-300 text-xs font-semibold bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30">Uitvoering</span>
                  </div>
                </div>
                
                <img src="https://github.com/hmimmanuel-design/Magnetic-marketing-website/blob/main/img_0873-high.webp?raw=true" alt="Micha Hasselaar - Portret" className="w-full h-auto mt-6 rounded-lg shadow-lg border border-blue-500/30 object-cover" />
              </div>
          )}
        </div>
      </Modal>

      <Modal 
        isOpen={view === ViewState.SERVICES} 
        onClose={() => setView(ViewState.LOBBY)}
        title="Services"
      >
        <div className="flex flex-col gap-4">
           {/* Adverteren */}
           <div className="bg-slate-800/80 border-l-4 border-red-500 rounded overflow-hidden">
             <button 
               onClick={() => setExpandedService(expandedService === 'adverteren' ? null : 'adverteren')}
               className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left"
             >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-red-500/20 flex items-center justify-center rounded text-red-500 flex-shrink-0">
                   <Target size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-white">Adverteren</h3>
               </div>
               <ChevronDown className={`text-slate-400 transition-transform ${expandedService === 'adverteren' ? 'rotate-180' : ''}`} />
             </button>
             {expandedService === 'adverteren' && (
               <div className="px-4 pb-4 pt-2 text-sm text-slate-300 space-y-3 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200 ml-14">
                 <p>Zichtbaarheid is geen toeval, maar het resultaat van een doordachte strategie. Wij ontwikkelen en beheren advertenties die daadwerkelijk presteren. Van het opzetten van complete campagnes tot het optimaliseren van targeting, budget en conversies binnen platforms zoals Google Ads, Facebook Ads en TikTok Ads.</p>
                 <p>Wij leveren kant-en-klare advertenties die direct inzetbaar zijn, inclusief strategische plaatsing en continue optimalisatie. Daarnaast creëren we hoogwaardige content die aansluit bij jouw merk. Denk aan professionele bedrijfsvideo’s, promotievideo’s, social media content en korte, pakkende formats zoals TikTok-advertenties en memes. Dit kan zowel op locatie worden geproduceerd als op basis van aangeleverd beeldmateriaal, dat wij bewerken tot converterende advertenties.</p>
               </div>
             )}
           </div>

           {/* SEO */}
           <div className="bg-slate-800/80 border-l-4 border-blue-400 rounded overflow-hidden">
             <button 
               onClick={() => setExpandedService(expandedService === 'seo' ? null : 'seo')}
               className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left"
             >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-blue-400/20 flex items-center justify-center rounded text-blue-400 flex-shrink-0">
                   <Search size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-white">Search Engine Optimization (SEO)</h3>
               </div>
               <ChevronDown className={`text-slate-400 transition-transform ${expandedService === 'seo' ? 'rotate-180' : ''}`} />
             </button>
             {expandedService === 'seo' && (
               <div className="px-4 pb-4 pt-2 text-sm text-slate-300 space-y-3 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200 ml-14">
                 <p>Met Search Engine Optimization (SEO) zorgen wij ervoor dat jouw website beter vindbaar wordt in zoekmachines zoals Google. Door middel van technische optimalisatie, sterke content en een slimme zoekwoordenstrategie verhogen we jouw positie in de zoekresultaten.</p>
                 <p>Het doel is niet alleen meer bezoekers, maar vooral de juiste bezoekers — mensen die daadwerkelijk interesse hebben in jouw product of dienst.</p>
               </div>
             )}
           </div>

           {/* Website / Webshop Ontwikkeling */}
           <div className="bg-slate-800/80 border-l-4 border-emerald-400 rounded overflow-hidden">
             <button 
               onClick={() => setExpandedService(expandedService === 'ontwikkeling' ? null : 'ontwikkeling')}
               className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left"
             >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-emerald-400/20 flex items-center justify-center rounded text-emerald-400 flex-shrink-0">
                   <Globe size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-white">Website / Webshop Ontwikkeling</h3>
               </div>
               <ChevronDown className={`text-slate-400 transition-transform ${expandedService === 'ontwikkeling' ? 'rotate-180' : ''}`} />
             </button>
             {expandedService === 'ontwikkeling' && (
               <div className="px-4 pb-4 pt-2 text-sm text-slate-300 space-y-3 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200 ml-14">
                 <p>Een sterke online aanwezigheid begint met een professionele website. Wij ontwerpen en ontwikkelen websites en webshops volledig op maat, afgestemd op jouw merk, doelgroep en doelstellingen.</p>
                 <p>Van structuur en design tot functionaliteit en gebruikservaring: alles wordt gebouwd met focus op conversie, snelheid en schaalbaarheid. Of het nu gaat om een informatieve website of een complete webshop, wij leveren een solide basis voor online groei.</p>
               </div>
             )}
           </div>

           {/* Website / Webshop Onderhoud */}
           <div className="bg-slate-800/80 border-l-4 border-orange-400 rounded overflow-hidden">
             <button 
               onClick={() => setExpandedService(expandedService === 'onderhoud' ? null : 'onderhoud')}
               className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left"
             >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-orange-400/20 flex items-center justify-center rounded text-orange-400 flex-shrink-0">
                   <Wrench size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-white">Website / Webshop Onderhoud & Optimalisatie</h3>
               </div>
               <ChevronDown className={`text-slate-400 transition-transform ${expandedService === 'onderhoud' ? 'rotate-180' : ''}`} />
             </button>
             {expandedService === 'onderhoud' && (
               <div className="px-4 pb-4 pt-2 text-sm text-slate-300 space-y-3 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200 ml-14">
                 <p>Een bestaande website biedt vaak meer potentie dan wordt benut. Wij analyseren en optimaliseren jouw huidige platform om prestaties te verbeteren.</p>
                 <p>Dit omvat technische verbeteringen, snelheidoptimalisatie, conversie-optimalisatie en doorlopend onderhoud. Zo blijft jouw website veilig, actueel en maximaal effectief.</p>
               </div>
             )}
           </div>

           {/* Social Media Beheer */}
           <div className="bg-slate-800/80 border-l-4 border-fuchsia-400 rounded overflow-hidden">
             <button 
               onClick={() => setExpandedService(expandedService === 'social' ? null : 'social')}
               className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left"
             >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-fuchsia-400/20 flex items-center justify-center rounded text-fuchsia-400 flex-shrink-0">
                   <Smartphone size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-white">Social Media Beheer</h3>
               </div>
               <ChevronDown className={`text-slate-400 transition-transform ${expandedService === 'social' ? 'rotate-180' : ''}`} />
             </button>
             {expandedService === 'social' && (
               <div className="px-4 pb-4 pt-2 text-sm text-slate-300 space-y-3 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200 ml-14">
                 <p>Consistentie en interactie zijn essentieel voor groei op social media. Wij nemen het volledige beheer uit handen: van contentplanning en het plaatsen van berichten tot het beheren van interacties met volgers.</p>
                 <p>Met een strategische aanpak zorgen we voor een sterke online aanwezigheid, meer betrokkenheid en een groeiende community rondom jouw merk.</p>
               </div>
             )}
           </div>
        </div>
      </Modal>

      <Modal 
        isOpen={view === ViewState.CONTACT} 
        onClose={() => setView(ViewState.LOBBY)}
        title="Contact"
      >
         <div className="flex flex-col gap-6">
            <p className="text-slate-300">Beantwoord de onderstaande vragen voor een gerichte aanvraag. Wij nemen zo snel mogelijk contact met je op.</p>
            
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-white">Wat voor type bedrijf of dienst verkoopt u?</label>
                 <input 
                   type="text" 
                   required
                   value={contactForm.business}
                   onChange={e => setContactForm({...contactForm, business: e.target.value})}
                   className="bg-slate-800/80 border border-slate-700/50 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                   placeholder="Bijv. Webshop, diensten, SaaS..."
                 />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-white">Naar welke service bent u op zoek?</label>
                 <span className="text-xs text-slate-400 -mt-1 mb-1">Bijvoorbeeld adverteren of website optimalisatie. Waar gaat het over specifiek?</span>
                 <textarea 
                   required
                   value={contactForm.service}
                   onChange={e => setContactForm({...contactForm, service: e.target.value})}
                   className="bg-slate-800/80 border border-slate-700/50 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-colors min-h-[100px] resize-y"
                   placeholder="Beschrijf hier uw gewenste service..."
                 />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-white">In wat voor budget range bevindt u zich?</label>
                 <span className="text-xs text-slate-400 -mt-1 mb-1">Aan wat voor budget zit je te denken ongeveer? Dit heeft te maken met de professionaliteit en kwaliteit die we voor die prijs kunnen bieden.</span>
                 <input 
                   type="text" 
                   required
                   value={contactForm.budget}
                   onChange={e => setContactForm({...contactForm, budget: e.target.value})}
                   className="bg-slate-800/80 border border-slate-700/50 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                   placeholder="Bijv. €1.000 - €5.000"
                 />
               </div>

               <button 
                 type="submit"
                 className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded transition-colors flex items-center justify-center gap-2 shadow-lg"
               >
                 <Mail size={20} />
                 Verstuur via E-mail
               </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded text-center">
               <Phone className="text-blue-400" />
               <span className="text-white font-bold text-lg">06 15480931</span>
            </div>
         </div>
      </Modal>

    </div>
  );
};

export default App;