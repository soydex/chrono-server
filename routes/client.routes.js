import express from 'express';
import Client from '../models/Client.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/clients?search=nom
router.get('/', protect, async (req, res, next) => {
  try {
    const { search } = req.query;
    const userId = req.user._id;
    const query = search
      ? { name: { $regex: search, $options: 'i' }, createdByUserId: userId }
      : { createdByUserId: userId };

    const clients = await Client.find(query).limit(10);
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

// POST /api/clients
router.post('/', protect, async (req, res, next) => {
  try {
    const { name, company, email, phone } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Le nom est requis' });
    }

    const newClient = new Client({
      name,
      company,
      email,
      phone,
      createdByUserId: req.user._id
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
});

export default router;