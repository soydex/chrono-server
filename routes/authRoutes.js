import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, async (req, res) => {
  try {
    const user = req.user; // L'utilisateur est ajouté à la requête par le middleware protect
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des informations utilisateur' });
  }
});

export default router;
