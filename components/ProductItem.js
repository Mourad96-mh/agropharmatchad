import Link from 'next/link';
import Image from 'next/image';
import { Icon } from './Icons';

// Carte d'un article de gamme. Si l'article possède des variétés, la carte est un
// lien vers sa page dédiée (/produits/[gamme]/[article]) ; sinon, simple carte.
export default function ProductItem({ item, fallbackImage, href }) {
  const variants = Array.isArray(item.variants) ? item.variants.filter((v) => v && v.name) : [];
  const hasVariants = variants.length > 0;
  const img = item.image || fallbackImage;

  if (!hasVariants) {
    return (
      <div className="item item-media-row">
        <span className="item-media">
          <Image src={img} alt={item.name} fill sizes="64px" />
        </span>
        <div>
          <h4>{item.name}</h4>
          <p>{item.desc}</p>
        </div>
      </div>
    );
  }

  const count = variants.length;

  return (
    <Link href={href} className="item item-media-row item-link">
      <span className="item-media">
        <Image src={img} alt={item.name} fill sizes="64px" />
      </span>
      <div>
        <h4>{item.name}</h4>
        <p>{item.desc}</p>
        <span className="item-hint">
          {count} variété{count > 1 ? 's' : ''} — voir le détail
        </span>
      </div>
      <span className="item-arrow"><Icon name="arrow" size={18} /></span>
    </Link>
  );
}
