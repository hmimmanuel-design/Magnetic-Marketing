import type { CharacterConfig } from "@/src/types";

export const characters: CharacterConfig[] = [
  {
    name: "Micha Hasselaar",
    role: "Founder",
    hairColor: "black",
    outfitColor: "blue",
    isReady: true,
    avatarSeed: "micha",
    imageUrl:
      "https://github.com/hmimmanuel-design/gym-assets/blob/main/micha%20personage.png?raw=true",
    speechText:
      "Micha, Aangenaam. U kunt altijd bij me terecht voor een sparsessie over de gehele aanpak. Van het karakter wat het bedrijf zelf wilt uitstralen tot aan de marketing strategieën die we kunnen toepassen.",
  },
  {
    name: "Sam de Bruin",
    role: "Founder",
    hairColor: "blond",
    outfitColor: "red",
    isReady: true,
    avatarSeed: "sam",
    imageUrl:
      "https://github.com/hmimmanuel-design/gym-assets/blob/main/sam%20personage.png?raw=true",
    speechText:
      "Hoi ik ben Sam. Ik ben een groot voorstander van gelijk gas geven. Geen tijd te verspillen. Herkent u zichzelf daarin. Neem contact op dan gaan we aan de gang!",
  },
];

export interface FounderProfile {
  slug: string;
  name: string;
  role: string;
  accent: "red" | "blue";
  portraitUrl: string;
  bio: string[];
  specialisations: string[];
  education: string;
}

export const founderProfiles: Record<string, FounderProfile> = {
  "sam-de-bruin": {
    slug: "sam-de-bruin",
    name: "Sam de Bruin",
    role: "Founder",
    accent: "red",
    portraitUrl:
      "https://github.com/hmimmanuel-design/Magnetic-marketing-website/blob/main/Profiel%20Foto.jpeg?raw=true",
    bio: [
      "Sam heeft een sterke basis in marketing en sales door zijn opleiding Commerciële Economie in Utrecht. Deze opleiding vormt de kern van zijn strategische inzicht in klantgedrag, positionering en conversie.",
      "Daarnaast heeft hij op Het Streek Lyceum het vak Cultuur en Media gevolgd, waar hij zich heeft ontwikkeld in contentcreatie en visuele communicatie. Deze combinatie van analytisch denken en creatieve uitvoering maakt hem sterk in het ontwikkelen van effectieve marketingstrategieën die ook daadwerkelijk converteren.",
    ],
    specialisations: [
      "Marketingstrategie",
      "Salesgerichte campagnes",
      "Contentontwikkeling",
    ],
    education: "Commerciële Economie (Utrecht), Cultuur en Media",
  },
  "micha-hasselaar": {
    slug: "micha-hasselaar",
    name: "Micha Hasselaar",
    role: "Founder",
    accent: "blue",
    portraitUrl:
      "https://github.com/hmimmanuel-design/Magnetic-marketing-website/blob/main/img_0873-high.webp?raw=true",
    bio: [
      "Micha combineert praktijkervaring met een sterke basis in content en media. Hij heeft een jaar gewerkt op kantoor bij een uitzendbureau, waar hij verantwoordelijk was voor social media marketing en tegelijkertijd een leidinggevende rol vervulde op de werkvloer.",
      "Zijn ervaring ligt in het aansturen van processen, het creëren van content en het optimaliseren van zichtbaarheid via social media. Daarnaast heeft hij op Het Streek Lyceum het vak Cultuur en Media gevolgd, met focus op editen en contentcreatie.",
      "Deze combinatie zorgt voor een praktische en resultaatgerichte aanpak, waarbij content niet alleen goed oogt, maar ook functioneert.",
    ],
    specialisations: [
      "Social media marketing",
      "Contentcreatie",
      "Teamleiding",
      "Uitvoering",
    ],
    education: "Cultuur en Media (Het Streek Lyceum)",
  },
};
