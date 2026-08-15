# Shuffle en rebrassant des valeurs derrière des clés fixes

Deux mécanismes complémentaires :
1. Couleur par tuile : `generateTileColors` = `shuffleArray([...CSS_VAR_KEYS])` → chaque tuile réordonne les clés `--color-0..4`, et ses formes font `fill: var(--color-N)`. La palette est réutilisée dans un ordre différent par tuile.
2. Boutons "Shuffle Colors" / "Shuffle Rotations" : `shuffleObject(initialPalette)` / `shuffleObject(initialRotations)` rebrassent les VALEURS des variables (ex. `--color-0: #333 → #bbb`) directement sur le DOM, sans toucher au store ni aux tuiles.

Astuce : tant qu'on référence les clés (`var(--color-N)`), rebrasser les valeurs derrière est gratuit — les références restent valables. C'est pourquoi les boutons ne recréent pas les tuiles.

Rotations : `initialRotations` = clés `--rotation-0..3` → 0/90/180/270deg, une tuile tire une clé au hasard, le bouton rebrasse les valeurs.
