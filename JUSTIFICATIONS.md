# Justifications F2

## Choix techniques

- Vitest est utilisé pour une exécution rapide et non interactive.
- React Testing Library vérifie le comportement visible et les rôles accessibles plutôt que les détails internes.
- Le composant corrigé utilise un identifiant de requête pour ignorer une réponse obsolète lorsque le filtre change.
- Une valeur de retry distincte permet de relancer la même requête après une erreur.

## Limites

Les données sont simulées dans le navigateur. Le projet ne couvre ni backend, ni persistance, ni authentification, qui sont hors périmètre de F2.
