# Open items — must be done before / around launch

The audit closed everything code-side. These need **client data or external action** and the audit
cannot close them itself. *Last refreshed 2026-06-21.*

## Blocking (real data still placeholder in `lib/site.js`)

- [ ] **Domain** — replace `https://www.agropharmatchad.com` with the real domain (drives canonicals,
      sitemap, JSON-LD, OG URLs). If the domain differs, one find/replace in `site.js` fixes all.
- [ ] **Email** — `contact@agropharmatchad.com` is a guess; confirm or remove.

## Resolved since the original audit ✅

- [x] **Phone / WhatsApp** — now the **real** number `+235 93 16 62 02` / `23593166202` in `site.js`
      (was placeholder `+235 66 00 00 00`). Feeds schema `telephone`, footer, and WhatsApp devis.
- [x] **Engrais brand** — resolved as **Coda**; now live in the home "Partenaires" logo strip
      alongside Technisem (semences) and Savana (phyto).
- [x] **Guides culturales blog** — built and expanded to **9 articles** under `/conseils`, each
      Chad-anchored and internally linked to the relevant product page (see content opportunities below).

## Recommended (local SEO — highest ROI for a Chad vitrine)

- [x] **Google Business Profile** — confirmed live (Google entity `/g/11k9fn3yvd`, CID
      `9100128792982484637`). Schema `hasMap` now points to the stable `?cid=` URL. ⚠️ The listing
      locale is **fr-MA** (managed from a Morocco account) — verify NAP on it matches the site exactly.
- [x] **Geo coordinates** — added to schema: `12.1330982, 15.0653532` (from the GBP pin).
- [x] **Opening hours** set to **24h/24, 7j/7** (schema: all 7 days 00:00–23:59). Make sure the GBP listing says the same.

## Post-deploy (can't verify from the repo)

- [ ] Submit `sitemap.xml` in **Google Search Console**; verify the property; request indexing for
      the 5 money pages.
- [ ] Test a real share (Facebook/WhatsApp) to confirm `og-default.jpg` renders.
- [ ] Paste a deployed money-page URL into the **Rich Results Test** to confirm LocalBusiness +
      ItemList eligibility on Google's side (no public API; needs a live URL).
- [ ] Wire the **contact form** endpoint (currently composes a WhatsApp message — confirm that's the
      intended flow, no backend).

## Content opportunities (optional, from keyword data)

- [ ] Decide on **maïs** and **graines de fleurs** (real search volume, not in catalogue).
- [x] **Guides culturales blog** — done: 9 Chad-anchored articles under `/conseils`, internally linked
      to the money pages. Further growth optional.
- [ ] **Name Technisem varieties** on the seeds page (e.g. Cobra 34, Safari, Kayack) instead of generic
      types — needs client confirmation of which varieties are actually stocked. See `enhancement-plan.md`.
