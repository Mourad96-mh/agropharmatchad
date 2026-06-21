import { site } from '@/lib/site';
import { categories } from '@/lib/products';
import { conseils } from '@/lib/conseils';

export const dynamic = 'force-static';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ['', '/produits', '/conseils', '/a-propos', '/contact'].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.8,
  }));

  const productRoutes = categories.map((c) => ({
    url: `${site.url}/produits/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const conseilRoutes = conseils.map((c) => ({
    url: `${site.url}/conseils/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...conseilRoutes];
}
