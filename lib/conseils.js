// Conseils & guides agricoles — la source de vérité est la base de données (admin /admin).
// Le contenu est synchronisé dans conseils.data.json au build par scripts/sync-content.mjs.
// Ce fichier conserve l'API utilisée partout dans le site (conseils, getConseil).
import conseilsData from './conseils.data.json';

export const conseils = conseilsData;

// `list` par défaut = conseils figés au build ; les composants client passent les données live.
export function getConseil(slug, list = conseils) {
  return list.find((c) => c.slug === slug);
}
