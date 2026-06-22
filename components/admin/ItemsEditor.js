'use client';

import ImageUploader from './ImageUploader';

// Édite les variétés d'un article : [{ name, desc }].
function VariantsEditor({ variants = [], onChange }) {
  function update(i, patch) {
    onChange(variants.map((v, k) => (k === i ? { ...v, ...patch } : v)));
  }
  function add() {
    onChange([...variants, { name: '', desc: '' }]);
  }
  function remove(i) {
    onChange(variants.filter((_, k) => k !== i));
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= variants.length) return;
    const next = variants.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="admin-variants">
      <label className="admin-variants-label">
        Variétés (s'affichent au clic sur l'article — ex. Minetto, NPK 20-20-20)
      </label>
      {variants.map((v, i) => (
        <div className="admin-variant-row" key={i}>
          <input
            type="text"
            placeholder="Nom de la variété"
            value={v.name || ''}
            onChange={(e) => update(i, { name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description courte (optionnel)"
            value={v.desc || ''}
            onChange={(e) => update(i, { desc: e.target.value })}
          />
          <div className="admin-inline-btns">
            <button type="button" className="btn-admin ghost sm" onClick={() => move(i, -1)}>↑</button>
            <button type="button" className="btn-admin ghost sm" onClick={() => move(i, 1)}>↓</button>
            <button type="button" className="btn-admin danger sm" onClick={() => remove(i)}>✕</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn-admin ghost sm" onClick={add}>
        + Ajouter une variété
      </button>
    </div>
  );
}

// Édite une liste d'articles : { name, desc, image, variants[] }.
export default function ItemsEditor({ items = [], onChange }) {
  function update(i, patch) {
    const next = items.map((it, k) => (k === i ? { ...it, ...patch } : it));
    onChange(next);
  }
  function add() {
    onChange([...items, { name: '', desc: '', image: '', variants: [] }]);
  }
  function remove(i) {
    onChange(items.filter((_, k) => k !== i));
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      {items.map((it, i) => (
        <div className="admin-block" key={i}>
          <div className="admin-block-head">
            <span className="tag">Article {i + 1}</span>
            <div className="admin-inline-btns">
              <button type="button" className="btn-admin ghost sm" onClick={() => move(i, -1)}>
                ↑
              </button>
              <button type="button" className="btn-admin ghost sm" onClick={() => move(i, 1)}>
                ↓
              </button>
              <button type="button" className="btn-admin danger sm" onClick={() => remove(i)}>
                Supprimer
              </button>
            </div>
          </div>
          <div className="admin-field">
            <label>Nom</label>
            <input type="text" value={it.name || ''} onChange={(e) => update(i, { name: e.target.value })} />
          </div>
          <div className="admin-field">
            <label>Description</label>
            <textarea value={it.desc || ''} onChange={(e) => update(i, { desc: e.target.value })} />
          </div>
          <ImageUploader value={it.image} onChange={(url) => update(i, { image: url })} />
          <VariantsEditor variants={it.variants || []} onChange={(variants) => update(i, { variants })} />
        </div>
      ))}
      <button type="button" className="btn-admin ghost" onClick={add}>
        + Ajouter un article
      </button>
    </div>
  );
}
