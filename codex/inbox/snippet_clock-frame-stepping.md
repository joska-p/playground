---
title: 'Stepping discret piloté par le frame loop (Clock + accumulateur)'
date: 2026-08-21
type: snippet
tags: [glaze, architecture, game-loop]
---

**Contexte :** la boucle de simulation d'automa était un `setTimeout` auto-reprogrammé : races avec le rAF qui lit la texture, throttling en onglet background, survit à la destruction du canvas.

**Corps :**

```ts
readonly #clock = createClock({ autoStart: false });
#accumulator = 0;

/** deltaMs vient du frame loop : surface.deltaTime dans GpuCanvas.onDraw */
tick(deltaMs: number): void {
    this.#clock.update(deltaMs);          // deltaTime = 0 si pause
    if (!this.#clock.isPlaying) return;

    this.#accumulator += this.#clock.deltaTime;
    let steps = 0;
    while (this.#accumulator >= this.#speedMs && steps < MAX_STEPS_PER_TICK) {
        this.step();
        this.#accumulator -= this.#speedMs;
        steps++;
    }
    if (steps === MAX_STEPS_PER_TICK) this.#accumulator = 0; // anti-spiral (pic de dt)
}
```

La `Clock` porte play/pause (`isPlaying`), l'accumulateur porte la cadence ms/step. Câblage : `<GpuCanvas onDraw={(surface) => tick(surface.deltaTime)} />`.

Gotchas : sans plafond de steps/frame, un retour d'onglet inactif (dt géant) gèle le paint ; avec `duration`+`loop` sur la Clock, les wraps multiples par frame sont perdus (modulo) — l'accumulateur explicite rattrape proprement.

**Lien codebase :** `packages/automa/src/engine/gpu/SimulationEngine.ts` (`tick`), `packages/glaze/src/core/Clock.ts`
