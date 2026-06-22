'use client';

import { useEffect, useState } from 'react';
import { api } from '@/components/admin/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: null, conseils: null });
  const [loadError, setLoadError] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [msg, setMsg] = useState(null); // { type, text }

  useEffect(() => {
    Promise.all([api.listProducts(), api.listConseils()])
      .then(([p, c]) => setStats({ products: p.length, conseils: c.length }))
      .catch((e) => setLoadError(e.message));
  }, []);

  async function onPublish() {
    setMsg(null);
    setPublishing(true);
    try {
      await api.publish();
      setMsg({ type: 'ok', text: 'Publication lancée. Le site sera à jour dans 1 à 2 minutes.' });
    } catch (e) {
      setMsg({ type: 'err', text: e.message || 'Échec de la publication' });
    } finally {
      setPublishing(false);
    }
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Tableau de bord</h1>
          <p style={{ margin: 0, color: '#6b7785' }}>
            Gérez le catalogue et les conseils, puis publiez les modifications.
          </p>
        </div>
        <button className="btn-admin" onClick={onPublish} disabled={publishing}>
          {publishing ? 'Publication…' : 'Publier les modifications'}
        </button>
      </div>

      {msg && <div className={`admin-msg ${msg.type}`}>{msg.text}</div>}
      {loadError && <div className="admin-msg err">{loadError}</div>}

      <div className="admin-cards">
        <div className="admin-card">
          <div className="num">{stats.products ?? '—'}</div>
          <div className="lbl">Gammes de produits</div>
        </div>
        <div className="admin-card">
          <div className="num">{stats.conseils ?? '—'}</div>
          <div className="lbl">Conseils & guides</div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginTop: 0 }}>Comment publier ?</h3>
        <p style={{ color: '#4a5563', marginBottom: 0 }}>
          Vos modifications sont enregistrées immédiatement dans la base. Pour les rendre visibles sur
          le site public, cliquez sur <strong>« Publier les modifications »</strong> : le site est
          reconstruit automatiquement (1 à 2 minutes).
        </p>
      </div>
    </>
  );
}
