import Link from "next/link";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";

export const metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 md:px-6 py-24 text-center">
        <p className="text-blue-400 uppercase tracking-widest text-xs font-bold mb-2">
          Error 404
        </p>
        <h1 className="text-5xl font-gaming text-white mb-4">Page Not Found</h1>
        <p className="text-slate-300 mb-8">
          Deze pagina bestaat niet (meer). Misschien is hij verplaatst of had je
          de verkeerde link.
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded min-h-12"
        >
          ← Terug naar de lobby
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
