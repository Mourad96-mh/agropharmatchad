import { site } from '@/lib/site';
import { categories } from '@/lib/products';
import ProduitsListView from '@/components/views/ProduitsListView';

export const metadata = {
  title: 'Semences, engrais & matériels agricoles',
  description:
    'Découvrez les gammes AGROPHARMA TCHAD : semences maraîchères, produits phytosanitaires, engrais liquides et solides, et matériels agricoles de qualité au Tchad.',
  alternates: { canonical: '/produits' },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Produits AGROPHARMA TCHAD',
  itemListElement: categories.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.title,
    url: `${site.url}/produits/${c.slug}`,
  })),
};

export default function ProduitsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <ProduitsListView />
    </>
  );
}
