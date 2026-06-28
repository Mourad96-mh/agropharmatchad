'use client';

import { useEffect, useState } from 'react';
import { api } from '@/components/admin/api';
import ImageUploader from '@/components/admin/ImageUploader';

export default function ParametresAdmin() {
  const [form, setForm] = useState(null); // { phoneDisplay, whatsapp }
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    api
      .getSettings()
      .then((s) =>
        setForm({
          phoneDisplay: s.phoneDisplay || '',
          whatsapp: s.whatsapp || '',
          heroImage: s.heroImage || '',
        })
      )
      .catch((e) => setError(e.message));
  }, []);

  function field(patch) {
    setForm((f) => ({ ...f, ...patch }));
  }

  async function save(e) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const payload = {
        phoneDisplay: form.phoneDisplay.trim(),
        // WhatsApp : on garde uniquement les chiffres (format international sans +).
        whatsapp: (form.whatsapp || '').replace(/\D/g, ''),
        heroImage: (form.heroImage || '').trim(),
      };
      await api.updateSettings(payload);
      setForm({
        phoneDisplay: payload.phoneDisplay,
        whatsapp: payload.whatsapp,
        heroImage: payload.heroImage,
      });
      setMsg({
        type: 'ok',
        text: 'Coordonnées enregistrées. Cliquez sur « Publier les modifications » (Tableau de bord) pour les afficher sur le site.',
      });
    } catch (e2) {
      setMsg({ type: 'err', text: e2.message || 'Échec de l’enregistrement' });
    } finally {
      setSaving(false);
    }
  }

  if (error) return <div className="admin-msg err">{error}</div>;
  if (!form) return <p>Chargement…</p>;

  // Aperçu du lien d'appel dérivé du numéro affiché.
  const telPreview = '+' + (form.phoneDisplay || '').replace(/\D/g, '');

  return (
    <form onSubmit={save}>
      <div className="admin-head">
        <div>
          <h1>Paramètres</h1>
          <p style={{ margin: 0, color: '#6b7785' }}>
            Coordonnées affichées partout sur le site (en-tête, contact, WhatsApp).
          </p>
        </div>
      </div>

      {msg && <div className={`admin-msg ${msg.type}`}>{msg.text}</div>}

      <div className="admin-card" style={{ maxWidth: 560 }}>
        <div className="admin-field">
          <label>Numéro de téléphone (affiché)</label>
          <input
            type="text"
            value={form.phoneDisplay}
            onChange={(e) => field({ phoneDisplay: e.target.value })}
            placeholder="+235 93 16 62 02"
            required
          />
          <small style={{ color: '#6b7785' }}>
            Lien d’appel généré : <strong>{telPreview}</strong>
          </small>
        </div>

        <div className="admin-field">
          <label>Numéro WhatsApp (format international, sans +)</label>
          <input
            type="text"
            value={form.whatsapp}
            onChange={(e) => field({ whatsapp: e.target.value })}
            placeholder="23593166202"
          />
          <small style={{ color: '#6b7785' }}>
            Exemple : pour +235 93 16 62 02, saisissez 23593166202.
          </small>
        </div>

        <div className="admin-field">
          <label>Image d’accueil (grande photo de la page d’accueil)</label>
          <ImageUploader
            label=""
            value={form.heroImage}
            onChange={(url) => field({ heroImage: url })}
          />
          <small style={{ color: '#6b7785' }}>
            Téléversez une photo (format paysage conseillé). Laissez vide pour garder l’image par
            défaut.
          </small>
        </div>

        <div className="admin-actions">
          <button className="btn-admin" type="submit" disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </form>
  );
}
