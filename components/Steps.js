import { site, waLink } from '@/lib/site';
import { Icon } from '@/components/Icons';

const steps = [
  {
    icon: 'chat',
    t: 'Contactez-nous',
    d: 'Par WhatsApp, téléphone ou via le formulaire. Dites-nous vos cultures et vos besoins.',
  },
  {
    icon: 'users',
    t: 'Recevez un conseil',
    d: 'Notre équipe vous oriente vers les bons produits, les bonnes variétés et les bonnes doses.',
  },
  {
    icon: 'bag',
    t: 'Devis sur mesure',
    d: 'Nous vous proposons une offre claire et adaptée, au meilleur rapport qualité-prix.',
  },
  {
    icon: 'truck',
    t: 'Livraison au Tchad',
    d: 'Vos intrants et matériels livrés partout au Tchad, de N\'Djamena aux provinces.',
  },
];

// Bande "Comment commander" — 4 étapes, réduit la friction vers le devis WhatsApp.
export default function Steps({ soft = true }) {
  return (
    <section className={`section${soft ? ' section-soft' : ''}`} id="commander">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><Icon name="check" size={15} /> Simple et rapide</span>
          <h2>Comment commander ?</h2>
          <p>De votre premier message à la livraison, nous vous accompagnons à chaque étape.</p>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.t} className="step">
              <span className="step-num">{i + 1}</span>
              <span className="step-icon"><Icon name={s.icon} size={26} /></span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="steps-cta">
          <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> Démarrer sur WhatsApp
          </a>
          <a href={`tel:${site.phoneHref}`} className="btn btn-ghost">
            <Icon name="phone" size={18} /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
