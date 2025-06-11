import express from "express";
import { getStats } from "../controllers/timeController.js";
import { protect } from "../middleware/authMiddleware.js";
import Time from '../models/Time.js'; // Assurez-vous que le modèle Time existe
import Client from '../models/Client.js'; // Assurez-vous que le modèle Client existe

const router = express.Router();

router.get("/stats", protect, getStats);

// Route pour enregistrer un temps
router.post('/', protect, async (req, res) => {
  try {
    const { client, durationMs, manual } = req.body; // On récupère un objet client
    const userId = req.user.id;

    // Vérifiez si le client existe déjà ou créez-le
    let clientRecord = await Client.findOne({ name: client.name, company: client.company });
    if (!clientRecord) {
      clientRecord = new Client({
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        createdByUserId: userId,
      });
      await clientRecord.save();
    }

    const newTime = new Time({
      userId,
      clientId: clientRecord._id,
      durationMs,
      manual,
      startTime: new Date(),
      endTime: new Date(Date.now() + durationMs),
    });

    await newTime.save();
    res.status(201).json(newTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route GET pour récupérer tous les temps
router.get('/', async (req, res) => {
  try {
    const times = await Time.find();
    res.json(times);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
