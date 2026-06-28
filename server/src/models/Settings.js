import mongoose from 'mongoose';

const { Schema } = mongoose;

// Paramètres généraux du site — document unique (singleton).
// Permet de modifier les coordonnées depuis l'admin sans toucher au code.
// `key` est fixe ('site') et unique : garantit qu'un seul document existe.
const SettingsSchema = new Schema(
  {
    key: { type: String, default: 'site', unique: true },
    phoneDisplay: String, // ex: +235 93 16 62 02
    whatsapp: String, // format international sans + ni espaces, ex: 23593166202
    heroImage: String, // URL de l'image principale (bannière) de la page d'accueil
  },
  { timestamps: true }
);

export default mongoose.model('Settings', SettingsSchema);
