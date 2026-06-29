import AProposView from '@/components/views/AProposView';

export const metadata = {
  title: 'À propos',
  description:
    "Découvrez AGROPHARMA TCHAD : notre mission, nos valeurs et notre engagement pour fournir aux agriculteurs tchadiens des intrants et matériels agricoles de qualité.",
  alternates: { canonical: '/a-propos' },
};

export default function AProposPage() {
  return <AProposView />;
}
