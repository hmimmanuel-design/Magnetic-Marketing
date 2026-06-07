# Magnetic Marketing

> Don't Chase... ATTRACT

Productie-website voor Magnetic Marketing. Gebouwd op **Next.js 15 (App Router)**, **React 19**, **TypeScript** en **Tailwind CSS**.

## Wat zit erin

- **Lobby-pagina** (`/`) — de gamified ervaring met 6 background themes
- **SEO-pagina's** met server-rendered HTML voor Google:
  - `/diensten` + per-dienst pagina's (`/diensten/[slug]`)
  - `/portfolio`
  - `/contact`
  - `/team/[slug]`
- **Backend voor SEO**:
  - Auto-gegenereerde `sitemap.xml` (`app/sitemap.ts`)
  - Auto-gegenereerde `robots.txt` (`app/robots.ts`)
  - JSON-LD structured data (Organization, WebSite, Service, Person, ItemList, ContactPage)
  - Per-pagina Open Graph + Twitter Card metadata
  - Canonical URLs
- **Beveiliging**:
  - Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
  - Contactformulier via Server Action (geen client-side mailto meer)
  - Honeypot + rate limiting + Zod-validatie in de Server Action
- **Toegankelijkheid**:
  - Modal met Esc-toets sluiten + focus management
  - Viewport ondersteunt zoom (geen `user-scalable=0`)
  - Touch targets ≥ 44 px
  - `prefers-reduced-motion` media query

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul RESEND_API_KEY in
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Doel                              |
| ------------------- | --------------------------------- |
| `npm run dev`       | Dev-server met hot reload         |
| `npm run build`     | Productie-build                   |
| `npm start`         | Productie-build serveren          |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | TypeScript zonder build           |

## Structuur

```
app/                       Next.js App Router
├─ layout.tsx              Root layout, globale SEO, JSON-LD
├─ globals.css             Tailwind + custom animaties
├─ page.tsx                Lobby (rendert LobbyShell)
├─ sitemap.ts              Auto sitemap.xml
├─ robots.ts               Auto robots.txt
├─ not-found.tsx           404-pagina
├─ error.tsx               Error boundary
├─ diensten/page.tsx       Diensten overzicht
├─ diensten/[slug]/        Per-dienst pagina (SSG)
├─ portfolio/page.tsx      Klantregister
├─ contact/page.tsx        Contactformulier
├─ team/[slug]/page.tsx    Founder profielen (SSG)
└─ actions/contact.ts      Server Action voor contactform

lib/
├─ site-config.ts          Bedrijfsdata (gebruikt door SEO, sitemap, etc.)
└─ data/                   Statische content (services, clients, characters)

src/components/            UI-componenten
├─ LobbyShell.tsx          Hoofd client-component met alle modals
├─ BackgroundRenderer.tsx  6 lobby-thema's
├─ ContactForm.tsx         Form met Server Action
├─ ServicesAccordion.tsx   Diensten accordion (gedeeld)
├─ ClientsRegister.tsx     Klantregister (gedeeld)
├─ ProfileCard.tsx         Founder profielkaart
├─ Modal.tsx               Toegankelijke modal
├─ GameButton.tsx          Gestileerde knop
├─ LobbyCharacter.tsx      Character met speech bubble
├─ SiteHeader.tsx          Header voor interne pagina's
└─ SiteFooter.tsx          Footer voor interne pagina's
```

## Vercel deployment

Zie `DEPLOY.md`.
