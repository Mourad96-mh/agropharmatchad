'use client';

import { useState } from 'react';
import { useContent } from '@/components/content/ContentProvider';
import { Icon } from './Icons';

export default function QuoteForm() {
  const { categories, site } = useContent();
  const [sent, setSent] = useState(false);

  function buildMessage(data) {
    return (
      `Bonjour AGROPHARMA TCHAD,%0A%0A` +
      `Nouvelle demande de devis :%0A` +
      `• Nom : ${data.nom}%0A` +
      `• Téléphone : ${data.tel}%0A` +
      (data.email ? `• Email : ${data.email}%0A` : '') +
      (data.ville ? `• Ville : ${data.ville}%0A` : '') +
      `• Produit / gamme : ${data.produit}%0A` +
      `• Message : ${data.message || '—'}`
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const f = e.target;
    const data = {
      nom: f.nom.value.trim(),
      tel: f.tel.value.trim(),
      email: f.email.value.trim(),
      ville: f.ville.value.trim(),
      produit: f.produit.value,
      message: f.message.value.trim(),
    };
    const url = `https://wa.me/${site.whatsapp}?text=${buildMessage(data)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
    f.reset();
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {sent && (
        <div className="alert-ok">
          <Icon name="check" size={20} /> Merci ! Votre demande s’ouvre dans WhatsApp. Sinon, appelez-nous au {site.phoneDisplay}.
        </div>
      )}
      <h3 style={{ marginBottom: 18 }}>Demander un devis gratuit</h3>

      <div className="form-row">
        <div className="field">
          <label htmlFor="nom">Nom complet *</label>
          <input id="nom" name="nom" type="text" required placeholder="Votre nom" />
        </div>
        <div className="field">
          <label htmlFor="tel">Téléphone *</label>
          <input id="tel" name="tel" type="tel" required placeholder="+235 ..." />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="vous@exemple.com" />
        </div>
        <div className="field">
          <label htmlFor="ville">Ville</label>
          <input id="ville" name="ville" type="text" placeholder="N'Djamena, Moundou…" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="produit">Produit / gamme concernée *</label>
        <select id="produit" name="produit" required defaultValue="">
          <option value="" disabled>Choisir une gamme…</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.title}>{c.title}</option>
          ))}
          <option value="Plusieurs gammes / autre">Plusieurs gammes / autre</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Votre message</label>
        <textarea id="message" name="message" placeholder="Précisez quantités, cultures, surface, besoins…" />
      </div>

      <div className="form-submit">
        <button type="submit" className="btn btn-wa">
          <Icon name="whatsapp" size={18} /> Envoyer via WhatsApp
        </button>
        <a href={`tel:${site.phoneHref}`} className="btn btn-ghost">
          <Icon name="phone" size={18} /> Appeler
        </a>
      </div>
      <p className="form-note">* Champs obligatoires. Votre demande est transmise par WhatsApp — réponse rapide garantie.</p>
    </form>
  );
}
