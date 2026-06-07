import type { LucideIcon } from "lucide-react";
import { Target, Search, Globe, Wrench, Smartphone } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  accent: string; // tailwind border + bg accent
  short: string;
  body: string[];
}

export const services: Service[] = [
  {
    slug: "adverteren",
    title: "Adverteren",
    icon: Target,
    accent: "red",
    short:
      "Strategische advertenties die converteren — Google Ads, Facebook Ads, TikTok Ads.",
    body: [
      "Zichtbaarheid is geen toeval, maar het resultaat van een doordachte strategie. Wij ontwikkelen en beheren advertenties die daadwerkelijk presteren. Van het opzetten van complete campagnes tot het optimaliseren van targeting, budget en conversies binnen platforms zoals Google Ads, Facebook Ads en TikTok Ads.",
      "Wij leveren kant-en-klare advertenties die direct inzetbaar zijn, inclusief strategische plaatsing en continue optimalisatie. Daarnaast creëren we hoogwaardige content die aansluit bij jouw merk. Denk aan professionele bedrijfsvideo's, promotievideo's, social media content en korte, pakkende formats zoals TikTok-advertenties en memes. Dit kan zowel op locatie worden geproduceerd als op basis van aangeleverd beeldmateriaal, dat wij bewerken tot converterende advertenties.",
    ],
  },
  {
    slug: "seo",
    title: "Search Engine Optimization (SEO)",
    icon: Search,
    accent: "blue",
    short:
      "Beter vindbaar in Google door technische optimalisatie en sterke content.",
    body: [
      "Met Search Engine Optimization (SEO) zorgen wij ervoor dat jouw website beter vindbaar wordt in zoekmachines zoals Google. Door middel van technische optimalisatie, sterke content en een slimme zoekwoordenstrategie verhogen we jouw positie in de zoekresultaten.",
      "Het doel is niet alleen meer bezoekers, maar vooral de juiste bezoekers — mensen die daadwerkelijk interesse hebben in jouw product of dienst.",
    ],
  },
  {
    slug: "website-ontwikkeling",
    title: "Website / Webshop Ontwikkeling",
    icon: Globe,
    accent: "emerald",
    short:
      "Professionele websites en webshops op maat met focus op conversie.",
    body: [
      "Een sterke online aanwezigheid begint met een professionele website. Wij ontwerpen en ontwikkelen websites en webshops volledig op maat, afgestemd op jouw merk, doelgroep en doelstellingen.",
      "Van structuur en design tot functionaliteit en gebruikservaring: alles wordt gebouwd met focus op conversie, snelheid en schaalbaarheid. Of het nu gaat om een informatieve website of een complete webshop, wij leveren een solide basis voor online groei.",
    ],
  },
  {
    slug: "website-onderhoud",
    title: "Website / Webshop Onderhoud & Optimalisatie",
    icon: Wrench,
    accent: "orange",
    short:
      "Doorlopend onderhoud, snelheidsoptimalisatie en conversie-verbetering.",
    body: [
      "Een bestaande website biedt vaak meer potentie dan wordt benut. Wij analyseren en optimaliseren jouw huidige platform om prestaties te verbeteren.",
      "Dit omvat technische verbeteringen, snelheidoptimalisatie, conversie-optimalisatie en doorlopend onderhoud. Zo blijft jouw website veilig, actueel en maximaal effectief.",
    ],
  },
  {
    slug: "social-media-beheer",
    title: "Social Media Beheer",
    icon: Smartphone,
    accent: "fuchsia",
    short:
      "Volledig beheer van content, planning en interactie op social media.",
    body: [
      "Consistentie en interactie zijn essentieel voor groei op social media. Wij nemen het volledige beheer uit handen: van contentplanning en het plaatsen van berichten tot het beheren van interacties met volgers.",
      "Met een strategische aanpak zorgen we voor een sterke online aanwezigheid, meer betrokkenheid en een groeiende community rondom jouw merk.",
    ],
  },
];
