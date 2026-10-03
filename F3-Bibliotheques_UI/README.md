# F3 - Bibliothèques UI

Interface React autonome représentant une vue simplifiée du planning MATRiCE.
Le projet utilise Tailwind CSS pour la mise en forme et Vite pour le développement
et la génération de la version de production.

## Installation et lancement

Depuis le dossier `F3-Bibliotheques_UI` :

```powershell
npm install
npm run dev
```

Puis ouvrir l'URL indiquée par Vite dans le navigateur.

## Commandes disponibles

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

- `npm run dev` lance le serveur de développement ;
- `npm run build` vérifie et construit la version de production dans `dist` ;
- `npm run lint` exécute ESLint ;
- `npm run preview` sert la version construite localement.

## Fonctionnalités réalisées

- titre et contexte de la semaine affichés dans l'en-tête ;
- cartes de séances présentant le titre, la date, la période, le domaine, le groupe,
  le mode, le formateur et le statut ;
- filtre par groupe (`A`, `B`, `Promotion`) ;
- affichage des séances `Promotion` avec les filtres `A` et `B` ;
- filtre par statut (`Confirmé` ou `Proposé`) ;
- état vide lorsqu'aucune séance ne correspond aux filtres ;
- détail de séance dans une modale accessible ;
- fermeture du détail avec le bouton, un clic extérieur ou la touche `Échap` ;
- restitution du focus sur le bouton qui a ouvert le détail ;
- mise en page responsive pour les largeurs 360 px et 1280 px ;
- séance `AUTO` sans formateur et avec le statut `Proposé`.

Les périodes sont affichées explicitement :

- matin : `9h - 12h30` ;
- après-midi : `13h30 - 17h`.

## Données métier utilisées

Les données sont simulées directement dans [src/App.jsx](src/App.jsx) à partir du
jeu de données fourni pour F3. Les formateurs fictifs utilisés sont :

- Antoine Luckso ;
- Siôn Genders ;
- Dany Siriphol.

## Tailwind CSS

Les styles de l'interface sont écrits avec les classes utilitaires Tailwind CSS.
Tailwind est intégré à Vite avec `@tailwindcss/vite`. Le fichier
[src/styles.css](src/styles.css) contient l'import Tailwind, le thème de couleurs
et les styles de base nécessaires à l'application.

## Accessibilité et responsive

La hiérarchie visuelle suit trois niveaux : contexte et titre, filtres, puis liste
des cartes. Les champs utilisent des `label` et des contrôles natifs nommés.
Les boutons disposent de textes explicites et d'un indicateur de focus visible.

Les statuts combinent une couleur, un point et un libellé textuel : leur
compréhension ne dépend donc pas uniquement de la couleur. La modale utilise les
rôles `dialog` et `aria-modal`, possède un titre accessible et peut être utilisée
au clavier.

La grille passe de trois colonnes sur grand écran à deux, puis une colonne sur
petit écran. Les filtres, les informations essentielles et l'ouverture du détail
restent utilisables à 360 px.

## Documentation complémentaire

- [JUSTIFICATIONS.md](JUSTIFICATIONS.md) : choix techniques, interface et limites ;
- [SOURCES_IA.md](SOURCES_IA.md) : usages de l'IA pendant la réalisation.

## Lien du dépôt GitHub : [https://github.com/Cyril-Mathe/Rattrapages-WEB2](https://github.com/Cyril-Mathe/Rattrapages-WEB2)