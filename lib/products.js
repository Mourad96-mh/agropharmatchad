// Catégories de produits AGROPHARMA TCHAD.
// `slug` sert d'URL : /produits/[slug]
export const categories = [
  {
    slug: 'semences-maraicheres',
    title: 'Semences maraîchères',
    short: 'Semences maraîchères',
    icon: 'seed',
    image: '/images/semences-maraicheres.jpg',
    tagline: 'Des variétés Technisem sélectionnées, à haut rendement et adaptées au climat sahélien.',
    intro:
      "Nous proposons une large gamme de semences maraîchères et de graines potagères professionnelles, issues de variétés hybrides (F1) et locales sélectionnées pour leur rendement, leur résistance aux maladies et leur adaptation aux conditions climatiques du Tchad. Des semences fiables, organisées par type de légume, pour des récoltes abondantes saison après saison.",
    brand: 'Technisem',
    brandNote:
      "AGROPHARMA TCHAD distribue les semences Technisem (groupe Novalliance) : des variétés professionnelles éprouvées, sélectionnées pour les conditions tropicales et sahéliennes.",
    advisory: true,
    groups: [
      {
        title: 'Légumes-fruits',
        desc: 'Tomate, piment, aubergine et cucurbitacées.',
        items: [
          { name: 'Tomate', image: '/images/seeds/tomate.jpg', desc: 'Variétés hybrides résistantes, fermes et productives.' },
          { name: 'Piment & Poivron', image: '/images/seeds/poivron.jpg', desc: 'Variétés piquantes et douces à haut rendement.' },
          { name: 'Aubergine', image: '/images/seeds/aubergine.jpg', desc: 'Variétés africaines et hybrides.' },
          { name: 'Gombo', image: '/images/seeds/gombo.jpg', desc: 'Croissance rapide, adaptée au climat sahélien.' },
          { name: 'Concombre & Courgette', image: '/images/seeds/concombre.jpg', desc: 'Production précoce et continue.' },
          { name: 'Pastèque & Melon', image: '/images/seeds/pasteque.jpg', desc: 'Fruits sucrés, calibre export.' },
          { name: 'Courge & Potiron', image: '/images/seeds/courge.jpg', desc: 'Rustiques, bonne conservation après récolte.' },
        ],
      },
      {
        title: 'Légumes-feuilles',
        desc: 'Laitue, chou et légumes-feuilles tropicaux.',
        items: [
          { name: 'Laitue', image: '/images/seeds/laitue.jpg', desc: 'Pommes serrées, résistantes à la montée à graines.' },
          { name: 'Chou', image: '/images/seeds/chou.jpg', desc: 'Chou pommé et chou de Chine, têtes fermes et homogènes.' },
          { name: 'Épinard & Amarante', image: '/images/seeds/epinard.jpg', desc: 'Légumes-feuilles adaptés à la chaleur.' },
        ],
      },
      {
        title: 'Légumes-bulbes',
        desc: 'Oignon, échalote et poireau.',
        items: [
          { name: 'Oignon', image: '/images/seeds/oignon.jpg', desc: 'Bulbes de calibre régulier, bonne conservation.' },
          { name: 'Échalote', image: '/images/seeds/echalote.jpg', desc: 'Productive et adaptée aux marchés locaux.' },
          { name: 'Poireau', image: '/images/seeds/poireau.jpg', desc: 'Fûts longs et blancs, variétés rustiques.' },
        ],
      },
      {
        title: 'Légumes-racines',
        desc: 'Carotte, betterave, navet et radis.',
        items: [
          { name: 'Carotte', image: '/images/seeds/carotte.jpg', desc: 'Racines lisses, couleur intense.' },
          { name: 'Betterave', image: '/images/seeds/betterave.jpg', desc: 'Chair sucrée, racine régulière.' },
          { name: 'Navet & Radis', image: '/images/seeds/radis.jpg', desc: 'Cycle court, idéals pour semis échelonnés.' },
        ],
      },
      {
        title: 'Plantes condimentaires',
        desc: 'Aromatiques et espèces traditionnelles.',
        items: [
          { name: 'Coriandre', image: '/images/seeds/coriandre.jpg', desc: 'Aromatique à cycle court, très demandée.' },
          { name: 'Basilic & Menthe', image: '/images/seeds/basilic.jpg', desc: 'Plantes condimentaires parfumées.' },
          { name: 'Oseille de Guinée & Persil', image: '/images/seeds/persil.jpg', desc: 'Espèces traditionnelles du Sahel.' },
        ],
      },
    ],
  },
  {
    slug: 'produits-phytosanitaires',
    title: 'Produits phytosanitaires',
    short: 'Produits phytosanitaires',
    icon: 'shield',
    image: '/images/produits-phytosanitaires.jpg',
    tagline: 'Protégez vos cultures contre les ravageurs, maladies et mauvaises herbes.',
    intro:
      "Notre gamme de produits phytosanitaires homologués protège efficacement vos cultures du semis à la récolte. Insecticides, fongicides, herbicides et acaricides sélectionnés pour leur efficacité, dans le respect des bonnes pratiques agricoles et des doses recommandées.",
    brand: 'Savana',
    brandNote:
      "AGROPHARMA TCHAD distribue les produits phytosanitaires Savana : des spécialités homologuées et fiables pour la protection des cultures, à employer selon les doses et bonnes pratiques recommandées.",
    items: [
      { name: 'Insecticides', desc: 'Contre chenilles, pucerons, mouches blanches et autres ravageurs.' },
      { name: 'Fongicides', desc: 'Préventifs et curatifs contre mildiou, oïdium et pourritures.' },
      { name: 'Herbicides', desc: 'Sélectifs et totaux pour un désherbage maîtrisé.' },
      { name: 'Acaricides', desc: 'Lutte ciblée contre les acariens et araignées rouges.' },
      { name: 'Nématicides', desc: 'Protection des racines contre les nématodes.' },
      { name: 'Régulateurs & adjuvants', desc: 'Mouillants et améliorateurs de traitement.' },
    ],
  },
  {
    slug: 'engrais-liquides',
    title: 'Engrais liquides',
    short: 'Engrais liquides',
    icon: 'drop',
    image: '/images/engrais-liquides.jpg',
    tagline: 'Nutrition foliaire et fertigation pour une assimilation rapide.',
    intro:
      "Les engrais liquides AGROPHARMA TCHAD apportent aux cultures des éléments nutritifs rapidement assimilables, par voie foliaire ou par fertigation. Idéals pour corriger les carences, stimuler la croissance et améliorer la qualité et le calibre des récoltes.",
    items: [
      { name: 'Engrais foliaires NPK', desc: 'Formules équilibrées pour chaque stade de culture.' },
      { name: 'Oligo-éléments', desc: 'Correction des carences en fer, zinc, bore, magnésium.' },
      { name: 'Biostimulants', desc: 'Acides aminés et algues pour stimuler la croissance.' },
      { name: 'Engrais organo-minéraux', desc: 'Association matière organique et minéraux.' },
      { name: 'Solutions de fertigation', desc: 'Pour systèmes d’irrigation goutte-à-goutte.' },
    ],
  },
  {
    slug: 'engrais-solides',
    title: 'Engrais solides',
    short: 'Engrais solides',
    icon: 'bag',
    image: '/images/engrais-solides.jpg',
    tagline: 'Fertilisation de fond et d’entretien pour des sols riches.',
    intro:
      "Notre gamme d’engrais solides couvre tous les besoins de fertilisation de fond et d’entretien : engrais minéraux NPK, urée, DAP, ainsi que des amendements organiques pour enrichir durablement vos sols et soutenir des rendements élevés saison après saison.",
    items: [
      { name: 'NPK (formules variées)', desc: 'Engrais complets équilibrés selon la culture.' },
      { name: 'Urée 46%', desc: 'Apport d’azote pour la croissance végétative.' },
      { name: 'DAP / Phosphates', desc: 'Stimulation racinaire et démarrage des cultures.' },
      { name: 'Sulfate de potassium', desc: 'Qualité, calibre et conservation des fruits.' },
      { name: 'Engrais organiques', desc: 'Amendements pour la vie et la structure du sol.' },
    ],
  },
  {
    slug: 'materiels-agricoles',
    title: 'Matériels agricoles',
    short: 'Matériels agricoles',
    icon: 'tool',
    image: '/images/materiels-agricoles.jpg',
    tagline: 'Équipements et outillage pour travailler, irriguer et traiter.',
    intro:
      "AGROPHARMA TCHAD équipe les producteurs avec du matériel agricole fiable : pulvérisateurs, motopompes, systèmes d’irrigation et petit outillage. Des équipements robustes pour gagner en productivité et en efficacité sur l’exploitation.",
    items: [
      { name: 'Pulvérisateurs', desc: 'À dos, à pression et motorisés pour les traitements.' },
      { name: 'Motopompes', desc: 'Pompage et irrigation des parcelles.' },
      { name: 'Irrigation goutte-à-goutte', desc: 'Kits et accessoires d’irrigation localisée.' },
      { name: 'Petit outillage', desc: 'Houes, sécateurs, arrosoirs et matériel de jardinage.' },
      { name: 'Équipements de protection', desc: 'Combinaisons, gants et masques pour les traitements.' },
    ],
  },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}
