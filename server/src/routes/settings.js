import { Router } from 'express';
import auth from '../middleware/auth.js';
import Settings from '../models/Settings.js';

const router = Router();
const KEY = 'site';

// GET /api/settings — lecture publique du document unique (créé si absent).
router.get('/', async (req, res, next) => {
  try {
    const doc = await Settings.findOneAndUpdate(
      { key: KEY },
      { $setOnInsert: { key: KEY } },
      { new: true, upsert: true }
    ).lean();
    res.json(doc);
  } catch (e) {
    next(e);
  }
});

// PUT /api/settings — mise à jour des coordonnées (protégé par JWT).
router.put('/', auth, async (req, res, next) => {
  try {
    const { phoneDisplay, whatsapp } = req.body;
    const doc = await Settings.findOneAndUpdate(
      { key: KEY },
      { $set: { phoneDisplay, whatsapp } },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    res.json(doc);
  } catch (e) {
    next(e);
  }
});

export default router;
