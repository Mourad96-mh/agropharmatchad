'use client';

// Petit client HTTP pour le tableau de bord admin.
// Lit l'URL de l'API dans NEXT_PUBLIC_API_URL et attache le JWT stocké en localStorage.
const API = process.env.NEXT_PUBLIC_API_URL || '';
const TOKEN_KEY = 'agropharma_admin_token';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(t) {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error((data && data.error) || `Erreur ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  login: (email, password) =>
    request('/api/auth/login', { method: 'POST', body: { email, password } }),

  listProducts: () => request('/api/products'),
  createProduct: (b) => request('/api/products', { method: 'POST', body: b, auth: true }),
  updateProduct: (id, b) => request(`/api/products/${id}`, { method: 'PUT', body: b, auth: true }),
  deleteProduct: (id) => request(`/api/products/${id}`, { method: 'DELETE', auth: true }),

  listConseils: () => request('/api/conseils'),
  createConseil: (b) => request('/api/conseils', { method: 'POST', body: b, auth: true }),
  updateConseil: (id, b) => request(`/api/conseils/${id}`, { method: 'PUT', body: b, auth: true }),
  deleteConseil: (id) => request(`/api/conseils/${id}`, { method: 'DELETE', auth: true }),

  publish: () => request('/api/publish', { method: 'POST', auth: true }),

  async upload(file) {
    const fd = new FormData();
    fd.append('file', file);
    return request('/api/uploads', { method: 'POST', body: fd, auth: true, isForm: true });
  },
};

// Génère un slug propre à partir d'un titre.
export function slugify(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
