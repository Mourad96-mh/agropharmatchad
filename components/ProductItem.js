'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from './Icons';

// Carte d'un article de gamme. Si l'article possède des variétés (`variants`),
// la carte devient un bouton qui déplie la liste des variétés ; sinon elle reste
// une simple carte non cliquable (comportement historique).
export default function ProductItem({ item, fallbackImage }) {
  const [open, setOpen] = useState(false);
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
  const plural = count > 1 ? 's' : '';

  return (
    <div className={`item item-expandable${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="item-toggle item-media-row"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="item-media">
          <Image src={img} alt={item.name} fill sizes="64px" />
        </span>
        <div className="item-toggle-text">
          <h4>{item.name}</h4>
          <p>{item.desc}</p>
          <span className="item-hint">
            {count} variété{plural} — cliquez pour {open ? 'masquer' : 'voir'}
          </span>
        </div>
        <span className="item-chevron"><Icon name="chevron" size={18} /></span>
      </button>

      <ul className="item-variants" hidden={!open}>
        {variants.map((v) => (
          <li key={v.name}>
            <span className="item-variant-name">{v.name}</span>
            {v.desc ? <span className="item-variant-desc">{v.desc}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
