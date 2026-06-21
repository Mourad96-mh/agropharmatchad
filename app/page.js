import Link from 'next/link';
import Image from 'next/image';
import { site, waLink } from '@/lib/site';
import { categories } from '@/lib/products';
import { Icon } from '@/components/Icons';
import Faq from '@/components/Faq';
import Testimonials from '@/components/Testimonials';
import Steps from '@/components/Steps';
import ConseilsTeaser from '@/components/ConseilsTeaser';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow"><Icon name="leaf" size={15} /> Fournisseur agricole au Tchad</span>
            <h1>
              Des intrants agricoles <span className="accent">de qualité</span> pour des récoltes abondantes
            </h1>
            <p className="lead">
              AGROPHARMA TCHAD vous accompagne du semis à la récolte : semences maraîchères,
              produits phytosanitaires, engrais liquides et solides, et matériels agricoles.
            </p>
            <div className="hero-actions">
              <Link href="/produits" className="btn btn-primary">
                Découvrir nos produits <Icon name="arrow" size={18} />
              </Link>
              <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} /> Demander un devis
              </a>
            </div>
            <div className="hero-trust">
              <div><Icon name="check" size={18} /> Produits homologués</div>
              <div><Icon name="check" size={18} /> Conseil technique</div>
              <div><Icon name="check" size={18} /> Livraison au Tchad</div>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/hero.jpg"
              alt="Cultures maraîchères en rangs — laitues vertes issues de semences de qualité"
              width={1280}
              height={853}
              priority
              className="hero-photo"
            />
            <span className="hero-badge">Le choix de la qualité</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div className="stats">
            <div><div className="num">5</div><div className="lbl">Gammes de produits</div></div>
            <div><div className="num">100%</div><div className="lbl">Produits sélectionnés</div></div>
            <div><div className="num">23</div><div className="lbl">Provinces desservies</div></div>
            <div><div className="num">7j/7</div><div className="lbl">Conseil & assistance</div></div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section-soft" id="produits">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><Icon name="leaf" size={15} /> Nos gammes</span>
            <h2>Tout pour votre exploitation agricole</h2>
            <p>Une offre complète d’intrants et d’équipements pour accompagner chaque étape de vos cultures.</p>
          </div>
          <div className="grid grid-3">
            {categories.map((c) => (
              <Link key={c.slug} href={`/produits/${c.slug}`} className="card card-img">
                <div className="card-media">
                  <Image src={c.image} alt={c.title} fill sizes="(max-width: 760px) 100vw, 360px" />
                  <span className="card-media-icon"><Icon name={c.icon} size={20} /></span>
                </div>
                <div className="card-body">
                  <h3>{c.title}</h3>
                  <p>{c.tagline}</p>
                  <span className="card-link">En savoir plus <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            ))}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="card" style={{ background: 'var(--bg-green)', borderColor: '#cfe2c2' }}>
              <div className="card-icon" style={{ background: '#fff' }}><Icon name="whatsapp" size={28} /></div>
              <h3>Un besoin précis ?</h3>
              <p>Contactez-nous pour un conseil personnalisé et un devis adapté à vos cultures.</p>
              <span className="card-link">Discuter sur WhatsApp <Icon name="arrow" size={16} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><Icon name="star" size={15} /> Pourquoi nous choisir</span>
            <h2>Un partenaire fiable pour les agriculteurs tchadiens</h2>
          </div>
          <div className="grid grid-3">
            {[
              { icon: 'shield', t: 'Qualité garantie', d: 'Des produits sélectionnés auprès de fournisseurs reconnus et homologués, pour des résultats fiables.' },
              { icon: 'users', t: 'Conseil technique', d: 'Notre équipe vous oriente vers les bons produits et les bonnes doses pour vos cultures.' },
              { icon: 'leaf', t: 'Gamme complète', d: 'Semences, traitements, fertilisation et matériel : tout au même endroit.' },
              { icon: 'truck', t: 'Disponibilité', d: 'Approvisionnement régulier et livraison partout au Tchad.' },
              { icon: 'drop', t: 'Adapté au climat', d: 'Des variétés et solutions pensées pour les conditions sahéliennes.' },
              { icon: 'check', t: 'Prix compétitifs', d: 'Le meilleur rapport qualité-prix pour rentabiliser votre exploitation.' },
            ].map((f) => (
              <div key={f.t} className="feature">
                <div className="fi"><Icon name={f.icon} size={22} /></div>
                <div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section section-soft">
        <div className="container split">
          <div>
            <span className="eyebrow"><Icon name="leaf" size={15} /> À propos</span>
            <h2>AGROPHARMA TCHAD, au service de l’agriculture</h2>
            <p className="lead">
              Notre mission est de fournir aux producteurs des intrants et équipements de qualité,
              accessibles et adaptés, pour améliorer durablement les rendements agricoles au Tchad.
            </p>
            <ul className="check-list">
              <li><Icon name="check" size={20} /><span><b>Sélection rigoureuse</b> de chaque produit de notre catalogue.</span></li>
              <li><Icon name="check" size={20} /><span><b>Accompagnement de proximité</b> des maraîchers et exploitants.</span></li>
              <li><Icon name="check" size={20} /><span><b>Engagement qualité</b> — c’est notre signature : « Le choix de la qualité ».</span></li>
            </ul>
            <div style={{ marginTop: 26 }}>
              <Link href="/a-propos" className="btn btn-ghost">En savoir plus <Icon name="arrow" size={18} /></Link>
            </div>
          </div>
          <div className="media-card">
            <Image src="/logo.jpeg" alt="AGROPHARMA TCHAD" width={420} height={455} />
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="section" id="partenaires">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><Icon name="users" size={15} /> Nos partenaires</span>
            <h2>Des marques de référence à vos côtés</h2>
            <p>Nous travaillons avec des fournisseurs reconnus pour vous garantir des intrants fiables et de qualité.</p>
          </div>
          <div className="partners">
            {[
              { name: 'Technisem', logo: '/images/partners/technisem.jpeg', specialty: 'Semences' },
              { name: 'Savana', logo: '/images/partners/savana.jpeg', specialty: 'Produits phytosanitaires' },
              { name: 'Coda', logo: '/images/partners/coda.jpeg', specialty: 'Engrais' },
            ].map((p) => (
              <div key={p.name} className="partner">
                <Image src={p.logo} alt={`${p.name} — partenaire ${p.specialty.toLowerCase()}`} width={300} height={120} />
                <span className="partner-tag">{p.specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DERNIERS CONSEILS */}
      <ConseilsTeaser soft />

      {/* TÉMOIGNAGES (avis = exemples à remplacer ; pas de JSON-LD Review tant qu'ils ne sont pas réels) */}
      <Testimonials soft={false} />

      {/* COMMENT COMMANDER */}
      <Steps soft />

      {/* FAQ */}
      <Faq schema soft={false} />

      {/* CTA BAND */}
      <section className="section section-green cta-band">
        <div className="container">
          <h2>Prêt à booster vos cultures ?</h2>
          <p>Demandez votre devis gratuit — notre équipe vous répond rapidement avec une offre adaptée à vos besoins.</p>
          <div className="cta-actions">
            <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
            <a href={`tel:${site.phoneHref}`} className="btn btn-white">
              <Icon name="phone" size={18} /> {site.phoneDisplay}
            </a>
            <Link href="/contact" className="btn btn-outline-white">Formulaire de devis</Link>
          </div>
        </div>
      </section>
    </>
  );
}
