"use client";

import React, { useEffect, useState } from "react";
import { BackgroundTheme } from "@/src/types";

interface Props {
  theme: BackgroundTheme;
}

/**
 * Renders één van de zes lobby-thema's. Particles worden pas na mount gegenereerd
 * om hydration-mismatch door Math.random op de server te voorkomen.
 */
export const BackgroundRenderer: React.FC<Props> = ({ theme }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  switch (theme) {
    case BackgroundTheme.DESERT:
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-amber-700 to-amber-950" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 opacity-40">
            <div
              className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[250px] border-b-amber-900"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}
            />
          </div>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-60" />
          <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-40">
            <div
              className="w-full h-full floor-grid"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(251, 191, 36, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.4) 1px, transparent 1px)",
              }}
            />
          </div>
        </>
      );

    case BackgroundTheme.ANTARCTICA:
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-cyan-900 to-slate-200" />
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full animate-blizzard opacity-80"
                  style={{
                    left: `${Math.random() * 120 - 10}%`,
                    animationDuration: `${1 + Math.random() * 1.5}s`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-50">
            <div
              className="w-full h-full floor-grid"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(207, 250, 254, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(207, 250, 254, 0.4) 1px, transparent 1px)",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
        </>
      );

    case BackgroundTheme.BEACH:
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-yellow-100" />
          <div className="absolute top-10 right-[10%] w-64 h-64 bg-yellow-300 rounded-full blur-[60px] opacity-80" />
          <div className="absolute bottom-[20%] inset-x-0 h-[20vh] bg-gradient-to-t from-blue-400/50 to-transparent" />
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-20 h-20 bg-white/20 rounded-full blur-xl animate-firefly"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${50 + Math.random() * 50}%`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-60">
            <div
              className="w-full h-full floor-grid"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(234, 179, 8, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.3) 1px, transparent 1px)",
              }}
            />
          </div>
        </>
      );

    case BackgroundTheme.JUNGLE:
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-green-900 to-black" />
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-lime-400 rounded-full blur-[1px] animate-firefly shadow-[0_0_5px_rgba(132,204,22,0.8)]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-40">
            <div
              className="w-full h-full floor-grid"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)",
              }}
            />
          </div>
        </>
      );

    case BackgroundTheme.PARTY:
      return (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-purple-900 animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div className="absolute top-0 left-1/4 w-32 h-[120vh] bg-white/5 rotate-[15deg] blur-xl transform origin-top animate-pulse" />
          <div
            className="absolute top-0 right-1/4 w-32 h-[120vh] bg-white/5 rotate-[-15deg] blur-xl transform origin-top animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => {
                const colors = [
                  "bg-red-500",
                  "bg-blue-500",
                  "bg-yellow-500",
                  "bg-green-500",
                  "bg-pink-500",
                ];
                const randomColor =
                  colors[Math.floor(Math.random() * colors.length)];
                return (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 ${randomColor} animate-matrix`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                      animationDelay: `${Math.random() * 5}s`,
                      opacity: 0.7,
                    }}
                  />
                );
              })}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-50">
            <div
              className="w-full h-full floor-grid"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(232, 121, 249, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 121, 249, 0.4) 1px, transparent 1px)",
              }}
            />
          </div>
        </>
      );

    case BackgroundTheme.CYBER:
    default:
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900" />
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 text-cyan-300/30 font-mono font-bold leading-none select-none animate-matrix flex flex-col items-center gap-0.5"
                  style={{
                    left: `${Math.random() * 100}%`,
                    fontSize: `${10 + Math.random() * 14}px`,
                    animationDuration: `${15 + Math.random() * 20}s`,
                    animationDelay: `${Math.random() * 20}s`,
                    textShadow: "0 0 5px rgba(34, 211, 238, 0.2)",
                  }}
                >
                  {Array.from({ length: 25 }).map((_, j) => (
                    <span
                      key={j}
                      style={{ opacity: Math.random() > 0.5 ? 1 : 0.3 }}
                    >
                      {Math.random() > 0.5 ? "1" : "0"}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-[60vh] perspective-container opacity-70">
            <div
              className="w-full h-full floor-grid"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                boxShadow: "inset 0 0 100px #000",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
        </>
      );
  }
};
