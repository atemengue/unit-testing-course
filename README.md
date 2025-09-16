# Test Unitaires JavaScript et TypeScript

Bienvenue dans le dépôt du cours "Test Logiciels JavaScript et TypeScript" sur Udemy. Ce projet est conçu pour vous apprendre à écrire, exécuter et maîtriser les tests dans des applications Node.js, en utilisant des outils modernes comme Vitest et Supertest.

## Lien du cours

[Accéder au cours sur Udemy](https://www.udemy.com/course/test-unitaires-javascript-typescript/)

## Objectifs du cours

- Comprendre les principes des tests logiciels dans le projet javascript
- Mettre en place un environnement de test avec Node.js et TypeScript
- Écrire des tests pour les fonctions, classes et API REST
- Utiliser Vitest pour les assertions et la couverture de code
- Tester les endpoints avec Supertest
- Intégrer les tests dans un workflow de développement professionnel

## Structure du projet

Ce dépôt contient :
- Des exemples de code pour chaque chapitre du cours
- Des exercices pratiques pour renforcer vos compétences
- Des solutions détaillées pour chaque exercice

## Pour commencer

Suivez les instructions ci-dessous pour installer les dépendances et démarrer le projet. Consultez la documentation de l’API pour explorer les endpoints et tester vos propres cas.

## Support

Pour toute question ou problème, utilisez la section Q&A du cours Udemy ou ouvrez une issue sur GitHub.

Bon apprentissage et bons tests !

## Prérequis

- Node.js
- npm

## Installation

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/atemengue/nodejs-api-fondamentaux
   cd nodejs-api-fondamentaux
   ```

2. Installez les dépendances :
   ```sh
   npm install
   ```

## Docker

1. Créez la base de donnees Docker

## Démarrage

1. Démarrez l'application :
   ```sh
   docker-compose up -d

   docker exec -it my-mongo mongosh
   ```

2. L'application sera accessible à l'adresse suivante :
   ```
   http://localhost:3000
   ```

## Documentation de l'API

La documentation Swagger de l'API est disponible à l'adresse suivante :
```
http://localhost:3000/api-docs
```
## Scripts npm

Voici les principaux scripts npm disponibles dans ce projet. Utilisez-les pour automatiser les tâches de développement, de test et de gestion des données :

- `start` : Démarre l’application à partir du code compilé.
- `dev` : Lance le serveur en mode développement avec rechargement automatique.
- `seed` : Initialise les données de la base.
- `test` : Exécute tous les tests avec Vitest.
- `test:u` : Lance uniquement les tests unitaires.
- `test:i` : Lance uniquement les tests d’intégration.
- `test:i-routes` : Exécute les tests d’intégration des routes.
- `test:e2e` : Exécute les tests end-to-end.
- `test:c` : Génère le rapport de couverture des tests.

Exemple d’utilisation :
```sh
npm run test
```
