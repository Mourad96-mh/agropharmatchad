import { site } from '@/lib/site';
import { Icon } from '@/components/Icons';

// Principales villes / provinces desservies (l'entreprise couvre les 23 provinces du Tchad).
const cities = [
  "N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Doba', 'Bongor',
  'Kélo', 'Pala', 'Mongo', 'Ati', 'Am Timan', 'Koumra',
  'Mao', 'Bol', 'Massakory', 'Faya-Largeau',
];

const mapSrc = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;

// Section "Zone de couverture" — carte + provinces desservies (SEO local).
export default function Coverage({ soft = true }) {
  return (
    <section className={`section${soft ? ' section-soft' : ''}`} id="zone">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><Icon name="map" size={15} /> Où nous trouver</span>
          <h2>Zone de couverture &amp; livraison</h2>
          <p>Basés à N&apos;Djamena, nous livrons les producteurs dans l&apos;ensemble des 23 provinces du Tchad.</p>
        </div>

        <div className="coverage-grid">
          <div className="coverage-map">
            <iframe
              src={mapSrc}
              title={`Localisation ${site.name} — ${site.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="coverage-info">
            <div className="coverage-addr">
              <span className="ii"><Icon name="pin" size={22} /></span>
              <div>
                <b>Notre point de vente</b>
                <p>{site.address.full}</p>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="card-link">
                  Voir sur Google Maps <Icon name="arrow" size={16} />
                </a>
              </div>
            </div>

            <p className="coverage-lead">Nous desservons notamment :</p>
            <ul className="coverage-cities">
              {cities.map((c) => (
                <li key={c}><Icon name="check" size={16} /> {c}</li>
              ))}
            </ul>
            <p className="coverage-note">… et l&apos;ensemble des autres provinces sur demande.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
