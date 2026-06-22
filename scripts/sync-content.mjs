// Synchronise le contenu (gammes + conseils) depuis l'API vers lib/*.data.json.
// Lancé automatiquement avant chaque build (script "prebuild").
// En cas d'échec (API indisponible), on garde le dernier contenu synchronisé : le build réussit quand même.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const libDir = path.resolve(__dirname, '../lib');

// Charge .env.local (ce script tourne hors de Next, qui sinon lirait le fichier lui-même).
function loadEnvLocal() {
  try {
    const file = path.resolve(__dirname, '../.env.local');
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* pas de .env.local — on continue */
  }
}
loadEnvLocal();

const API = process.env.CONTENT_API_URL;

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return r.json();
}

// Retire les champs propres à MongoDB pour garder un JSON identique au contenu éditorial.
function strip(doc) {
  const { _id, __v, createdAt, updatedAt, order, ...rest } = doc;
  return rest;
}

async function main() {
  if (!API) {
    console.warn('[sync] CONTENT_API_URL non défini — conservation de lib/*.data.json existants');
    return;
  }
  try {
    const [products, conseils, settings] = await Promise.all([
      fetchJson(`${API}/api/products`),
      fetchJson(`${API}/api/conseils`),
      fetchJson(`${API}/api/settings`),
    ]);
    fs.writeFileSync(
      path.join(libDir, 'products.data.json'),
      JSON.stringify(products.map(strip), null, 2)
    );
    fs.writeFileSync(
      path.join(libDir, 'conseils.data.json'),
      JSON.stringify(conseils.map(strip), null, 2)
    );
    // Coordonnées éditables (téléphone, WhatsApp) — fusionnées dans lib/site.js.
    fs.writeFileSync(
      path.join(libDir, 'site.data.json'),
      JSON.stringify(
        {
          phoneDisplay: settings?.phoneDisplay || '',
          whatsapp: settings?.whatsapp || '',
        },
        null,
        2
      )
    );
    console.log(`[sync] ${products.length} gammes, ${conseils.length} conseils + paramètres synchronisés`);
  } catch (e) {
    console.warn('[sync] échec — conservation du contenu existant :', e.message);
  }
}

main();
