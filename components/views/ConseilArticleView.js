'use client';

// Corps (visible) d'un article de conseil — lit le contenu live via useContent().
// La page serveur garde métadonnées, JSON-LD et generateStaticParams ; elle passe
// l'article figé au build comme repli instantané.
import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '@/components/content/ContentProvider';
import { getConseil } from '@/lib/conseils';
import { Icon } from '@/components/Icons';

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

export default function ConseilArticleView({ slug, initialConseil }) {
  const { conseils, wa } = useContent();
  const c = getConseil(slug, conseils) || initialConseil;
  if (!c) return null;

  const others = conseils.filter((x) => x.slug !== c.slug).slice(0, 2);

  return (
    <>
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
              <a href={wa()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
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
