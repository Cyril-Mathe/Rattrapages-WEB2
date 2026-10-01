# Preuve avant correction

## Version testée

`F2-Tests_Front/src/Planning_Initial.jsx`

## Défaut 1 : erreur réseau non gérée

Entrée : `loadSessions` rejette sa promesse.

Attente : une alerte est affichée et un bouton `Réessayer` permet une nouvelle tentative.

Résultat avec la version initiale : test rouge. Le composant utilise uniquement `.then(...)`, sans `.catch(...)`. Le rejet n'est donc pas transformé en état d'erreur et aucun bouton de reprise n'est rendu.

Risque couvert : échec réseau et possibilité de reprise.

## Défaut 2 : réponse obsolète affichée

Entrée : une première requête reste en attente ; le filtre change ; la seconde requête répond avant la première.

Attente : seule la réponse correspondant au filtre courant reste affichée.

Résultat avec la version initiale : test rouge. Chaque réponse appelle directement `setItems(result)`, sans vérifier qu'elle correspond encore à la dernière requête. La réponse arrivée en retard peut donc remplacer la réponse actuelle.

Risque couvert : course entre requêtes asynchrones.

## Correction attendue

La version `Planning.jsx` ajoute une gestion d'erreur, un retry et un identifiant de requête permettant d'ignorer les réponses obsolètes.
