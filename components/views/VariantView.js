'use client';

// Corps (visible) de la page d'une variété — lit le contenu live via useContent().
// La page serveur garde métadonnées, JSON-LD et generateStaticParams ; elle passe
// la variété figée au build comme repli instantané.
import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '@/components/content/ContentProvider';
import { getVariant } from '@/lib/products';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';

export default function VariantView({ slug, itemSlug, variantSlug, initialFound, initialHeroImg }) {
  const { categories, wa } = useContent();
  const found = getVariant(slug, itemSlug, variantSlug, categories) || initialFound;
  if (!found) return null;
  const { category, item, variant, variants } = found;

  // Autres variétés du même article.
  const siblings = variants.filter((v) => v.slug !== variant.slug);

  const img = item.image || category.image;
  // Bannière : .webp optimisé (build) si image locale inchangée, sinon URL live (Cloudinary).
  const heroImg = img?.startsWith('/images/') ? initialHeroImg : (img || '');

  const waMsg = `Bonjour AGROPHARMA TCHAD, je souhaite un devis pour ${variant.name} (${item.name} — ${category.title}). Pouvez-vous m'envoyer les conditions ?`;

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
                <a href={wa(waMsg)} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
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
