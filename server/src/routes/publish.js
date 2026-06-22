import { Router } from 'express';
import auth from '../middleware/auth.js';

const router = Router();

// POST /api/publish -> déclenche un build Netlify (l'URL du hook reste secrète côté serveur).
router.post('/', auth, async (req, res, next) => {
  try {
    const hook = process.env.NETLIFY_BUILD_HOOK_URL;
    if (!hook) return res.status(500).json({ error: 'Build hook non configuré' });
    const r = await fetch(hook, { method: 'POST' });
    if (!r.ok) return res.status(502).json({ error: 'Échec du déclenchement du build' });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

export default router;
