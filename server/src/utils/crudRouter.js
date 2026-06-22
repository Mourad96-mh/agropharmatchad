import { Router } from 'express';
import auth from '../middleware/auth.js';

// Routeur CRUD générique : lecture publique, écriture protégée par JWT.
// Réutilisé pour les gammes (Category) et les conseils (Conseil).
export default function crudRouter(Model) {
  const router = Router();

  router.get('/', async (req, res, next) => {
    try {
      const docs = await Model.find().sort({ order: 1, createdAt: 1 }).lean();
      res.json(docs);
    } catch (e) {
      next(e);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id).lean();
      if (!doc) return res.status(404).json({ error: 'Introuvable' });
      res.json(doc);
    } catch (e) {
      next(e);
    }
  });

  router.post('/', auth, async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (e) {
      if (e.code === 11000) return res.status(409).json({ error: 'Ce slug existe déjà' });
      next(e);
    }
  });

  router.put('/:id', auth, async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ error: 'Introuvable' });
      res.json(doc);
    } catch (e) {
      if (e.code === 11000) return res.status(409).json({ error: 'Ce slug existe déjà' });
      next(e);
    }
  });

  router.delete('/:id', auth, async (req, res, next) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  });

  return router;
}
