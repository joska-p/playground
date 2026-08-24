---
title: "État par frame : une référence fixe mutée par la lib, déstructurée librement par l'utilisateur"
date: 2026-08-23
type: rule
tags: [architecture, api-design, gc, game-loop, glaze]
---

**Contexte :** Doctrine directrice du projet glaze : volume d'objets faible, DX prime, mais zéro pression GC à 60/120 FPS dans les chemins par frame (`onFrame`, uniforms).

**Corps :**
L'état par frame (`time`, `deltaTime`, `width`, `height`, `frameCount`) vit sur une référence stable possédée par la surface — des champs publics mutés in place par le frame step propriétaire. Les callbacks reçoivent la surface, jamais une copie ni un objet frais :

```ts
// Côté lib : mutation in place, aucune allocation
#onFrame: FrameStep = (time, delta): void => {
    this.time = time;
    this.deltaTime = delta;
    this.#dispatcher.tick();
};

// Côté utilisateur : déstructuration libre et sûre (snapshot des primitives au moment de l'appel)
surface.onFrame(({ time, width }) => { /* ... */ });
```

**Gotcha :** le corollaire est que la lib ne doit jamais reconstruire un objet d'état par frame (pas de `{ ...state, time }` retourné) — sinon la déstructuration utilisateur capture une référence morte dès la frame suivante. Le contrat "référence fixe" doit être documenté là où l'état est stampé (voir `FrameDispatcher` : _"state lives on the surface that owns the dispatcher, not in the arguments"_).

**Lien codebase :** `packages/glaze/src/gpu/GpuSurface.ts` (champs publics + `#onFrame`), `packages/glaze/src/core/FrameDispatcher.ts`
