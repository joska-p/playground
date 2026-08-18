# Pattern — flag `cancelled` contre les courses d'effets async

`usePixel` (packages/pixel/src/hooks/usePixel.ts) lance `pixel.run()` dans un `useEffect` dépendant
de `sourceImageData`/`steps`. Sans garde, une exécution lente lancée sur d'anciennes props pourrait
résoudre APRÈS une exécution plus récente et écraser le résultat à l'écran (stale result).

La garde : un booléen `cancelled` remis à `false` à chaque effet, mis à `true` dans le cleanup.
Le `.then` ne touche au state que si `!cancelled`. Quand les deps changent, React exécute le cleanup
de l'effet précédent → l'ancienne promesse devient inopérante.

À noter :

- Pas d'`AbortController`/`cancel` réel : le worker continue de tourner, on ignore juste son résultat.
  Pour du travail coûteux il vaut mieux terminer/annuler au niveau du pool.
- `steps` en dep est un piège classique : s'il n'est pas référentiellement stable (re-créé à chaque
  render), l'effet rejoue à chaque render. Ici les steps viennent d'une liste mémorisée.
