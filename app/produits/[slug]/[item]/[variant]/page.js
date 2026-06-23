import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site, waLink } from '@/lib/site';
import { getVariant, getVariantPages } from '@/lib/products';
import { heroImage } from '@/lib/heroImage';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';

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
  const { category, item, variant, variants } = found;

  // Autres variétés du même article.
  const siblings = variants.filter((v) => v.slug !== variant.slug);

  const img = item.image || category.image;
  const heroImg = heroImage(img);
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

  const waMsg = `Bonjour AGROPHARMA TCHAD, je souhaite un devis pour ${variant.name} (${item.name} — ${category.title}). Pouvez-vous m'envoyer les conditions ?`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <section
        className={`page-hero${img ? ' page-hero-img' : ''}`}
        style={img ? { backgroundImage: `linear-gradient(90deg, rgba(20,40,18,0.82) 0%, rgba(20,40,18,0.55) 60%, rgba(20,40,18,0.35) 100%), url(${heroImg})` } : undefined}
      >
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/ </span>
            <Link href="/produits">Produits</Link> <span>/ </span>
            <Link href={`/produits/${category.slug}`}>{category.title}</Link> <span>/ </span>
            <Link href={`/produits/${category.slug}/${item.slug}`}>{item.name}</Link> <span>/ {variant.name}</span>
          </nav>
          <span className="eyebrow"><Icon name={category.icon} size={15} /> {item.name}</span>
          <h1>{variant.name}</h1>
          {variant.desc && <p>{variant.desc}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {category.brand && (
            <div className="brand-strip">
              <span className="brand-strip-label">En partenariat avec</span>
              <span className="brand-badge">{category.brand}</span>
              <p>{category.brandNote}</p>
            </div>
          )}

          <div className="split" style={{ alignItems: 'start', marginBottom: 40 }}>
            <div>
              <h2>Description</h2>
              <p className="lead">{variant.desc || item.desc}</p>
              <p style={{ color: 'var(--muted)' }}>
                {variant.name} fait partie de notre gamme {item.name.toLowerCase()} ({category.title}).
                Contactez-nous pour la disponibilité, les conditionnements et un devis adapté à votre exploitation.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                <a href={waLink(waMsg)} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} /> Demander un devis
                </a>
                <Link href={`/produits/${category.slug}/${item.slug}`} className="btn btn-ghost">
                  Voir toutes les variétés
                </Link>
              </div>
            </div>
            {img ? (
              <div className="product-figure">
                <Image src={img} alt={`${variant.name} — ${item.name}`} fill sizes="(max-width: 760px) 100vw, 480px" />
                <span className="product-figure-tag"><Icon name={category.icon} size={16} /> {category.short}</span>
              </div>
            ) : (
              <div className="media-card" style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div className="card-icon" style={{ width: 84, height: 84, background: '#fff', marginBottom: 16 }}>
                  <Icon name={category.icon} size={42} />
                </div>
                <h3 style={{ color: '#fff' }}>{variant.name}</h3>
                <p style={{ color: '#d9f2cf', margin: 0 }}>{item.name} — AGROPHARMA TCHAD</p>
              </div>
            )}
          </div>

          {siblings.length > 0 && (
            <>
              <h2 style={{ marginBottom: 20 }}>Autres variétés — {item.name}</h2>
              <div className="variant-grid">
                {siblings.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/produits/${category.slug}/${item.slug}/${v.slug}`}
                    className="variant-card"
                  >
                    <h3>{v.name}</h3>
                    {v.desc && <p>{v.desc}</p>}
                    <span className="variant-cta">
                      Voir le détail <Icon name="arrow" size={15} />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Faq />
    </>
  );
}
