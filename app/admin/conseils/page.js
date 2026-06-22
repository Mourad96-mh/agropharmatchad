'use client';

import { useEffect, useState } from 'react';
import { api, slugify } from '@/components/admin/api';
import ImageUploader from '@/components/admin/ImageUploader';
import BlockEditor from '@/components/admin/BlockEditor';

const EMPTY = {
  slug: '',
  title: '',
  excerpt: '',
  date: new Date().toISOString().slice(0, 10),
  readtime: '5 min',
  image: '',
  intro: '',
  related: [],
  body: [],
};

export default function ConseilsAdmin() {
  const [list, setList] = useState(null);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function load() {
    api
      .listConseils()
      .then(setList)
      .catch((e) => setError(e.message));
    api
      .listProducts()
      .then(setCats)
      .catch(() => {});
  }
  useEffect(load, []);

  function startNew() {
    setEditing({ ...EMPTY, body: [], related: [] });
    setMsg(null);
  }
  function startEdit(c) {
    setEditing(JSON.parse(JSON.stringify(c)));
    setMsg(null);
  }
  function field(patch) {
    setEditing((e) => ({ ...e, ...patch }));
  }

  function toggleRelated(cat) {
    const exists = (editing.related || []).some((r) => r.slug === cat.slug);
    const related = exists
      ? editing.related.filter((r) => r.slug !== cat.slug)
      : [...(editing.related || []), { slug: cat.slug, label: cat.title }];
    field({ related });
  }

  async function remove(c) {
    if (!confirm(`Supprimer l’article « ${c.title} » ?`)) return;
    try {
      await api.deleteConseil(c._id);
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
      const payload = { ...editing, slug: editing.slug || slugify(editing.title) };
      if (editing._id) await api.updateConseil(editing._id, payload);
      else await api.createConseil(payload);
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
          <h1>Conseils & guides</h1>
          <button className="btn-admin" onClick={startNew}>
            + Nouvel article
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
                    /{c.slug} · {c.date}
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
            {list.length === 0 && <div className="admin-row">Aucun article.</div>}
          </div>
        )}
      </>
    );
  }

  // ---- Formulaire ----
  return (
    <form onSubmit={save}>
      <div className="admin-head">
        <h1>{editing._id ? 'Modifier l’article' : 'Nouvel article'}</h1>
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
          <label>Slug (URL : /conseils/…)</label>
          <input
            type="text"
            value={editing.slug}
            onChange={(e) => field({ slug: e.target.value })}
            placeholder={slugify(editing.title)}
          />
        </div>
      </div>

      <div className="admin-field">
        <label>Résumé (excerpt — affiché dans les listes et le SEO)</label>
        <textarea value={editing.excerpt} onChange={(e) => field({ excerpt: e.target.value })} />
      </div>

      <div className="admin-grid-2">
        <div className="admin-field">
          <label>Date</label>
          <input type="date" value={editing.date} onChange={(e) => field({ date: e.target.value })} />
        </div>
        <div className="admin-field">
          <label>Temps de lecture</label>
          <input
            type="text"
            value={editing.readtime}
            onChange={(e) => field({ readtime: e.target.value })}
            placeholder="5 min"
          />
        </div>
      </div>

      <ImageUploader
        label="Image de l’article"
        value={editing.image}
        onChange={(url) => field({ image: url })}
      />

      <div className="admin-field">
        <label>Introduction (chapô)</label>
        <textarea value={editing.intro} onChange={(e) => field({ intro: e.target.value })} />
      </div>

      <div className="admin-field">
        <label>Produits associés</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {cats.map((cat) => (
            <label className="admin-check" key={cat.slug}>
              <input
                type="checkbox"
                checked={(editing.related || []).some((r) => r.slug === cat.slug)}
                onChange={() => toggleRelated(cat)}
              />
              {cat.title}
            </label>
          ))}
        </div>
      </div>

      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #dde3ea' }} />

      <div className="admin-field">
        <label>Contenu de l’article</label>
        <BlockEditor blocks={editing.body || []} onChange={(body) => field({ body })} />
      </div>

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
