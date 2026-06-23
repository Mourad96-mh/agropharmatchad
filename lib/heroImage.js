// Server-only : résout l'image de bannière (CSS background-image).
// Les images locales disposent souvent d'une variante .webp pré-générée, plus légère.
// On l'utilise UNIQUEMENT si le fichier existe vraiment, sinon on garde l'original
// (les uploads admin et certaines images — ex. semences — n'ont pas de .webp).
import fs from 'node:fs';
import path from 'node:path';

export function heroImage(img) {
  if (!img) return '';
  if (!img.startsWith('/images/')) return img; // URL distante (Cloudinary) : telle quelle
  const webp = img.replace(/\.jpe?g$/i, '.webp');
  if (webp === img) return img; // pas une image jpg
  const abs = path.join(process.cwd(), 'public', webp.replace(/^\//, ''));
  return fs.existsSync(abs) ? webp : img;
}
