# AGROPHARMA TCHAD — API admin (Express + Mongoose + Cloudinary)

Backend du tableau de bord `/admin` du site. Gère **produits** et **conseils**, l'authentification
(propriétaire unique), l'upload d'images (Cloudinary) et le déclenchement de la republication du
site (build hook Netlify).

Le site public reste **statique** : il lit le contenu au moment du build via
`scripts/sync-content.mjs` (racine du projet). Modifier le contenu dans l'admin n'apparaît en ligne
qu'après un clic sur **« Publier les modifications »** (reconstruction Netlify, 1–2 min).

```
Admin (/admin, navigateur)  ──►  API Express (Render)  ──►  MongoDB Atlas
                                        │
                                        ├─►  Cloudinary (images)
                                        └─►  Netlify Build Hook (republication)
Build Netlify  ──►  sync-content.mjs  ──►  lib/*.data.json  ──►  site statique
```

## 1. Comptes à créer (gratuit)

### MongoDB Atlas
1. Créez un compte sur https://www.mongodb.com/cloud/atlas → cluster **M0 (Free)**.
2. **Database Access** : créez un utilisateur + mot de passe.
3. **Network Access** : ajoutez `0.0.0.0/0` (ou l'IP de Render) pour autoriser la connexion.
4. **Connect → Drivers** : copiez l'URI `mongodb+srv://…` → c'est `MONGODB_URI`
   (ajoutez le nom de base, ex. `…mongodb.net/agropharma?retryWrites=true&w=majority`).

### Cloudinary
1. Créez un compte sur https://cloudinary.com.
2. Dans le **Dashboard**, copiez **Cloud name**, **API Key**, **API Secret**.

## 2. Configuration locale

```bash
cd server
cp .env.example .env      # puis remplissez les valeurs
npm install
npm run seed              # crée l'admin + importe le contenu actuel (semences, conseils…)
npm run dev               # API sur http://localhost:4000
```

`npm run seed` :
- crée le compte admin à partir de `ADMIN_EMAIL` / `ADMIN_PASSWORD` ;
- importe `lib/products.data.json` et `lib/conseils.data.json` **si la base est vide**
  (ne réimporte pas par-dessus vos modifications).

> Relancer `npm run seed` après avoir changé `ADMIN_PASSWORD` met le mot de passe à jour.

## 3. Lancer l'admin en local

À la racine du projet (pas dans `server/`) :

```bash
# .env.local à la racine
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
npm run dev    # site + admin sur http://localhost:3000
```

Ouvrez **http://localhost:3000/admin** → connectez-vous → modifiez produits / conseils.

## 4. Tester la chaîne de publication en local

```bash
# régénère lib/*.data.json depuis l'API, puis build statique
CONTENT_API_URL=http://localhost:4000 npm run build
npx serve out      # vérifier le rendu
```

## 5. Mise en production

### Backend → Render (ou Railway)
1. Nouveau **Web Service** pointant sur ce dépôt, **Root Directory** = `server`.
2. Build command : `npm install` — Start command : `npm start`.
3. **Environment** : ajoutez toutes les variables de `.env.example`
   (`MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   `CORS_ORIGIN`, `NETLIFY_BUILD_HOOK_URL`).
   - `CORS_ORIGIN` = `https://VOTRE-SITE.netlify.app,https://agropharmatchad.com`
4. Déployez, puis exécutez le seed une fois (Render → **Shell** : `npm run seed`).
5. Notez l'URL publique de l'API, ex. `https://agropharma-api.onrender.com`.

### Netlify (site)
1. **Site settings → Environment variables** :
   - `NEXT_PUBLIC_API_URL` = URL de l'API Render
   - `CONTENT_API_URL` = URL de l'API Render
2. **Build & deploy → Build hooks** : créez un hook, copiez l'URL → mettez-la dans
   `NETLIFY_BUILD_HOOK_URL` côté Render.
3. Redéployez le site.

### Vérification finale
- `/admin` (en ligne) : connexion OK, création/édition produit + article, upload image (visible sur
  Cloudinary), bouton **Publier** → un nouveau build Netlify démarre et le contenu apparaît.

## Notes
- L'offre gratuite Render **met l'API en veille** après inactivité : la première requête peut prendre
  ~30 s (démarrage à froid).
- Si l'API est indisponible au build, `sync-content.mjs` conserve le dernier contenu synchronisé :
  le build du site réussit quand même.
