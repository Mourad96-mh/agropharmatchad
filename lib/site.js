// Configuration centrale du site — modifiez ici les coordonnées du client.
export const site = {
  name: 'AGROPHARMA TCHAD',
  shortName: 'Agropharma Tchad',
  slogan: 'Le choix de la qualité',
  baseline:
    "Votre partenaire agricole au Tchad : semences maraîchères, produits phytosanitaires, engrais et matériels agricoles de qualité.",
  url: 'https://agropharmatchad.com',
  phoneDisplay: '+235 93 16 62 02',
  phoneHref: '+23593166202',
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

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/produits', label: 'Produits' },
  { href: '/conseils', label: 'Conseils' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

// Message WhatsApp pré-rempli
export function waLink(message) {
  const text = encodeURIComponent(
    message || "Bonjour AGROPHARMA TCHAD, je souhaite obtenir des informations / un devis."
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}
