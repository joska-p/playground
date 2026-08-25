---
title: 'Invariants numériques : valider une fois à la frontière avec des branded types'
date: 2026-08-23
type: rule
tags: [typescript, architecture, branded-types, glaze]
---

**Contexte :** l'audit Pass 1 de `glaze/core` a montré un anti-pattern systématique : _validate-late, use-early_. Les constructeurs acceptent n'importe quel nombre (`new Camera(0,0,0)`, `duration: -5`) et chaque site de consommation défend avec ses propres gardes runtime (`Clock` duplique `duration <= 0` à 3 endroits).

**Corps :**
Règle : toute quantité mathématique contrainte (`zoom > 0`, durée strictement positive, secondes vs ms) est portée par un type marqué créé par une factory qui valide une seule fois, à la frontière. Les sites de consommation font confiance au type — plus aucun `if` de garde.

```ts
type ZoomFactor = number & { readonly __brand: 'ZoomFactor' };
const zoomFactor = (n: number): ZoomFactor => {
    if (!Number.isFinite(n) || n <= 0) throw new RangeError(`invalid zoom: ${n}`);
    return n as ZoomFactor;
};
// screenToWorld divise par zoom sans garde : le brand le garantit
```

Gotcha : la validation tardive ne couvre jamais tous les chemins — `CameraControls.update()` passait par `Object.assign` en bypassant le clamp, réinjectant des valeurs illégales après coup. Une seule frontière validante > N gardes dispersées.

**Lien codebase :** `packages/glaze/src/core/Clock.ts`, `packages/glaze/src/core/Camera.ts`, `GLAZE_REFACTOR_INVENTORY.md` (Section 1, observation transversale)
