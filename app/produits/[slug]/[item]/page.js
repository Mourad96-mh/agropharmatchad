import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { getItem, getProductPages } from '@/lib/products';
import { heroImage } from '@/lib/heroImage';
import ItemView from '@/components/views/ItemView';

export function generateStaticParams() {
  return getProductPages().map((p) => ({ slug: p.categorySlug, item: p.itemSlug }));
}

export async function generateMetadata({ params }) {
  const { slug, item: itemSlug } = await params;
  const found = getItem(slug, itemSlug);
  if (!found) return {};
  const { category, item, variants } = found;
  const names = variants.map((v) => v.name).join(', ');
  const description = (
    variants.length
      ? `${item.name} au Tchad : ${names}. ${item.desc} AGROPHARMA TCHAD — ${category.title}.`
      : `${item.name} au Tchad. ${item.desc} AGROPHARMA TCHAD — ${category.title}.`
  ).slice(0, 158);
  return {
    title: `${item.name} — ${category.title} au Tchad`,
    description,
    alternates: { canonical: `/produits/${category.slug}/${item.slug}` },
    openGraph: {
      title: `${item.name} — AGROPHARMA TCHAD`,
      description: item.desc,
      images: [{ url: item.image || category.image, width: 1280, height: 853, alt: item.name }],
    },
  };
}

export default async function ItemPage({ params }) {
  const { slug, item: itemSlug } = await params;
  const found = getItem(slug, itemSlug);
  if (!found) notFound();
  const { category, item, variants } = found;

  const img = item.image || category.image;
  const imgAbs = img ? (img.startsWith('http') ? img : `${site.url}${img}`) : undefined;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Produits', item: `${site.url}/produits` },
      { '@type': 'ListItem', position: 3, name: category.title, item: `${site.url}/produits/${category.slug}` },
      { '@type': 'ListItem', position: 4, name: item.name, item: `${site.url}/produits/${category.slug}/${item.slug}` },
    ],
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.name,
    description: item.desc || undefined,
    ...(imgAbs ? { image: imgAbs } : {}),
    category: category.title,
    ...(category.brand ? { brand: { '@type': 'Brand', name: category.brand } } : {}),
  };

  const itemListJsonLd = variants.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${item.name} — AGROPHARMA TCHAD`,
        itemListElement: variants.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: v.name,
          description: v.desc || undefined,
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}

      {/* Corps live (useContent) — l'article figé au build sert de repli instantané. */}
      <ItemView slug={slug} itemSlug={itemSlug} initialFound={found} initialHeroImg={heroImage(img)} />
    </>
  );
}
