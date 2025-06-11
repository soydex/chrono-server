import express from 'express';
import Time from '../models/Time.js';

const router = express.Router();

// Créer un temps
router.post('/', async (req, res) => {
  try {
    const time = new Time(req.body);
    await time.save();
    res.status(201).json(time);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Récupérer tous les temps
router.get('/', async (req, res) => {
  try {
    const times = await Time.find();
    res.json(times);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
