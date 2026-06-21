import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site, waLink } from '@/lib/site';
import { categories, getCategory } from '@/lib/products';
import { conseils } from '@/lib/conseils';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCategory(params.slug);
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

export default function CategoryPage({ params }) {
  const c = getCategory(params.slug);
  if (!c) notFound();

  const others = categories.filter((x) => x.slug !== c.slug);

  // Guides dont la liste `related` cible cette gamme (lien interne retour conseils → produits)
  const relatedConseils = conseils
    .filter((g) => g.related && g.related.some((r) => r.slug === c.slug))
    .slice(0, 3);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Produits', item: `${site.url}/produits` },
      { '@type': 'ListItem', position: 3, name: c.title, item: `${site.url}/produits/${c.slug}` },
    ],
  };

  const allItems = c.groups ? c.groups.flatMap((g) => g.items) : c.items;
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

  const waMsg = `Bonjour AGROPHARMA TCHAD, je suis intéressé(e) par : ${c.title}. Pouvez-vous m'envoyer un devis ?`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section
        className={`page-hero${c.image ? ' page-hero-img' : ''}`}
        style={c.image ? { backgroundImage: `linear-gradient(90deg, rgba(20,40,18,0.82) 0%, rgba(20,40,18,0.55) 60%, rgba(20,40,18,0.35) 100%), url(${c.image.replace(/\.jpg$/, '.webp')})` } : undefined}
      >
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/ </span>
            <Link href="/produits">Produits</Link> <span>/ {c.title}</span>
          </nav>
          <span className="eyebrow"><Icon name={c.icon} size={15} /> {c.short}</span>
          <h1>{c.title}</h1>
          <p>{c.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split" style={{ alignItems: 'start', marginBottom: 48 }}>
            <div>
              <h2>Présentation</h2>
              <p className="lead">{c.intro}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                <a href={waLink(waMsg)} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} /> Devis pour cette gamme
                </a>
                <Link href="/contact" className="btn btn-ghost">Nous contacter</Link>
              </div>
            </div>
            <div className="media-card" style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div className="card-icon" style={{ width: 84, height: 84, background: '#fff', marginBottom: 16 }}>
                <Icon name={c.icon} size={42} />
              </div>
              <h3 style={{ color: '#fff' }}>{c.short}</h3>
              <p style={{ color: '#d9f2cf', margin: 0 }}>Qualité &amp; conseil — AGROPHARMA TCHAD</p>
            </div>
          </div>

          {c.brand && (
            <div className="brand-strip">
              <span className="brand-strip-label">En partenariat avec</span>
              <span className="brand-badge">{c.brand}</span>
              <p>{c.brandNote}</p>
            </div>
          )}

          <h2 style={{ marginBottom: 24 }}>
            {c.groups ? 'Nos variétés par catégorie' : 'Ce que nous proposons'}
          </h2>

          {c.groups ? (
            <div className="groups">
              {c.groups.map((g) => (
                <div key={g.title} className="group">
                  <div className="group-head">
                    <h3>{g.title}</h3>
                    <p>{g.desc}</p>
                  </div>
                  <div className="item-grid">
                    {g.items.map((it) => (
                      <div key={it.name} className="item item-media-row">
                        <span className="item-media">
                          <Image src={it.image || c.image} alt={it.name} fill sizes="64px" />
                        </span>
                        <div>
                          <h4>{it.name}</h4>
                          <p>{it.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="item-grid">
              {c.items.map((it) => (
                <div key={it.name} className="item item-media-row">
                  <span className="item-media">
                    <Image src={it.image || c.image} alt={it.name} fill sizes="64px" />
                  </span>
                  <div>
                    <h4>{it.name}</h4>
                    <p>{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conseil & formation */}
      {c.advisory && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-head">
              <h2>Conseil &amp; formation</h2>
              <p>Au-delà de la vente, notre équipe technique accompagne les producteurs sur le terrain.</p>
            </div>
            <div className="grid grid-2">
              <div className="feature">
                <div className="fi"><Icon name="leaf" size={24} /></div>
                <div>
                  <h3>Conseil technique</h3>
                  <p>Choix des variétés, doses de semis, calendrier cultural et itinéraires adaptés à votre zone et à votre saison.</p>
                </div>
              </div>
              <div className="feature">
                <div className="fi"><Icon name="users" size={24} /></div>
                <div>
                  <h3>Formation des producteurs</h3>
                  <p>Sessions et démonstrations pour renforcer les capacités et faire découvrir les nouvelles variétés et techniques.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Conseils associés */}
      {relatedConseils.length > 0 && (
        <section className={`section${c.advisory ? '' : ' section-soft'}`}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow"><Icon name="book" size={15} /> Conseils & guides</span>
              <h2>À lire pour bien utiliser cette gamme</h2>
              <p>Nos guides pratiques, adaptés au climat sahélien du Tchad.</p>
            </div>
            <div className="grid grid-2">
              {relatedConseils.map((g) => (
                <Link key={g.slug} href={`/conseils/${g.slug}`} className="card card-row">
                  <div className="card-thumb">
                    <Image src={g.image} alt={g.title} fill sizes="120px" />
                  </div>
                  <div>
                    <h3>{g.title}</h3>
                    <p>{g.excerpt.slice(0, 110)}…</p>
                    <span className="card-link">Lire le guide <Icon name="arrow" size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Autres gammes */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Autres gammes</h2>
          </div>
          <div className="grid grid-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/produits/${o.slug}`} className="card card-img">
                <div className="card-media">
                  <Image src={o.image} alt={o.title} fill sizes="(max-width: 760px) 50vw, 280px" />
                  <span className="card-media-icon"><Icon name={o.icon} size={18} /></span>
                </div>
                <div className="card-body">
                  <h3 style={{ fontSize: '1.1rem' }}>{o.title}</h3>
                  <span className="card-link">Voir <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
