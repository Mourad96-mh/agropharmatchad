'use client';

import ItemsEditor from './ItemsEditor';

// Édite une liste de sous-catégories : { title, desc, items[] }.
export default function GroupsEditor({ groups = [], onChange }) {
  function update(i, patch) {
    onChange(groups.map((g, k) => (k === i ? { ...g, ...patch } : g)));
  }
  function add() {
    onChange([...groups, { title: '', desc: '', items: [] }]);
  }
  function remove(i) {
    onChange(groups.filter((_, k) => k !== i));
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= groups.length) return;
    const next = groups.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      {groups.map((g, i) => (
        <div className="admin-block" key={i} style={{ background: '#f7f9fb' }}>
          <div className="admin-block-head">
            <span className="tag">Sous-catégorie {i + 1}</span>
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
            <label>Titre de la sous-catégorie</label>
            <input type="text" value={g.title || ''} onChange={(e) => update(i, { title: e.target.value })} />
          </div>
          <div className="admin-field">
            <label>Description courte</label>
            <input type="text" value={g.desc || ''} onChange={(e) => update(i, { desc: e.target.value })} />
          </div>
          <ItemsEditor items={g.items || []} onChange={(items) => update(i, { items })} />
        </div>
      ))}
      <button type="button" className="btn-admin ghost" onClick={add}>
        + Ajouter une sous-catégorie
      </button>
    </div>
  );
}
