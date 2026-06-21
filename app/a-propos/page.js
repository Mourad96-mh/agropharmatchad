import Link from 'next/link';
import Image from 'next/image';
import { site, waLink } from '@/lib/site';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';

export const metadata = {
  title: 'À propos',
  description:
    "Découvrez AGROPHARMA TCHAD : notre mission, nos valeurs et notre engagement pour fournir aux agriculteurs tchadiens des intrants et matériels agricoles de qualité.",
  alternates: { canonical: '/a-propos' },
};

const values = [
  { icon: 'shield', t: 'Qualité', d: 'Nous ne proposons que des produits sélectionnés et fiables. C’est notre signature : « Le choix de la qualité ».' },
  { icon: 'users', t: 'Proximité', d: 'Nous accompagnons les producteurs avec écoute et conseil, au plus près de leurs besoins.' },
  { icon: 'leaf', t: 'Agriculture durable', d: 'Nous encourageons les bonnes pratiques agricoles pour des rendements durables.' },
  { icon: 'check', t: 'Engagement', d: 'Disponibilité, sérieux et respect de nos engagements envers chaque client.' },
];

export default function AProposPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb"><Link href="/">Accueil</Link> <span>/ À propos</span></nav>
          <h1>À propos d’AGROPHARMA TCHAD</h1>
          <p>Votre partenaire de confiance pour des intrants et matériels agricoles de qualité au Tchad.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow"><Icon name="leaf" size={15} /> Notre histoire</span>
            <h2>Au service des agriculteurs tchadiens</h2>
            <p className="lead">
              AGROPHARMA TCHAD est une entreprise spécialisée dans la distribution d’intrants
              agricoles au Tchad. Nous mettons à la disposition des maraîchers, exploitants et
              coopératives une gamme complète de semences, produits phytosanitaires, engrais et
              matériels agricoles.
            </p>
            <p>
              Notre ambition est simple : aider les producteurs à obtenir de meilleures récoltes
              grâce à des produits de qualité, des conseils techniques avisés et un service de
              proximité. Parce que la réussite de vos cultures est notre priorité.
            </p>
          </div>
          <div className="media-card">
            <Image src="/logo.jpeg" alt="AGROPHARMA TCHAD — Le choix de la qualité" width={420} height={455} />
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <div className="card-icon"><Icon name="star" size={28} /></div>
              <h3>Notre mission</h3>
              <p>Fournir aux agriculteurs des intrants et équipements de qualité, accessibles et adaptés au contexte local, pour améliorer durablement les rendements agricoles au Tchad.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Icon name="leaf" size={28} /></div>
              <h3>Notre vision</h3>
              <p>Devenir le partenaire agricole de référence au Tchad, reconnu pour la qualité de ses produits, la fiabilité de son service et son engagement aux côtés des producteurs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><Icon name="check" size={15} /> Nos valeurs</span>
            <h2>Ce qui nous guide au quotidien</h2>
          </div>
          <div className="grid grid-4">
            {values.map((v) => (
              <div key={v.t} className="card">
                <div className="card-icon"><Icon name={v.icon} size={26} /></div>
                <h3 style={{ fontSize: '1.15rem' }}>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      <section className="section section-green cta-band">
        <div className="container">
          <h2>Travaillons ensemble</h2>
          <p>Une question, un projet, un besoin en intrants ou en matériel ? Notre équipe est à votre écoute.</p>
          <div className="cta-actions">
            <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> Discuter sur WhatsApp
            </a>
            <Link href="/contact" className="btn btn-white">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  );
}
