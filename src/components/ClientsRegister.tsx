import React from "react";
import { Briefcase } from "lucide-react";
import { clients } from "@/lib/data/clients";

export const ClientsRegister: React.FC = () => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-500/20 flex items-center justify-center rounded text-blue-400 flex-shrink-0">
          <Briefcase size={24} />
        </div>
        <h3 className="text-2xl font-bold text-white">Klantregister</h3>
      </div>
      <div className="bg-slate-800/40 p-6 rounded-lg border-l-4 border-blue-500 shadow-inner">
        <p className="text-sm md:text-base text-slate-300 mb-6">
          Wij zijn trots op de samenwerkingen die we hebben opgebouwd en de
          resultaten die we voor onze klanten hebben gerealiseerd. Hieronder
          vind je een greep uit ons klantregister en de succesvolle projecten
          die we hebben afgeleverd.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((c) => (
            <li
              key={c.name}
              className="bg-slate-800/80 p-4 rounded border border-slate-700/50 flex flex-col gap-1"
            >
              <span className="font-bold text-white">{c.name}</span>
              <span className="text-sm text-blue-400">{c.service}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
