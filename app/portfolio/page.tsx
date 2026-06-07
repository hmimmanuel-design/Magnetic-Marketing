import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";
import { ClientsRegister } from "@/src/components/ClientsRegister";
import { clients } from "@/lib/data/clients";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portfolio — Onze Klanten & Projecten",
  description:
    "Bekijk een greep uit ons klantregister: Lale Market, Bling Style, Supa Shot, Joelle Fotografie, Sonja Thuiszorg en Cadeauhuis Wageningen.",
  alternates: { canonical: "/portfolio" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Klantregister Magnetic Marketing",
  itemListElement: clients.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Organization",
      name: c.name,
      description: c.service,
    },
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 md:px-6 py-12">
        <header className="mb-10">
          <p className="text-blue-400 uppercase tracking-widest text-xs font-bold mb-2">
            Onze klanten
          </p>
          <h1 className="text-4xl md:text-5xl font-gaming text-white mb-4">
            Portfolio
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Wij zijn trots op de samenwerkingen die we hebben opgebouwd. Hieronder een greep uit onze projecten.
          </p>
        </header>

        <ClientsRegister />

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded transition-colors min-h-12"
          >
            Word de volgende case →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
