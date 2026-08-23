---

# CameraControls : transformations pures (state, input) => Camera

**Contexte :** les 7 méthodes de `CameraControls` écrivent à travers la closure sur le `Camera` externe capturé à la création (le doc l'avoue : « Mutates camera in place »). Mutation invisible dans les diffs, tests obligés d'inspecter l'état partagé après coup, incompatible avec un flux de state React.

**Description :** remplacer l'API impérative par des fonctions de commande pures :

```ts
const panBy = (c: Camera, dx: number, dy: number): Camera => ({ ...c, x: c.x + dx, y: c.y + dy });
const zoomAt = (c: Camera, focal: ScreenPoint, zoom: ZoomFactor): Camera => ({ ...c, ... });
```

Le clamping s'applique avant construction du nouvel objet. Une façade mutable fine reste disponible à l'edge (adaptateur React) si besoin — mais `core/` exporte `(Camera, input) => Camera`. Bénéfices : updates diffables/time-travel-debuggables, tests sans setup (`expect(panBy(cam,5,0)).toEqual({...})`), flux compatible React Compiler. Se combine avec le patch typé `{ x?, y?, zoom?: ZoomFactor }` remplaçant `Object.assign`.

**Lien codebase :** `packages/glaze/src/core/CameraControls.ts`, `packages/glaze/src/core/Camera.ts`, `GLAZE_REFACTOR_INVENTORY.md` (Section 2, Finding 3)

### Action Kanban

```bash
./scripts/kanban.sh idea "CameraControls pur : (state, input) => state" -b "Remplacer la mutation par closure de createCameraControls par des fonctions pures retournant un nouveau Camera ; garder une façade mutable mince en edge. Plus grand changement d'API surface de core/ — planifié étape 4."
```

---
