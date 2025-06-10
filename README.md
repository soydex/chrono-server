# Chrono Capsules - Backend

## Structure des fichiers

### Configuration principale
- `index.js` : Point d'entrée de l'application
  - Configure Express et les middlewares
  - Gère les connexions CORS
  - Configure la connexion MongoDB
  - Définit les routes principales
  - Gère les erreurs globales

### Authentification
- `controllers/authController.js` : 
  - Gère l'inscription (register) et la connexion (login)
  - Utilise JWT pour l'authentification
  - Gère le hachage des mots de passe avec bcrypt

- `middleware/authMiddleware.js` :
  - Contient le middleware de protection des routes (protect)
  - Vérifie les tokens JWT
  - Ajoute l'utilisateur authentifié à la requête

- `routes/authRoutes.js` :
  - Définit les routes d'authentification (/register et /login)
  - Connecte les routes aux contrôleurs

### Modèles de données
- `models/User.js` :
  - Schéma mongoose pour les utilisateurs
  - Contient les champs : name, email, passwordHash, role
  - Gère les rôles (employee/admin)

- `models/Client.js` :
  - Schéma mongoose pour les clients
  - Contient les informations client : name, company, email, phone
  - Lié à l'utilisateur qui a créé le client

## Variables d'environnement requises
- `JWT_SECRET` : Clé secrète pour JWT
- `MONGO_URI` : URL de connexion MongoDB
- `CLIENT_URL` : URL du frontend (par défaut: http://localhost:5173)
- `PORT` : Port du serveur (par défaut: 3000)
- `NODE_ENV` : Environnement (development/production)

## Routes API

### Auth Routes (`/api/auth`)
- POST `/register` : Inscription d'un nouvel utilisateur
- POST `/login` : Connexion d'un utilisateur

### Client Routes (`/api/clients`)
- Routes pour la gestion des clients (voir documentation spécifique)
