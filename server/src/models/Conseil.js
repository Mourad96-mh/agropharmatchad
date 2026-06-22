import mongoose from 'mongoose';

const { Schema } = mongoose;

const RelatedSchema = new Schema(
  { slug: String, label: String },
  { _id: false }
);

// Article de conseil — correspond à /conseils/[slug]
// `body` reste un tableau libre (Mixed) pour préserver les blocs :
//   { h: '…' } sous-titre · { p: '…' | [segments] } paragraphe · { ul: ['…'] } liste
// où un segment peut être une chaîne ou un lien interne { to, label }.
const ConseilSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: String,
    excerpt: String,
    date: String,
    readtime: String,
    image: String,
    intro: String,
    related: [RelatedSchema],
    body: { type: [Schema.Types.Mixed], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Conseil', ConseilSchema);
