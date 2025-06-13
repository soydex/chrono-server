import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

// Configuration CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));


import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/client.routes.js';
import timeRoutes from './routes/timeRoutes.js'; // Vérifiez que ce fichier existe
import projectRoutes from './routes/Projects.routes.js'; // Assurez-vous que ce fichier existe

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/times', timeRoutes); // Assurez-vous que cette ligne est présente
app.use('/api/projects', projectRoutes); // Assurez-vous que cette ligne est présente

app.get('/', (req, res) => {
  res.send('API running');
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port', port);
});
