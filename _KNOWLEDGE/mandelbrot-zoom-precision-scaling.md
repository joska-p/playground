# Mandelbrot — zoom en log2, précision et itérations qui scalent

`zoom` est stocké comme le **log2 de la magnification linéaire** (magnification = 2^zoom). Le
spacing pixel (unités complexes par pixel device) = `BASE_SPAN_Y * 2^-zoom / heightPx` — il
rétrécit exponentiellement avec la profondeur.

Deux formules empiriques à retenir :

- `precisionForZoom(zoom) = max(64, ceil(zoom) + 52)` : le nombre de bits fractionnaires du
  centre. Le `+52` correspond à la mantisse d'un double — pour garder le dernier pixel résolvable.
- `effectiveMaxIter(budgetPct, zoom) = min(60000, (256 + zoom * 96) * budgetPct / 100)` : le
  détail près de la frontière demande plus d'itérations quand on descend — quasi linéaire en zoom
  (log2 mag), scaled par un slider budget (100 = défaut). `MAX_ITER_CAP = 60000` protège le
  GPU/CPU contre les itérations démesurées.

Le `maxIter` du `LookState` est un **budget en %** (multiplicateur), pas un compte réel —
l'effet sur l'orbite dépend du zoom. C'est pour ça que `look.ts` sépare `LookState`
(état UI) de `LookParams` (valeurs pour le shader).
