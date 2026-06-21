# AGROPHARMA TCHAD — Site vitrine

Site vitrine **Next.js (App Router) + CSS pur** pour AGROPHARMA TCHAD :
semences maraîchères, produits phytosanitaires, engrais liquides & solides, matériels agricoles.

> *« Le choix de la qualité »*

## Démarrage

```bash
npm install      # déjà fait
npm run dev      # développement  → http://localhost:3000
npm run build    # build de production (export statique SSG)
npm run start    # sert le build de production
```

## ⚠️ À personnaliser avant la mise en ligne

Toutes les coordonnées sont centralisées dans **`lib/site.js`**. Remplacez :

| Champ | Valeur actuelle (placeholder) | À remplacer par |
|-------|-------------------------------|-----------------|
| `url` | `https://www.agropharmatchad.com` | le vrai nom de domaine |
| `phoneDisplay` / `phoneHref` | `+235 93 16 62 02` ✅ configuré | — |
| `whatsapp` | `23593166202` ✅ configuré | numéro WhatsApp (format international, sans `+` ni espaces) — à confirmer s'il diffère du téléphone |
| `email` | `contact@agropharmatchad.com` | le vrai email |
| `address` | Avenue Charles de Gaulle, N'Djamena | la vraie adresse |
| `hours` | Lun–Sam 8h–18h | les vrais horaires |

Le **catalogue produits** se modifie dans **`lib/products.js`** (5 gammes, descriptions, articles).

## Structure

```
app/
  layout.js              en-tête, pied de page, SEO global, JSON-LD (Store)
  page.js                accueil
  produits/page.js       liste des gammes
  produits/[slug]/       page détail par gamme (SSG)
  a-propos/page.js
  contact/page.js        coordonnées + formulaire de devis
  sitemap.js / robots.js
components/               Header, Footer, QuoteForm, FloatingWhatsApp, Icons
lib/site.js              ← coordonnées du client
lib/products.js          ← catalogue
public/logo.jpeg         logo
```

## Formulaire de devis

Le formulaire (`components/QuoteForm.js`) **n'a pas besoin de backend** : il compose
automatiquement un message WhatsApp pré-rempli et l'ouvre dans WhatsApp. Boutons
téléphone et WhatsApp disponibles partout (+ bouton flottant).

## SEO

- Métadonnées par page (title/description/canonical/OpenGraph) en français.
- JSON-LD : `Store` (global), `ItemList` (produits), `BreadcrumbList` (pages gammes).
- `sitemap.xml` et `robots.txt` générés automatiquement (mettre à jour `url` dans `lib/site.js`).
- Image OpenGraph = logo. Pour un meilleur partage social, prévoir une image 1200×630.

## Déploiement

Compatible **Vercel** (recommandé) ou tout hébergeur Node. Pensez à définir le bon
domaine dans `lib/site.js` avant le build pour que le sitemap et les URLs canoniques soient corrects.
