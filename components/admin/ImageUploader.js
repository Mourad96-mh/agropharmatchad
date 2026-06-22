'use client';

import { useRef, useState } from 'react';
import { api } from './api';

// Téléverse une image sur Cloudinary et renvoie l'URL via onChange.
export default function ImageUploader({ value, onChange, label = 'Image' }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr('');
    setBusy(true);
    try {
      const { url } = await api.upload(file);
      onChange(url);
    } catch (e2) {
      setErr(e2.message || 'Échec du téléversement');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="admin-field">
      {label && <label>{label}</label>}
      <div className="admin-uploader">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="preview" src={value || '/images/hero.jpg'} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL de l'image"
          />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              className="btn-admin ghost sm"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              {busy ? 'Téléversement…' : 'Téléverser une image'}
            </button>
            {value && (
              <button type="button" className="btn-admin danger sm" onClick={() => onChange('')}>
                Retirer
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFile}
            style={{ display: 'none' }}
          />
          {err && <small style={{ color: '#b0271a' }}>{err}</small>}
        </div>
      </div>
    </div>
  );
}
