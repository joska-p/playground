---
title: 'Frame loop : ré-armer la frame suivante AVANT de dispatcher les callbacks'
date: 2026-08-23
type: rule
tags: [typescript, game-loop, raf, lifecycle]
---

**Contexte :** Le frame scheduler de glaze (ex-`FrameLoop`, aujourd'hui absorbé dans `FrameDispatcher`) programme `requestAnimationFrame(this.#tick)` _avant_ d'itérer sur les callbacks — un callback qui throw ne peut pas tuer la boucle car la chaîne est déjà re-liée. Invariant porteur, mais invisible : un refactor « propre » qui déplace le scheduling après la boucle introduit mort-par-exception silencieuse.

**Corps :**

```ts
#tick = (now: number): void => {
    const batch = [...this.#callbacks];        // snapshot stable
    this.#rafId = requestAnimationFrame(this.#tick); // keep-alive D'ABORD
    for (const cb of batch) cb(now, delta);
};
```

Deux règles : (1) re-armer avant dispatch, avec commentaire explicite car l'ordre ressemble à du hasard ; (2) itérer sur un snapshot du Set, sinon un callback qui s'abonne mid-frame est invoqué dans la même passe et un désabonnement saute des callbacks — sémantique non documentée.

**Lien codebase :** `packages/glaze/src/core/FrameDispatcher.ts` (`#tick`)
