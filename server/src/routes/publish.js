import { Router } from 'express';
import auth from '../middleware/auth.js';

const router = Router();

// POST /api/publish
//
// Le site public lit désormais le contenu en direct depuis cette API (« runtime fetch ») :
// toute modification faite dans l'admin est visible immédiatement, sans reconstruction ni
// redéploiement. Le bouton « Publier » n'a donc plus rien à déclencher — on renvoie un
// succès informatif pour rester compatible avec l'interface existante.
router.post('/', auth, (req, res) => {
  res.json({
    ok: true,
    message: 'Le site se met à jour automatiquement — aucune republication nécessaire.',
  });
});

export default router;
