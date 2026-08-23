---
title: 'clamp via Math.max/Math.min est NaN-transparent'
date: 2026-08-23
type: rule
tags: [typescript, math, gotcha, glaze]
---

**Contexte :** trouvé dans l'audit de `glaze/core` : `zoomBy(NaN)` traversait le clamp des bornes de zoom et infectait quand même la caméra. Croyance fausse répandue : « clampé = sain ».

**Corps :**

```ts
Math.max(min, Math.min(max, NaN)); // === NaN
```

`Math.min`/`Math.max` propagent NaN — un clamp ne filtre que le *hors-bornes*, jamais le *non-numérique*. Toute valeur entrante passant potentiellement par des multiplications (`zoom * factor`, `exp(-deltaY * speed)`) peut produire du NaN qui survit au clamp et contamine l'état.

Règle : ordre obligatoire — rejeter les non-finis (`Number.isFinite`) **avant** la coercition de plage ; ou encapsuler dans une factory `bounded(min, max)` qui valide l'entrée une fois pour toutes. Bonus du même helper : vérifier `min < max` à la création, car `clamp(64, 0.05)` inverse silencieusement la sémantique.

**Lien codebase :** `packages/glaze/src/core/Camera.ts` (`clamp` :13-16), `packages/glaze/src/core/CameraControls.ts`
