import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site, waLink } from '@/lib/site';
import { conseils, getConseil } from '@/lib/conseils';
import { Icon } from '@/components/Icons';

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

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Rend un contenu texte qui peut contenir des liens internes.
// Accepte une chaîne, ou un tableau de segments : chaîne (texte) ou { to, label } (lien interne).
function renderRich(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((seg, k) =>
      typeof seg === 'string'
        ? seg
        : <Link key={k} href={seg.to}>{seg.label}</Link>
    );
  }
  return content;
}

export default async function ConseilPage({ params }) {
  const { slug } = await params;
  const c = getConseil(slug);
  if (!c) notFound();

  const others = conseils.filter((x) => x.slug !== c.slug).slice(0, 2);

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

      <section
        className="page-hero page-hero-img"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(20,40,18,0.82) 0%, rgba(20,40,18,0.55) 60%, rgba(20,40,18,0.35) 100%), url(${c.image})` }}
      >
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/ </span>
            <Link href="/conseils">Conseils</Link> <span>/ {c.title}</span>
          </nav>
          <span className="eyebrow"><Icon name="book" size={15} /> Guide pratique</span>
          <h1>{c.title}</h1>
          <p>{c.excerpt}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="article">
            <span className="post-meta"><Icon name="calendar" size={15} /> {formatDate(c.date)} · {c.readtime} de lecture</span>
            <p className="lead">{c.intro}</p>
            {c.body.map((b, i) => {
              if (b.h) return <h2 key={i}>{b.h}</h2>;
              if (b.ul)
                return (
                  <ul key={i} className="article-list">
                    {b.ul.map((li, j) => (
                      <li key={j}><Icon name="check" size={18} /> <span>{renderRich(li)}</span></li>
                    ))}
                  </ul>
                );
              return <p key={i}>{renderRich(b.p)}</p>;
            })}

            {c.related && c.related.length > 0 && (
              <div className="article-related">
                <h3>Produits associés</h3>
                <div className="related-links">
                  {c.related.map((r) => (
                    <Link key={r.slug} href={`/produits/${r.slug}`} className="related-link">
                      <Icon name="arrow" size={15} /> {r.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="article-cta">
              <div>
                <h3>Besoin de produits ou de conseils ?</h3>
                <p>Notre équipe vous accompagne du choix des intrants jusqu&apos;à la récolte.</p>
              </div>
              <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} /> Nous écrire
              </a>
            </div>
          </article>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-head">
              <h2>À lire aussi</h2>
            </div>
            <div className="grid grid-2">
              {others.map((o) => (
                <Link key={o.slug} href={`/conseils/${o.slug}`} className="card card-row">
                  <div className="card-thumb">
                    <Image src={o.image} alt={o.title} fill sizes="120px" />
                  </div>
                  <div>
                    <h3>{o.title}</h3>
                    <p>{o.excerpt.slice(0, 110)}…</p>
                    <span className="card-link">Lire <Icon name="arrow" size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
