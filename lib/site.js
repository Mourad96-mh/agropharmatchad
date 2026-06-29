// Configuration centrale du site.
// Les coordonnées modifiables depuis l'admin (téléphone, WhatsApp) sont stockées
// en base et régénérées dans site.data.json au build par scripts/sync-content.mjs.
// Les valeurs ci-dessous servent de défaut si l'admin n'a rien renseigné.
import overrides from './site.data.json';

const defaults = {
  name: 'AGROPHARMA TCHAD',
  shortName: 'Agropharma Tchad',
  slogan: 'Le choix de la qualité',
  baseline:
    "Votre partenaire agricole au Tchad : semences maraîchères, produits phytosanitaires, engrais et matériels agricoles de qualité.",
  url: 'https://agropharmatchad.com',
  phoneDisplay: '+235 93 16 62 02',
  // Numéro WhatsApp au format international sans + ni espaces
  whatsapp: '23593166202',
  email: 'contact@agropharmatchad.com',
  address: {
    street: 'Rue des 30 mètres, avenue Ali Ibrahim (derrière la station Star Oil)',
    city: "N'Djamena",
    country: 'Tchad',
    full: "Rue des 30 mètres, avenue Ali Ibrahim (derrière la station Star Oil), N'Djamena, Tchad",
  },
  hours: 'Ouvert 24h/24 — 7j/7',
  // Fiche Google Business (CID stable) + coordonnées GPS du point de vente
  mapUrl: 'https://www.google.com/maps?cid=9100128792982484637',
  geo: { lat: 12.1330982, lng: 15.0653532 },
  social: {
    facebook: 'https://www.facebook.com/share/18SCV4Mihj/',
    tiktok: 'https://www.tiktok.com/@agropharmatchad',
    instagram: '',
  },
};

// Construit l'objet `site` en fusionnant les valeurs éditées dans l'admin (téléphone,
// WhatsApp, image d'accueil) avec les valeurs par défaut. Utilisé à la fois au build
// (avec site.data.json) et au runtime (avec les paramètres récupérés depuis l'API).
export function buildSite(ov = {}) {
  const phoneDisplay = (ov && ov.phoneDisplay) || defaults.phoneDisplay;
  const whatsapp = (ov && ov.whatsapp) || defaults.whatsapp;
  // Image de bannière de la page d'accueil — éditable depuis l'admin (sinon image par défaut).
  const heroImage = (ov && ov.heroImage) || '/images/hero.jpg';
  return {
    ...defaults,
    phoneDisplay,
    // Lien tel: dérivé du numéro affiché (uniquement les chiffres, préfixé de +).
    phoneHref: '+' + phoneDisplay.replace(/\D/g, ''),
    whatsapp,
    heroImage,
  };
}

// Valeur calculée au build (depuis site.data.json) — utilisée par les composants serveur,
// les métadonnées et le JSON-LD.
export const site = buildSite(overrides);

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/produits', label: 'Produits' },
  { href: '/conseils', label: 'Conseils' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

// Lien WhatsApp pré-rempli pour un numéro donné.
export function waLinkFor(whatsapp, message) {
  const text = encodeURIComponent(
    message || "Bonjour AGROPHARMA TCHAD, je souhaite obtenir des informations / un devis."
  );
  return `https://wa.me/${whatsapp}?text=${text}`;
}

// Message WhatsApp pré-rempli (numéro figé au build — composants serveur).
export function waLink(message) {
  return waLinkFor(site.whatsapp, message);
}
