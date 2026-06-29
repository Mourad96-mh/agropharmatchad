'use client';

// Corps (visible) de la page /contact — coordonnées (téléphone, WhatsApp) en direct.
import Link from 'next/link';
import { useContent } from '@/components/content/ContentProvider';
import { Icon } from '@/components/Icons';
import QuoteForm from '@/components/QuoteForm';
import Faq from '@/components/Faq';
import Coverage from '@/components/Coverage';

export default function ContactView() {
  const { site, wa } = useContent();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb"><Link href="/">Accueil</Link> <span>/ Contact</span></nav>
          <h1>Contact &amp; devis</h1>
          <p>Une question ou un besoin en intrants agricoles ? Notre équipe vous répond rapidement.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2 style={{ marginBottom: 18 }}>Nos coordonnées</h2>
            <div className="contact-info">
              <a className="info-row" href={wa()} target="_blank" rel="noopener noreferrer">
                <span className="ii"><Icon name="whatsapp" size={22} /></span>
                <span><b>WhatsApp</b><span style={{ display: 'block', color: 'var(--muted)' }}>{site.phoneDisplay} — réponse rapide</span></span>
              </a>
              <div className="info-row">
                <span className="ii"><Icon name="phone" size={22} /></span>
                <div><b>Téléphone</b><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></div>
              </div>
              <div className="info-row">
                <span className="ii"><Icon name="mail" size={22} /></span>
                <div><b>Email</b><a href={`mailto:${site.email}`}>{site.email}</a></div>
              </div>
              <div className="info-row">
                <span className="ii"><Icon name="pin" size={22} /></span>
                <div><b>Adresse</b><p>{site.address.full}</p></div>
              </div>
              <div className="info-row">
                <span className="ii"><Icon name="clock" size={22} /></span>
                <div><b>Horaires</b><p>{site.hours}</p></div>
              </div>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>

      <Coverage />

      <Faq soft={false} />
    </>
  );
}
