"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-red-400 uppercase tracking-widest text-xs font-bold mb-2">
          Er ging iets mis
        </p>
        <h1 className="text-3xl md:text-4xl font-gaming text-white mb-4">
          Something Broke
        </h1>
        <p className="text-slate-300 mb-6">
          We konden deze pagina niet laden. Probeer het opnieuw — onze excuses.
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded min-h-12"
        >
          Probeer opnieuw
        </button>
      </div>
    </main>
  );
}
