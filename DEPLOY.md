# Deploy stap-voor-stap

Volg deze volgorde precies. Sla geen stappen over.

---

## 1. Resend (e-mailservice) — 5 min

1. Ga naar [resend.com](https://resend.com) en maak een gratis account.
2. **Domains → Add Domain** → typ `marketing-magnetic.nl`.
3. Resend toont 3 DNS-records (TXT, MX, of CNAME records). **Open GoDaddy in een tweede tabblad.**
4. In GoDaddy → DNS Management van `marketing-magnetic.nl` → voeg ALLE drie records toe exact zoals Resend ze toont.
5. Wacht ~5 minuten en klik in Resend op **Verify**. Wacht tot het groen wordt.
6. **API Keys → Create API Key**. Naam: `magnetic-marketing-prod`. Permission: **Sending access**. Kopieer de key (begint met `re_…`) — bewaar 'm even.

---

## 2. Vercel account & project — 5 min

1. Ga naar [vercel.com](https://vercel.com) → **Sign Up** → kies **Continue with GitHub**.
2. Klik **Add New → Project**.
3. Kies de repo `hmimmanuel-design/Magnetic-Marketing` en klik **Import**.
4. **Framework Preset** wordt automatisch herkend als **Next.js**. Niet wijzigen.
5. Klap **Environment Variables** open en voeg toe:

   | Name              | Value                                                          |
   | ----------------- | -------------------------------------------------------------- |
   | `RESEND_API_KEY`  | de key uit stap 1 (begint met `re_`)                           |
   | `RESEND_FROM`     | `Magnetic Marketing <noreply@marketing-magnetic.nl>`           |

6. Klik **Deploy**. Wacht ~2 minuten tot het groen is.
7. Je krijgt een tijdelijke URL zoals `magnetic-marketing-xxx.vercel.app`. Open 'm — de site moet draaien.

---

## 3. Domein koppelen — 10 min

### In Vercel
1. Project → **Settings → Domains**.
2. Type `marketing-magnetic.nl` en klik **Add**.
3. Type ook `www.marketing-magnetic.nl` → Add → kies **Redirect to marketing-magnetic.nl**.
4. Vercel toont nu welke DNS-records je in GoDaddy moet zetten.

### In GoDaddy
1. Log in op [godaddy.com](https://godaddy.com) → **My Products → marketing-magnetic.nl → DNS**.
2. **Verwijder eerst** de bestaande records die naar het oude marketing-programma wijzen:
   - Eventuele `A`-records op `@` (de root)
   - Eventuele `CNAME` op `www`
3. Voeg toe:

   | Type   | Name | Value                  | TTL  |
   | ------ | ---- | ---------------------- | ---- |
   | `A`    | `@`  | `76.76.21.21`          | 600  |
   | `CNAME`| `www`| `cname.vercel-dns.com` | 600  |

   (Vercel toont de exacte waardes; gebruik die als ze afwijken.)
4. Sla op. Het duurt 5–60 minuten voor DNS wereldwijd doorzet.
5. Terug in Vercel → **Refresh** bij de domein-status. Hij wordt groen zodra DNS klopt. Vercel voorziet automatisch HTTPS via Let's Encrypt.

---

## 4. Google Search Console — 5 min

1. Ga naar [search.google.com/search-console](https://search.google.com/search-console).
2. **Add Property → URL prefix** → typ `https://marketing-magnetic.nl/`.
3. Kies verificatie via **HTML tag**. Kopieer de `<meta name="google-site-verification" content="XXXXX" />` waarde (alleen de XXXXX).
4. Open in VS Code `app/layout.tsx`, zoek `verification:` en voeg toe:

   ```ts
   verification: {
     google: "XXXXX-hier-de-content-plakken",
   },
   ```

5. Commit en push — Vercel deployt automatisch. Wacht 1 minuut.
6. Klik in Search Console op **Verify**. Wordt groen.
7. **Sitemaps → Add a new sitemap** → typ `sitemap.xml` → Submit.
8. Klaar. Google begint binnen 1–14 dagen met indexeren.

---

## 5. Bing Webmaster Tools (optioneel maar gratis) — 2 min

1. Ga naar [bing.com/webmasters](https://www.bing.com/webmasters) → log in met Microsoft-account.
2. **Import from Google Search Console** → kies de net toegevoegde site → Import.
3. Bing pakt de sitemap automatisch over.

---

## 6. Vercel Analytics & Speed Insights (gratis tier) — 1 min

1. Vercel-dashboard → Project → **Analytics** tab → **Enable**.
2. **Speed Insights** tab → **Enable**.

Geen code-wijziging nodig — Vercel injecteert zelf.

---

## 7. Verificatie — 5 min

Test op de productie-URL:

- [ ] `/` — lobby laadt, 6 thema's wisselen werkt, modals openen
- [ ] `/diensten` — alle 5 diensten zichtbaar, accordion werkt
- [ ] `/diensten/adverteren` — server-rendered tekst zichtbaar
- [ ] `/portfolio` — klantregister
- [ ] `/contact` — formulier verstuurt e-mail naar sam@marketing-magnetic.nl
- [ ] `/team/sam-de-bruin` en `/team/micha-hasselaar` — beide laden
- [ ] `/sitemap.xml` — toont alle URL's
- [ ] `/robots.txt` — toont `Sitemap: https://marketing-magnetic.nl/sitemap.xml`
- [ ] In Chrome DevTools → Network → Headers: zie je `Strict-Transport-Security` en `X-Frame-Options: DENY`?

---

## Klaar

Elke `git push` naar `main` triggert automatisch een nieuwe productie-deploy.

Pull requests krijgen automatisch een preview-URL — handig om wijzigingen te testen voor ze live gaan.
