# Usages de l'IA

L'IA a été utilisée comme aide au développement pour :

- structurer une application React autonome correspondant au sujet F3 ;
- proposer une organisation visuelle responsive pour les écrans de 360 px et
  1280 px ;
- traduire la maquette en classes utilitaires Tailwind CSS ;
- intégrer les filtres de groupe et de statut à partir du jeu de données fourni ;
- vérifier les comportements d'accessibilité liés à la modale, à la touche
  `Échap` et à la restitution du focus ;
- rédiger la documentation.

Les fichiers concernés sont principalement
[src/App.jsx](src/App.jsx), [src/styles.css](src/styles.css),
[vite.config.js](vite.config.js) et [package.json](package.json).

Les propositions ont été adaptées au sujet F3 et vérifiées localement avec :

```powershell
npm run lint
npm run build
```
