// Import (one-shot) du catalogue complet committé vers MongoDB.
//
// Contexte : les variétés et le détail des articles avaient été ajoutés directement dans
// lib/products.data.json (et conseils.data.json) puis committés, mais jamais enregistrés en
// base (le seed n'importe que si la collection est vide). Résultat : la base était plus pauvre
// que le site. Avec le rendu « runtime fetch », la base devient la source de vérité — ce script
// y pousse donc le contenu complet pour qu'elle corresponde au site.
//
// Effet : remplace intégralement gammes + conseils par le contenu des fichiers JSON committés.
//         Les PARAMÈTRES (téléphone, WhatsApp, image d'accueil) ne sont PAS touchés.
//
// Lancer depuis le dossier server/ :  node scripts/import-content.mjs

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';

import Category from '../src/models/Category.js';
import Conseil from '../src/models/Conseil.js';
import Settings from '../src/models/Settings.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const libDir = path.resolve(__dirname, '../../lib');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(libDir, file), 'utf8'));

// Remplace entièrement une collection par le contenu d'un tableau, en respectant l'ordre.
async function syncCollection(Model, label, docs) {
  const slugs = [];
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    if (!doc.slug) {
      console.warn(`  [${label}] élément #${i} sans slug — ignoré`);
      continue;
    }
    await Model.replaceOne(
      { slug: doc.slug },
      { ...doc, order: i },
      { upsert: true }
    );
    slugs.push(doc.slug);
  }
  // Supprime ce qui n'existe plus dans le JSON, pour que la base corresponde exactement.
  const removed = await Model.deleteMany({ slug: { $nin: slugs } });
  return { count: slugs.length, removed: removed.deletedCount || 0 };
}

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI manquant dans server/.env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connecté');

  const categories = readJson('products.data.json');
  const conseils = readJson('conseils.data.json');

  const cat = await syncCollection(Category, 'gammes', categories);
  console.log(`Gammes importées : ${cat.count} (supprimées : ${cat.removed})`);

  const con = await syncCollection(Conseil, 'conseils', conseils);
  console.log(`Conseils importés : ${con.count} (supprimés : ${con.removed})`);

  // Variétés totales (vérification visuelle).
  const variants = categories.reduce((n, c) => {
    const items = c.groups ? c.groups.flatMap((g) => g.items) : (c.items || []);
    return n + items.reduce((m, it) => m + (Array.isArray(it.variants) ? it.variants.filter((v) => v && v.name).length : 0), 0);
  }, 0);
  console.log(`Variétés présentes dans le contenu importé : ${variants}`);

  // Rappel des paramètres actuels (non modifiés) — pour vérifier le téléphone/WhatsApp.
  const settings = await Settings.findOne({ key: 'site' }).lean();
  console.log('Paramètres actuels (non modifiés) :', {
    phoneDisplay: settings?.phoneDisplay || '(défaut)',
    whatsapp: settings?.whatsapp || '(défaut)',
    heroImage: settings?.heroImage || '(défaut)',
  });

  await mongoose.disconnect();
  console.log('Import terminé.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
