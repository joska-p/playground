---
title: 'Clamp NaN-transparent : Math.max/min ne sanitise pas'
date: 2026-08-23
type: rule
tags: [typescript, math, validation, branded-types, glaze]
---

**Contexte :** Refactor de `glaze` (Pass 1 F6) : `zoomBy(NaN)` survivait au clamp et injectait un zoom NaN dans la caméra.

**Corps :**
`Math.max(min, Math.min(max, value))` propage NaN tel quel (`clamp(0, 64)(NaN)` → `NaN`) et accepte des bornes inversées qui invertent silencieusement la sémantique. Un clamp n'est pas un validateur. La règle : valider les bornes **une fois à la création** du clampeur (`min < max`, finis, positifs pour un domaine zoom) et **jeter sur entrée non-finie** à l'application — jamais retourner une valeur non-finie d'une fonction dont le type promet un nombre exploitable.

```ts
export function createZoomClamp(minZoom: number, maxZoom: number): (value: number) => ZoomFactor {
    const bounds = createZoomBounds(minZoom, maxZoom); // rejette min>=max, <=0, non-finis

    return (value: number): ZoomFactor => {
        assertFinite(value, 'zoom');

        return createZoomFactor(Math.max(bounds.minZoom, Math.min(bounds.maxZoom, value)));
    };
}
```

Piège inverse : garder un `clamp` générique NaN-transparent « parce que c'est plus souple » — c'est exactement le trou qui a permis au bug latent documenté dans `observation_assertions-partielles-etat-empoisonne.md`.

**Lien codebase :** `packages/glaze/src/core/Camera.ts` (`createZoomBounds`, `createZoomClamp`)
