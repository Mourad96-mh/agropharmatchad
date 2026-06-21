import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { categories } from '@/lib/products';
import { Icon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/logo.jpeg" alt="AGROPHARMA TCHAD" width={140} height={140} style={{ height: 54, width: 'auto' }} />
            <p>{site.baseline}</p>
          </div>

          <div>
            <h3>Navigation</h3>
            <ul className="footer-links">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/produits">Produits</Link></li>
              <li><Link href="/conseils">Conseils</Link></li>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/contact">Contact &amp; devis</Link></li>
            </ul>
          </div>

          <div>
            <h3>Nos produits</h3>
            <ul className="footer-links">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/produits/${c.slug}`}>{c.short}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <div className="footer-contact">
              <div><Icon name="pin" size={18} /><span>{site.address.full}</span></div>
              <div><Icon name="phone" size={18} /><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></div>
              <div><Icon name="mail" size={18} /><a href={`mailto:${site.email}`}>{site.email}</a></div>
              <div><Icon name="clock" size={18} /><span>{site.hours}</span></div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {site.name}. Tous droits réservés.</span>
          <span>Semences · Phytosanitaires · Engrais · Matériels agricoles — {site.address.city}, Tchad</span>
        </div>
      </div>
    </footer>
  );
}
