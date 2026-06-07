import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const nav = [
  { href: "/diensten", label: "Diensten" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-gaming text-xl tracking-wider"
          aria-label={`${siteConfig.name} home`}
        >
          <Home size={20} className="text-blue-400" />
          <span className="hidden sm:inline">MAGNETIC MARKETING</span>
          <span className="sm:hidden">MM</span>
        </Link>
        <nav aria-label="Hoofdnavigatie" className="flex items-center gap-2 md:gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm md:text-base text-slate-300 hover:text-white px-3 py-2 rounded transition-colors min-h-11 flex items-center"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
