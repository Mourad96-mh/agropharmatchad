# SEO Audit Report — AGROPHARMA TCHAD

Vitrine / local-business site (agri-inputs, N'Djamena, Chad). Next.js 15 App Router, SSG, French.
Audited against prerendered HTML in `.next/server/app/`. 2026-06-15.

## Result at a glance
- **SEO 100 / Accessibility 100 / Best-Practices 100** on home and the seeds money page.
- **Performance 93 (home) / 97 (seeds)**, CLS 0.
- 21 JSON-LD blocks across the site, **0 invalid**.

## What was fixed (before → after)

### Phase 1 — Per-page meta
| Issue | Before | After |
|---|---|---|
| Brand duplicated in titles | `À propos — AGROPHARMA TCHAD \| AGROPHARMA TCHAD` | `À propos \| AGROPHARMA TCHAD` (same for Contact) |
| Home title too long | 79 chars | `AGROPHARMA TCHAD — Semences & intrants agricoles au Tchad` (61) |
| Home description too long | 177 chars | 135 chars |
| Category descriptions cut mid-word | `…Idéals p`, `…acarici` (`intro.slice(0,155)`) | word-boundary slice, clean endings |
| **OG image missing on all 5 money pages** | empty `og:image` | each category now emits its own photo as `og:image` |

### Phase 2 — Structured data
- Upgraded site-wide `Store` JSON-LD with `openingHoursSpecification`, `hasMap` (Google Maps listing),
  `knowsAbout`, `currenciesAccepted: XAF`, and `sameAs` (**real Facebook + TikTok** profiles found
  during research).
- Added `ItemList` schema to every category page (lists the products/varieties); `BreadcrumbList`
  already present. All validated — 0 errors.

### Phase 2c — GEO / LLM optimization
- `public/llms.txt` — dense, factual brief (NAP, gammes, links) for AI answer engines.
- `robots.txt` now explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, Google-Extended,
  PerplexityBot, CCBot, etc.
- Entity signals (`knowsAbout`, `sameAs`, full NAP in text + schema) so ChatGPT/Claude/Gemini
  describe the business correctly.

### Phase 4 — OG share image
- Generated a branded **1200×630** `og-default.jpg` (logo + name + slogan + gammes on brand-green
  gradient). Was the portrait logo (1000×1083), which renders badly on social.

### Phase 5/6 — Weight & images
- All images already go through **next/image** → automatic AVIF/WebP, lazy-load below the fold,
  width/height set (CLS 0).
- The category **page-hero banner** was a raw CSS-background JPEG (the LCP element) → now serves a
  **WebP** (e.g. seeds banner 188 KB → 120 KB), improving LCP and passing `modern-image-formats`.
- Added a **favicon** (`app/icon.png`) — removed a site-wide **404** (console error).

### Phase 7 — Lighthouse fixes
| Audit | Before | After |
|---|---|---|
| color-contrast | FAIL (footer phone/email = green-dark on dark, 3.09) | PASS (recolored to `#cdd8cf`) |
| errors-in-console | 1 (favicon 404) | 0 |
| heading-order | FAIL (h2→h4 jump at footer) | PASS (footer headings → h3) |
| modern-image-formats (seeds) | FAIL (JPEG banner) | PASS (WebP banner) |
| **Accessibility** | 94 / 96 | **100 / 100** |
| **Best-Practices** | 96 | **100** |
| **Performance** | 89 / 93 | **93 / 97** |

## Keyword analysis (Phase 1b)
See `keyword-brief.md`. Headline findings: the planner export is **France/Cameroun-weighted (MAD,
no Tchad)** and **only covers the seeds gamme** (engrais/matériel = 0 data). Strategy = win local +
branded searches cheaply, use the real French seed vocabulary on the seeds page (applied), and
consider maïs/flower-seed + a guides blog as growth (client decision).

## Files changed
`app/layout.js` · `app/{a-propos,contact,produits}/page.js` · `app/produits/[slug]/page.js` ·
`app/robots.js` · `app/components.css` · `app/icon.png` · `components/Footer.js` · `lib/site.js` ·
`lib/products.js` · `public/llms.txt` · `public/og-default.jpg` · `public/images/*.webp` ·
`scripts/make-og.mjs`
