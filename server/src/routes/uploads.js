import { Router } from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 }, // 6 Mo
});

const router = Router();

// POST /api/uploads  (multipart, champ « file ») -> { url, publicId }
router.post('/', auth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'agropharma',
      resource_type: 'image',
    });
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (e) {
    next(e);
  }
});

export default router;
