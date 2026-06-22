import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import User from '../src/models/User.js';
import Category from '../src/models/Category.js';
import Conseil from '../src/models/Conseil.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const libDir = path.resolve(__dirname, '../../lib');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(libDir, file), 'utf8'));

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI manquant dans server/.env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connecté');

  // 1) Compte administrateur (upsert — ne duplique pas)
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.updateOne(
      { email },
      { $set: { email, passwordHash, role: 'admin' } },
      { upsert: true }
    );
    console.log('Administrateur prêt :', email);
  } else {
    console.warn('ADMIN_EMAIL / ADMIN_PASSWORD absents — étape administrateur ignorée');
  }

  // 2) Contenu initial — importé seulement si la collection est vide (ne pas écraser les modifications)
  const categories = readJson('products.data.json');
  const conseils = readJson('conseils.data.json');

  if ((await Category.estimatedDocumentCount()) === 0) {
    await Category.insertMany(categories.map((c, i) => ({ ...c, order: i })));
    console.log('Gammes importées :', categories.length);
  } else {
    console.log('Des gammes existent déjà — import ignoré');
  }

  if ((await Conseil.estimatedDocumentCount()) === 0) {
    await Conseil.insertMany(conseils.map((c, i) => ({ ...c, order: i })));
    console.log('Conseils importés :', conseils.length);
  } else {
    console.log('Des conseils existent déjà — import ignoré');
  }

  await mongoose.disconnect();
  console.log('Seed terminé.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
