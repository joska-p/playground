---
title: 'Adapters : injecter des capability interfaces avec defaults DOM'
date: 2026-08-23
type: rule
tags: [typescript, architecture, dependency-injection, testing]
---

**Contexte :** `FrameLoop` lisait `performance.now()` caché dans `#start()` et codait RAF en dur ; preuve du coût : son test devait faire `vi.stubGlobal('requestAnimationFrame', ...)`. Même schéma dans `InputStore` (`window.addEventListener`, `getBoundingClientRect()` relu à chaque event).

**Corps :**
Les adaptateurs d'environnement doivent déclarer leurs dépendances globales dans le constructeur sous forme de capabilities, avec implémentation DOM par défaut :

```ts
constructor(opts?: {
    now?: () => Milliseconds;
    schedule?: (cb: (t: Milliseconds) => void) => () => void; // wrapper RAF par défaut
})
```

Production : zéro call-site modifié (defaults). Tests : fake source = simulation de 1000 frames instantanée, pas de jsdom, pas de stub global. Signal d'alerte : un test obligé de stubber un global révèle exactement quelle capability manque au constructeur.

**Lien codebase :** `packages/glaze/src/core/FrameLoop.ts`, `packages/glaze/src/core/InputStore.ts`, `packages/glaze/src/core/FrameLoop.test.ts`
