import Link from 'next/link';
import { Icon } from '@/components/Icons';

export const metadata = { title: 'Page introuvable' };

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center', minHeight: '52vh', display: 'grid', placeItems: 'center' }}>
      <div className="container">
        <span className="eyebrow"><Icon name="leaf" size={15} /> Erreur 404</span>
        <h1>Page introuvable</h1>
        <p className="lead" style={{ maxWidth: 520, margin: '0 auto 26px' }}>
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">Retour à l’accueil <Icon name="arrow" size={18} /></Link>
          <Link href="/produits" className="btn btn-ghost">Voir nos produits</Link>
        </div>
      </div>
    </section>
  );
}
