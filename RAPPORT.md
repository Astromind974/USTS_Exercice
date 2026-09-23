# 📄 Rapport de Projet : Plateforme Next.js & Automation n8n

**Auteurs :** Étudiant / Équipe de développement  
**Collaborateurs ajoutés sur le dépôt :** `lilgar77`, `Holo795`  
**Projet :** Gestionnaire d'E-mails Intelligent (Next.js, Prisma, n8n, Groq AI, Gmail)

---

## 1. 🏗️ Architecture retenue

L'application repose sur un couplage hybride entre un frontend/backend Next.js pour l'interface utilisateur et la persistance de données, et le moteur d'automatisation n8n pour la logique métier asynchrone, les appels aux API d'IA (Groq) et l'intégration avec Gmail.

### Schéma de l'architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                APPLICATION NEXT.JS                              │
│                                                                                 │
│   ┌─────────────────────┐       ┌─────────────────┐       ┌─────────────────┐   │
│   │   Interface React   │ <---> │  API Routes     │ <---> │  Base Prisma    │   │
│   │ (Modale, Dashboard) │       │ (/api/reply...) │       │  (Email, Reply) │   │
│   └─────────────────────┘       └─────────────────┘       └─────────────────┘   │
└─────────────────────────────────────────┬───────────────────────────────────────┘
                                          │
                        Requêtes HTTP     │  Requêtes HTTP
                        (POST / PATCH)    │  (Webhooks)
                                          v
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 WORKFLOW N8N                                    │
│                                                                                 │
│   ┌───────────────┐      ┌───────────────┐      ┌──────────────┐      ┌───────┐ │
│   │  Webhooks /   │ ───> │ Nœud JS /     │ ───> │  Nœud Groq   │ ───> │ Gmail │ │
│   │  Cron Trigger │      │ Formateur     │      │ (Llama 3.3)  │      │ API   │ │
│   └───────────────┘      └───────────────┘      └──────────────┘      └───────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Rôle des composants
- **Next.js 14+ (App Router) :** Gestion de l'UI (consultation, rédaction de réponses), exposition des routes d'API (`/api/emails`, `/api/reply`, `/api/summary`) et stockage dans la BDD.
- **Prisma ORM :** Modélisation et gestion de la base de données relationnelle (`Email` et `Reply` liés par une relation 1-to-N).
- **Fichier local `mails-today.json` :** Sauvegarde instantanée à la racine du projet lors de la réception quotidienne des e-mails.
- **n8n (Self-hosted) :** Orchestration des tâches lourdes (relève périodique des messages, génération du résumé quotidien via Groq, envoi des e-mails via l'API Gmail, callback PATCH vers Next.js).
- **Groq API (Model Llama 3.3 70B Versatile) :** Modèle de langage utilisé pour générer des résumés d'e-mails et formuler des réponses automatiques intelligentes.

---

## 2. ⚙️ Étapes d'installation et de configuration

### A. Prérequis
- Node.js (v18+) et npm
- Une instance n8n active (locale ou Docker)
- Un compte Google Cloud / Gmail avec accès API configuré
- Une clé d'API Groq

### B. Installation de l'application Next.js
1. Cloner le dépôt et installer les dépendances :
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_DOSSIER>
   npm install
   ```

2. Configurer les variables d'environnement (`.env`) :
   ```env
   DATABASE_URL="file:./dev.db" # Ou votre URL PostgreSQL
   N8N_WEBHOOK_URL="http://<IP_N8N>:5678/webhook/send-reply"
   ```

3. Initialiser la base de données Prisma :
   ```bash
   npx prisma db push
   # ou
   npx prisma migrate dev --name init
   ```

4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

### C. Importation et configuration dans n8n
1. Ouvrir n8n et cliquer sur **Workflows > Import from File**.
2. Sélectionner le fichier `.json` exporté depuis n8n (présent à la racine du dépôt).
3. Configurer les identifiants requis :
   - **Gmail Credentials :** Autoriser le compte Gmail pour l'envoi/réception.
   - **Groq API Key :** Ajouter la clé d'API Groq dans les en-têtes HTTP de la requête dédiée.
4. Mettre à jour l'URL IP du serveur Next.js dans les nœuds **HTTP Request** (ex: `http://192.168.178.169:3000/api/...`).
5. Activer le workflow (Toggle **Active** en haut à droite).

---

## 3. 🛠️ Difficultés rencontrées et solutions

| Problème rencontré | Cause identifiée | Solution appliquée |
| :--- | :--- | :--- |
| **Erreur 400 "Champs requis manquants"** lors de l'envoi d'une réponse. | Discordance entre les arguments transmis par `ReplyModal.tsx` (`to`, `subject`) et l'attente du backend (`emailId`, `body`). | Correction de `sendReply()` dans `src/lib/api/reply.ts` et du formulaire modal pour passer uniquement `emailId`, `body` et `isAuto`. |
| **Erreur Prisma P2025** sur la route `PATCH /api/reply`. | n8n tentait de mettre à jour un `gmailMessageId` sur un `replyId` introuvable en BDD ou mal extrait. | Ajout d'une gestion d'exception explicite (`try/catch`) retournant un HTTP 404 propre au lieu d'un crash 500. |
| **Champs indéfinis dans n8n** (`to`, `subject` vides). | Le webhook n8n imbrique les données dans la clé `body` (`$json.body.to`). | Mise à jour de toutes les expressions n8n vers `$('Webhook').item.json.body.<champ>`. |
| **Erreur syntaxique `Unexpected token '='` dans n8n**. | Le champ "JSON Body" du nœud HTTP Request était réglé en mode "Fixed" au lieu du mode Expression. | Basculement du champ en mode Expression (`fx`) et structuration sous forme d'objet JS dynamique. |
| **Rupture de chaîne lors des réponses manuelles vs IA**. | Le nœud Groq était ignoré lors d'une réponse manuelle, provoquant une erreur sur le nœud PATCH final. | Séparation propre des branches du nœud `IF` (Branche Manuel et Branche IA) avec leurs propres nœuds Gmail et PATCH. |
| **Génération du fichier `mails-today.json`**. | Nécessité d'avoir un fichier JSON local persistant contenant les e-mails du jour. | Intégration du module `fs` dans la méthode `POST` de la route `/api/emails` pour écrire physiquement le fichier sur le disque. |

---

## 4. 📈 Résultats obtenus et limites potentielles

### Résultats obtenus
- **Collecte automatique :** Récupération périodique des e-mails Gmail et synchronisation automatique avec Prisma et `mails-today.json`.
- **Résumés automatiques :** Synthèse quotidienne générée par l'IA Groq et stockée en base.
- **Réponse hybride (Manuel / IA) :** Possibilité d'envoyer une réponse rédigée manuellement ou déléguée à l'IA depuis l'interface web.
- **Continuité des discussions :** Conservation du fil de discussion original grâce à l'association des identifiants Gmail (`gmailMessageId`).

### Limites potentielles
- **Dépendance aux adresses IP locales :** En développement local, la communication entre n8n et Next.js dépend des adresses IP réseau (ex: `192.168.178.x`). Une mise en production nécessitera un nom de domaine ou un tunnel (ex: Ngrok).
- **Limites de taux d'API (Rate Limits) :** L'utilisation du modèle Groq gratuit impose des restrictions en termes de requêtes par minute (RPM) lors du traitement de gros volumes d'e-mails.
- **Fichier `mails-today.json` local :** En environnement Serverless (ex: Vercel), le système de fichiers est en lecture seule ou éphémère. Il conviendra de basculer la persistance uniquement sur la base de données relationnelle.

---

## 5. 📁 Contenu des livrables

```text
.
├── src/                    # Code source Next.js (Pages, Composants, API)
├── prisma/                 # Schéma BDD Prisma et migrations
├── mails-today.json        # Sauvegarde JSON des e-mails reçus du jour
├── n8n-workflow.json       # Export complet du workflow n8n
├── RAPPORT.md              # Le présent rapport
└── README.md               # Instructions de démarrage rapide
```

*(Note : N'oubliez pas de vérifier que `lilgar77` et `Holo795` ont bien été ajoutés comme collaborateurs dans les paramètres de votre dépôt GitHub).*
```
eof

---

Votre projet est maintenant prêt pour la remise finale ! Vous disposez du code, de l'export n8n, du fichier `mails-today.json` et de ce rapport détaillé.

Souhaitez-vous que je transforme également ce rapport en une présentation de diapositives (slides) ?