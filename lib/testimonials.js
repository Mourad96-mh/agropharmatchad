// ⚠️ PLACEHOLDERS / EXEMPLES — NE PAS publier en l'état.
// Ces témoignages sont fictifs et servent uniquement de gabarit visuel.
// À REMPLACER par de VRAIS avis clients (Google Business / Facebook / WhatsApp avec accord) :
//   { name, role, city, rating, text }
// Le balisage JSON-LD Review/AggregateRating est DÉSACTIVÉ dans components/Testimonials.js
// tant que les avis ne sont pas réels (un balisage d'avis fictifs viole les règles Google).
// `aggregateRating` ci-dessous n'est donc plus utilisé pour le moment — le rebrancher
// (et le schéma) une fois les vrais avis en place.
export const testimonials = [
  {
    name: 'Mahamat A.',
    role: 'Maraîcher',
    city: "N'Djamena",
    rating: 5,
    text:
      "Des semences de qualité et de bons conseils pour mes cultures de tomate et d'oignon. Les rendements ont nettement augmenté cette saison.",
  },
  {
    name: 'Achta D.',
    role: 'Coopérative agricole',
    city: 'Moundou',
    rating: 5,
    text:
      "Une équipe à l'écoute qui nous oriente vers les bons engrais et les bonnes doses. Livraison fiable jusque dans notre région.",
  },
  {
    name: 'Issa K.',
    role: 'Exploitant',
    city: 'Sarh',
    rating: 5,
    text:
      "Je trouve tout au même endroit : semences, traitements et matériel. Des produits homologués et un vrai accompagnement technique.",
  },
];

// Note moyenne (à ajuster selon les vrais avis Google Business).
export const aggregateRating = { value: 5, count: testimonials.length };
