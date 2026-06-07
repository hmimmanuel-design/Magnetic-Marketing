import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";
import { ProfileCard } from "@/src/components/ProfileCard";
import { founderProfiles } from "@/lib/data/characters";
import { siteConfig } from "@/lib/site-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(founderProfiles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = founderProfiles[slug];
  if (!profile) return { title: "Niet gevonden" };
  return {
    title: `${profile.name} — ${profile.role}`,
    description: `${profile.name} is ${profile.role.toLowerCase()} bij ${siteConfig.name}. Specialisaties: ${profile.specialisations.join(", ")}.`,
    alternates: { canonical: `/team/${profile.slug}` },
    openGraph: {
      type: "profile",
      title: `${profile.name} — ${siteConfig.name}`,
      url: `${siteConfig.url}/team/${profile.slug}`,
      images: [profile.portraitUrl],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const profile = founderProfiles[slug];
  if (!profile) notFound();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    image: profile.portraitUrl,
    url: `${siteConfig.url}/team/${profile.slug}`,
    knowsAbout: profile.specialisations,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    description: profile.bio.join(" "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 md:px-6 py-12">
        <nav aria-label="Broodkruimels" className="text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Team</span>
          <span className="mx-2">/</span>
          <span className="text-white">{profile.name}</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-gaming text-white mb-2">
          {profile.name}
        </h1>
        <p className="text-blue-300 uppercase tracking-widest text-sm font-bold mb-8">
          {profile.role}
        </p>

        <ProfileCard slug={profile.slug as keyof typeof founderProfiles} />

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded min-h-12"
          >
            Plan een sparsessie →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
