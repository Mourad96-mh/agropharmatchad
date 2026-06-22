import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site, waLink } from '@/lib/site';
import { getItem, getCategoryItems, getProductPages } from '@/lib/products';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';

export function generateStaticParams() {
  return getProductPages().map((p) => ({ slug: p.categorySlug, item: p.itemSlug }));
}

export function generateMetadata({ params }) {
  const found = getItem(params.slug, params.item);
  if (!found) return {};
  const { category, item, variants } = found;
  const names = variants.map((v) => v.name).join(', ');
  const description = `${item.name} au Tchad : ${names}. ${item.desc} AGROPHARMA TCHAD — ${category.title}.`.slice(0, 158);
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

export default function ItemPage({ params }) {
  const found = getItem(params.slug, params.item);
  if (!found) notFound();
  const { category, item, variants } = found;

  // Autres produits de la même gamme qui ont aussi une page dédiée.
  const siblings = getCategoryItems(category).filter((it) => it.slug !== item.slug && it.hasVariants);

  const img = item.image || category.image;
  const heroImg = img
    ? img.startsWith('/images/')
      ? img.replace(/\.jpg$/, '.webp')
      : img
    : '';

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

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${item.name} — AGROPHARMA TCHAD`,
    itemListElement: variants.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.name,
      description: v.desc || undefined,
    })),
  };

  const waMsg = `Bonjour AGROPHARMA TCHAD, je suis intéressé(e) par : ${item.name} (${category.title}). Pouvez-vous m'envoyer un devis ?`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section
        className={`page-hero${img ? ' page-hero-img' : ''}`}
        style={img ? { backgroundImage: `linear-gradient(90deg, rgba(20,40,18,0.82) 0%, rgba(20,40,18,0.55) 60%, rgba(20,40,18,0.35) 100%), url(${heroImg})` } : undefined}
      >
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/ </span>
            <Link href="/produits">Produits</Link> <span>/ </span>
            <Link href={`/produits/${category.slug}`}>{category.title}</Link> <span>/ {item.name}</span>
          </nav>
          <span className="eyebrow"><Icon name={category.icon} size={15} /> {category.short}</span>
          <h1>{item.name}</h1>
          <p>{item.desc}</p>
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
              <h2>{variants.length} variété{variants.length > 1 ? 's' : ''} disponible{variants.length > 1 ? 's' : ''}</h2>
              <p className="lead">
                Voici les {item.name.toLowerCase()} que nous proposons. Dites-nous votre besoin (culture, surface, saison) :
                notre équipe vous oriente vers la variété la plus adaptée.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                <a href={waLink(waMsg)} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} /> Devis pour ce produit
                </a>
                <Link href={`/produits/${category.slug}`} className="btn btn-ghost">
                  Voir toute la gamme
                </Link>
              </div>
            </div>
            <div className="media-card" style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div className="card-icon" style={{ width: 84, height: 84, background: '#fff', marginBottom: 16 }}>
                <Icon name={category.icon} size={42} />
              </div>
              <h3 style={{ color: '#fff' }}>{item.name}</h3>
              <p style={{ color: '#d9f2cf', margin: 0 }}>{category.title} — AGROPHARMA TCHAD</p>
            </div>
          </div>

          <div className="variant-grid">
            {variants.map((v) => (
              <div key={v.name} className="variant-card">
                <h3>{v.name}</h3>
                {v.desc && <p>{v.desc}</p>}
                <a href={waLink(`Bonjour AGROPHARMA TCHAD, je souhaite un devis pour ${v.name} (${item.name}).`)} className="variant-cta" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={15} /> Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-head">
              <h2>Autres produits — {category.title}</h2>
            </div>
            <div className="grid grid-4">
              {siblings.map((s) => (
                <Link key={s.slug} href={s.href} className="card card-img">
                  <div className="card-media">
                    <Image src={s.image || category.image} alt={s.name} fill sizes="(max-width: 760px) 50vw, 280px" />
                    <span className="card-media-icon"><Icon name={category.icon} size={18} /></span>
                  </div>
                  <div className="card-body">
                    <h3 style={{ fontSize: '1.1rem' }}>{s.name}</h3>
                    <span className="card-link">Voir <Icon name="arrow" size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq />
    </>
  );
}
