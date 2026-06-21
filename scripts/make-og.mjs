// Generates a 1200x630 branded Open Graph card -> public/og-default.jpg
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const W = 1200, H = 630;
const green = '#2BA84A', greenDark = '#1E7E34', greenDarker = '#14632a', light = '#82C341';

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${greenDarker}"/>
      <stop offset="0.55" stop-color="${greenDark}"/>
      <stop offset="1" stop-color="${green}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1080" cy="120" r="340" fill="${light}" opacity="0.10"/>
  <circle cx="120" cy="560" r="260" fill="#ffffff" opacity="0.06"/>
  <!-- white card for the logo -->
  <rect x="80" y="195" width="240" height="240" rx="28" fill="#ffffff"/>
  <!-- text -->
  <text x="360" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="800" fill="#ffffff">AGROPHARMA</text>
  <text x="360" y="322" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="800" fill="${light}">TCHAD</text>
  <text x="362" y="372" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#eafbe6">« Le choix de la qualité »</text>
  <text x="362" y="430" font-family="Segoe UI, Arial, sans-serif" font-size="25" font-weight="500" fill="#d9f2cf">Semences · Phytosanitaires · Engrais · Matériels agricoles</text>
  <text x="362" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="500" fill="#bfe6ad">N'Djamena, Tchad</text>
</svg>`;

const logo = await sharp(readFileSync('public/logo.jpeg'))
  .resize(208, 208, { fit: 'contain', background: '#ffffff' })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 211, left: 96 }])
  .jpeg({ quality: 88 })
  .toFile('public/og-default.jpg');

console.log('Wrote public/og-default.jpg (1200x630)');
