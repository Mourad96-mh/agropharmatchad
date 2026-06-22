import './globals.css';
import './components.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { site } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'AGROPHARMA TCHAD — Semences & intrants agricoles au Tchad',
    template: '%s | AGROPHARMA TCHAD',
  },
  description:
    "Fournisseur agricole au Tchad : semences maraîchères, produits phytosanitaires, engrais et matériels agricoles. Le choix de la qualité.",
  keywords: [
    'agropharma tchad',
    'semences maraîchères Tchad',
    'produits phytosanitaires Tchad',
    'engrais Tchad',
    'engrais liquides',
    'engrais solides',
    'matériel agricole Tchad',
    "fournisseur agricole N'Djamena",
    'intrants agricoles Tchad',
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: site.url,
    siteName: site.name,
    title: 'AGROPHARMA TCHAD — Le choix de la qualité',
    description:
      'Semences maraîchères, produits phytosanitaires, engrais et matériels agricoles de qualité au Tchad.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'AGROPHARMA TCHAD — Le choix de la qualité' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGROPHARMA TCHAD — Le choix de la qualité',
    description:
      'Semences, phytosanitaires, engrais et matériels agricoles de qualité au Tchad.',
    images: ['/og-default.jpg'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'Qv-MbJKj8M2oja-k8IsaIrC0UbeIml16BJWZJxo_FZw' },
};

export const viewport = {
  themeColor: '#2ba84a',
  width: 'device-width',
  initialScale: 1,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': `${site.url}/#organization`,
  name: site.name,
  slogan: site.slogan,
  description: site.baseline,
  url: site.url,
  logo: `${site.url}/logo.jpeg`,
  image: `${site.url}/logo.jpeg`,
  telephone: site.phoneDisplay,
  email: site.email,
  priceRange: '$$',
  currenciesAccepted: 'XAF',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: 'TD',
  },
  hasMap: site.mapUrl,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: [
    { '@type': 'Country', name: 'Tchad' },
    { '@type': 'City', name: "N'Djamena" },
    { '@type': 'City', name: 'Moundou' },
    { '@type': 'City', name: 'Sarh' },
    { '@type': 'City', name: 'Abéché' },
    { '@type': 'City', name: 'Doba' },
    { '@type': 'City', name: 'Bongor' },
  ],
  knowsAbout: [
    'Semences maraîchères',
    'Graines potagères',
    'Produits phytosanitaires',
    'Engrais',
    'Matériel agricole',
    'Agriculture au Tchad',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  sameAs: [site.social.facebook, site.social.tiktok, site.social.instagram].filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
