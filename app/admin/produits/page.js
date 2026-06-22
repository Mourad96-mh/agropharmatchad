'use client';

import { useEffect, useState } from 'react';
import { api, slugify } from '@/components/admin/api';
import ImageUploader from '@/components/admin/ImageUploader';
import ItemsEditor from '@/components/admin/ItemsEditor';
import GroupsEditor from '@/components/admin/GroupsEditor';

const ICONS = ['seed', 'leaf', 'drop', 'shield', 'bag', 'tool', 'truck'];

const EMPTY = {
  slug: '',
  title: '',
  short: '',
  icon: 'leaf',
  image: '',
  tagline: '',
  intro: '',
  brand: '',
  brandNote: '',
  advisory: false,
  groups: [],
  items: [],
};

function itemCount(c) {
  if (Array.isArray(c.groups) && c.groups.length)
    return c.groups.reduce((n, g) => n + (g.items?.length || 0), 0);
  return c.items?.length || 0;
}

export default function ProduitsAdmin() {
  const [list, setList] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // objet en cours d'édition
  const [mode, setMode] = useState('groups'); // 'groups' | 'flat'
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function load() {
    api
      .listProducts()
      .then(setList)
      .catch((e) => setError(e.message));
  }
  useEffect(load, []);

  function startNew() {
    setEditing({ ...EMPTY });
    setMode('groups');
    setMsg(null);
  }
  function startEdit(c) {
    setEditing(JSON.parse(JSON.stringify(c)));
    setMode(Array.isArray(c.groups) && c.groups.length ? 'groups' : 'flat');
    setMsg(null);
  }
  function field(patch) {
    setEditing((e) => ({ ...e, ...patch }));
  }

  async function remove(c) {
    if (!confirm(`Supprimer la gamme « ${c.title} » ?`)) return;
    try {
      await api.deleteProduct(c._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function save(e) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const payload = {
        ...editing,
        slug: editing.slug || slugify(editing.title),
        // Une seule structure active : groupes OU liste plate.
        groups: mode === 'groups' ? editing.groups || [] : [],
        items: mode === 'flat' ? editing.items || [] : [],
      };
      if (editing._id) await api.updateProduct(editing._id, payload);
      else await api.createProduct(payload);
      setEditing(null);
      load();
    } catch (e2) {
      setMsg({ type: 'err', text: e2.message || 'Échec de l’enregistrement' });
    } finally {
      setSaving(false);
    }
  }

  // ---- Liste ----
  if (!editing) {
    return (
      <>
        <div className="admin-head">
          <h1>Produits</h1>
          <button className="btn-admin" onClick={startNew}>
            + Nouvelle gamme
          </button>
        </div>
        {error && <div className="admin-msg err">{error}</div>}
        {!list ? (
          <p>Chargement…</p>
        ) : (
          <div className="admin-list">
            {list.map((c) => (
              <div className="admin-row" key={c._id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="thumb" src={c.image || '/images/hero.jpg'} alt="" />
                <div className="grow">
                  <strong>{c.title}</strong>
                  <small>
                    /{c.slug} · {itemCount(c)} article(s)
                  </small>
                </div>
                <button className="btn-admin ghost sm" onClick={() => startEdit(c)}>
                  Modifier
                </button>
                <button className="btn-admin danger sm" onClick={() => remove(c)}>
                  Supprimer
                </button>
              </div>
            ))}
            {list.length === 0 && <div className="admin-row">Aucune gamme.</div>}
          </div>
        )}
      </>
    );
  }

  // ---- Formulaire ----
  return (
    <form onSubmit={save}>
      <div className="admin-head">
        <h1>{editing._id ? 'Modifier la gamme' : 'Nouvelle gamme'}</h1>
        <button type="button" className="btn-admin ghost" onClick={() => setEditing(null)}>
          ← Retour
        </button>
      </div>

      {msg && <div className={`admin-msg ${msg.type}`}>{msg.text}</div>}

      <div className="admin-grid-2">
        <div className="admin-field">
          <label>Titre</label>
          <input
            type="text"
            value={editing.title}
            onChange={(e) => field({ title: e.target.value })}
            required
          />
        </div>
        <div className="admin-field">
          <label>Slug (URL : /produits/…)</label>
          <input
            type="text"
            value={editing.slug}
            onChange={(e) => field({ slug: e.target.value })}
            placeholder={slugify(editing.title)}
          />
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-field">
          <label>Nom court</label>
          <input type="text" value={editing.short} onChange={(e) => field({ short: e.target.value })} />
        </div>
        <div className="admin-field">
          <label>Icône</label>
          <select value={editing.icon} onChange={(e) => field({ icon: e.target.value })}>
            {ICONS.map((ic) => (
              <option key={ic} value={ic}>
                {ic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-field">
        <label>Accroche (tagline)</label>
        <input type="text" value={editing.tagline} onChange={(e) => field({ tagline: e.target.value })} />
      </div>

      <div className="admin-field">
        <label>Présentation (intro)</label>
        <textarea value={editing.intro} onChange={(e) => field({ intro: e.target.value })} />
      </div>

      <ImageUploader
        label="Image de la gamme"
        value={editing.image}
        onChange={(url) => field({ image: url })}
      />

      <div className="admin-grid-2">
        <div className="admin-field">
          <label>Marque partenaire (optionnel)</label>
          <input type="text" value={editing.brand} onChange={(e) => field({ brand: e.target.value })} />
        </div>
        <div className="admin-field" style={{ display: 'flex', alignItems: 'center' }}>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={!!editing.advisory}
              onChange={(e) => field({ advisory: e.target.checked })}
            />
            Afficher le bloc « Conseil & formation »
          </label>
        </div>
      </div>

      <div className="admin-field">
        <label>Note sur la marque (optionnel)</label>
        <textarea value={editing.brandNote} onChange={(e) => field({ brandNote: e.target.value })} />
      </div>

      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #dde3ea' }} />

      <div className="admin-field">
        <label>Organisation des articles</label>
        <div style={{ display: 'flex', gap: 16 }}>
          <label className="admin-check">
            <input
              type="radio"
              name="mode"
              checked={mode === 'groups'}
              onChange={() => setMode('groups')}
            />
            En sous-catégories
          </label>
          <label className="admin-check">
            <input
              type="radio"
              name="mode"
              checked={mode === 'flat'}
              onChange={() => setMode('flat')}
            />
            Liste simple
          </label>
        </div>
      </div>

      {mode === 'groups' ? (
        <GroupsEditor groups={editing.groups || []} onChange={(groups) => field({ groups })} />
      ) : (
        <ItemsEditor items={editing.items || []} onChange={(items) => field({ items })} />
      )}

      <div className="admin-actions">
        <button className="btn-admin" type="submit" disabled={saving}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <button type="button" className="btn-admin ghost" onClick={() => setEditing(null)}>
          Annuler
        </button>
      </div>
    </form>
  );
}
