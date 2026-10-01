# Rattrapages-WEB2

Projet de rattrapage WEB2 de Cyril Mathé.

## Modules

- [F2 - Tests front](F2-Tests_Front/README.md) : tests React et gestion des chargements asynchrones.

## F2 - Tests front

Petit projet React + Vitest pour tester un planning chargeant des données de façon asynchrone.

### Installation

Depuis le dossier `F2-Tests_Front` :

```powershell
cd F2-Tests_Front
npm install
```

### Commandes

```powershell
npm run dev
npm test
npm run test:before
npm run test:watch
npm run build
npm run lint
```

`npm test` est non interactif et exécute la suite une seule fois.

### Organisation

- `F2-Tests_Front/src/Planning_Initial.jsx` : version initiale fournie dans le sujet.
- `F2-Tests_Front/src/Planning.jsx` : version corrigée avec erreur, retry et protection contre les réponses obsolètes.
- `F2-Tests_Front/src/Planning.test.jsx` : tests React Testing Library et Vitest.
- `F2-Tests_Front/src/PlanningInitial.red.test.jsx` : tests volontairement rouges de la version initiale, exécutés séparément.
- `F2-Tests_Front/src/setupTests.js` : configuration des matchers accessibles.
- `F2-Tests_Front/src/App.jsx` : mini-interface exécutable dans le navigateur.

### Scenarios couverts

| Scénario | Entrée | Attente | Risque couvert |
| --- | --- | --- | --- |
| Chargement | Promesse non résolue | Indicateur `Chargement...` | État asynchrone absent |
| Succès | Liste de séances | Titres affichés | Rendu de la réponse |
| Filtre A | Groupe A | A et Promotion visibles | Règle métier du filtre |
| Vide | Liste vide | `Aucune séance.` | État vide illisible |
| Erreur / retry | Rejet puis succès | Alerte puis seconde requête | Échec réseau et reprise |
| Désordre | Ancienne réponse après la nouvelle | Réponse récente conservée | Course entre requêtes |
| Clavier | Focus puis touches clavier | Filtre utilisable et focus conservé | Accessibilité du contrôle |

Pour les justifications techniques et les usages de l'IA, consulter [JUSTIFICATIONS.md](JUSTIFICATIONS.md) et [SOURCES_IA.md](SOURCES_IA.md).

### Preuves avant / après

Les traces demandées pour F2 sont disponibles dans le dossier [preuves](preuves/README.md) :

- [Avant correction](preuves/avant-correction.md) : deux défauts réels et leurs tests rouges.
- [Après correction](preuves/apres-correction.md) : les six tests passés avec succès.

La commande `npm run test:before` exécute volontairement les deux tests rouges de la version initiale. Elle ne fait pas partie de `npm test`, afin que la suite corrigée reste verte.
