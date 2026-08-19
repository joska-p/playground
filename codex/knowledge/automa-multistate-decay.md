# Pattern — automate cellulaire multi-états (décroissance/trail)

`packages/automa/src/engine/cpu/engine.ts` :

- `state 1` = cellule vivante, soumise aux règles B/S (`rule.birth` / `rule.survive`).
- `state > 1` = cellule en décomposition : elle compte vers `maxState` (= `rule.stateCount - 1`)
  puis retombe à 0 (mort). Effet trail/glow au lieu d'une disparition instantanée.
- `countActiveNeighbors` ne compte que les cellules `=== 1`, pas les états de décroissance.

Autre leçon : le gros bloc `@param` sur `evolve` était une duplication pure de la
signature TypeScript — avec TypeDoc, la signature suffit, `@param` qui répète le nom et
le type est du bruit.
