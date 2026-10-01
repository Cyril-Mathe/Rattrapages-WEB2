# Preuve après correction

## Commande exécutée

Depuis `F2-Tests_Front` :

```powershell
npm test
```

## Résultat attendu et obtenu

```text
Test Files  1 passed (1)
Tests       6 passed (6)
```

## Scénarios validés

- chargement puis succès ;
- groupe A avec Promotion ;
- état vide ;
- erreur puis nouvelle tentative ;
- réponse obsolète ignorée ;
- filtre accessible et utilisable au clavier.

Les deux défauts décrits dans `avant-correction.md` sont couverts par les tests d'erreur/retry et de réponse obsolète de `src/Planning.test.jsx`.
