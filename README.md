# 🌍 Plateforme Numérique Territoriale - Région Sofia

Bienvenue dans le dépôt officiel de la plateforme numérique dédiée à la **Région Sofia (Madagascar)**. Ce projet est une application web moderne (Fullstack) permettant de cartographier, de gérer et d'analyser les données démographiques, socio-économiques et culturelles des différents districts et communes de la région.

---

## 👥 Organisation du Développement (Crédits)

- **Backend Architecture & Database Design :** Entièrement conçu et développé en autonomie par **Stakkino**. Gestion intégrale de la logique métier, de la modélisation relationnelle et des API.
- **Frontend & UI :** Interface utilisateur et composants React développés avec l'assistance et la correction de code par une **Intelligence Actificielle (IA)** pour garantir un design fluide, moderne et responsive.

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

### 2. Procédure de Lancement (Backend & Frontend)

Chaque partie du projet doit être lancée dans un terminal dédié à partir de la racine du projet :

```bash
# ==========================================
# ÉTAPE A : LANCEMENT DU BACKEND (DJANGO)
# ==========================================

# 1. Ouvrez un premier terminal et allez dans le dossier backend (ex: cd back)
cd back

# 2. Activez votre environnement virtuel (si applicable)
# source env/bin/activate (Linux/Mac) ou env\Scripts\activate (Windows)

# 3. Installez les dépendances Python
pip install -r requirements.txt

# 4. Appliquez les migrations sur votre base PostgreSQL
python manage.py migrate

# 5. Lancez le serveur de développement Django
python manage.py runserver

# Le serveur backend sera accessible sur : http://127.0.0.1:8000/


# ==========================================
# ÉTAPE B : LANCEMENT DU FRONTEND (REACT)
# ==========================================

# 1. Ouvrez un DEUXIÈME terminal séparé à la racine du projet
# 2. Déplacez-vous dans le dossier du frontend
cd front

# 3. Installez les dépendances Node.js (uniquement au premier lancement)
npm install

# 4. Lancez le projet React avec Vite
npm run dev

# L'application sera accessible sur l'URL affichée (ex : http://localhost:5173/)