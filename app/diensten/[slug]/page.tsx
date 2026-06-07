import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/site-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Niet gevonden" };
  return {
    title: `${service.title} — Diensten`,
    description: service.short,
    alternates: { canonical: `/diensten/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.short,
      url: `${siteConfig.url}/diensten/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    serviceType: service.title,
    areaServed: { "@type": "Country", name: "Netherlands" },
    provider: { "@id": `${siteConfig.url}/#organization` },
    url: `${siteConfig.url}/diensten/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 md:px-6 py-12">
        <nav aria-label="Broodkruimels" className="text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/diensten" className="hover:text-white">Diensten</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{service.title}</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-gaming text-white mb-6">
          {service.title}
        </h1>
        <p className="text-blue-300 text-lg mb-8">{service.short}</p>

        <article className="prose prose-invert max-w-none space-y-5 text-slate-200 leading-relaxed">
          {service.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded min-h-12"
          >
            Vraag {service.title.toLowerCase()} aan
          </Link>
          <Link
            href="/diensten"
            className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded min-h-12"
          >
            ← Alle diensten
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
