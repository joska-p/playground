# Downscale d'un filtre SVG + piège transformOrigin (ui)

`EdgeFieldSvg` : la chaîne `feTurbulence + feConvolveMatrix` coûte cher proportionnellement au
nombre de pixels. Astuce : on dispose le SVG en `width/height` à `0.5×` (DOWNSCALE) — le filtre ne
mâche qu'un quart des pixels — puis on ré-aggrandit la boîte avec `transform: scale(2)`.

Piège rencontré : `transformOrigin` était posé via une classe utilitaire et se faisait purger par
purge/specificity, retombant silencieusement sur `center` → l'ancienne version était épinglée dans
le quadrant bas-droite. Correction : mettre `transformOrigin: '0 0'` en inline (style) pour qu'il ne
puisse pas disparaître.

Leçon : quand un layout dépend d'une valeur de transform-origin précise, l'inliner plutôt que de la
confier à une classe qui peut être purgée.
