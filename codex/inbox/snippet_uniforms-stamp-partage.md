---
title: 'Stamp partagé pour uniforms standards : scratch module-level + consommation synchrone'
date: 2026-08-23
type: snippet
tags: [webgl, webgpu, zero-allocation, uniforms, glaze]
---

**Contexte :** `createStandardUniformValues` recréait un objet + 4 tableaux littéraux par programme et par frame alors que les valeurs ne changent qu'une fois par frame. Pattern généralisable à toute donnée dérivée recalculée à cadence fixe avant envoi GPU.

**Corps :**
Un objet partagé + tableaux scratch au niveau module, réécrits (stampés) à chaque appel, retournés par référence :

```ts
const U_RESOLUTION = [0, 0];
const U_MOUSE = [0, 1];
const U_CAMERA = [0, 0, 1];

const STANDARD_UNIFORM_VALUES: Record<string, UniformValue> = {
    u_resolution: U_RESOLUTION,
    u_aspect: 0,
    u_mouse: U_MOUSE,
    u_camera: U_CAMERA
    // ...
};

export function createStandardUniformValues(
    width: number,
    height: number,
    dpr: number
): Record<string, UniformValue> {
    U_RESOLUTION[0] = width * dpr;
    U_RESOLUTION[1] = height * dpr;
    STANDARD_UNIFORM_VALUES['u_aspect'] = height > 0 ? width / height : 0;
    // ...
    return STANDARD_UNIFORM_VALUES;
}
```

Le contrat qui rend ça sûr : **consommation synchrone** — le seul appelant upload dans la foulée et `gl.uniform*fv` copie dans l'état GL immédiatement. À documenter en JSDoc ("consume synchronously: the next call overwrites it").

**Gotchas :**

- `@tsconfig/strictest` active `noPropertyAccessFromIndexSignature` : muter un `Record<string, T>` exige la notation crochets (`obj['u_aspect']`), sinon erreur TS4111.
- Interdire à quiconque de retenir la référence au-delà de l'appel suivant — c'est le prix du zéro-allocation.

**Lien codebase :** `packages/glaze/src/gpu/shader/setUniforms.ts` (`createStandardUniformValues`)
