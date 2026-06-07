"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/data/services";

const accentMap: Record<string, string> = {
  red: "border-red-500 bg-red-500/20 text-red-500",
  blue: "border-blue-400 bg-blue-400/20 text-blue-400",
  emerald: "border-emerald-400 bg-emerald-400/20 text-emerald-400",
  orange: "border-orange-400 bg-orange-400/20 text-orange-400",
  fuchsia: "border-fuchsia-400 bg-fuchsia-400/20 text-fuchsia-400",
};

const borderMap: Record<string, string> = {
  red: "border-l-red-500",
  blue: "border-l-blue-400",
  emerald: "border-l-emerald-400",
  orange: "border-l-orange-400",
  fuchsia: "border-l-fuchsia-400",
};

export const ServicesAccordion: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        const isOpen = expanded === service.slug;
        return (
          <div
            key={service.slug}
            className={`bg-slate-800/80 border-l-4 ${borderMap[service.accent]} rounded overflow-hidden`}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : service.slug)}
              aria-expanded={isOpen}
              aria-controls={`service-${service.slug}`}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left min-h-11"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded flex-shrink-0 ${accentMap[service.accent]}`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white">
                  {service.title}
                </h3>
              </div>
              <ChevronDown
                className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div
                id={`service-${service.slug}`}
                className="px-4 pb-4 pt-2 text-sm text-slate-300 space-y-3 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200 ml-0 md:ml-14"
              >
                {service.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
