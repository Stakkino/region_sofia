# 🌍 Plateforme Numérique Territoriale - Région Sofia

Bienvenue dans le dépôt officiel de la plateforme numérique dédiée à la **Région Sofia (Madagascar)**. Ce projet est une application web moderne (Fullstack) permettant de cartographier, de gérer et d'analyser les données démographiques, socio-économiques et culturelles des différents districts et communes de la région.

---

## 👥 Organisation du Développement (Crédits)

- **Backend Architecture & Database Design :** Entièrement conçu et développé en autonomie par **Stakkino**. Gestion intégrale de la logique métier, de la modélisation relationnelle et des API.
- **Frontend & UI :** Interface utilisateur et composants React développés avec l'assistance et la correction de code par une **Intelligence Artificielle (IA)** pour garantir un design fluide, moderne et responsive.

---

## 🚀 Fonctionnalités Principales

- **Tableau de Bord Global :** Vue d'ensemble de la région (Population totale, superficie, nombre de territoires configurés).
- **Cartographie & Exploration des Districts :** Fiches détaillées pour chaque district (Mandritsara, Antsohihy, Bealanana, etc.) avec gestion des images de couverture.
- **Gestion Dynamique des Communes :** Tableau moderne minimaliste avec système de recherche en temps réel et filtres interactifs par district (calculs automatisés des districts actifs).
- **Analyse Culturelle Intégrée :** Module d'affichage des descriptions générées pour mettre en valeur le patrimoine local, les infrastructures (écoles, églises, usines) et les Fokontany.
- **Interface Moderne & Responsive :** Design premium en mode sombre (Dark Theme), fluide et entièrement adapté aux mobiles et tablettes.

---

## 🛠️ Technologies Utilisées

### Backend (API)
- **Framework :** Python 🐍 / Django & Django REST Framework (DRF)
- **Base de données :** PostgreSQL 🐘 (Système de gestion de base de données relationnelle robuste et scalable)
- **Architecture :** REST API (Données structurées et optimisées pour les relations complexes Districts/Communes)

### Frontend (Client)
- **Bibliothèque Principale :** React.js (v18+) ⚛️
- **Outil d'assemblage :** Vite.js (Pour un rechargement ultra-rapide)
- **Gestion des Routes :** React Router DOM
- **Client HTTP :** Axios (Gestion des requêtes vers l'API Django)
- **Icônes :** Lucide React

---

## 📦 Installation et Démarrage du Projet

### 1. Prérequis
Assurez-vous d'avoir installé :
- Python 3.10 ou supérieur
- Node.js (v18 ou supérieur) & npm
- Un serveur PostgreSQL actif

### 2. Lancement du Backend (Django)
Ouvrez votre terminal dans le dossier du backend (`back` ou le dossier contenant `manage.py`) :
```bash
# Activation de l'environnement virtuel (si applicable)
# source env/bin/activate (Linux/Mac) ou env\Scripts\activate (Windows)

# Installer les dépendances Python
pip install -r requirements.txt

# Appliquer les migrations sur votre base PostgreSQL
python manage.py migrate

# Lancer le serveur de développement Django
python manage.py runserver


### 3. Lancement du Frontend (React)
# Entrer d'abord dans le dossier frontend depuis la racine (ex: cd front)
cd front

# Installer les dépendances Node.js (à ne faire que la première fois)
npm install

# Lancer le projet React avec Vite
npm run dev