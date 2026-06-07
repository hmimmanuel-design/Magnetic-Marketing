"use client";

import React, { useEffect, useState } from "react";
import {
  Menu,
  Settings,
  Monitor,
  Users,
  Mail,
  Briefcase,
  Snowflake,
  Sun,
  PartyPopper,
  Palmtree,
  Trees,
} from "lucide-react";
import { BackgroundTheme, ViewState } from "@/src/types";
import { GameButton } from "@/src/components/GameButton";
import { Modal } from "@/src/components/Modal";
import { LobbyCharacter } from "@/src/components/LobbyCharacter";
import { BackgroundRenderer } from "@/src/components/backgrounds/BackgroundRenderer";
import { ServicesAccordion } from "@/src/components/ServicesAccordion";
import { ClientsRegister } from "@/src/components/ClientsRegister";
import { ContactForm } from "@/src/components/ContactForm";
import { ProfileCard } from "@/src/components/ProfileCard";
import { characters } from "@/lib/data/characters";
import { siteConfig } from "@/lib/site-config";

type ProfileSlug = "sam-de-bruin" | "micha-hasselaar";

export const LobbyShell: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LOBBY);
  const [theme, setTheme] = useState<BackgroundTheme>(BackgroundTheme.CYBER);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileSpeechCharacter, setActiveMobileSpeechCharacter] =
    useState<string | null>(null);
  const [activeProfileModal, setActiveProfileModal] =
    useState<ProfileSlug | null>(null);
  const [onlineCount, setOnlineCount] = useState(0);

  // Body scroll lock alleen op deze pagina; herstel bij unmount
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Pseudo online counter
  useEffect(() => {
    setOnlineCount(Math.floor(Math.random() * 6));
    let timeoutId: ReturnType<typeof setTimeout>;
    const next = () => {
      const ms = Math.floor(Math.random() * 20000) + 10000;
      timeoutId = setTimeout(() => {
        setOnlineCount(Math.floor(Math.random() * 6));
        next();
      }, ms);
    };
    next();
    return () => clearTimeout(timeoutId);
  }, []);

  const themeOptions: {
    theme: BackgroundTheme;
    label: string;
    icon: React.ReactNode;
    color: string;
    selectColor: string;
  }[] = [
    {
      theme: BackgroundTheme.CYBER,
      label: "Cyber",
      icon: <Monitor size={24} className="text-white" />,
      color: "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]",
      selectColor: "border-blue-500 bg-blue-500/20",
    },
    {
      theme: BackgroundTheme.DESERT,
      label: "Desert",
      icon: <Sun size={24} className="text-white" />,
      color: "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]",
      selectColor: "border-orange-500 bg-orange-500/20",
    },
    {
      theme: BackgroundTheme.ANTARCTICA,
      label: "Freeze",
      icon: <Snowflake size={24} className="text-white" />,
      color: "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
      selectColor: "border-cyan-500 bg-cyan-500/20",
    },
    {
      theme: BackgroundTheme.BEACH,
      label: "Beach",
      icon: <Palmtree size={24} className="text-white" />,
      color: "bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]",
      selectColor: "border-yellow-500 bg-yellow-500/20",
    },
    {
      theme: BackgroundTheme.JUNGLE,
      label: "Jungle",
      icon: <Trees size={24} className="text-white" />,
      color: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      selectColor: "border-emerald-500 bg-emerald-500/20",
    },
    {
      theme: BackgroundTheme.PARTY,
      label: "Party",
      icon: <PartyPopper size={24} className="text-white" />,
      color: "bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)]",
      selectColor: "border-fuchsia-500 bg-fuchsia-500/20",
    },
  ];

  return (
    <div className="lobby-viewport bg-slate-900 text-white select-none">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000">
        <BackgroundRenderer theme={theme} />

        {/* Big title left */}
        <div className="absolute top-[3%] left-[70px] md:top-[4%] md:left-[90px] text-left pointer-events-none z-0">
          <h1
            className="text-[6vw] md:text-[4vw] leading-none font-gaming italic text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-white/10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse"
            style={{ animationDuration: "4s" }}
          >
            MAGNETIC
          </h1>
          <p className="text-[6vw] md:text-[4vw] leading-none font-gaming italic text-white/40 -mt-1 md:-mt-4 blur-[1px] mix-blend-overlay" aria-hidden>
            MARKETING
          </p>
          <p className="text-blue-300 font-bold tracking-[0.3em] md:tracking-[0.5em] text-[0.6rem] md:text-xs uppercase mt-2 glow-text bg-slate-900/40 inline-block px-3 py-0.5 rounded backdrop-blur-sm border border-white/10 ml-0.5">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Center logo */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vh] h-[35vh] md:w-[50vh] md:h-[50vh] pointer-events-none z-0 opacity-25 mix-blend-screen animate-pulse">
          <div className="absolute inset-0 bg-blue-500/5 blur-[60px] rounded-full animate-pulse" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github.com/hmimmanuel-design/gym-assets/blob/main/ChatGPT%20Image%203%20feb%202026,%2013_04_53.png?raw=true"
            alt=""
            aria-hidden
            className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] breathing"
          />
        </div>
      </div>

      {/* 3D SCENE LAYER */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-0 gap-4 md:gap-12">
        {characters.map((c) => {
          const slug: ProfileSlug =
            c.name === "Sam de Bruin" ? "sam-de-bruin" : "micha-hasselaar";
          return (
            <LobbyCharacter
              key={c.name}
              config={c}
              isOpen={activeMobileSpeechCharacter === c.name}
              onToggle={(isOpen) =>
                setActiveMobileSpeechCharacter(isOpen ? c.name : null)
              }
              onInfoClick={() => setActiveProfileModal(slug)}
            />
          );
        })}
      </div>

      {/* UI OVERLAY */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10">
        {/* HEADER */}
        <div className="flex justify-between items-start pointer-events-auto w-full">
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open hoofdmenu"
            className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white mt-1 min-w-11 min-h-11 flex items-center justify-center"
          >
            <Menu size={28} />
          </button>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              <div className="relative flex h-3 w-3">
                {onlineCount > 0 && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${onlineCount > 0 ? "bg-emerald-500" : "bg-slate-500"}`}
                />
              </div>
              <span className="text-sm font-bold text-slate-300">
                {onlineCount}{" "}
                <span className="hidden sm:inline">People Online</span>
              </span>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Open omgevingsinstellingen"
              className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white min-w-11 min-h-11 flex items-center justify-center"
            >
              <Settings size={28} />
            </button>
          </div>
        </div>

        {/* LEFT SIDEBAR (desktop) */}
        <nav
          aria-label="Snelnavigatie"
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 pointer-events-auto w-48 md:w-64"
        >
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
            onClick={() => setActiveProfileModal("sam-de-bruin")}
            icon={<Users size={20} />}
            className="w-full !justify-start border-l-4 !border-l-red-500 bg-slate-800/80"
          />
        </nav>

        {/* RIGHT SIDEBAR (lg+) */}
        <aside className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 pointer-events-auto w-64">
          <div className="bg-blue-900/60 border border-blue-500/30 p-4 rounded backdrop-blur-sm transform rotate-1 hover:rotate-0 transition-transform cursor-pointer">
            <h3 className="font-bold text-lg leading-tight mb-1">Nieuwe Case Update</h3>
            <p className="text-xs text-blue-200">Hoe we A.I. toepassen en omzetten in concrete resultaten</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-600/30 p-4 rounded backdrop-blur-sm -rotate-1 hover:rotate-0 transition-transform cursor-pointer">
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 inline-block rounded mb-2 uppercase">UPDATE</div>
            <h3 className="font-bold text-lg leading-tight mb-1">Performance Marketing</h3>
            <p className="text-xs text-slate-300">Meetbare groei met campagnes die converteren.</p>
          </div>
        </aside>

        {/* FOOTER */}
        <div
          className={`relative w-full h-24 pointer-events-auto flex items-end justify-end transition-opacity duration-300 ${activeMobileSpeechCharacter ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <div className="flex items-center gap-4">
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

      {/* PAUSE MENU */}
      <Modal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="PAUSE MENU"
      >
        <div className="flex flex-col gap-4 items-center">
          <GameButton
            label="Services"
            variant="ghost"
            onClick={() => {
              setView(ViewState.SERVICES);
              setIsMenuOpen(false);
            }}
            icon={<Monitor size={24} />}
            className="w-full max-w-md"
          />
          <GameButton
            label="Register"
            variant="ghost"
            onClick={() => {
              setView(ViewState.PORTFOLIO);
              setIsMenuOpen(false);
            }}
            icon={<Briefcase size={24} />}
            className="w-full max-w-md"
          />
          <GameButton
            label="Contact"
            variant="ghost"
            onClick={() => {
              setView(ViewState.CONTACT);
              setIsMenuOpen(false);
            }}
            icon={<Mail size={24} />}
            className="w-full max-w-md border-red-500 text-red-200"
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-slate-500 hover:text-white uppercase tracking-widest text-sm font-bold min-h-11"
          >
            Close Menu
          </button>
        </div>
      </Modal>

      {/* SETTINGS (theme picker) */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Environment Settings"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themeOptions.map((opt) => (
            <button
              key={opt.theme}
              onClick={() => {
                setTheme(opt.theme);
                setIsSettingsOpen(false);
              }}
              className={`p-4 rounded border-2 flex flex-col items-center gap-2 transition-all hover:scale-105 min-h-24 ${theme === opt.theme ? opt.selectColor : "border-slate-700 bg-slate-800 hover:border-slate-500"}`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${opt.color}`}
              >
                {opt.icon}
              </div>
              <span className="font-gaming text-lg tracking-wider">{opt.label}</span>
            </button>
          ))}
        </div>
      </Modal>

      {/* SERVICES */}
      <Modal
        isOpen={view === ViewState.SERVICES}
        onClose={() => setView(ViewState.LOBBY)}
        title="Services"
      >
        <ServicesAccordion />
      </Modal>

      {/* PORTFOLIO / REGISTER */}
      <Modal
        isOpen={view === ViewState.PORTFOLIO}
        onClose={() => setView(ViewState.LOBBY)}
        title="Register"
      >
        <div className="flex flex-col gap-10">
          <ClientsRegister />
        </div>
      </Modal>

      {/* CONTACT */}
      <Modal
        isOpen={view === ViewState.CONTACT}
        onClose={() => setView(ViewState.LOBBY)}
        title="Contact"
      >
        <div className="flex flex-col gap-6">
          <p className="text-slate-300">
            Beantwoord de onderstaande vragen voor een gerichte aanvraag. Wij nemen zo snel mogelijk contact met je op.
          </p>
          <ContactForm />
          <div className="mt-4 flex items-center justify-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded text-center">
            <Mail className="text-blue-400" />
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-white font-bold text-lg hover:underline"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </Modal>

      {/* PROFILE */}
      <Modal
        isOpen={activeProfileModal !== null}
        onClose={() => setActiveProfileModal(null)}
        title={
          activeProfileModal === "sam-de-bruin"
            ? "Sam de Bruin"
            : "Micha Hasselaar"
        }
      >
        {activeProfileModal && <ProfileCard slug={activeProfileModal} />}
      </Modal>
    </div>
  );
};
