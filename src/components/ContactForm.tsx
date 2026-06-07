"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Mail } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded transition-colors flex items-center justify-center gap-2 shadow-lg min-h-12"
    >
      <Mail size={20} />
      {pending ? "Versturen…" : "Verstuur aanvraag"}
    </button>
  );
}

export const ContactForm: React.FC = () => {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {/* Honeypot — verborgen voor mensen, zichtbaar voor bots */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Vul dit veld niet in
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="business" className="text-sm font-bold text-white">
          Wat voor type bedrijf of dienst verkoopt u?
        </label>
        <input
          id="business"
          name="business"
          type="text"
          required
          maxLength={500}
          autoComplete="organization"
          className="bg-slate-800/80 border border-slate-700/50 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-12"
          placeholder="Bijv. Webshop, diensten, SaaS…"
        />
        {state.fieldErrors?.business && (
          <span className="text-xs text-red-400">{state.fieldErrors.business}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="text-sm font-bold text-white">
          Naar welke service bent u op zoek?
        </label>
        <span className="text-xs text-slate-400 -mt-1 mb-1">
          Bijvoorbeeld adverteren of website optimalisatie. Waar gaat het over specifiek?
        </span>
        <textarea
          id="service"
          name="service"
          required
          maxLength={2000}
          className="bg-slate-800/80 border border-slate-700/50 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[120px] resize-y"
          placeholder="Beschrijf hier uw gewenste service…"
        />
        {state.fieldErrors?.service && (
          <span className="text-xs text-red-400">{state.fieldErrors.service}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="budget" className="text-sm font-bold text-white">
          In wat voor budget range bevindt u zich?
        </label>
        <span className="text-xs text-slate-400 -mt-1 mb-1">
          Aan wat voor budget zit je te denken ongeveer? Dit heeft te maken met de professionaliteit en kwaliteit die we voor die prijs kunnen bieden.
        </span>
        <input
          id="budget"
          name="budget"
          type="text"
          required
          maxLength={200}
          className="bg-slate-800/80 border border-slate-700/50 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-12"
          placeholder="Bijv. €1.000 - €5.000"
        />
        {state.fieldErrors?.budget && (
          <span className="text-xs text-red-400">{state.fieldErrors.budget}</span>
        )}
      </div>

      <SubmitButton />

      {state.status === "success" && (
        <div
          role="status"
          className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 rounded p-3 text-sm"
        >
          {state.message}
        </div>
      )}
      {state.status === "error" && (
        <div
          role="alert"
          className="bg-red-500/10 border border-red-500/40 text-red-300 rounded p-3 text-sm"
        >
          {state.message}
        </div>
      )}
    </form>
  );
};
