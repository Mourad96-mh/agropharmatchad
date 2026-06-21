import { faqs } from '@/lib/faq';
import { Icon } from '@/components/Icons';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Section FAQ réutilisable — affichée sur toutes les pages.
// `schema` : n'émettre le JSON-LD FAQPage qu'une seule fois par site (sur l'accueil)
// pour éviter de dupliquer le même balisage sur chaque page.
export default function Faq({ schema = false, soft = true }) {
  return (
    <section className={`section${soft ? ' section-soft' : ''}`} id="faq">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><Icon name="star" size={15} /> Questions fréquentes</span>
          <h2>Vous avez une question ?</h2>
          <p>Les réponses aux questions les plus courantes sur nos produits et services.</p>
        </div>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                <span>{f.q}</span>
                <Icon name="arrow" size={18} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
