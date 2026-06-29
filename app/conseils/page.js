import { site } from '@/lib/site';
import { conseils } from '@/lib/conseils';
import ConseilsListView from '@/components/views/ConseilsListView';

export const metadata = {
  title: 'Conseils agricoles & guides',
  description:
    "Guides pratiques AGROPHARMA TCHAD : calendrier de semis, fertilisation, protection des cultures. Des conseils adaptés au climat sahélien du Tchad.",
  alternates: { canonical: '/conseils' },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Conseils agricoles — AGROPHARMA TCHAD',
  itemListElement: conseils.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.title,
    url: `${site.url}/conseils/${c.slug}`,
  })),
};

export default function ConseilsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <ConseilsListView />
    </>
  );
}
