import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 grid gap-8 md:grid-cols-3 text-slate-300">
        <div>
          <h2 className="text-white font-gaming text-xl tracking-wider mb-2">
            MAGNETIC MARKETING
          </h2>
          <p className="text-sm text-slate-400">{siteConfig.tagline}</p>
          <p className="text-xs text-slate-500 mt-3">
            {siteConfig.shortDescription}
          </p>
        </div>
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
            Navigatie
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/diensten" className="hover:text-white">Diensten</Link></li>
            <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/team/sam-de-bruin" className="hover:text-white">Sam de Bruin</Link></li>
            <li><Link href="/team/micha-hasselaar" className="hover:text-white">Micha Hasselaar</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-blue-400" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-4 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Magnetic Marketing. Alle rechten voorbehouden.</span>
          <span>Don't Chase... ATTRACT</span>
        </div>
      </div>
    </footer>
  );
};
