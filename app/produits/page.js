import Link from 'next/link';
import Image from 'next/image';
import { site, waLink } from '@/lib/site';
import { categories } from '@/lib/products';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';

export const metadata = {
  title: 'Semences, engrais & matériels agricoles',
  description:
    'Découvrez les gammes AGROPHARMA TCHAD : semences maraîchères, produits phytosanitaires, engrais liquides et solides, et matériels agricoles de qualité au Tchad.',
  alternates: { canonical: '/produits' },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Produits AGROPHARMA TCHAD',
  itemListElement: categories.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.title,
    url: `${site.url}/produits/${c.slug}`,
  })),
};

export default function ProduitsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb"><Link href="/">Accueil</Link> <span>/ Produits</span></nav>
          <h1>Nos produits</h1>
          <p>Une gamme complète d’intrants et d’équipements agricoles, sélectionnés pour leur qualité et leur efficacité, du semis à la récolte.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/produits/${c.slug}`} className="card card-row">
                <div className="card-thumb">
                  <Image src={c.image} alt={c.title} fill sizes="120px" />
                </div>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.intro.slice(0, 130)}…</p>
                  <span className="card-link">Voir la gamme <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      <section className="section section-green cta-band">
        <div className="container">
          <h2>Besoin d’un conseil ou d’un devis ?</h2>
          <p>Dites-nous ce dont vous avez besoin pour vos cultures — nous vous proposons les produits adaptés.</p>
          <div className="cta-actions">
            <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> Demander un devis
            </a>
            <a href={`tel:${site.phoneHref}`} className="btn btn-white">
              <Icon name="phone" size={18} /> Appeler
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
