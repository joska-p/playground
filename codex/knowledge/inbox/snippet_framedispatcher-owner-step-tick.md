---
title: 'FrameDispatcher : le pas de rendu injecté décide où tombe tick()'
date: 2026-08-23
type: snippet
tags: [typescript, game-loop, raf, architecture]
---

**Contexte :** Unifier la boucle de rendu de `CpuSurface`/`GpuSurface` sans perdre l'ordre du contrat frame : état estampillé **avant** les callbacks utilisateur, flush/endFrame **après**. Alternative rejetée : hooks `beforeFrame`/`afterFrame` (déplace le problème, ajoute une API).

**Corps :**
Le scheduler prend le pas propriétaire au constructeur et ne fait QUE lui déléguer ; c'est le pas propriétaire qui appelle `tick()` à l'endroit exact où les subscribers doivent s'exécuter :

```ts
class FrameDispatcher {
    readonly #step: FrameStep;              // (time: number, delta: number) => void
    readonly #subscribers = new Set<FrameHandler>();

    constructor(step: FrameStep) { this.#step = step; }

    tick(): void { for (const cb of this.#subscribers) cb(); }

    #tick = (now: number): void => {
        // ... delta/time + rAF re-arm ...
        this.#step(now / 1000, delta);      // le propriétaire orchestre
    };
}

// Côté surface :
#onFrame: FrameStep = (time, deltaTime): void => {
    this.#resize();
    this.time = time;
    this.#dispatcher.tick();   // ← les dessins utilisateur tombent ICI
    this.input.endFrame();
};
```

Le propriétaire garde un contrôle total de la séquence (GPU : `tick()` → `#flushBatch()` → `endFrame()`) sans que le scheduler connaisse la plomberie. `new FrameDispatcher(this.#onFrame)` se fait dans le constructeur de la surface — les fields fléchés sont initialisés avant le corps.

**Lien codebase :** `packages/glaze/src/core/FrameDispatcher.ts`, `packages/glaze/src/cpu/CpuSurface.ts` (`#onFrame`)
