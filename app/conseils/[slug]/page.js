import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { conseils, getConseil } from '@/lib/conseils';
import ConseilArticleView from '@/components/views/ConseilArticleView';

export function generateStaticParams() {
  return conseils.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getConseil(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.excerpt,
    alternates: { canonical: `/conseils/${c.slug}` },
    openGraph: {
      type: 'article',
      title: `${c.title} — AGROPHARMA TCHAD`,
      description: c.excerpt,
      images: [{ url: c.image, width: 1280, height: 853, alt: c.title }],
    },
  };
}

export default async function ConseilPage({ params }) {
  const { slug } = await params;
  const c = getConseil(slug);
  if (!c) notFound();

  // c.image peut être un chemin local (/images/…) ou une URL absolue (Cloudinary).
  const imageAbs = c.image?.startsWith('http') ? c.image : `${site.url}${c.image}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.excerpt,
    image: imageAbs,
    datePublished: c.date,
    dateModified: c.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/logo.jpeg` },
    },
    mainEntityOfPage: `${site.url}/conseils/${c.slug}`,
    inLanguage: 'fr',
    isPartOf: { '@id': `${site.url}/#organization` },
    ...(c.related && c.related.length > 0
      ? { about: c.related.map((r) => ({ '@type': 'Thing', name: r.label })) }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Conseils', item: `${site.url}/conseils` },
      { '@type': 'ListItem', position: 3, name: c.title, item: `${site.url}/conseils/${c.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Corps live (useContent) — l'article figé au build sert de repli instantané. */}
      <ConseilArticleView slug={slug} initialConseil={c} />
    </>
  );
}
