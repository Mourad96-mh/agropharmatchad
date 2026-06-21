# SEO Audit — AGROPHARMA TCHAD — STATUS

**Overall: ✅ Complete (code-side).** Open items below need client data before launch.

Project type: **Vitrine / local business** · Stack: **Next.js 15 (App Router), SSG** · Lang: **fr** · Market: **Tchad**
Audited against the prerendered HTML in `.next/server/app/` (ground truth). Date: 2026-06-15.

| Phase | Area | Status | Notes |
|---|---|---|---|
| 0 | Build & inventory | ✅ | 10 HTML pages prerender clean (14 routes incl. sitemap/robots) |
| 1 | Per-page meta | ✅ | Titles trimmed, brand de-dup, descriptions de-truncated, OG fixed |
| 1b | Keyword targeting | ✅ | `keyword-brief.md`; geo mismatch + gammes gap documented; on-page enriched |
| 2 | Structured data (JSON-LD) | ✅ | Store→full LocalBusiness; ItemList on category pages; 21 blocks, 0 invalid |
| 2c | GEO / LLM | ✅ | `llms.txt`, AI-crawler allows, knowsAbout/sameAs entity signals |
| 3 | Sitemap + robots | ✅ | 9 URLs, all routes covered; robots allows + absolute sitemap |
| 4 | OG share image | ✅ | Branded 1200×630 `og-default.jpg` (was portrait logo) |
| 5/6 | Page weight & images | ✅ | next/image auto AVIF/WebP; banner→WebP; favicon added |
| 7 | Lighthouse | ✅ | See scores below |
| 8 | Launch checklist + report | ✅ | `report.md`, `open-items.md` |

## Lighthouse (localhost production build, Edge headless)

| Page | Perf | SEO | A11y | Best-Pr. | LCP | CLS |
|---|---|---|---|---|---|---|
| Home `/` | 93 | **100** | **100** | **100** | 3.3s | 0 |
| Seeds `/produits/semences-maraicheres` | 97 | **100** | **100** | **100** | 2.6s | 0 |

LCP is lab/cold-start on localhost; production CDN will improve it. CLS perfect.

See `report.md` for before→after detail and `open-items.md` for what the client must supply.
