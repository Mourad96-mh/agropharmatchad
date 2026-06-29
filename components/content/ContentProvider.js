'use client';

// Fournit le contenu du site (gammes, conseils, paramètres) à toute l'application.
//
// Hybride « build-time + runtime » :
//  - Au rendu initial (HTML statique), on utilise les données figées au build passées en props
//    → affichage instantané et identique au HTML pré-rendu (pas de décalage d'hydratation, SEO OK).
//  - Au montage côté navigateur, on récupère les données à jour depuis l'API (Render) et on
//    rafraîchit l'affichage. Le site reflète alors la base de données sans reconstruction.
//
// Si l'API est injoignable, on conserve les données du build : la page reste fonctionnelle.

import { createContext, useContext, useEffect, useState } from 'react';
import { buildSite, waLinkFor } from '@/lib/site';

const API = process.env.NEXT_PUBLIC_API_URL || '';

const ContentContext = createContext(null);

async function fetchJson(url) {
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return r.json();
}

export function ContentProvider({
  initialCategories = [],
  initialConseils = [],
  initialSettings = {},
  children,
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [conseils, setConseils] = useState(initialConseils);
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    if (!API) return;
    let alive = true;

    (async () => {
      // Chaque ressource est indépendante : une erreur sur l'une ne bloque pas les autres.
      const results = await Promise.allSettled([
        fetchJson(`${API}/api/products`),
        fetchJson(`${API}/api/conseils`),
        fetchJson(`${API}/api/settings`),
      ]);
      if (!alive) return;

      const [p, c, s] = results;
      if (p.status === 'fulfilled' && Array.isArray(p.value)) setCategories(p.value);
      if (c.status === 'fulfilled' && Array.isArray(c.value)) setConseils(c.value);
      if (s.status === 'fulfilled' && s.value && typeof s.value === 'object') setSettings(s.value);
    })();

    return () => {
      alive = false;
    };
  }, []);

  const site = buildSite(settings);
  // Helper lié au numéro WhatsApp courant (live).
  const wa = (message) => waLinkFor(site.whatsapp, message);

  return (
    <ContentContext.Provider value={{ categories, conseils, site, wa }}>
      {children}
    </ContentContext.Provider>
  );
}

// Accès au contenu live depuis n'importe quel composant client.
// Hors provider (sécurité), renvoie des valeurs vides + site par défaut.
export function useContent() {
  const ctx = useContext(ContentContext);
  if (ctx) return ctx;
  const site = buildSite({});
  return { categories: [], conseils: [], site, wa: (m) => waLinkFor(site.whatsapp, m) };
}
