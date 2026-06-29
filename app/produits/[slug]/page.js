import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { categories, getCategory } from '@/lib/products';
import { heroImage } from '@/lib/heroImage';
import CategoryView from '@/components/views/CategoryView';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  const description =
    c.intro.length > 158 ? c.intro.slice(0, 155).replace(/\s+\S*$/, '') + '…' : c.intro;
  return {
    title: `${c.title} au Tchad`,
    description,
    alternates: { canonical: `/produits/${c.slug}` },
    openGraph: {
      title: `${c.title} — AGROPHARMA TCHAD`,
      description: c.tagline,
      images: [{ url: c.image, width: 1280, height: 853, alt: c.title }],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Produits', item: `${site.url}/produits` },
      { '@type': 'ListItem', position: 3, name: c.title, item: `${site.url}/produits/${c.slug}` },
    ],
  };

  const hasGroups = Array.isArray(c.groups) && c.groups.length > 0;
  const allItems = hasGroups ? c.groups.flatMap((g) => g.items) : c.items || [];
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${c.title} — AGROPHARMA TCHAD`,
    itemListElement: allItems.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* Corps live (useContent) — la gamme figée au build sert de repli instantané. */}
      <CategoryView slug={slug} initialCategory={c} initialHeroImg={heroImage(c.image)} />
    </>
  );
}
