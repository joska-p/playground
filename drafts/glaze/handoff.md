# Handoff : Plan de Refactorisation Architecture & Typage — Library `glaze`

## 1. Contexte & Architecture Validée

* **Monorepo :** *Playground* (« Cahier d'exercices »), composé de mini-apps graphiques et de la bibliothèque centrale TypeScript : **`glaze`**.
* **Principes clés :**
1. **Pureté et Honnêteté aux Frontières (*Impure at the Edges*) :** Les fonctions de `glaze` sont 100 % pures. Le temps, les entrées et l'aléatoire sont injectés par l'application shell.
2. **Invariants par Construction :** Utilisation de **Branded Types** (ex. `NormalizedVec2`, `Radian`) pour supprimer les checks runtime et de **Proof Tokens** (ex. `ActiveFrameToken`) pour garantir l'ordre du cycle de vie à la compilation.
3. **Niveau d'Abstraction Unique (SLAP) :** Aucune fonction ne mélange plomberie bas niveau/Canvas et orchestration haut niveau.

---

## 2. Sources de Vérité (à lire en début de session)

* **`GLAZE_REFACTOR_INVENTORY.md`** (racine du repo) : audit complet en 3 passes + feuille de route bottom-up en 8 tâches (section « Recommended Order of Refactoring »).
* **`drafts/glaze/type-design-manifest.md`** : manifeste de design des types (brands, proof tokens, SLAP).
* Conventions maison : `codex/docs/conventions/typescript.md`, `codex/docs/conventions/packages.md` (factories `create*` verbe d'abord, erreurs préfixées `Glaze: `, `type` plutôt qu'`interface`).

---

## 3. Statut : Tâches #1 et #2 Complétées ✅

### Tâche #1 — `core/types.ts` (vocabulaire numérique brandé)

* Nouveau fichier `packages/glaze/src/core/types.ts` :
    * Générique `Brand<T, B>` réutilisable.
    * Marques numériques : `ZoomFactor`, `DurationSeconds`, `TimeSpeed`, `WheelSpeed` (strictement positifs et finis), `Seconds`, `Milliseconds (finis seulement — un delta peut être 0).
    * Factories validées à la frontière : `createZoomFactor`, `createDurationSeconds`, `createTimeSpeed`, `createWheelSpeed`, `createSeconds`, `createMilliseconds`.
    * Conversions explicites : `msToSeconds`, `secondsToMs` (valident la finitude au passage).
    * Validateurs exportés pour réutilisation interne : `assertFinite`, `assertStrictlyPositive` (erreurs `Glaze: <label> must be…`).
* Sous-path `"./core/types"` ajouté aux `exports` de `package.json`.
* Tests : `src/core/types.test.ts` (validation, conversions, non-interchangeabilité des marques).

### Tâche #2 — `core/Camera.ts` (feuilles mathématiques pures)

* **Marques géométriques** : `ScreenPoint`, `WorldPoint`, `ScreenDelta`, `WorldDelta` (+ convertisseurs validants `toScreenPoint` / `toWorldPoint` / `toScreenDelta` / `toWorldDelta`). Les signatures sont maintenant `screenToWorld(screen: ScreenPoint): WorldPoint` et l'inverse — confondre les repères ne compile plus.
* **Clamp réparé (Pass 1 F6)** :
    * `createZoomBounds(minZoom, maxZoom)` : rejette non-finis, ≤ 0, et `min >= max`.
    * `createZoomClamp(minZoom, maxZoom)` : retourne `(value) => ZoomFactor`, **throw sur NaN** au lieu de le propager.
    * `DEFAULT_ZOOM_BOUNDS` validé une fois à l'import du module.
* **Factory obligatoire (Pass 1 F1)** : constructeur privé ; `createCamera(x, y, zoom: ZoomFactor)` valide x/y ; `defaultCamera()` = identité. Un zoom nu ne se compile plus.
* **Migration interne effectuée** (adaptation mécanique uniquement, sauf mention) : `CameraControls.ts`, `cpu/CpuSurface.ts`, `gpu/GpuSurface.ts`, `react/useCpuSurface.ts`, `react/useGpuSurface.ts`, tests (`Camera.test.ts` réécrit avec sections bounds/clamp, `CameraControls.test.ts`, `gestures.test.ts`, `interactions.test.ts`, `CpuSurface.test.ts`, `gpu/batch/geometry.test.ts`).
* **Bug latent capturé au passage** : un test wheel envoyait un event sans coordonnées → point NaN → l'ancien code empoisonnait silencieusement la caméra. Le nouveau garde-fou jette à la frontière ; le test a reçu des coordonnées explicites.
* Gates vertes sur `@repo/glaze` : `check-types`, `lint`, `test` (106 tests).

> ⚠️ **État transitoire de `CameraControls.ts`** : adaptation mécanique seulement (mutation in place conservée, `Object.assign` du `update()` bypass toujours possible côté types via `ZoomFactor` brandé). Son rework profond en transforms purs `(Camera, input) => Camera` est la **Tâche #4**, pas avant.

---

## 4. Prochaine Étape Immédiate : Réparer les Consommateurs Externes 🔴

La nouvelle API `Camera` casse **un seul package externe** (vérifié via `pnpm -r --if-present check-types` ; tous les autres sont verts, y compris `randomart` et `randomart-next`) :

* **`packages/automa/src/lib/coordinates.ts`** — 2 erreurs :
    * `:14` → `new Camera()` : constructeur privé, attendre `defaultCamera()`.
    * `:15` → `{x, y}` brut passé à `screenToWorld` : envelopper avec `toScreenPoint({ x, y })`.
* Pattern de fix suggéré :
    ```ts
    import { defaultCamera, toScreenPoint } from '@repo/glaze/core/Camera';
    const cam = camera ?? defaultCamera();
    const world = cam.screenToWorld(toScreenPoint({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top
    }));
    ```
* Relayer ensuite `pnpm --filter @repo/automa check-types && pnpm --filter @repo/automa lint` puis `pnpm -r --if-present check-types` pour confirmer le monorepo entier vert.

---

## 5. Feuille de Route Restante (`GLAZE_REFACTOR_INVENTORY.md`)

| # | Cible | Contenu | Dépendances |
|---|-------|---------|-------------|
| 3 | `Clock.ts` | Union discriminée `ClockOptions` (`free` / `timed`), extraction des stratégies pures `advanceFree/PingPong/Looping/Once`, les 3 gardes duration s'effondrent | couche 1 |
| 4 | `CameraControls.ts` | Transforms purs `(Camera, input) => Camera`, patch interface remplaçant `Object.assign`, facade mutable optionnelle en bordure | couches 1–2 |
| 5 | `gestures.ts` | Marque `WheelSpeed`, helper `dispatch()` (fan-out ×5 → 1), politique de capture déplacée au router, dispose cancel-safe | couches 1–2 |
| 6 | `FrameLoop.ts` | Injection `now()`/`schedule()`, émission `NonNegativeSeconds`, invariant schedule-before-dispatch nommé, émet `FrameToken` | couche 1 |
| 7 | `InputStore.ts` | `EventSource` injecté, bounds cachés/cachables, snapshots figés, `AttachedHandle`, bindings table-driven, `endFrame(token)` | couches 1+6 |
| 8 | `InputRouter` | Composition finale : dispose → reset des gestes, politique de capture | tout |

Rappel de rythme : chaque couche compile vert avant la suivante ; consommateurs externes adaptés mécaniquement au fil de l'eau.

---

## 6. Checklist de Vérification (chaque tâche)

```sh
pnpm --filter @repo/glaze check-types   # tsc -b (inclut les tests, src/)
pnpm --filter @repo/glaze lint          # eslint .
pnpm --filter @repo/glaze test          # vitest run
pnpm -r --if-present check-types        # ondulations chez les packages consommateurs
```
