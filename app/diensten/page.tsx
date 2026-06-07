import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";
import { ServicesAccordion } from "@/src/components/ServicesAccordion";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Diensten — Adverteren, SEO, Websites & Social Media",
  description:
    "Bekijk onze diensten: Google Ads, Facebook Ads, TikTok Ads, SEO, website- en webshopontwikkeling, onderhoud en social media beheer.",
  alternates: { canonical: "/diensten" },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.short,
      url: `${siteConfig.url}/diensten/${s.slug}`,
      provider: { "@id": `${siteConfig.url}/#organization` },
    },
  })),
};

export default function DienstenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 md:px-6 py-12">
        <header className="mb-10">
          <p className="text-blue-400 uppercase tracking-widest text-xs font-bold mb-2">
            Wat we doen
          </p>
          <h1 className="text-4xl md:text-5xl font-gaming text-white mb-4">
            Onze Diensten
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Van campagnes die echt converteren tot websites die schalen — wij combineren strategie, design en uitvoering.
          </p>
        </header>

        <ServicesAccordion />

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">Diensten in detail</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/diensten/${s.slug}`}
                  className="block bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded p-4 transition-colors"
                >
                  <span className="font-bold text-white">{s.title}</span>
                  <span className="text-sm text-slate-400 block mt-1">{s.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded transition-colors min-h-12"
          >
            Direct contact opnemen →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
