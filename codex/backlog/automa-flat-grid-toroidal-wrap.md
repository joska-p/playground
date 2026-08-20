# Pattern — grille plate Uint8Array

`packages/automa/src/engine/grid.ts` : la grille est un `Uint8Array` plat indexé
`row * cols + col`, pas un `Uint8Array[][]`. Choix perf/cache (contigu en mémoire).

Le wrap toroidal (le bord gauche est voisin du bord droit) est fait dans l'engine
(`countActiveNeighbors` de `src/engine/cpu/engine.ts`), pas dans la grille : `(row - 1 + rows) % rows`.
