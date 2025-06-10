# Routes d'authentification

## Inscription (Register)
POST http://localhost:3000/api/auth/register
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "votreMotDePasse"
}
```

### Réponses possibles
- 201: Inscription réussie
- 400: Données invalides
- 409: Email déjà utilisé
- 500: Erreur serveur

## Connexion (Login)
POST http://localhost:3000/api/auth/login
```json
{
  "email": "john@example.com",
  "password": "votreMotDePasse"
}
```

### Réponses possibles
- 200: Connexion réussie avec token JWT
- 401: Identifiants invalides
- 500: Erreur serveur

### Dépannage
Si vous recevez une erreur 500 :
1. Vérifiez que le serveur MongoDB est bien lancé
2. Vérifiez les variables d'environnement (DB_URI, JWT_SECRET)
3. Consultez les logs du serveur pour plus de détails
