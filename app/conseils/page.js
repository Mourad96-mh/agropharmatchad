import Link from 'next/link';
import Image from 'next/image';
import { site, waLink } from '@/lib/site';
import { conseils } from '@/lib/conseils';
import { Icon } from '@/components/Icons';

export const metadata = {
  title: 'Conseils agricoles & guides',
  description:
    "Guides pratiques AGROPHARMA TCHAD : calendrier de semis, fertilisation, protection des cultures. Des conseils adaptés au climat sahélien du Tchad.",
  alternates: { canonical: '/conseils' },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Conseils agricoles — AGROPHARMA TCHAD',
  itemListElement: conseils.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.title,
    url: `${site.url}/conseils/${c.slug}`,
  })),
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ConseilsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb"><Link href="/">Accueil</Link> <span>/ Conseils</span></nav>
          <h1>Conseils &amp; guides agricoles</h1>
          <p>Des repères pratiques pour réussir vos cultures au Tchad : semis, fertilisation et protection, adaptés au climat sahélien.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {conseils.map((c) => (
              <Link key={c.slug} href={`/conseils/${c.slug}`} className="card card-img">
                <div className="card-media">
                  <Image src={c.image} alt={c.title} fill sizes="(max-width: 760px) 100vw, 360px" />
                  <span className="card-media-icon"><Icon name="book" size={20} /></span>
                </div>
                <div className="card-body">
                  <span className="post-meta"><Icon name="calendar" size={14} /> {formatDate(c.date)} · {c.readtime}</span>
                  <h3>{c.title}</h3>
                  <p>{c.excerpt}</p>
                  <span className="card-link">Lire le guide <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-green cta-band">
        <div className="container">
          <h2>Une question sur vos cultures ?</h2>
          <p>Notre équipe technique vous conseille gratuitement sur le choix des produits et les bonnes pratiques.</p>
          <div className="cta-actions">
            <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> Demander un conseil
            </a>
            <Link href="/produits" className="btn btn-white">Voir nos produits</Link>
          </div>
        </div>
      </section>
    </>
  );
}
