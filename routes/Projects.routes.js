import express from 'express';
import Project from '../models/Projects.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/projects
router.get('/', protect, async (req, res, next) => {
  try {
    const { search } = req.query;
    const userId = req.user._id;

    const query = {
      createdByUserId: userId,
    };

    // Optionnel : filtrer par nom si "search" est passé
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // insensible à la casse
    }

    const projects = await Project.find(query).limit(10);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// POST /api/projects
router.post('/', protect, async (req, res, next) => {
  try {
    const { name, description, clientId } = req.body;

    if (!name || !clientId) {
      return res.status(400).json({ message: 'Le nom et le client sont requis' });
    }

    const newProject = new Project({
      name,
      description,
      clientId,
      createdByUserId: req.user._id,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

export default router;
