import mongoose from 'mongoose';

const { Schema } = mongoose;

// Une variété / déclinaison d'un article (ex: « Minetto », « NPK 20-20-20 »)
const VariantSchema = new Schema(
  { name: String, desc: String },
  { _id: false }
);

// Un article vendu (variété de semence, produit, matériel…)
const ItemSchema = new Schema(
  { name: String, image: String, desc: String, variants: [VariantSchema] },
  { _id: false }
);

// Sous-catégorie regroupant des articles (ex: « Légumes-fruits »)
const GroupSchema = new Schema(
  { title: String, desc: String, items: [ItemSchema] },
  { _id: false }
);

// Gamme de produits — correspond à /produits/[slug]
const CategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: String,
    short: String,
    icon: String,
    image: String,
    tagline: String,
    intro: String,
    brand: String,
    brandNote: String,
    advisory: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    // Une gamme utilise SOIT des groupes, SOIT une liste plate d'articles.
    groups: [GroupSchema],
    items: [ItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Category', CategorySchema);
