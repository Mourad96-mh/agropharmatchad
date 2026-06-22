'use client';

import ImageUploader from './ImageUploader';

// Édite une liste d'articles : { name, desc, image }.
export default function ItemsEditor({ items = [], onChange }) {
  function update(i, patch) {
    const next = items.map((it, k) => (k === i ? { ...it, ...patch } : it));
    onChange(next);
  }
  function add() {
    onChange([...items, { name: '', desc: '', image: '' }]);
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
        </div>
      ))}
      <button type="button" className="btn-admin ghost" onClick={add}>
        + Ajouter un article
      </button>
    </div>
  );
}
