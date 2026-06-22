// Catalogue des gammes — la source de vérité est la base de données (admin /admin).
// Le contenu est synchronisé dans products.data.json au build par scripts/sync-content.mjs.
// Ce fichier conserve l'API utilisée partout dans le site (categories, getCategory).
import categoriesData from './products.data.json';

export const categories = categoriesData;

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}
