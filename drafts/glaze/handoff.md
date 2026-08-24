# Handoff : Plan de Refactorisation Architecture & Typage — Library `glaze`

## 1. Contexte & Architecture Validée

* **Monorepo :** *Playground* (« Cahier d'exercices »), composé de mini-apps graphiques et de la bibliothèque centrale TypeScript : **`glaze`**.
* **Principes clés :**
1. **Pureté et Honnêteté aux Frontières (*Impure at the Edges*) :** Les fonctions de `glaze` sont 100 % pures. Le temps, les entrées et l'aléatoire sont injectés par l'application shell.
2. **Invariants par Construction :** Utilisation de **Branded Types** (ex. `NormalizedVec2`, `Radian`) pour supprimer les checks runtime et de **Proof Tokens** (ex. `ActiveFrameToken`) pour garantir l'ordre du cycle de vie à la compilation.
3. **Niveau d'Abstraction Unique (SLAP) :** Aucune fonction ne mélange plomberie bas niveau/Canvas et orchestration haut niveau.

---

## 2. Sources de Vérité vivante (à lire en début de session et à faire vivre à la fin)

* **`GLAZE_REFACTOR_INVENTORY.md`** (racine du repo) : audit complet en 3 passes + feuille de route bottom-up en 8 tâches (section « Recommended Order of Refactoring »).
* **`drafts/glaze/type-design-manifest.md`** : manifeste de design des types (brands, proof tokens, SLAP).
* Conventions maison : `codex/docs/conventions/typescript.md`, `codex/docs/conventions/packages.md` (factories `create*` verbe d'abord, erreurs préfixées `Glaze: `, `type` plutôt qu'`interface`).

---

## 3. Statut : Tâches #1, #2, #3, #6 et Consommateurs Externes Complétées ✅

> Note d'ordre : la tâche #6 (FrameLoop) a été faite avant #3–#5 — ses seules dépendances sont la couche 1 (types), déjà en place.

### Tâche #1 — `core/types.ts` (vocabulaire numérique brandé)

* Nouveau fichier `packages/glaze/src/core/types.ts` :
    * Générique `Brand<T, B>` réutilisable.
    * Marques numériques : `ZoomFactor`, `DurationSeconds`, `TimeSpeed`, `WheelSpeed` (strictement positifs et finis), `Seconds`, `Milliseconds (finis seulement — un delta peut être 0).
    * Factories validées à la frontière : `createZoomFactor`, `createDurationSeconds`, `createTimeSpeed`, `createWheelSpeed`, `createSeconds`, `createMilliseconds`.
    * Conversions explicites : `msToSeconds`, `secondsToMs` (valident la finitude au passage).
    * Validateurs exportés pour réutilisation interne : `assertFinite`, `assertStrictlyPositive` (erreurs `Glaze: <label> must be…`).
* Sous-path `"./core/types"` ajouté aux `exports` de `package.json`.

### Tâche #2 — `core/Camera.ts` (feuilles mathématiques pures)

* **Marques géométriques** : `ScreenPoint`, `WorldPoint`, `ScreenDelta`, `WorldDelta` (+ convertisseurs validants `toScreenPoint` / `toWorldPoint` / `toScreenDelta` / `toWorldDelta`). Les signatures sont maintenant `screenToWorld(screen: ScreenPoint): WorldPoint` et l'inverse — confondre les repères ne compile plus.
* **Clamp réparé (Pass 1 F6)** :
    * `createZoomBounds(minZoom, maxZoom)` : rejette non-finis, ≤ 0, et `min >= max`.
    * `createZoomClamp(minZoom, maxZoom)` : retourne `(value) => ZoomFactor`, **throw sur NaN** au lieu de le propager.
    * `DEFAULT_ZOOM_BOUNDS` validé une fois à l'import du module.
* **Factory obligatoire (Pass 1 F1)** : constructeur privé ; `createCamera(x, y, zoom: ZoomFactor)` valide x/y ; `defaultCamera()` = identité. Un zoom nu ne se compile plus.
* **Migration interne effectuée** (adaptation mécanique uniquement, sauf mention) : `CameraControls.ts`, `cpu/CpuSurface.ts`, `gpu/GpuSurface.ts`, `react/useCpuSurface.ts`, `react/useGpuSurface.ts`.
* **Bug latent capturé au passage** : event sans coordonnées → point NaN → l'ancien code empoisonnait silencieusement la caméra. Le nouveau garde-fou jette à la frontière.
* Gates vertes sur `@repo/glaze` : `check-types`, `lint`.

> ⚠️ **État transitoire de `CameraControls.ts`** : adaptation mécanique seulement (mutation in place conservée, `Object.assign` du `update()` bypass toujours possible côté types via `ZoomFactor` brandé). Son rework profond en transforms purs `(Camera, input) => Camera` est la **Tâche #4**, pas avant.

### Consommateurs externes réparés ✅ (ex-section 4)

* `packages/automa/src/lib/coordinates.ts` : les 2 erreurs du nouveau contrat `Camera` corrigées — `new Camera()` → `defaultCamera()`, point brut enveloppé dans `toScreenPoint({...})`. `@repo/automa` check-types + lint verts, monorepo entier vert (`pnpm -r --if-present check-types`).

### Tâche #6 — `core/FrameLoop.ts` (adaptateur d'environnement injecté) ✅

* **Injection de capabilities** : `new FrameLoop(step, options?)` avec `now?: () => Milliseconds` (défaut `performance.now()`) et `schedule?: (cb: (t: Milliseconds) => void) => () => void` (défaut wrapper rAF retournant son canceller). Zéro call-site modifié en production ; plus aucun besoin de stubber un global.
* **Conversion s à la frontière** : le scheduler fournit des ms ; tout ce qui vit après la conversion est des `Seconds`. `#lastTime` tracké en secondes.
* **Delta brandé (Pass 1 F10)** : `NonNegativeSeconds`, floor à 0 au point de production unique (premier tick synchrone, sauts d'horloge négatifs). Implémenté comme *raffinement* `Seconds & { __nonNegative: true }` et non comme un `Brand` imbriqué : deux marques sur la même clé `__brand` intersectent en `never`. Reste assignable vers `Seconds`.
* **FrameToken (Pass 3 F2, amorce couche 7)** : preuve fraîche émise par tick via marque à symbole unique, passée au step propriétaire. Les surfaces ne le consomment **pas encore** — câblage `endFrame(token)` prévu à la tâche #7.
* **Invariant nommé (Pass 3 F8)** : schedule-before-dispatch commenté dans `#tick` — le keep-alive est re-lié avant tout dispatch, un callback qui throw ne peut pas tuer la boucle (l'exception remonte toujours au scheduler).
* **Fan-out déterministe** : `runFrameHandlers()` itère une snapshot prise à l'entrée ; subscribe/unsubscribe mid-frame prend effet à la frame suivante uniquement.
* **Mécanique** : `#rafId` numérique remplacé par un canceller stocké (`#cancelScheduled`), aligné sur le contrat injectable.
* **Surfaces intactes** : leurs steps à 2 params restent compatibles (param token ignoré jusqu'à #7).

### Tâche #3 — `core/Clock.ts` (config en union + stratégies pures) ✅

* **Union discriminée (Pass 3 F5)** : `ClockOptions = FreeClockOptions | TimedClockOptions` — `{ mode?: 'free' }` vs `{ mode: 'timed'; duration: DurationSeconds; loop?; pingPong? }`, avec `speed?: TimeSpeed` et `autoStart?` partagés. `pingPong` sans duration ne compile plus ; la dérivation cachée `loop = duration !== undefined` devient un défaut explicite (`loop: true` dans la variante timed).
* **Stratégies pures exportées (Pass 3 F1)** : `advanceFree`, `advancePingPong` (retourne `{ time, direction }`), `advanceLooping`, `advanceOnce` (retourne `{ time, finished }`) — arithmétique pure testable aux bornes ; `update()` réduit au gating + dispatch + application, l'état interne étant résolu en union miroir (`ClockState`).
* **Gardes effondrés (Pass 1 F3)** : les 3 comparaisons `duration <= 0` deviennent des checks de kind sur l'union ; une durée invalide est rejetée à la frontière par `createDurationSeconds` au lieu d'être réinterprétée en « free-run » silencieux.
* **Signatures brandées** : `update(delta: Seconds)` (accepte le `NonNegativeSeconds` du FrameStep), `seek(time: Seconds)`, `setSpeed(speed: TimeSpeed)` ; getters `time/deltaTime/duration/speed` brandés. Constructeur public mais à options déjà validées par les brands (pattern Camera), `createClock` reste l'entrée ergonomique.
* **Adaptations internes** : `clockStore.setSpeed(TimeSpeed)` strict ; champs publics `time`/`deltaTime` de `CpuSurface`/`GpuSurface` typés `Seconds`.
* **Bug latent corrigé au passage (classe Pass 1 F4)** : `SimulationEngine.tick()` de `@repo/automa` recevait `surface.deltaTime` en **secondes** mais accumulait contre le seuil `#speedMs` en **ms** → ~1000× plus lent que la vitesse configurée. L'intervalle est maintenant converti une fois via `msToSeconds` (constructeur + `setSpeed(ms)`), `tickSimulation(delta: Seconds)` est typé bout en bout.
* **Tests** : nouveau `core/Clock.test.ts` — stratégies pures aux bornes (deltas géants, hits exacts, rebonds ping-pong), comportement des 4 modes, rejet compile-time (`@ts-expect-error` sur `{ pingPong: true }`). Gates : check-types ✓, lint ✓, vitest glaze 56/56 ✓, monorepo `check-types` entier vert ✓ (+ lint automa).

---

## 5. Feuille de Route Restante (`GLAZE_REFACTOR_INVENTORY.md`)

| # | Cible | Contenu | Dépendances | Statut |
|---|-------|---------|-------------|--------|
| 3 | `Clock.ts` | Union discriminée `ClockOptions` (`free` / `timed`), extraction des stratégies pures `advanceFree/PingPong/Looping/Once`, les 3 gardes duration s'effondrent | couche 1 | ✅ |
| 4 | `CameraControls.ts` | Transforms purs `(Camera, input) => Camera`, patch interface remplaçant `Object.assign`, facade mutable optionnelle en bordure | couches 1–2 | ⏳ prochaine |
| 5 | `gestures.ts` | Marque `WheelSpeed`, helper `dispatch()` (fan-out ×5 → 1), politique de capture déplacée au router, dispose cancel-safe | couches 1–2 | ⏳ |
| 6 | `FrameLoop.ts` | Injection `now()`/`schedule()`, émission `NonNegativeSeconds`, invariant schedule-before-dispatch nommé, émet `FrameToken` | couche 1 | ✅ |
| 7 | `InputStore.ts` | `EventSource` injecté, bounds cachés/cachables, snapshots figés, `AttachedHandle`, bindings table-driven, `endFrame(token)` (consommera le token de la couche 6) | couches 1+6 | ⏳ |
| 8 | `InputRouter` | Composition finale : dispose → reset des gestes, politique de capture | tout | ⏳ |

Rappel de rythme : chaque couche compile vert avant la suivante ; consommateurs externes adaptés mécaniquement au fil de l'eau.

---

## 6. Checklist de Vérification (chaque tâche)

```sh
pnpm --filter @repo/glaze check-types   # tsc -b (src/)
pnpm --filter @repo/glaze lint          # eslint .
pnpm -r --if-present check-types        # ondulations chez les packages consommateurs
```
