# Slider : feedback immédiat, recalcul différé

`useSliderState` (MosaicControlsPanel) :

- onChange pose la variable CSS IMMÉDIATEMENT → le rendu suit le curseur,
- et repousse `regenerateTiles` de 150 ms (debounce) → sans ça chaque pixel de trajectoire recréerait toutes les tuiles.

Détails :

- le timer vit dans `useRef<ReturnType<typeof setTimeout>>(null)` (ref, pas state, pour ne pas re-rendre).
- cleanup du `useEffect([])` = clearTimeout au unmount : évite qu'un regenerate différé parte après démontage.
- `regenerateTiles` est une action zustand (sûre après unmount) ; le vrai risque serait un accès à `mosaicRef.current` (null après unmount) — déjà guardé par `if (!mosaicRef.current) return`.
