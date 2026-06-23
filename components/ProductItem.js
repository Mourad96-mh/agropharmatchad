import Link from 'next/link';
import Image from 'next/image';
import { Icon } from './Icons';

// Carte d'un article de gamme. Toujours un lien vers sa page dédiée
// (/produits/[gamme]/[article]) où l'on retrouve image, description et variétés.
export default function ProductItem({ item, fallbackImage, href }) {
  const variants = Array.isArray(item.variants) ? item.variants.filter((v) => v && v.name) : [];
  const count = variants.length;
  const img = item.image || fallbackImage;

  return (
    <Link href={href} className="item item-media-row item-link">
      <span className="item-media">
        <Image src={img} alt={item.name} fill sizes="64px" />
      </span>
      <div>
        <h4>{item.name}</h4>
        <p>{item.desc}</p>
        <span className="item-hint">
          {count > 0 ? `${count} variété${count > 1 ? 's' : ''} — voir le détail` : 'Voir le détail'}
        </span>
      </div>
      <span className="item-arrow"><Icon name="arrow" size={18} /></span>
    </Link>
  );
}
