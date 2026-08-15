# CSS variables = source de vérité du mosaic

Tout le rendu passe par des custom properties CSS, pas par l'état React :

- `Palette` (core/types.ts) a pour clés les NOMS de variables CSS : `--color-0` … `--color-4`.
- Les sliders (MosaicControlsPanel `useSliderState`) écrivent `--tile-size` / `--mosaicGap` via `element.style.setProperty` (pas de state React pour ces valeurs).
- La grille est en CSS : `repeat(auto-fit, var(--tile-size))` + `gap: var(--mosaicGap)`.
- Le nombre de tuiles est recalculé en RELISANT ces variables avec `getComputedStyle(element)` (computeNumberOfTiles).

Donc : écrire une valeur = écrire dans le DOM, la lire = lire le DOM. React ne fait que déclencher (curseur → setProperty ; store → re-render).

Comptage des cases qui tiennent : `floor((width + gap) / (tileSize + gap))` par ligne et par colonne.
