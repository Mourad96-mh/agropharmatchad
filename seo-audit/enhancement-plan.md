# SEO Enhancement Plan — AGROPHARMA TCHAD

Round 2, building on the completed code-side audit (`report.md`, `STATUS.md`). 2026-06-21.
Three workstreams you asked for: **(A) fresh re-audit**, **(B) new guides content**, **(C) competitor analysis**.

> **Status update (2026-06-21):** Internal linking is now **DONE and verified in the build** — the 6 new
> guides shipped (9 total), every guide links to its product pages (in-body + "Produits associés" block),
> **product pages now link back to their guides** ("À lire pour bien utiliser cette gamme"), making the
> graph bidirectional, and the previously thin `proteger-cultures-nuisibles` was enriched to 3 in-body links.
> `llms.txt` refreshed; domain switched to non-www `agropharmatchad.com` with a www→apex 301 in `netlify.toml`.
> 0 broken internal links, 19-URL sitemap, canonicals clean. **Still open:** naming Technisem varieties (needs
> client input) and the maïs/graines-de-fleurs catalogue decision.

The site is already technically excellent — SEO/A11y/Best-Practices 100, clean JSON-LD (LocalBusiness,
ItemList, FAQPage, Article, Breadcrumb), correct sitemap/robots, AI-crawler allows, branded OG. So this
round is about **content depth, internal linking, and entity freshness** — not fixing broken technicals.

---

## A. Fresh re-audit — findings

Audited the current source and the prerendered HTML in `out/`. Five things stood out; the rest is clean.

1. **Guides articles have zero internal links to product pages (highest-value fix).** ✅ **FIXED**
   The 3 conseils were well-written but plain text — no links from "semer la tomate" to
   `/produits/semences-maraicheres`, etc. Now every guide carries in-body keyword-anchor links + a
   "Produits associés" block, **and** product pages link back via "À lire pour bien utiliser cette gamme"
   (bidirectional). Verified in the build: 0 broken internal links.

2. **`llms.txt` is stale vs. the live site.** ✅ **FIXED** — refreshed to cover all 9 Conseils, real
   phone/WhatsApp, the 7-city areaServed, and the non-www domain. Matches the live schema now.

3. **Thin guides library (only 3 articles).** ✅ **DONE** — grown to 9 articles (see section B). Further
   growth optional; the `/conseils` blog is now a real content lane, not a stub.

4. **Seeds page lists generic types, not named varieties.** It says "Tomate", "Oignon", "Pastèque" —
   the competitor names cultivars (Cobra 34, Safari, Kayack…). Growers search variety names; naming the
   Technisem varieties you actually stock captures that long-tail and matches buyer intent. (Needs your
   confirmation of which varieties you carry — see open question.)

5. **Article schema is minimal.** `datePublished == dateModified`, no `inLanguage`, no `about`/`mentions`
   linking the article to its product category entity. Low effort, small but real GEO/relevance gain.

Everything else verified clean: single H1 per page, titles within length and de-duplicated, canonicals,
FAQPage on home, LocalBusiness with geo/hours/areaServed, sitemap covers all 13 URLs, robots allows AI bots.

---

## B. New guides content (the organic lever)

Plan: grow `/conseils` from 3 → ~9 articles, each Chad/Sahel-anchored, each targeting a real long-tail
intent, and each internally linked to the relevant product category + a WhatsApp CTA. Proposed new articles:

| # | Slug | Title | Primary intent | Links to |
|---|------|-------|----------------|----------|
| 1 | `culture-tomate-tchad` | Réussir la culture de la tomate au Tchad | culture / semis tomate Tchad | semences-maraicheres, phyto |
| 2 | `culture-oignon-tchad` | Cultiver l'oignon au Tchad : semis, repiquage, conservation | oignon Tchad / contre-saison | semences-maraicheres |
| 3 | `irrigation-goutte-a-goutte-saison-seche` | Irrigation goutte-à-goutte en saison sèche | irrigation maraîchère Tchad | materiels-agricoles |
| 4 | `choisir-semences-hybrides-f1` | Semences hybrides F1 ou variétés locales : comment choisir | semences F1 / graines potagères | semences-maraicheres |
| 5 | `lutte-mouche-blanche-pucerons` | Lutter contre la mouche blanche et les pucerons | insecticide maraîchage Tchad | produits-phytosanitaires |
| 6 | `preparer-pepiniere-maraichere` | Préparer une pépinière maraîchère réussie | pépinière / semis maraîcher | semences-maraicheres, phyto |

Each follows the existing `lib/conseils.js` structure (slug, title, excerpt, date, readtime, image, intro,
body blocks) so they render in the current template with zero new components, and they auto-appear in the
sitemap and the home teaser. I'll also retrofit the **3 existing articles** with contextual product links.

Net effect: 9 indexable, intent-matched pages funneling to 5 money pages, plus a denser internal link graph.

---

## C. Competitor analysis — Semagri (semagricmr.com)

Same group as you: **Novalliance / Technisem distributor**, based in Douala, Cameroon. WordPress site,
~28 years, multi-brand (Technisem, Tropica, Jardinova, Vilmorin-Mikado, Takii, Known-You).

**Where they're stronger (copy these):**
- **Named-variety product detail** — individual cultivars with descriptions (Cobra 34 tomato, Safari onion,
  Kayack watermelon, Simbad pepper, Green Coronet cabbage). This is product depth you can match cheaply
  by naming the Technisem varieties you stock (re-audit finding #4).
- **Brand-authority signal** — a strip of supplier logos. You name Technisem/Savana in text; a visible
  "marques représentées" logo strip would reinforce trust and the entity.

**Where they're weaker (your opening):**
- **No grower how-to content.** Their "blog/Actualités" is corporate news (staff meetings, Novalliance
  party), not "how to grow tomato". Your Chad-anchored guides (section B) own a content lane they've left
  empty — this is your durable SEO wedge.
- **Broken/placeholder links** — several CTAs still point to the theme demo (`demo.artureanec.com`),
  a credibility and crawl-quality weakness.
- **Cameroon geo, not Chad.** They don't compete for your local "au Tchad / N'Djamena" searches at all,
  and you already own LocalBusiness schema + GBP for that market.

**Strategy:** match their product depth (name varieties), out-publish them on grower guides, and lean on
your Chad-local signals — a market they don't target.

---

## Implementation order — progress

1. ✅ **Done.** Retrofitted internal product links into the existing guides + enriched Article schema
   (`inLanguage`, `about`, `isPartOf`). Also added reverse links (product → guide) for a bidirectional graph.
2. ✅ **Done.** Added the 6 new guides to `lib/conseils.js` (auto-flowing into pages, sitemap, home teaser).
3. ✅ **Done.** Refreshed `llms.txt` (Conseils section, phone/WhatsApp, real areaServed cities, non-www domain).
4. ⏳ **Pending client input.** Name Technisem varieties on the seeds page (brand logo strip already live
   via the home "Partenaires" section — Technisem / Savana / Coda).
5. ✅ **Done.** Built and re-verified prerendered HTML: **19-URL sitemap**, clean canonicals (non-www),
   1 H1/page, 0 invalid JSON-LD, 0 broken internal links.

## Open questions for you

- **Variety names:** which Technisem varieties do you actually stock (so I can name them accurately)? If
  you'd rather not, I'll skip step 4 and keep generic types.
- **Guides:** OK with the 6 topics above, or want to add/drop/reprioritize any?
- **Images:** new guides will reuse existing category photos unless you have specific ones to add.
