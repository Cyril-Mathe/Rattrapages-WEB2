# Justifications F3

## Choix techniques

- React structure l'interface en composants et gère les filtres ainsi que
  l'ouverture du détail.
- Vite fournit un démarrage rapide en développement et une génération de build
  simple.
- Tailwind CSS est utilisé pour construire la mise en page avec des classes
  utilitaires directement dans le JSX. L'intégration passe par
  `@tailwindcss/vite`, sans feuille de styles de composants volumineuse.
- Les données sont conservées dans le composant car le sujet demande une vue
  autonome et ne prévoit ni backend ni persistance.

## Hiérarchie de l'interface

La page sépare clairement le contexte, les filtres et les résultats. Chaque carte
présente d'abord le statut et le mode, puis la date, le titre, le domaine, le
groupe et le formateur. Le bouton de détail est placé en bas de carte pour
conserver une action identique et facilement repérable.

La modale évite de surcharger la grille tout en permettant de consulter les
informations détaillées d'une séance sans changer de page.

## Règles métier

- Un filtre `A` ou `B` conserve les séances de son groupe ainsi que celles de
  `Promotion`.
- Une séance `AUTO` n'a pas de formateur et reste proposée.
- Les horaires sont associés à la période : `am` correspond à `9h - 12h30` et
  `pm` à `13h30 - 17h`.

## Accessibilité

- Les sélecteurs sont associés à un libellé visible.
- Les boutons possèdent un nom explicite, y compris le bouton de fermeture de la
  modale.
- La modale expose `role="dialog"`, `aria-modal="true"` et un titre via
  `aria-labelledby`.
- La touche `Échap` ferme le détail et le focus revient au bouton d'ouverture.
- Le statut est écrit (`Confirmé` ou `Proposé`) et accompagné d'un indicateur
  visuel ; la couleur n'est pas la seule information disponible.
- Les couleurs ont été choisies avec un texte sombre sur fond clair et un texte
  blanc sur les boutons et l'en-tête.

## Limites

Les séances sont statiques et la modale ne constitue pas une navigation vers une
fiche persistée. Il n'y a pas d'authentification, de backend ou de stockage
distant, ces éléments étant hors périmètre de F3.
