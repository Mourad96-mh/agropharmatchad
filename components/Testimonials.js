import { testimonials } from '@/lib/testimonials';
import { Icon } from '@/components/Icons';

// Section Témoignages clients (preuve sociale).
// ⚠️ Les avis sont des EXEMPLES (placeholders) — à remplacer par de vrais témoignages clients.
// Tant qu'ils ne sont pas réels, on n'émet PAS de JSON-LD Review/AggregateRating
// (un balisage d'avis fictifs est contraire aux règles Google). Réactiver le schéma
// une fois les vrais avis en place.
function Stars({ n = 5 }) {
  return (
    <span className="t-stars" aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Icon key={i} name="star" size={16} />
      ))}
    </span>
  );
}

export default function Testimonials({ soft = false }) {
  return (
    <section className={`section${soft ? ' section-soft' : ''}`} id="temoignages">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><Icon name="quote" size={15} /> Ils nous font confiance</span>
          <h2>Ce que disent nos clients</h2>
          <p>Maraîchers, coopératives et exploitants partagent leur expérience avec AGROPHARMA TCHAD.</p>
        </div>
        <div className="grid grid-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="testimonial">
              <Stars n={t.rating} />
              <blockquote>“{t.text}”</blockquote>
              <figcaption>
                <span className="t-avatar"><Icon name="users" size={20} /></span>
                <span>
                  <b>{t.name}</b>
                  <span className="t-meta">{t.role} — {t.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
