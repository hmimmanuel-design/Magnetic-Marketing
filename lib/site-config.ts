/**
 * Central configuration used by every page, sitemap, JSON-LD, and metadata.
 * Edit values here once — they propagate through the whole site.
 */
export const siteConfig = {
  name: "Magnetic Marketing",
  tagline: "Don't Chase... ATTRACT",
  description:
    "Magnetic Marketing is een Nederlands marketingbureau gespecialiseerd in adverteren, SEO, website- en webshopontwikkeling, onderhoud en social media beheer. Don't Chase, ATTRACT.",
  shortDescription:
    "Marketingbureau voor adverteren, SEO, websites en social media.",
  url: "https://marketing-magnetic.nl",
  ogImage: "/og-image.png",
  locale: "nl_NL",
  email: "sam@marketing-magnetic.nl",
  phone: "+31615480931",
  phoneDisplay: "06 15480931",
  founders: [
    {
      slug: "sam-de-bruin",
      name: "Sam de Bruin",
      role: "Founder",
    },
    {
      slug: "micha-hasselaar",
      name: "Micha Hasselaar",
      role: "Founder",
    },
  ],
  social: {
    // Vul aan zodra accounts bekend zijn
    instagram: "",
    linkedin: "",
    facebook: "",
  },
  keywords: [
    "marketingbureau",
    "online marketing",
    "SEO",
    "Google Ads",
    "Facebook Ads",
    "TikTok Ads",
    "social media marketing",
    "website ontwikkeling",
    "webshop ontwikkeling",
    "website onderhoud",
    "contentcreatie",
    "Magnetic Marketing",
    "marketing magnetic",
    "Nederland",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
