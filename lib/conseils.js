// Conseils & guides agricoles — contenu éditorial (SEO longue traîne, vocabulaire réel).
// Chaque article : slug (URL), title, excerpt, date (ISO), readtime, image, body.
// `body` = liste de blocs : { h } (sous-titre), { p } (paragraphe), { ul: [...] } (liste).
export const conseils = [
  {
    slug: 'calendrier-semis-maraicher-tchad',
    title: 'Calendrier de semis maraîcher au Tchad',
    excerpt:
      "Quand semer tomate, oignon, laitue ou pastèque au Tchad ? Repères de saisons et bonnes pratiques de semis adaptés au climat sahélien.",
    date: '2026-06-10',
    readtime: '5 min',
    image: '/images/semences-maraicheres.jpg',
    intro:
      "Bien choisir sa période de semis est la première clé d'une récolte réussie. Sous le climat sahélien du Tchad, la réussite dépend surtout de la gestion de la chaleur et de l'eau. Voici des repères pratiques pour planifier vos semis maraîchers, saison après saison.",
    related: [{ slug: 'semences-maraicheres', label: 'Semences maraîchères' }],
    body: [
      { h: 'Comprendre les saisons' },
      {
        p: [
          "Le Tchad connaît une saison sèche (octobre à mai) et une saison des pluies (juin à septembre). La majorité des cultures maraîchères se conduisent en saison sèche, sur des sols irrigués (bord de fleuve, bas-fonds, puits ou forages), période où la pression des maladies est plus faible. Pour bien démarrer, partez de ",
          { to: '/produits/semences-maraicheres', label: 'semences maraîchères adaptées au climat sahélien' },
          ".",
        ],
      },
      { h: 'Repères de semis par culture' },
      {
        ul: [
          'Tomate, piment, poivron : semis en pépinière d\'octobre à janvier, repiquage 4 à 5 semaines plus tard.',
          'Oignon : semis en pépinière d\'octobre à décembre pour des bulbes de bonne conservation.',
          'Laitue et choux : semis échelonnés de novembre à février pour étaler la production.',
          'Pastèque, melon, concombre : semis en place de novembre à février, sur sol bien drainé.',
          'Gombo et amarante : plus tolérants à la chaleur, ils se sèment aussi en début de saison des pluies.',
        ],
      },
      { h: 'Bonnes pratiques au semis' },
      {
        ul: [
          'Préparez une pépinière propre, à l\'ombre légère, pour protéger les jeunes plants de la chaleur.',
          'Respectez la densité et la profondeur de semis indiquées pour chaque variété.',
          'Arrosez régulièrement le matin ou le soir pour limiter l\'évaporation.',
          'Privilégiez des variétés hybrides (F1) sélectionnées pour les conditions tropicales.',
        ],
      },
      {
        p: "Besoin d'aide pour bâtir votre calendrier cultural ? Notre équipe vous conseille sur le choix des variétés et le bon moment pour semer selon votre zone.",
      },
    ],
  },
  {
    slug: 'bien-choisir-doser-engrais',
    title: 'Bien choisir et doser ses engrais',
    excerpt:
      "Engrais solides ou liquides, NPK, fractionnement des apports : les repères essentiels pour nourrir vos cultures sans gaspiller.",
    date: '2026-06-12',
    readtime: '4 min',
    image: '/images/engrais-solides.jpg',
    intro:
      "Un bon engrais, bien dosé et apporté au bon moment, améliore le rendement tout en maîtrisant les coûts. Voici comment raisonner la fertilisation de vos cultures.",
    related: [
      { slug: 'engrais-solides', label: 'Engrais solides' },
      { slug: 'engrais-liquides', label: 'Engrais liquides' },
    ],
    body: [
      { h: 'Solides ou liquides ?' },
      {
        p: [
          "Les ",
          { to: '/produits/engrais-solides', label: 'engrais solides' },
          " (granulés, NPK, urée) servent surtout de fond de fumure et d'apports de fond pendant le cycle. Les ",
          { to: '/produits/engrais-liquides', label: 'engrais liquides et foliaires' },
          " agissent vite et corrigent les carences en cours de culture. Les deux sont complémentaires.",
        ],
      },
      { h: 'Comprendre le NPK' },
      {
        ul: [
          'N (azote) : développement des feuilles et de la végétation.',
          'P (phosphore) : enracinement, floraison et nouaison.',
          'K (potassium) : qualité des fruits, résistance au stress et à la sécheresse.',
        ],
      },
      { h: 'Fractionner les apports' },
      {
        p: "Plutôt qu'un seul apport massif, fractionnez l'engrais en plusieurs passages au cours du cycle. Vous limitez les pertes par lessivage, vous nourrissez la plante quand elle en a besoin, et vous économisez du produit.",
      },
      {
        ul: [
          'Apport de fond avant ou au repiquage.',
          'Apports d\'entretien réguliers en végétation.',
          'Apports ciblés à la floraison et à la formation des fruits.',
        ],
      },
      {
        p: "Les doses dépendent de la culture, du sol et de l'objectif de rendement. Demandez-nous un conseil de fertilisation adapté à votre parcelle.",
      },
    ],
  },
  {
    slug: 'proteger-cultures-nuisibles',
    title: 'Protéger ses cultures contre les nuisibles',
    excerpt:
      "Surveiller, identifier et traiter au bon moment : les principes d'une protection efficace et raisonnée des cultures maraîchères.",
    date: '2026-06-14',
    readtime: '4 min',
    image: '/images/produits-phytosanitaires.jpg',
    intro:
      "Insectes, maladies et mauvaises herbes peuvent réduire fortement les rendements. Une protection efficace repose sur la surveillance, le bon diagnostic et un traitement raisonné.",
    related: [{ slug: 'produits-phytosanitaires', label: 'Produits phytosanitaires' }],
    body: [
      { h: 'Surveiller régulièrement' },
      {
        p: "Inspectez vos parcelles plusieurs fois par semaine, surtout le revers des feuilles. Détecter tôt un foyer permet d'intervenir sur une petite surface, avec moins de produit et plus d'efficacité.",
      },
      { h: 'Identifier avant de traiter' },
      {
        ul: [
          'Insectes piqueurs-suceurs : pucerons, mouches blanches, thrips.',
          'Chenilles et foreuses sur tomate, chou et gombo.',
          'Maladies fongiques favorisées par l\'humidité (mildiou, oïdium).',
        ],
      },
      { h: 'Traiter de façon raisonnée' },
      {
        ul: [
          [
            'Choisissez un ',
            { to: '/produits/produits-phytosanitaires', label: 'produit phytosanitaire homologué' },
            ' adapté au ravageur identifié.',
          ],
          'Respectez la dose, le volume d\'eau et le délai avant récolte.',
          'Traitez tôt le matin ou en fin de journée, sans vent.',
          'Alternez les familles de produits pour éviter les résistances.',
        ],
      },
      {
        p: [
          "Une bonne rotation des cultures et des ",
          { to: '/produits/semences-maraicheres', label: 'semences maraîchères résistantes' },
          " réduisent aussi la pression des maladies. Notre équipe vous oriente vers les bons traitements et les bonnes doses.",
        ],
      },
    ],
  },

  {
    slug: 'culture-tomate-tchad',
    title: 'Réussir la culture de la tomate au Tchad',
    excerpt:
      "Du semis en pépinière à la récolte : variétés, repiquage, irrigation et protection pour réussir la tomate sous le climat sahélien du Tchad.",
    date: '2026-06-16',
    readtime: '6 min',
    image: '/images/seeds/tomate.jpg',
    intro:
      "La tomate est l'une des cultures maraîchères les plus rentables au Tchad, mais aussi l'une des plus exigeantes. Chaleur, irrigation et pression des ravageurs doivent être maîtrisées. Voici un itinéraire technique complet, du semis à la récolte, adapté aux conditions sahéliennes.",
    related: [
      { slug: 'semences-maraicheres', label: 'Semences maraîchères' },
      { slug: 'produits-phytosanitaires', label: 'Produits phytosanitaires' },
    ],
    body: [
      { h: 'Choisir la variété et la période' },
      {
        p: [
          "La culture de la tomate au Tchad se conduit surtout en saison sèche (octobre à mai), sur sol irrigué. Privilégiez des ",
          { to: '/produits/semences-maraicheres', label: 'variétés hybrides F1' },
          " sélectionnées pour les conditions tropicales : elles résistent mieux à la chaleur, aux maladies et offrent un meilleur rendement que les variétés tout-venant.",
        ],
      },
      { h: 'Le semis en pépinière' },
      {
        ul: [
          'Semez en pépinière propre, à mi-ombre, d\'octobre à janvier.',
          'Maintenez le substrat frais par des arrosages légers le matin et le soir.',
          'Repiquez les plants en place 4 à 5 semaines après le semis, quand ils ont 4 à 5 vraies feuilles.',
          'Espacez les plants de 50 à 60 cm sur des lignes distantes de 80 cm à 1 m.',
        ],
      },
      { h: 'Irrigation et fertilisation' },
      {
        p: [
          "La tomate craint à la fois le manque et l'excès d'eau. Un arrosage régulier et maîtrisé — idéalement en ",
          { to: '/produits/materiels-agricoles', label: 'goutte-à-goutte' },
          " — limite l'éclatement des fruits et les maladies. Côté nutrition, fractionnez les apports d'",
          { to: '/produits/engrais-solides', label: 'engrais' },
          " : azote en croissance, puis phosphore et potassium à la floraison et à la formation des fruits.",
        ],
      },
      { h: 'Protéger la culture' },
      {
        ul: [
          'Surveillez le revers des feuilles : mouche blanche, pucerons et acariens sont fréquents en saison sèche.',
          'Traitez tôt avec un produit homologué dès l\'apparition d\'un foyer, sans attendre.',
          'Aérez et tuteurez pour limiter mildiou et pourritures liées à l\'humidité.',
        ],
      },
      {
        p: "Récoltez régulièrement, à maturité, pour stimuler la production. Notre équipe vous accompagne sur le choix des variétés et la protection adaptée à votre parcelle.",
      },
    ],
  },

  {
    slug: 'culture-oignon-tchad',
    title: "Cultiver l'oignon au Tchad : semis, repiquage et conservation",
    excerpt:
      "Variétés, calendrier de contre-saison, fertilisation et séchage : tout pour produire des bulbes d'oignon de qualité et bien conservés au Tchad.",
    date: '2026-06-17',
    readtime: '5 min',
    image: '/images/seeds/oignon.jpg',
    intro:
      "L'oignon est une culture stratégique au Tchad : forte demande sur les marchés, bonne valeur et possibilité de stockage. La clé d'une production rentable tient au choix de la variété, à la conduite en contre-saison et à un séchage soigné des bulbes.",
    related: [{ slug: 'semences-maraicheres', label: 'Semences maraîchères' }],
    body: [
      { h: 'Variétés et période de semis' },
      {
        p: [
          "Choisissez des ",
          { to: '/produits/semences-maraicheres', label: 'variétés d\'oignon adaptées aux jours courts' },
          " et à faible taux de montaison, pour des bulbes réguliers et de bonne conservation. Le semis en pépinière se fait d'octobre à décembre.",
        ],
      },
      { h: 'Repiquage et conduite' },
      {
        ul: [
          'Repiquez les jeunes plants 6 à 8 semaines après le semis, en planches bien préparées.',
          'Respectez une densité serrée (10 à 12 cm entre plants) pour des bulbes de calibre marchand.',
          'Désherbez régulièrement : l\'oignon supporte mal la concurrence des adventices.',
        ],
      },
      { h: 'Fertilisation et irrigation' },
      {
        p: [
          "Apportez un ",
          { to: '/produits/engrais-solides', label: 'engrais de fond' },
          " riche en phosphore au repiquage, puis des apports d'entretien azotés et potassiques. Réduisez l'arrosage en fin de cycle, dès que les feuilles commencent à se coucher, pour favoriser le grossissement et la maturation des bulbes.",
        ],
      },
      { h: 'Récolte et conservation' },
      {
        ul: [
          'Récoltez quand la majorité des feuilles sont tombées.',
          'Laissez les bulbes ressuyer au champ puis sécher à l\'ombre, bien aérés.',
          'Stockez dans un local sec et ventilé pour limiter les pertes.',
        ],
      },
      {
        p: "Bien conduit, l'oignon de contre-saison se vend à bon prix quand l'offre se raréfie. Demandez-nous conseil sur la variété la mieux adaptée à votre zone.",
      },
    ],
  },

  {
    slug: 'irrigation-goutte-a-goutte-saison-seche',
    title: "Irrigation goutte-à-goutte en saison sèche",
    excerpt:
      "Économiser l'eau et augmenter les rendements en saison sèche : principes, matériel et bonnes pratiques du goutte-à-goutte au Tchad.",
    date: '2026-06-18',
    readtime: '5 min',
    image: '/images/materiels-agricoles.jpg',
    intro:
      "En saison sèche, l'eau est le premier facteur limitant du maraîchage au Tchad. Le goutte-à-goutte apporte l'eau directement au pied des plantes, réduit le gaspillage et améliore nettement les rendements par rapport à l'arrosage manuel.",
    related: [
      { slug: 'materiels-agricoles', label: 'Matériels agricoles' },
      { slug: 'engrais-liquides', label: 'Engrais liquides' },
    ],
    body: [
      { h: 'Pourquoi le goutte-à-goutte' },
      {
        ul: [
          'Économie d\'eau : l\'eau va à la racine, sans pertes par ruissellement ou évaporation.',
          'Moins de maladies : le feuillage reste sec, ce qui limite les champignons.',
          'Moins de mauvaises herbes : seules les lignes de culture sont humidifiées.',
          'Gain de temps et de main-d\'œuvre par rapport à l\'arrosoir.',
        ],
      },
      { h: 'Le matériel de base' },
      {
        p: [
          "Un système simple se compose d'une réserve (bidon, château d'eau ou bassin), d'un filtre, d'une conduite principale et de lignes de goutteurs. Retrouvez les pompes, kits et accessoires dans notre gamme de ",
          { to: '/produits/materiels-agricoles', label: 'matériels agricoles' },
          ".",
        ],
      },
      { h: 'Bonnes pratiques' },
      {
        ul: [
          'Irriguez tôt le matin ou en fin de journée pour limiter l\'évaporation.',
          'Nettoyez régulièrement le filtre pour éviter le colmatage des goutteurs.',
          'Adaptez la durée d\'irrigation au stade de la culture et au type de sol.',
        ],
      },
      { h: 'Fertigation : irriguer et nourrir' },
      {
        p: [
          "Le goutte-à-goutte permet aussi la fertigation : apporter des ",
          { to: '/produits/engrais-liquides', label: 'engrais liquides' },
          " directement avec l'eau d'irrigation. La plante reçoit des doses régulières et bien assimilées, ce qui économise l'engrais et soutient la croissance.",
        ],
      },
      {
        p: "Notre équipe vous aide à dimensionner une installation adaptée à votre surface et à votre source d'eau.",
      },
    ],
  },

  {
    slug: 'choisir-semences-hybrides-f1',
    title: "Semences hybrides F1 ou variétés locales : comment choisir",
    excerpt:
      "Rendement, résistance, coût, ressemis : les vraies différences entre semences hybrides F1 et variétés locales pour le maraîcher tchadien.",
    date: '2026-06-19',
    readtime: '4 min',
    image: '/images/semences-maraicheres.jpg',
    intro:
      "Faut-il investir dans des semences hybrides F1 ou continuer avec des variétés locales ? Les deux ont leur place. Voici les critères concrets pour décider selon votre culture, votre marché et votre budget.",
    related: [{ slug: 'semences-maraicheres', label: 'Semences maraîchères' }],
    body: [
      { h: 'Ce qu\'apportent les hybrides F1' },
      {
        ul: [
          'Rendement supérieur et plus homogène (calibre, maturité, qualité).',
          'Meilleure résistance à certaines maladies et au stress climatique.',
          'Production souvent plus précoce, utile pour viser les bons créneaux de marché.',
        ],
      },
      { h: 'Les limites à connaître' },
      {
        p: "Les semences F1 coûtent plus cher à l'achat et ne se ressèment pas : les graines récoltées sur une plante F1 ne reproduisent pas les qualités de la plante mère. Il faut donc racheter de la semence à chaque cycle. Pour une culture intensive et commerciale, l'investissement est généralement rentabilisé par le rendement.",
      },
      { h: 'Quand garder des variétés locales' },
      {
        p: "Les variétés locales restent intéressantes pour l'autoconsommation, certaines espèces traditionnelles du Sahel, et quand le ressemis sur l'exploitation est un objectif. Elles sont rustiques et bien adaptées au contexte local.",
      },
      { h: 'Notre conseil' },
      {
        p: [
          "Pour les cultures à forte valeur (tomate, oignon, chou, poivron), les hybrides F1 sont souvent le meilleur choix. Découvrez notre gamme de ",
          { to: '/produits/semences-maraicheres', label: 'semences maraîchères' },
          ", organisée par type de légume, et demandez-nous la variété adaptée à votre objectif.",
        ],
      },
    ],
  },

  {
    slug: 'lutte-mouche-blanche-pucerons',
    title: "Lutter contre la mouche blanche et les pucerons",
    excerpt:
      "Identifier, surveiller et traiter mouches blanches, pucerons et thrips : une stratégie raisonnée pour protéger le maraîchage au Tchad.",
    date: '2026-06-20',
    readtime: '5 min',
    image: '/images/produits-phytosanitaires.jpg',
    intro:
      "Mouches blanches, pucerons et thrips sont les ravageurs piqueurs-suceurs les plus destructeurs en maraîchage sahélien. Ils affaiblissent les plantes et transmettent des virus. Une lutte efficace repose sur la surveillance précoce et un traitement raisonné.",
    related: [
      { slug: 'produits-phytosanitaires', label: 'Produits phytosanitaires' },
      { slug: 'semences-maraicheres', label: 'Semences maraîchères' },
    ],
    body: [
      { h: 'Reconnaître les dégâts' },
      {
        ul: [
          'Mouche blanche : petits insectes blancs qui s\'envolent quand on secoue le feuillage ; miellat et fumagine noire.',
          'Pucerons : colonies sur jeunes pousses et revers des feuilles, feuilles déformées et collantes.',
          'Thrips : fines stries argentées et déformations sur feuilles et fruits.',
        ],
      },
      { h: 'Surveiller tôt' },
      {
        p: "Inspectez vos parcelles plusieurs fois par semaine, surtout le dessous des feuilles. Les pièges colorés (jaunes et bleus) aident à détecter les premières arrivées et à décider du moment d'intervenir.",
      },
      { h: 'Traiter de façon raisonnée' },
      {
        p: [
          "Dès l'apparition d'un foyer, utilisez un ",
          { to: '/produits/produits-phytosanitaires', label: 'produit homologué' },
          " adapté au ravageur, en respectant la dose, le volume d'eau et le délai avant récolte. Traitez tôt le matin ou en fin de journée, sans vent, et visez bien le revers des feuilles.",
        ],
      },
      { h: 'Prévenir le retour' },
      {
        ul: [
          'Alternez les familles de produits pour éviter les résistances.',
          'Éliminez les résidus de culture et les mauvaises herbes hôtes.',
          'Privilégiez des semences vigoureuses et, si possible, tolérantes aux virus.',
        ],
      },
      {
        p: "Une intervention précoce et bien ciblée coûte moins cher et protège mieux. Notre équipe vous oriente vers le bon produit et la bonne dose.",
      },
    ],
  },

  {
    slug: 'preparer-pepiniere-maraichere',
    title: "Préparer une pépinière maraîchère réussie",
    excerpt:
      "Substrat, semis, ombrage et arrosage : les étapes pour produire des plants vigoureux en pépinière, base d'une bonne culture maraîchère.",
    date: '2026-06-21',
    readtime: '4 min',
    image: '/images/semences-maraicheres.jpg',
    intro:
      "La pépinière conditionne toute la culture qui suit : un plant sain et vigoureux donne une plante productive. Tomate, oignon, poivron, chou ou laitue passent presque tous par cette étape. Voici comment réussir vos plants avant le repiquage.",
    related: [
      { slug: 'semences-maraicheres', label: 'Semences maraîchères' },
      { slug: 'produits-phytosanitaires', label: 'Produits phytosanitaires' },
    ],
    body: [
      { h: 'Préparer un bon substrat' },
      {
        p: "Choisissez un emplacement propre, à l'écart des anciennes cultures malades. Le substrat doit être meuble, riche et bien drainé : un mélange de terre fine et de matière organique bien décomposée convient. Un sol nivelé et débarrassé des cailloux facilite la levée.",
      },
      { h: 'Semer au bon endroit' },
      {
        p: [
          "Utilisez des ",
          { to: '/produits/semences-maraicheres', label: 'semences de qualité' },
          " et respectez la profondeur de semis propre à chaque espèce — trop profond, la graine ne lève pas ; trop superficiel, elle sèche. Semez en lignes pour faciliter l'entretien et le repérage.",
        ],
      },
      { h: 'Ombrage et arrosage' },
      {
        ul: [
          'Installez un ombrage léger (paillage, claie) pour protéger les jeunes plants de la chaleur.',
          'Arrosez en pluie fine, le matin et le soir, sans détremper le substrat.',
          'Levez progressivement l\'ombrage pour endurcir les plants avant le repiquage.',
        ],
      },
      { h: 'Surveiller la fonte des semis' },
      {
        p: [
          "Les jeunes plants sont sensibles à la fonte des semis (champignons) et aux insectes. Aérez, évitez l'excès d'eau et intervenez avec un ",
          { to: '/produits/produits-phytosanitaires', label: 'produit adapté' },
          " si nécessaire. Repiquez quand les plants ont 4 à 5 vraies feuilles et un système racinaire bien développé.",
        ],
      },
      {
        p: "Des plants robustes au départ, c'est déjà la moitié de la récolte assurée. Demandez-nous conseil sur le choix des semences et la protection en pépinière.",
      },
    ],
  },
];

export function getConseil(slug) {
  return conseils.find((c) => c.slug === slug);
}
// 9 guides — contenu SEO longue traîne, ancré au contexte sahélien du Tchad.
