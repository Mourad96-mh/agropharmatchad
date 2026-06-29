import ContactView from '@/components/views/ContactView';

export const metadata = {
  title: 'Contact & devis',
  description:
    "Contactez AGROPHARMA TCHAD pour un devis gratuit sur les semences, produits phytosanitaires, engrais et matériels agricoles. Téléphone, WhatsApp et formulaire.",
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactView />;
}
