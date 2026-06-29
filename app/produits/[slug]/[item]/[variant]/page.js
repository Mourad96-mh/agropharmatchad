import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { getVariant, getVariantPages } from '@/lib/products';
import { heroImage } from '@/lib/heroImage';
import VariantView from '@/components/views/VariantView';

export function generateStaticParams() {
  return getVariantPages().map((p) => ({
    slug: p.categorySlug,
    item: p.itemSlug,
    variant: p.variantSlug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug, item: itemSlug, variant: variantSlug } = await params;
  const found = getVariant(slug, itemSlug, variantSlug);
  if (!found) return {};
  const { category, item, variant } = found;
  const description = `${variant.name} (${item.name}) au Tchad${variant.desc ? ` : ${variant.desc}` : ''} AGROPHARMA TCHAD — ${category.title}.`.slice(0, 158);
  return {
    title: `${variant.name} — ${item.name} au Tchad`,
    description,
    alternates: { canonical: `/produits/${category.slug}/${item.slug}/${variant.slug}` },
    openGraph: {
      title: `${variant.name} — ${item.name} | AGROPHARMA TCHAD`,
      description: variant.desc || item.desc,
      images: [{ url: item.image || category.image, width: 1280, height: 853, alt: variant.name }],
    },
  };
}

export default async function VariantPage({ params }) {
  const { slug, item: itemSlug, variant: variantSlug } = await params;
  const found = getVariant(slug, itemSlug, variantSlug);
  if (!found) notFound();
  const { category, item, variant } = found;

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
      { '@type': 'ListItem', position: 5, name: variant.name, item: `${site.url}/produits/${category.slug}/${item.slug}/${variant.slug}` },
    ],
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: variant.name,
    description: variant.desc || item.desc || undefined,
    ...(imgAbs ? { image: imgAbs } : {}),
    category: `${category.title} — ${item.name}`,
    ...(category.brand ? { brand: { '@type': 'Brand', name: category.brand } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      {/* Corps live (useContent) — la variété figée au build sert de repli instantané. */}
      <VariantView slug={slug} itemSlug={itemSlug} variantSlug={variantSlug} initialFound={found} initialHeroImg={heroImage(img)} />
    </>
  );
}
