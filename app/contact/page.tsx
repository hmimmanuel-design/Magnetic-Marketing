import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";
import { ContactForm } from "@/src/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact — Vraag een offerte aan",
  description:
    "Neem direct contact op met Magnetic Marketing. Beantwoord 3 korte vragen voor een gerichte aanvraag. Bellen kan ook op 06 15480931.",
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — Magnetic Marketing",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@id": `${siteConfig.url}/#organization`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 md:px-6 py-12">
        <header className="mb-10">
          <p className="text-blue-400 uppercase tracking-widest text-xs font-bold mb-2">
            Start je project
          </p>
          <h1 className="text-4xl md:text-5xl font-gaming text-white mb-4">
            Contact
          </h1>
          <p className="text-slate-300 text-lg">
            Beantwoord de onderstaande vragen voor een gerichte aanvraag. Wij nemen zo snel mogelijk contact met je op.
          </p>
        </header>

        <ContactForm />

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded p-4 transition-colors"
          >
            <Phone className="text-blue-400" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Bel direct</div>
              <div className="text-white font-bold">{siteConfig.phoneDisplay}</div>
            </div>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded p-4 transition-colors"
          >
            <Mail className="text-blue-400" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">E-mail</div>
              <div className="text-white font-bold break-all">{siteConfig.email}</div>
            </div>
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
