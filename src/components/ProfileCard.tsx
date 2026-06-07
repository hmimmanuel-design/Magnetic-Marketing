import React from "react";
import Image from "next/image";
import { founderProfiles, type FounderProfile } from "@/lib/data/characters";

const accent: Record<FounderProfile["accent"], { border: string; tag: string; ring: string }> = {
  red: {
    border: "border-l-red-500",
    tag: "text-red-300 bg-red-500/20 border-red-500/30",
    ring: "border-red-500/50",
  },
  blue: {
    border: "border-l-blue-500",
    tag: "text-blue-300 bg-blue-500/20 border-blue-500/30",
    ring: "border-blue-500/50",
  },
};

interface ProfileCardProps {
  slug: keyof typeof founderProfiles;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ slug }) => {
  const profile = founderProfiles[slug];
  if (!profile) return null;
  const c = accent[profile.accent];

  return (
    <article
      className={`px-4 pb-6 pt-6 text-sm md:text-base text-slate-300 space-y-4 leading-relaxed bg-slate-800/80 border-l-4 ${c.border} rounded p-6 shadow-inner`}
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={profile.portraitUrl}
          alt={profile.name}
          width={64}
          height={64}
          className={`rounded-full object-cover border-2 ${c.ring} bg-slate-900`}
          unoptimized
        />
        <div>
          <h3 className="text-xl font-bold text-white">{profile.name}</h3>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {profile.role}
          </span>
        </div>
      </div>

      {profile.bio.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <div className="pt-2">
        <strong className="text-white block mb-3 uppercase tracking-wider text-xs">
          Specialisaties
        </strong>
        <div className="flex flex-wrap gap-2">
          {profile.specialisations.map((s) => (
            <span
              key={s}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${c.tag}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-full aspect-[4/3] mt-6 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={profile.portraitUrl}
          alt={`${profile.name} - Portret`}
          fill
          sizes="(min-width: 768px) 700px, 100vw"
          className="object-cover"
          unoptimized
        />
      </div>
    </article>
  );
};
