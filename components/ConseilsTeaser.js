import Link from 'next/link';
import Image from 'next/image';
import { conseils } from '@/lib/conseils';
import { Icon } from '@/components/Icons';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Teaser "Derniers conseils" — met en avant les articles récents sur l'accueil.
export default function ConseilsTeaser({ soft = true, limit = 3 }) {
  const latest = [...conseils].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);

  return (
    <section className={`section${soft ? ' section-soft' : ''}`} id="conseils">
      <div className="container">
        <div className="section-head section-head-row">
          <div>
            <span className="eyebrow"><Icon name="book" size={15} /> Conseils agricoles</span>
            <h2>Derniers conseils &amp; guides</h2>
            <p>Des repères pratiques pour réussir vos cultures au Tchad, du semis à la récolte.</p>
          </div>
          <Link href="/conseils" className="btn btn-ghost section-head-cta">
            Tous les conseils <Icon name="arrow" size={18} />
          </Link>
        </div>

        <div className="grid grid-3">
          {latest.map((c) => (
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
  );
}
