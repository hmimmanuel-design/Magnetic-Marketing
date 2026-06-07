import type { Metadata } from "next";
import { LobbyShell } from "@/src/components/LobbyShell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <LobbyShell />;
}
