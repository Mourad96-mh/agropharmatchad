// Catalogue des gammes — la source de vérité est la base de données (admin /admin).
// Le contenu est synchronisé dans products.data.json au build par scripts/sync-content.mjs.
// Ce fichier conserve l'API utilisée partout dans le site (categories, getCategory).
import categoriesData from './products.data.json';

export const categories = categoriesData;

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

// Slug stable à partir d'un nom d'article (ex. « Piment & Poivron » → « piment-poivron »).
export function slugify(str) {
  return String(str)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Variétés non vides d'un article.
function itemVariants(item) {
  return Array.isArray(item.variants) ? item.variants.filter((v) => v && v.name) : [];
}

// Tous les articles d'une gamme (groupés ou plats), enrichis de leur slug et href.
export function getCategoryItems(category) {
  const hasGroups = Array.isArray(category.groups) && category.groups.length > 0;
  const items = hasGroups ? category.groups.flatMap((g) => g.items) : category.items || [];
  return items.map((it) => {
    const slug = slugify(it.name);
    return { ...it, slug, href: `/produits/${category.slug}/${slug}`, hasVariants: itemVariants(it).length > 0 };
  });
}

// Liste plate de tous les articles (chaque article a sa page produit dédiée).
export function getProductPages() {
  const pages = [];
  for (const c of categories) {
    for (const it of getCategoryItems(c)) {
      pages.push({ categorySlug: c.slug, itemSlug: it.slug });
    }
  }
  return pages;
}

// Récupère un article (et sa gamme) à partir des slugs gamme + article.
export function getItem(categorySlug, itemSlug) {
  const category = getCategory(categorySlug);
  if (!category) return null;
  const item = getCategoryItems(category).find((it) => it.slug === itemSlug);
  if (!item) return null;
  return { category, item, variants: itemVariants(item) };
}

// Variétés d'un article enrichies de leur slug (ex. « Mongal F1 » → « mongal-f1 »).
export function getItemVariants(item) {
  return itemVariants(item).map((v) => ({ ...v, slug: slugify(v.name) }));
}

// Liste plate de toutes les variétés (= pages /produits/[gamme]/[article]/[variété]).
export function getVariantPages() {
  const pages = [];
  for (const c of categories) {
    for (const it of getCategoryItems(c)) {
      for (const v of getItemVariants(it)) {
        pages.push({ categorySlug: c.slug, itemSlug: it.slug, variantSlug: v.slug });
      }
    }
  }
  return pages;
}

// Récupère une variété (et son article + gamme) à partir des trois slugs.
export function getVariant(categorySlug, itemSlug, variantSlug) {
  const found = getItem(categorySlug, itemSlug);
  if (!found) return null;
  const variants = getItemVariants(found.item);
  const variant = variants.find((v) => v.slug === variantSlug);
  if (!variant) return null;
  return { category: found.category, item: found.item, variant, variants };
}
