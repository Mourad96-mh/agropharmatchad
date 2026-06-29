'use client';

// Corps (visible) de la page d'un article — lit le contenu live via useContent().
// La page serveur garde métadonnées, JSON-LD et generateStaticParams ; elle passe
// l'article figé au build comme repli instantané.
import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '@/components/content/ContentProvider';
import { getItem, getCategoryItems, getItemVariants } from '@/lib/products';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';

export default function ItemView({ slug, itemSlug, initialFound, initialHeroImg }) {
  const { categories, wa } = useContent();
  const found = getItem(slug, itemSlug, categories) || initialFound;
  if (!found) return null;
  const { category, item, variants } = found;

  // Autres produits de la même gamme (chacun a sa page dédiée).
  const siblings = getCategoryItems(category)
    .filter((it) => it.slug !== item.slug)
    .slice(0, 8);

  const img = item.image || category.image;
  // Bannière : .webp optimisé (build) si image locale inchangée, sinon URL live (Cloudinary).
  const heroImg = img?.startsWith('/images/') ? initialHeroImg : (img || '');

  const waMsg = `Bonjour AGROPHARMA TCHAD, je suis intéressé(e) par : ${item.name} (${category.title}). Pouvez-vous m'envoyer un devis ?`;

  return (
    <>
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
              <h2>
                {variants.length > 0
                  ? `${variants.length} variété${variants.length > 1 ? 's' : ''} disponible${variants.length > 1 ? 's' : ''}`
                  : 'Description'}
              </h2>
              <p className="lead">
                {variants.length > 0
                  ? `Voici les ${item.name.toLowerCase()} que nous proposons. Dites-nous votre besoin (culture, surface, saison) : notre équipe vous oriente vers la variété la plus adaptée.`
                  : item.desc}
              </p>
              {variants.length === 0 && (
                <p style={{ color: 'var(--muted)' }}>
                  Disponible chez AGROPHARMA TCHAD. Contactez-nous pour connaître les conditionnements,
                  la disponibilité et obtenir un devis adapté à votre exploitation.
                </p>
              )}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                <a href={wa(waMsg)} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} /> Devis pour ce produit
                </a>
                <Link href={`/produits/${category.slug}`} className="btn btn-ghost">
                  Voir toute la gamme
                </Link>
              </div>
            </div>
            {img ? (
              <div className="product-figure">
                <Image src={img} alt={item.name} fill sizes="(max-width: 760px) 100vw, 480px" />
                <span className="product-figure-tag"><Icon name={category.icon} size={16} /> {category.short}</span>
              </div>
            ) : (
              <div className="media-card" style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div className="card-icon" style={{ width: 84, height: 84, background: '#fff', marginBottom: 16 }}>
                  <Icon name={category.icon} size={42} />
                </div>
                <h3 style={{ color: '#fff' }}>{item.name}</h3>
                <p style={{ color: '#d9f2cf', margin: 0 }}>{category.title} — AGROPHARMA TCHAD</p>
              </div>
            )}
          </div>

          {variants.length > 0 && (
            <div className="variant-grid">
              {getItemVariants(item).map((v) => (
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
          )}
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
