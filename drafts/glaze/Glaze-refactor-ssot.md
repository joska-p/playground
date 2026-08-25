# Glaze — Refactorisation Architecture & Typage : Source Unique de Vérité

> **Note de fusion (Phase 1 — SSOT) :** ce document réunit, sans ajout ni suppression de contenu,
> trois sources produites au fil du refactor de la librairie `glaze` : le manifeste de design qui a
> motivé le travail, le handoff de fin de session, et l'audit technique complet (3 passes). Seule la
> mise en forme (hiérarchie des titres, table des matières) a été harmonisée pour permettre une
> lecture continue. Chaque partie conserve sa langue d'origine (anglais pour le manifeste et
> l'audit, français pour le handoff).

---

## Table des matières

- **Partie A — Manifeste de Design** *(le document fondateur : pourquoi ce refactor)*
  1. Push Dishonesty to the Edges (*Impure at the Edges*)
  2. Invariants by Construction (Branded Types & Proof Tokens)
  3. Single Level of Abstraction Principle (SLAP)
  4. Quick Reference Checklist

- **Partie B — Handoff de Fin de Session** *(contexte, statut, feuille de route)*
  1. Contexte & Architecture Validée
  2. Sources de Vérité vivantes
  3. Statut : Tâches #1 à #8
  4. Feuille de Route — Statut Complet
  5. Checklist de Vérification
  6. Notes d'Architecture pour la Session Prochaine

- **Partie C — Audit Technique Complet** *(3 passes, findings détaillés)*
  1. Pass 1 — Mathematical Invariants & Branded Types (10 findings)
  2. Pass 2 — Dishonesty & Side-Effects Isolation (7 findings)
  3. Pass 3 — Lifecycle Guarantees & Abstraction Levels / SLAP (8 findings)
  4. Recommended Order of Refactoring for core/

---

# Partie A — Manifeste de Design

*(Source originale : `type-design-manifest.md` — le document qui a motivé le refactor)*

### 1. Push Dishonesty to the Edges (_Impure at the Edges_)

Keep your core graphics algorithms **100% honest**:

- **Honest Functions:** Take all dependencies as parameters (`dt`, `input`, `randomSeed`, `dimensions`). They do not touch global state, read `window`/DOM, or call `Math.random()`. Given the same inputs, they return the exact same outputs.
- **Dishonest Edges:** The application shell (lifecycle runner, DOM listeners, `requestAnimationFrame`, WebGL/Canvas context calls) sits at the top level. It gathers environment data, invokes honest core functions, and executes side effects.

#### ❌ Dishonest (Impure) Logic Mixed Inside Core

```typescript
class Particle {
    position = { x: 0, y: 0 };

    // Dishonest: Reads global time, calls Math.random(), mutates self directly
    update() {
        const dt = performance.now() / 1000; // ⚠️ Hidden external state
        this.position.x += Math.random() * 10 * dt; // ⚠️ Hidden side-effect
    }
}
```

#### ✅ Honest Core + Impure Shell

```typescript
// 1. Immutable State & Pure Data Types
interface Vec2 {
    readonly x: number;
    readonly y: number;
}

interface ParticleState {
    readonly position: Vec2;
    readonly velocity: Vec2;
}

// 2. Honest Pure Function (Library Level)
function updateParticle(
    particle: ParticleState,
    dt: number,
    randomSeed: number // Seed injected explicitly
): ParticleState {
    const noise = (randomSeed - 0.5) * 10;
    return {
        position: {
            x: particle.position.x + (particle.velocity.x + noise) * dt,
            y: particle.position.y + particle.velocity.y * dt
        },
        velocity: particle.velocity
    };
}

// 3. Dishonest Shell / Lifecycle Engine (Application Level)
class GraphicsEngine {
    private state: ParticleState = { position: { x: 0, y: 0 }, velocity: { x: 1, y: 0 } };
    private lastTime = performance.now();

    start() {
        const frame = (now: number) => {
            const dt = (now - this.lastTime) / 1000;
            this.lastTime = now;

            // Inject dishonesty (time & random numbers) at the top boundary
            const seed = Math.random();
            this.state = updateParticle(this.state, dt, seed);

            requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
    }
}
```

---

### 2. Invariants by Construction (Branded Types & Proof Tokens)

Eliminate runtime checks (`if (!vector)`, `if (len === 0)`, `if (!isBound)`) by forcing your TypeScript compiler to enforce mathematical and lifecycle guarantees.

#### A. Branded Types for Mathematical Invariants

Use **Branded Types** (Nominal Typing) to ensure vectors are guaranteed to be normalized at compile-time.

```typescript
// Define a Branded Type for Normalized Vectors
type Brand<T, B extends string> = T & { readonly __brand: B };
type NormalizedVec2 = Brand<Vec2, 'NormalizedVec2'>;

// Constructor/Factory function: The ONLY place where normalization validation happens
function toNormalizedVec2(v: Vec2): NormalizedVec2 {
    const len = Math.hypot(v.x, v.y);
    if (len === 0) {
        throw new Error('Cannot normalize a zero-length vector.');
    }
    return { x: v.x / len, y: v.y / len } as NormalizedVec2;
}

// Function signature REQUIRES a guaranteed normalized vector
function calculateReflection(velocity: Vec2, surfaceNormal: NormalizedVec2): Vec2 {
    // No need for: if (surfaceNormal.length() !== 1) throw ...
    // The type system guarantees surfaceNormal is normalized!
    const dot = velocity.x * surfaceNormal.x + velocity.y * surfaceNormal.y;
    return {
        x: velocity.x - 2 * dot * surfaceNormal.x,
        y: velocity.y - 2 * dot * surfaceNormal.y
    };
}

// Usage:
const rawVector = { x: 10, y: 5 };
// calculateReflection(rawVector, rawVector); // ❌ Compile Error: Vec2 is not assignable to NormalizedVec2

const normal = toNormalizedVec2(rawVector); // Validated once
const reflection = calculateReflection(rawVector, normal); // ✅ Compiles cleanly
```

#### B. Proof Tokens for Rendering Lifecycle Guarantees

Use **Proof Tokens** to make sure rendering commands can **never** be executed outside an active frame pass or an initialized context.

```typescript
// Proof Token: Represents proof that a render frame is active
class ActiveFrameToken {
    // Private constructor prevents arbitrary instantiation
    private constructor(
        public readonly timestamp: number,
        public readonly dt: number
    ) {}

    static createInternal(timestamp: number, dt: number): ActiveFrameToken {
        return new ActiveFrameToken(timestamp, dt);
    }
}

// Canvas Component / Renderer
class Canvas2DRenderer {
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        if (!context) throw new Error('2D Context not supported');
        this.ctx = context;
    }

    // Draw calls demand the ActiveFrameToken as proof of lifecycle execution
    drawCircle(token: ActiveFrameToken, center: Vec2, radius: number, color: string): void {
        // Guaranteed to be executing inside a valid active frame
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// App Loop issuing tokens
class AppRunner {
    private renderer: Canvas2DRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Canvas2DRenderer(canvas);
    }

    renderFrame(time: number, dt: number) {
        // 1. Create the proof token at the lifecycle boundary
        const frameToken = ActiveFrameToken.createInternal(time, dt);

        // 2. Pass token to render calls
        this.renderer.drawCircle(frameToken, { x: 100, y: 100 }, 20, 'red');
    }
}
```

---

### 3. Single Level of Abstraction Principle (SLAP)

Every function body must operate strictly at **one abstraction level**. Never mix low-level array manipulation or Canvas API calls inside high-level scene management.

#### ❌ Mixed Abstraction Levels

```typescript
class Scene {
    entities: Array<{ pos: Vec2; color: string }> = [];
    ctx!: CanvasRenderingContext2D;

    // Mixes scene management, array loops, string lowercasing, and canvas drawing!
    renderFilteredEntities(filterName: string) {
        const lowerFilter = filterName.toLowerCase(); // Low-level string op

        for (let i = 0; i < this.entities.length; i++) {
            // Raw loop
            if (lowerFilter === 'red' && this.entities[i].color === '#ff0000') {
                this.ctx.beginPath(); // Low-level canvas API
                this.ctx.arc(this.entities[i].pos.x, this.entities[i].pos.y, 10, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
}
```

#### ✅ Stacked Abstraction Layers

```typescript
// Low-Level Abstraction: Reusable Canvas primitive
function drawCirclePrimitive(
    ctx: CanvasRenderingContext2D,
    pos: Vec2,
    radius: number,
    color: string
): void {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Mid-Level Abstraction: Pure entity filtering
function filterEntitiesByColor<T extends { color: string }>(
    entities: readonly T[],
    targetColor: string
): T[] {
    return entities.filter((e) => e.color.toLowerCase() === targetColor.toLowerCase());
}

// High-Level Abstraction: Clean orchestration staying at one abstraction level
class ParticleSceneComponent {
    private entities: ParticleState[] = [];

    renderPass(
        token: ActiveFrameToken,
        renderer: Canvas2DRenderer,
        activeColorFilter: string
    ): void {
        const visibleEntities = filterEntitiesByColor(this.entities, activeColorFilter);

        for (const entity of visibleEntities) {
            renderer.drawCircle(token, entity.position, 10, activeColorFilter);
        }
    }
}
```

---

### Quick Reference Checklist

1. **Are my math functions honest?** If a function calculates physics, transformations, or geometry, ensure it takes all parameters explicitly and returns new data without modifying global state.
2. **Can invalid states compile?** Replace bare numbers/vectors with `Branded Types` (`NormalizedVec2`, `PositiveNumber`, `RadianAngle`).
3. **Can functions be called out of order?** Require a `ProofToken` (e.g. `ActiveFrameToken`, `BoundTextureToken`) in function signatures to prove preconditions were met.
4. **Is a function doing too much?** If you see raw nested loops or mixed DOM/Canvas API calls inside logic functions, break them into single-level helper functions.


---

# Partie B — Handoff de Fin de Session

*(Source originale : `glaze-refactor.md`)*

### 1. Contexte & Architecture Validée

* **Monorepo :** *Playground* (« Cahier d'exercices »), composé de mini-apps graphiques et de la bibliothèque centrale TypeScript : **`glaze`**.
* **Principes clés :**
1. **Pureté et Honnêteté aux Frontières (*Impure at the Edges*) :** Les fonctions de `glaze` sont 100 % pures. Le temps, les entrées et l'aléatoire sont injectés par l'application shell.
2. **Invariants par Construction :** Utilisation de **Branded Types** (ex. `NormalizedVec2`, `Radian`) pour supprimer les checks runtime et de **Proof Tokens** (ex. `ActiveFrameToken`) pour garantir l'ordre du cycle de vie à la compilation.
3. **Niveau d'Abstraction Unique (SLAP) :** Aucune fonction ne mélange plomberie bas niveau/Canvas et orchestration haut niveau.

---

### 2. Sources de Vérité vivantes (à lire en début de session et à faire vivre à la fin)

* **`GLAZE_REFACTOR_INVENTORY.md`** (racine du repo) : audit complet en 3 passes + feuille de route bottom-up en 8 tâches (section « Recommended Order of Refactoring »).
* **`drafts/glaze/type-design-manifest.md`** : manifeste de design des types (brands, proof tokens, SLAP).
* Conventions maison : `codex/docs/conventions/typescript.md`, `codex/docs/conventions/packages.md` (factories `create*` verbe d'abord, erreurs préfixées `Glaze: `, `type` plutôt qu'`interface` — note : le glaze package utilise `interface` pour les shapes, cohérent avec la règle ESLint `consistent-type-definitions: interface`).
* **Skills à charger** : `coding-style` (toute édition TS), `handoff` (compaction en fin de session).

---

### 3. Statut : Toutes tâches #1 à #8 Complétées ✅

> **État du dépôt au stop** : dernier commit = `7c3690524`. Les tâches #1–#7 sont committées. La tâche #8 est couverte par la tâche #5. Deux fichiers non-committés dans le working tree : `InputStore.test.ts` (nouveau, 34 tests) et `LifecycleReport.tsx` (mise à jour des refs lignes). Gates verts : glaze check-types/lint/vitest **127/127** + monorepo check-types entier vert.

#### Tâche #1 — `core/types.ts` (vocabulaire numérique brandé) ✅

* Nouveau fichier `packages/glaze/src/core/types.ts` :
    * Générique `Brand<T, B>` réutilisable.
    * Marques numériques : `ZoomFactor`, `DurationSeconds`, `TimeSpeed`, `WheelSpeed` (strictement positifs et finis), `Seconds`, `Milliseconds (finis seulement — un delta peut être 0)`.
    * Factories validées à la frontière : `createZoomFactor`, `createDurationSeconds`, `createTimeSpeed`, `createWheelSpeed`, `createSeconds`, `createMilliseconds`.
    * Conversions explicites : `msToSeconds`, `secondsToMs` (valident la finitude au passage).
    * Validateurs exportés pour réutilisation interne : `assertFinite`, `assertStrictlyPositive` (erreurs `Glaze: <label> must be…`).
* Sous-path `"./core/types"` ajouté aux `exports` de `package.json`.

#### Tâche #2 — `core/Camera.ts` (feuilles mathématiques pures) ✅

* **Marques géométriques** : `ScreenPoint`, `WorldPoint`, `ScreenDelta`, `WorldDelta` (+ convertisseurs validants `toScreenPoint` / `toWorldPoint` / `toScreenDelta` / `toWorldDelta`). Les signatures sont maintenant `screenToWorld(screen: ScreenPoint): WorldPoint` et l'inverse — confondre les repères ne compile plus.
* **Clamp réparé (Pass 1 F6)** :
    * `createZoomBounds(minZoom, maxZoom)` : rejette non-finis, ≤ 0, et `min >= max`.
    * `createZoomClamp(minZoom, maxZoom)` : retourne `(value) => ZoomFactor`, **throw sur NaN** au lieu de le propager.
    * `DEFAULT_ZOOM_BOUNDS` validé une fois à l'import du module.
* **Factory obligatoire (Pass 1 F1)** : constructeur privé ; `createCamera(x, y, zoom: ZoomFactor)` valide x/y ; `defaultCamera()` = identité. Un zoom nu ne se compile plus.
* **Bug latent capturé au passage** : event sans coordonnées → point NaN → l'ancien code empoisonnait silencieusement la caméra. Le nouveau garde-fou jette à la frontière.

#### Tâche #3 — `core/Clock.ts` (config en union + stratégies pures) ✅

* **Union discriminée (Pass 3 F5)** : `ClockOptions = FreeClockOptions | TimedClockOptions`.
* **Stratégies pures exportées** : `advanceFree`, `advancePingPong`, `advanceLooping`, `advanceOnce`.
* **Gardes effondrés (Pass 1 F3)** : les 3 comparaisons `duration <= 0` deviennent des checks de kind sur l'union.
* **Signatures brandées** : `update(delta: NonNegativeSeconds)`, `seek(time: Seconds)`, `setSpeed(speed: TimeSpeed)`.
* **Bug latent corrigé** : `SimulationEngine.tick()` accumulait contre un seuil en ms avec un delta en secondes.
* **Tests** : `core/Clock.test.ts` — stratégies pures aux bornes, comportement des 4 modes, garde compile-time.

#### Tâche #4 — `core/CameraControls.ts` (transforms purs + façade mince) ✅

* **Transforms purs** `(Camera, input) => Camera` exportés : `panTo`, `panBy`, `zoomAt`, `zoomTo`, `zoomBy`, `patchCamera`.
* **Policy porteuse de preuve** : `ZoomClamp` — la fonction clamp *est* l'artefact validé.
* **`CameraPatch`** : `{ x?, y?, zoom?: number }` remplace `Partial<Camera>` + `Object.assign`.
* **Façade mince** : `commit(transform(...))` — le point d'écriture unique.
* **Tests** : `core/CameraControls.test.ts` — 18 cas.

#### Tâche #5 — `core/gestures.ts` (gestes décisionnels + dispatch unique) ✅

* **Marque `WheelSpeed`** (Pass 1 F7) : `DEFAULT_WHEEL_SPEED` validé, zoom mort/inversé/NaN rejeté à la construction.
* **`point` brandé** : `InteractionEvent.point: ScreenPoint`.
* **Fan-out ×5 → 1** : helper `#dispatch(invoke)` — itère `getGestures()`, agrège les claims, ne court-circuite jamais.
* **Politique de capture déplacée au router** : `PanGesture.onStart` est pur — retourne `true` pour *claimer*.
* **Dispose cancel-safe** : `Gesture.onCancel?.()` ; `dispose()` désabonne d'abord, puis annule chaque geste.
* **Tests** : `core/gestures.test.ts` — 19 cas.

#### Tâche #6 — `core/FrameLoop.ts` (adaptateur d'environnement injecté) ✅

* **Injection de capabilities** : `new FrameLoop(step, options?)` avec `now?: () => Milliseconds` et `schedule?: (cb) => () => void`. Zéro call-site modifié en production.
* **Conversion s à la frontière** : le scheduler fournit des ms ; tout ce qui vit après la conversion est des `Seconds`.
* **Delta brandé (Pass 1 F10)** : `NonNegativeSeconds`, floor à 0 au point de production unique. Implémenté comme *raffinement* `Seconds & { __nonNegative: true }`.
* **FrameToken (Pass 3 F2)** : preuve fraîche émise par tick via marque à symbole unique. **Maintenant consommé par `InputStore.endFrame(token)` (tâche #7).**
* **Fan-out déterministe** : `runFrameSubscribers()` itère une snapshot prise à l'entrée.

#### Tâche #7 — `core/InputStore.ts` (environnement rendu explicite) ✅

* **`EventSource` injecté (Pass 2 F5)** : interface `EventSource` avec `on(target, type, cb, opts)` et `onWindow(type, cb)`. Default `domEventSource` wrappe `addEventListener`/`removeEventListener`. Constructor : `new InputStore(options?: InputStoreOptions)`.
* **Bounds injectées (Pass 2 F4)** : `bounds: () => Rect` optionnel ; `attach()` met à jour le provider via `target.getBoundingClientRect()`. Plus de layout forced synchrone implicite — le provider est un closure injecté.
* **Snapshots figés aux abonnés (Pass 2 F2)** : `#snapshotPointer()` crée un `Object.freeze({ x, y })` ; les handlers pointer reçoivent un snapshot figé au lieu de la référence live à `this.pointer`. Les getters publics restent des vues live (les gestes lisent `event.input.pointerDelta` pendant le dispatch).
* **`AttachedHandle` (Pass 3 F4)** : `attach()` retourne un handle opaque ; `detach(handle)` le consomme. Les 3 null-checks `#attached` sont éliminés. Le handle est un `interface` brandée (compatible ESLint `consistent-type-definitions: interface`).
* **`endFrame(token)` (Pass 3 F2)** : `endFrame(_token: FrameToken)` — preuve de frame active requise. Les surfaces passent `frame` depuis `FrameStep` (3e paramètre, déjà présent mais ignoré avant).
* **Bindings table-driven (Pass 3 F6)** : `#targetBindings` et `#windowBindings` construits au constructor, itérés par `attach()` et `#unbind()`. Le pattern `this[handler] as EventListener` est utilisé pour le dispatch dynamique (cast nécessaire car les handlers privés sont plus spécifiques que `EventListener`). Les 16 appels add/remove mirroring sont remplacés par 2 itérations.
* **Tests** : `core/InputStore.test.ts` — 34 cas (EventSource fake, bounds injection, snapshots figés, endFrame token, AttachedHandle lifecycle, table-driven bindings, keyboard state, wheel accumulation, subscribe/unsubscribe, context menu).

#### Tâche #8 — `InputRouter` (composition finale) ✅

* Déjà implémentée dans la tâche #5 (gestures.ts) :
    * `#dispatch` helper (fan-out ×5 → 1) ✅
    * `dispose() → onCancel()` cancel-safe ✅
    * Capture policy centralisée au router ✅
* Vérifié fonctionnel avec la nouvelle API `InputStore` de la tâche #7 — le router s'abstoit via `subscribe()` avant `attach()`, les handlers reçoivent des snapshots.

---

### 4. Feuille de Route — Statut Complet

| # | Cible | Contenu | Dépendances | Statut |
|---|-------|---------|-------------|--------|
| 1 | `core/types.ts` | Branded numeric vocabulary | — | ✅ committé |
| 2 | `Camera.ts` | Mathématiques pures + brands géométriques | 1 | ✅ committé |
| 3 | `Clock.ts` | Union discriminée + stratégies pures | 1 | ✅ committé |
| 4 | `CameraControls.ts` | Transforms purs + façade mince | 1–2 | ✅ committé |
| 5 | `gestures.ts` | Dispatch + capture policy + cancel-safe | 1–2 | ✅ committé |
| 6 | `FrameLoop.ts` | Injection + FrameToken | 1 | ✅ committé |
| 7 | `InputStore.ts` | EventSource, bounds, snapshots, AttachedHandle, table-driven, endFrame(token) | 1+6 | ✅ committé |
| 8 | `InputRouter` | Composition finale | tout | ✅ (couvert par #5) |

**Prochaines étapes :**
1. **Commit** les fichiers non-committés (`InputStore.test.ts` + `LifecycleReport.tsx`)
2. **Optionnel** : pousser la branche (`git push`)
3. La refactorisation core/ est complète — prochain axe possible : tests d'intégration (surface → gesture → camera) ou extension vers les modules non-core (React adapters, etc.)

---

### 5. Checklist de Vérification (chaque tâche)

```sh
pnpm --filter @repo/glaze check-types   # tsc -b (src/)
pnpm --filter @repo/glaze lint          # eslint .
pnpm --filter @repo/glaze test          # vitest run
pnpm -r --if-present check-types        # ondulations chez les packages consommateurs
```

**État actuel :** tous les gates sont verts (check-types ✓, lint ✓, vitest 127/127 ✓, monorepo ✓). Working tree contient 2 fichiers non-committés (test nouveau + LifecycleReport mis à jour).

---

### 6. Notes d'Architecture pour la Session Prochaine

#### Patron de table-driven bindings (InputStore)

Le pattern utilisé pour les bindings dynamiques mérite une note :

```ts
// Les handlers privés sont des arrow functions (class fields) plus spécifiques que EventListener
// On cast dans le tableau de binding pour uniformiser le type :
this.#targetBindings = [
    ['pointermove', this.#onPointerMove as EventListener],
    // ...
];
// attach() itère et passe les EventListener au EventSource
```

Ce cast est nécessaire car `(event: PointerEvent) => void` n'est pas assignable vers `(event: Event) => void` (paramètre contravariant). C'est le prix du table-driven dans un langage nominal — l'alternative (registry map `Record<string, EventListener>`) est plus verbeuse sans être plus sûre.

#### Snapshot vs live view

Les abonnés (gestes) reçoivent un snapshot figé via `#snapshotPointer()`, mais lisent `event.input.pointerDelta` (live) pendant le dispatch. C'est intentionnel : le snapshot protège contre les mutations accidentelles entre frames, pas pendant le même event. Les getters publics restent des vues live pour que les gestes en cours de dispatch voient l'état actuel.

Point important : un snapshot est créé **une seule fois par notification** et partagé entre tous les abonnés dans le même pass. Différentes notifications créent différents snapshots. Le snapshot capture l'état **après** `#updatePointer` — c'est l'état mis à jour, pas l'état d'avant.

#### AttachedHandle vs destroy()

Le `AttachedHandle` est retourné par `attach()` mais les surfaces l'ignore (n' appellent pas `detach()` — `destroy()` suffit). Le handle existe pour les cas où un composant veut détacher/re-attacher un canvas sans détruire le store. C'est une extension de l'API, pas une obligation.

#### Testing pattern pour InputStore

Les tests utilisent un `FakeEventSource` qui enregistre les subscriptions et fournit `emit()` / `emitWindow()` pour simuler des événements DOM. Les handlers privés ne sont pas accessibles en dehors de la classe (class fields), donc tous les tests déclenchent les événements via le fake source. Les coordinates sont testées avec `getBoundingClientRect` mocké via `vi.spyOn` sur l'élément cible (jsdom retourne des zéros par défaut).


---

# Partie C — Audit Technique Complet

*(Source originale : `GLAZE_REFACTOR_INVENTORY.md`)*

Audit of implicitly assumed mathematical invariants in `packages/glaze/src/core/`, with proposals
to enforce them at compile time via Branded Types. **Pass 1 scope: `core/` only. No code was
changed.**

---

### Section 1: Pass 1 — Mathematical Invariants & Branded Types

#### Summary Table

| #   | File                        | Invariant Violated                                     | Proposed Brand               | Priority  |
| --- | --------------------------- | ------------------------------------------------------ | ---------------------------- | --------- |
| 1   | `Camera.ts`                 | `zoom` may be `0`/negative/NaN → division by zero      | `ZoomFactor`                 | 🔴 High   |
| 2   | `CameraControls.ts`         | `Object.assign` patch bypasses zoom clamping           | `ZoomFactor` (patch type)    | 🔴 High   |
| 3   | `Clock.ts`                  | Duration ≤ 0 guarded at 3 sites against div-by-zero    | `DurationSeconds`            | 🔴 High   |
| 4   | `FrameLoop.ts` / `Clock.ts` | Seconds vs milliseconds encoded in comments only       | `Seconds`                    | 🔴 High   |
| 5   | `Camera.ts`                 | Screen vs world points share one bare type             | `ScreenPoint` / `WorldPoint` | 🟠 Medium |
| 6   | `Camera.ts`                 | `clamp` is NaN-transparent, min/max unordered          | `BoundedNumber<T>` helper    | 🟠 Medium |
| 7   | `gestures.ts`               | Wheel speed accepts 0/negative/NaN                     | `WheelSpeed`                 | 🟠 Medium |
| 8   | `InputStore.ts`             | `wheelDelta` mixes DOM scroll units (pixel/line/page)  | `WheelPixelDelta`            | 🟠 Medium |
| 9   | `InputStore.ts`             | CSS px vs device px distinguished by comment only      | `CssPoint`                   | 🟡 Low    |
| 10  | `FrameLoop.ts`              | Delta can be `0` or negative (first tick, clock jumps) | `NonNegativeSeconds`         | 🟡 Low    |

---

#### Finding 1 — Unvalidated `zoom` enables division by zero in every transform

- **File & Line**: `packages/glaze/src/core/Camera.ts:24-28` (constructor), consumed at `Camera.ts:32-33`
- **Current Code / Issue**:
    ```ts
    constructor(x = 0, y = 0, zoom = 1) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
    }
    ```
    `new Camera(0, 0, 0)` compiles and instantiates. `screenToWorld` then computes
    `(screen.x - this.x) / this.zoom` → `Infinity`/`NaN`, poisoning every downstream coordinate.
    The invariant _“zoom is strictly positive”_ exists only implicitly.
- **Proposed Branded Type**: `type ZoomFactor = number & { readonly __brand: 'ZoomFactor' }`
  with factory `zoomFactor(n: number): ZoomFactor` that throws on `n <= 0 || !Number.isFinite(n)`.
  Field becomes `zoom: ZoomFactor`; public constructor made private, replaced by
  `createCamera(x: number, y: number, zoom: ZoomFactor)`.
- **Impact**: Eliminates the division-by-zero class at its root; every call site that currently
  would need a runtime `if (zoom === 0)` guard is provably safe. `defaultCamera()` unchanged.

#### Finding 2 — `CameraControls.update()` bypasses zoom clamping

- **File & Line**: `packages/glaze/src/core/CameraControls.ts:67-69`
- **Current Code / Issue**:
    ```ts
    update(partial: Partial<Camera>): void {
        Object.assign(camera, partial);
    }
    ```
    All other mutations funnel through `clampZoom` (lines 25, 28, 53), but `update({ zoom: -3 })`
    injects any value post-construction, breaking the invariant `zoom ∈ [minZoom, maxZoom]` that
    the rest of the module maintains. This is the single unguarded mutation path.
- **Proposed Branded Type**: Replace `Partial<Camera>` with an explicit patch interface
  `{ x?: number; y?: number; zoom?: ZoomFactor }`. Optionally add
  `NormalizedZoom = ZoomFactor & { within(bounds) }` if bounds-checked construction is desired.
- **Impact**: Closes the invariant leak; makes the “all mutation goes through here” contract
  (doc comment, line 3-5) actually true at the type level.

#### Finding 3 — Clock duration guard duplicated 3× against zero-division

- **File & Line**: `packages/glaze/src/core/Clock.ts:56`, `:88`, `:113`
- **Current Code / Issue**:
    ```ts
    if (this.#duration === undefined || this.#duration <= 0) return 0;   // progress getter, :56
    this.#duration !== undefined && this.#duration > 0                    // seek(), :88
    if (this.#duration === undefined || this.#duration <= 0) {            // update(), :113
    ```
    Three runtime guards defend `progress`'s `this.#time / this.#duration` against zero/negative
    duration. Side effect: `new Clock({ duration: -5 })` silently _reinterprets_ the input as
    “no duration” instead of failing. The implicit invariant is
    _“duration is either absent (free-running) or strictly positive”_.
- **Proposed Branded Type**: `type DurationSeconds = number & { readonly __brand: 'DurationSeconds' }`
  (strictly positive, finite), validated once in the `ClockOptions` factory. Internally the state
  becomes `#duration: DurationSeconds | undefined`, collapsing each guard to a plain
  `undefined` check — or further, a discriminated union `FreeClock | TimedClock`.
- **Impact**: Removes 3 duplicated runtime comparisons; invalid durations rejected at the
  boundary instead of silently reinterpreted; division safety guaranteed by construction.

#### Finding 4 — Time units (seconds vs ms) enforced by comments only

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:1-2` (comment), `:59-62`;
  `packages/glaze/src/core/Clock.ts:102` (`update(rawDelta: number)`)
- **Current Code / Issue**:
    ```ts
    /** `time` and `delta` are in seconds. */ // FrameLoop.ts:1
    export type FrameCallback = (time: number, delta: number) => void;
    ```
    `performance.now()` returns **milliseconds**; FrameLoop divides by 1000 (lines 59, 62) to honor
    the comment. But `Clock.update(rawDelta: number)` accepts a bare `number` with no unit marker —
    feeding it a raw ms delta (a one-character mistake) runs the clock 1000× fast, compiles clean,
    and produces plausible-looking animation until someone notices the timeline.
- **Proposed Branded Type**:
  `type Seconds = number & { readonly __brand: 'Seconds' }` and
  `type Milliseconds = number & { readonly __brand: 'Milliseconds' }`, plus explicit conversion
  functions `msToSeconds()` / `secondsToMs()`. `FrameCallback` becomes
  `(time: Seconds, delta: Seconds) => void`; `Clock.update(rawDelta: Seconds)`.
- **Impact**: Mixing time domains becomes a compile error — the highest-frequency bug class in
  frame-loop code, eliminated structurally rather than by convention.

#### Finding 5 — Screen and world points share one bare vector type

- **File & Line**: `packages/glaze/src/core/Camera.ts:1-4` (`Point2D`); consumed at
  `Camera.ts:30` / `:37`, `CameraControls.ts:8-12`, `InputStore.ts:16-21`, `gestures.ts:17`
- **Current Code / Issue**:
    ```ts
    export interface Point2D {
        x: number;
        y: number;
    }
    ```
    `screenToWorld(screen: Point2D)` and `worldToScreen(world: Point2D)` are exact inverses;
    passing a world point to `screenToWorld` (or vice-versa) compiles and returns garbage with no
    error. Same conflation between _positions_ and _deltas_: `InputStore.pointerDelta` (a delta)
    and `pointer` (a position) are both `Point2D`, and `PanGesture.onMove` feeds the delta straight
    into `panBy(dx, dy)` (`gestures.ts:55`) with nothing distinguishing the semantics.
- **Proposed Branded Type**:
  `ScreenPoint`, `WorldPoint`, `ScreenDelta`, `WorldDelta` — all nominal flavors over
  `{ x, y }`. Signatures become `screenToWorld(screen: ScreenPoint): WorldPoint` and
  `worldToScreen(world: WorldPoint): ScreenPoint`.
- **Impact**: Swapping frames of reference becomes a type error. This core has no
  normalized-direction math yet, but these four brands are the prerequisite vocabulary for any
  future normals/reflection work (e.g., a `NormalizedVec2` would derive from `WorldDelta`).

#### Finding 6 — `clamp` helper is NaN-transparent and order-blind

- **File & Line**: `packages/glaze/src/core/Camera.ts:13-16`; relied on at
  `CameraControls.ts:25` with unvalidated `minZoom`/`maxZoom` params (`:20-21`)
- **Current Code / Issue**:
    ```ts
    export const clamp =
        (min: number, max: number) =>
        (value: number): number =>
            Math.max(min, Math.min(max, value));
    ```
    Two holes: (a) `clamp(0, 64)(NaN)` → `NaN` — clamping does **not** sanitize NaN, so
    `zoomBy(NaN)` (`CameraControls.ts:57-58`) sets `camera.zoom = NaN` despite the clamp; (b)
    `createCameraControls(cam, 64, 0.05)` (swapped bounds) silently inverts semantics, and
    `minZoom: 0` reopens Finding 1's division-by-zero through the sanctioned path.
- **Proposed Branded Type**: A generic validated-range helper
  `bounded(min: PositiveNumber, max: PositiveNumber)` requiring `min < max` at creation,
  returning `(value: number) => BoundedValue<Min, Max>`; `createCameraControls` parameters typed
  `PositiveNumber` with the `min < max` relation checked in the factory.
- **Impact**: Removes both the NaN-propagation hole and the inverted-bounds hazard; the runtime
  check moves from “every clamp call, implicitly” to “one factory, explicitly”.

#### Finding 7 — Wheel zoom speed accepts degenerate values

- **File & Line**: `packages/glaze/src/core/gestures.ts:5` (`DEFAULT_WHEEL_SPEED`), `:76`
  (constructor), `:81` (`Math.exp(-deltaY * speed)`)
- **Current Code / Issue**:
    ```ts
    this.#speed = options.speed ?? DEFAULT_WHEEL_SPEED;
    ```
    `speed: 0` → zoom permanently dead; negative speed → exp grows when it should shrink (inverted
    zoom axis); NaN → `Math.exp(NaN)` → NaN zoom fed to `zoomAt`. The implicit invariant is
    _“speed is strictly positive”_, and the magic constant `0.002` carries an unstated unit
    (“per wheel pixel”, see Finding 8).
- **Proposed Branded Type**: `type WheelSpeed = number & { readonly __brand: 'WheelSpeed' }`,
  positive & finite, created via `wheelSpeed(n)` factory; `ZoomOptions.speed?: WheelSpeed`.
- **Impact**: Degenerate configurations fail at gesture construction, not as mysterious
  mid-interaction dead/inverted zooms.

#### Finding 8 — `wheelDelta` conflates DOM scroll units

- **File & Line**: `packages/glaze/src/core/InputStore.ts:151` (`this.wheelDelta += event.deltaY`),
  consumed at `gestures.ts:81`
- **Current Code / Issue**: `WheelEvent.deltaY` units depend on `event.deltaMode`
  (`DOM_DELTA_PIXEL` / `DOM_DELTA_LINE` / `DOM_DELTA_PAGE`). The store accumulates raw values, so
  on Firefox-with-lines settings `ZoomGesture`'s `exp(-deltaY * 0.002)` behaves ~100× stronger
  than on pixel-mode browsers. The normalization step simply doesn't exist.
- **Proposed Branded Type**: Normalize at ingestion to `type WheelPixelDelta = number & {...}`
  (pixels, applying the `deltaMode` multiplier at the single ingestion point in `#onWheel`);
  `wheelDelta: WheelPixelDelta`.
- **Impact**: Cross-browser zoom consistency becomes structural; the brand documents the unit at
  every consumption site.

#### Finding 9 — Coordinate space (CSS px vs device px) is comment-only knowledge

- **File & Line**: `packages/glaze/src/core/InputStore.ts:14` (comment), `:100-106` and `:147-150`
  (`getBoundingClientRect` arithmetic)
- **Current Code / Issue**:
    ```ts
    /** `point` is canvas-relative, in CSS pixels. */
    ```
    Pointer positions are computed as `clientX - rect.left` (CSS px), but any consumer doing
    canvas backing-store math needs device px (`cssPx × devicePixelRatio`). Nothing in the types
    distinguishes the two spaces; a missing scale factor silently offsets hit-testing on HiDPI
    displays.
- **Proposed Branded Type**: `CssPoint` / `DevicePoint` (brands over `Point2D`), with explicit
  `toDevicePixels(ratio: DevicePixelRatio)` conversion. `InputHandlers` callbacks receive
  `CssPoint`.
- **Impact**: HiDPI scaling mistakes become compile errors; intent currently living in a JSDoc
  line migrates into signatures.

#### Finding 10 — Frame delta can be `0` or negative; consumers self-guard

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:44` (`#tick(this.#lastTime)` — first tick),
  `:59` (`const delta = (now - lastTime) / 1000`)
- **Current Code / Issue**: The synchronous first tick passes the identical timestamp, so the
  first callback receives `delta === 0`; background-tab throttling or clock adjustments can yield
  negative deltas. Any consumer integrating velocity (`x += v * delta`) must invent its own
  `if (delta === 0) return` guard — none exists centrally.
- **Proposed Branded Type**: `type NonNegativeSeconds = Seconds & { ... }` produced by the loop
  (clamping negatives to `0` at the single production point), optionally `DeltaTimeSeconds` with a
  documented epsilon floor for integrators.
- **Impact**: Downstream physics/integration code can trust the delta's domain and drop local
  guards; the fix lives where the value is born instead of scattered across subscribers.

---

#### Cross-Cutting Observation

Every runtime numeric guard found in `core/` follows the same shape: **validate-late,
use-early** — bad numbers enter through permissive constructors/factories
(`Camera`, `Clock`, `CameraControls`, `PanGesture`/`ZoomGesture` options) and are defended
against _at each consumption site_ (Clock's triple duration check, clamp reliance). Inverting to
**validate-once-at-the-boundary** via branded factories (`zoomFactor()`, `seconds()`,
`durationSeconds()`, `wheelSpeed()`) collapses those guards while making illegal states
unrepresentable. Recommended sequencing for Pass 2: Findings 1→2→3→4 first (correctness class),
then 5 (API-wide signature change), then the rest.

---

### Section 2: Pass 2 — Dishonesty & Side-Effects Isolation

Audit of hidden global reads, argument mutations, and un-injected environment data in
`packages/glaze/src/core/`. **No code was changed.**

#### Summary Table

| #   | File                | Dishonesty                                           | Fix Strategy                   | Priority  |
| --- | ------------------- | ---------------------------------------------------- | ------------------------------ | --------- |
| 1   | `FrameLoop.ts`      | Hidden `performance.now()` + hardcoded RAF scheduler | Inject `now()` / `schedule()`  | 🔴 High   |
| 2   | `InputStore.ts`     | Subscribers receive live mutable references          | Pass frozen snapshots          | 🔴 High   |
| 3   | `CameraControls.ts` | Captured camera mutated in place by every method     | Pure transforms → new `Camera` | 🔴 High   |
| 4   | `InputStore.ts`     | `getBoundingClientRect()` re-read per event          | Inject/cache bounds            | 🟠 Medium |
| 5   | `InputStore.ts`     | Implicit `window` + DOM coupling throughout          | Explicit adapter interface     | 🟠 Medium |
| 6   | `gestures.ts`       | `setPointerCapture` side effect inside state handler | Push to router/edge            | 🟡 Low    |
| 7   | `InputStore.ts`     | `readonly` fields are shallow-false-immutability     | Freeze or brand as live views  | 🟡 Low    |

**Positive findings** (honest code worth preserving as-is during refactor): `Clock.update(rawDelta)`
receives its delta explicitly — no hidden time read; `Camera.screenToWorld/worldToScreen` return
fresh objects; `clamp` is pure; `FrameLoop.#tick(now)` receives its timestamp as a parameter from
RAF (only `#start()` cheats, see Finding 1). No `Math.random()` or `Date.now()` anywhere in `core/`.

---

#### Finding 1 — FrameLoop reads the global clock and hardcodes the scheduler

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:43` (`performance.now()`), `:64`
  (`requestAnimationFrame(this.#tick)`), `:51` (`cancelAnimationFrame`)
- **Current Code / Issue**: `#start()` silently reads the ambient clock:
    ```ts
    this.#lastTime = performance.now();
    ```
    and both globals (`performance`, `requestAnimationFrame`) are unreachable for substitution.
    Proof of cost: `FrameLoop.test.ts:11` is forced to `vi.stubGlobal('requestAnimationFrame', ...)`
    — the test suite already pays the indirection tax that dependency injection would remove.
    Ironically `#tick` itself is honest (receives `now` as a parameter); only startup cheats.
- **Fix Strategy**: Constructor-inject two capabilities with defaults:
    ```ts
    constructor(opts?: {
        now?: () => Milliseconds;                                  // default performance.now
        schedule?: (cb: (t: Milliseconds) => void) => () => void;   // default RAF wrapper
    })
    ```
    The injected `now` also becomes the natural place to apply the ms→s conversion from Pass 1
    Finding 4.
- **Impact**: Deterministic frame-loop tests without global stubbing; virtual-time simulation
  (advance 1000 frames instantly) for integration tests; SSR/node-safe (no implicit browser
  assumptions).

#### Finding 2 — InputStore hands subscribers a live mutable reference it keeps mutating

- **File & Line**: `packages/glaze/src/core/InputStore.ts:113` (`this.pointer` passed to handlers),
  `:154` (`this.wheelPosition`), mutation source at `:102-106`
- **Current Code / Issue**:
    ```ts
    handlers[handlerName]?.(event, this.pointer);
    ```
    `pointer`, `pointerDelta`, and `wheelPosition` are the _same objects_ mutated in place by
    `#updatePointer`. A subscriber that stores `point` (e.g., PanGesture remembering an anchor)
    holds an object that mutates under it on the next event — aliasing bugs that manifest as
    "the drag origin moved". The type system says `Point2D`, the runtime delivers a moving target.
- **Fix Strategy**: Emit frozen snapshots at the notification boundary:
    ```ts
    handlers[handlerName]?.(event, { ...this.pointer }); // or Object.freeze({...})
    ```
    Internal delta math can keep mutating private state; only the published view is copied.
- **Impact**: Gesture code can capture points safely; eliminates a whole class of
  order-dependent bugs; makes subscriber callbacks honest pure-ish functions of their inputs.

#### Finding 3 — CameraControls mutates a captured external object in every method

- **File & Line**: `packages/glaze/src/core/CameraControls.ts:17` (doc admits it: “Mutates
  `camera` in place”), all methods `:27-69`; mutation via `Object.assign(camera, partial)` at `:68`
- **Current Code / Issue**:
    ```ts
    export function createCameraControls(camera: Camera, ...): CameraControls
    ```
    Every method silently writes through the closure-captured `camera`: `panTo`, `panBy`, `zoomAt`,
    `zoomTo`, `zoomBy`, `reset`, `update`. Callers see `controls.panTo(p)` return `void` while
    their `Camera` instance changes underneath them — invisible in diffs, untestable without
    inspecting shared state afterward, and incompatible with React-style state flow (where
    transforms should produce values). This compounds Pass 1 Finding 2: the one method that takes
    data (`update`) uses `Object.assign`, i.e. mutation _and_ invariant bypass.
- **Fix Strategy**: Refactor to pure command functions:
    ```ts
    const panBy = (c: Camera, dx: number, dy: number): Camera => ({ ...c, x: c.x + dx, y: c.y + dy });
    const zoomAt = (c: Camera, focal: ScreenPoint, zoom: ZoomFactor): Camera => ({ ...c, ... });
    ```
    Keep a thin mutable facade at the edge (React adapter) if desired, but the `core/` layer exports
    `(Camera, input) => Camera` transforms. Bounds clamping applies before construction of the new
    object.
- **Impact**: Camera updates become diffable, time-travel-debuggable, and unit-testable with zero
  setup (`expect(panBy(cam, 5, 0)).toEqual({...})`); unlocks React Compiler-friendly state flow;
  the facade shrinks to a single write point instead of seven.

#### Finding 4 — Canvas bounds re-read via forced layout on every pointer/wheel event

- **File & Line**: `packages/glaze/src/core/InputStore.ts:100` (`#updatePointer`),
  `:147` (`#onWheel`) — both call `target.getBoundingClientRect()`
- **Current Code / Issue**: The canvas bounds — an environmental input — are fetched implicitly
  inside event handlers on every event. Beyond being an un-injected hidden read, each call is a
  potential forced synchronous layout (reflow) in the hot input path, and the store cannot be
  unit-tested with synthetic geometry without a real DOM rect.
- **Fix Strategy**: Inject the bounds provider and/or cache with invalidation:
    ```ts
    attach(target: HTMLElement, bounds: () => Rect = () => target.getBoundingClientRect())
    ```
    with a `ResizeObserver`-driven cache so per-event reads become per-resize reads. Signature of
    `#updatePointer(event, rect)` becomes explicit.
- **Impact**: Removes repeated forced reflows from the input path; headless-testable coordinate
  math (feed any `Rect`); bounds become a named concept instead of an incidental DOM query.

#### Finding 5 — InputStore binds ambient `window` and element events imperatively

- **File & Line**: `packages/glaze/src/core/InputStore.ts:74-81` (`addEventListener` × 8,
  including `window.addEventListener('keydown'/'keyup')` at `:80-81`), teardown mirrored at
  `:178-185`
- **Current Code / Issue**: `attach(target)` reaches out to the global `window` object directly —
  an undeclared dependency buried mid-method. Keyboard state therefore depends on which window
  happened to be ambient at attach time (fragile under iframes/popups/testing), and nothing in
  the type signature reveals that attaching a canvas also taps the global keyboard stream.
- **Fix Strategy**: Make the environment explicit:
    ```ts
    interface EventSource {
        on(target: HTMLElement, type: string, cb: EventListener, opts?): () => void;
        onWindow(type: string, cb: EventListener): () => void;
    }
    constructor(source: EventSource = domEventSource)
    ```
    The store keeps its behavior but all subscription flows through the injected source.
- **Impact**: Headless tests construct an `InputStore` over a fake event source (no jsdom);
  multi-window/iframe scenarios become configurable; the global footprint of the module is
  visible in its constructor.

#### Finding 6 — PanGesture.onStart hides a DOM side effect behind a state toggle

- **File & Line**: `packages/glaze/src/core/gestures.ts:47-49` (`setPointerCapture`)
- **Current Code / Issue**:
    ```ts
    onStart = (event) => {
        if (!matchesButton(...)) return;
        this.active = true;
        (event.nativeEvent.currentTarget as HTMLElement | null)?.setPointerCapture(...);
    };
    ```
    What reads like "mark gesture active" also performs pointer capture — a DOM side effect with
    real behavioral consequences (steals subsequent events from other targets). The cast through
    `as HTMLElement | null` signals that the gesture layer knows too much about DOM specifics.
- **Fix Strategy**: Move capture responsibility up to `InputRouter` (or a dedicated edge
  helper) keyed off whether any gesture activated: `router` decides policy, gestures report
  intent (`handled: boolean` or an `activate()` request).
- **Impact**: Gestures become pure decision logic (trivially testable with plain objects);
  capture policy centralized and consistent across custom gestures replacing built-ins.

#### Finding 7 — `readonly` fields expose shallow-immutability theater

- **File & Line**: `packages/glaze/src/core/InputStore.ts:29-32` (`readonly pointer`,
  `readonly pointerDelta`, `readonly wheelPosition`), `:39` (`readonly #lastPointer`)
- **Current Code / Issue**: `readonly pointer: Point2D` prevents reassigning the field but not
  `store.pointer.x = 42` by any consumer holding the store — combined with Finding 2, external
  code can corrupt internal state invisibly. The modifier suggests immutability the type does not
  deliver.
- **Fix Strategy**: Either publish `Readonly<Point2D>` views (with snapshot semantics from
  Finding 2), or keep fields fully private and expose accessor methods returning fresh objects.
  If a "live view" is kept for perf, name it honestly (`livePointerView`) and freeze the object.
- **Impact**: External mutation of core input state becomes impossible at compile time; the
  mutation boundary is exactly one file.

---

#### Cross-Cutting Observation

The `core/` folder splits cleanly into two honesty tiers. **Pure computation**
(`Camera`, `clamp`, `Clock.update` given a delta) needs only the branded-type work from Pass 1.
**Environment adapters** (`FrameLoop`, `InputStore`) currently hide their dependencies —
clock, scheduler, window, layout — behind imperative methods. The fix pattern is uniform:
constructor-inject capability interfaces with DOM-backed defaults, so production code changes
zero call sites while tests swap fakes. Combined with Finding 3's shift to
`(state, input) => state` transforms, `core/` converges on a shape where everything below the
adapter seam is deterministic and everything above it is trivially mockable. Recommended
sequencing for Pass 3: Findings 1+5 together (one injection story for FrameLoop/InputStore),
then 2+7 (snapshot publication), then 3 (pure camera commands — largest API surface change).

---

### Section 3: Pass 3 — Lifecycle Guarantees & Abstraction Levels (SLAP)

Audit of temporal contracts, lifecycle ordering hazards, and mixed abstraction levels in
`packages/glaze/src/core/`. **No code was changed.**

#### Summary Table

| #   | File            | Issue                                                                 | Proposal                                    | Priority  |
| --- | --------------- | --------------------------------------------------------------------- | ------------------------------------------- | --------- |
| 1   | `Clock.ts`      | `update()` monolith: 4 time-wrapping strategies inlined in one method | Extract pure `advancePingPong/Looping/Once` | 🔴 High   |
| 2   | `InputStore.ts` | `endFrame()` “call once per frame” contract is unenforceable          | `FrameToken` proof parameter                | 🔴 High   |
| 3   | `gestures.ts`   | `dispose()` mid-drag leaves gesture state dirty                       | Router-owned gesture reset on dispose       | 🟠 Medium |
| 4   | `InputStore.ts` | Attached/Detached state defended by 3 runtime null checks             | Typestate / `AttachedHandle` token          | 🟠 Medium |
| 5   | `Clock.ts`      | Invalid option combos silently accepted (`pingPong` w/o duration)     | Discriminated union config                  | 🟠 Medium |
| 6   | `InputStore.ts` | `attach`/`#unbind`: 8 mirrored add/removeEventListener calls          | Table-driven binding helper                 | 🟡 Low    |
| 7   | `gestures.ts`   | InputRouter: event→gesture fan-out loop duplicated ×5                 | Extract single `dispatch()` helper          | 🟡 Low    |
| 8   | `FrameLoop.ts`  | Schedule-before-dispatch ordering invariant undocumented              | Named `#scheduleThenDispatch` step          | 🟡 Low    |

**Positive findings**: `matchesButton` (gestures.ts:96-100) is correctly extracted to its own
level; `#updatePointer` vs `#notifyPointer` (InputStore.ts:95-115) shows the right seam already
exists and just needs the same treatment applied elsewhere; `FrameLoop.#tick` is flat
(one statement per level); `Camera`, `clamp`, and all `CameraControls` methods are already
single-level.

---

#### Finding 1 — `Clock.update()` is a four-strategy monolith spanning ~58 lines

- **File & Line**: `packages/glaze/src/core/Clock.ts:102-160`
- **Current Code / Issue**: One method mixes four distinct abstraction levels:
    1. Playback gating + bookkeeping (`:103-111`)
    2. Free-running clamp when duration absent (`:113-117`)
    3. Ping-pong reflection math with overflow/underflow juggling and inline direction flips
       (`:121-140`) — the deepest, most bug-prone arithmetic:
        ```ts
        if (t >= duration) {
            const overflow = t - duration;
            t = duration - overflow;
            this.#direction = -1;
            if (t < 0) t = 0;
        } else if (t <= 0) { ... }
        ```
    4. Modulo wrap for looping (`((t % duration) + duration) % duration`, `:144`) and one-shot
       stop-at-end (`:146-157`).
       Reading requires mentally switching between time-domain strategies mid-function; each branch
       interleaves low-level arithmetic with `this.#time`/`#direction`/`#isPlaying` mutation.
- **Proposed Refactoring**: Extract three pure helpers next to the class:
    ```ts
    advanceFree(time: Seconds, delta: Seconds): Seconds;
    advancePingPong(time: Seconds, delta: Seconds, duration: DurationSeconds, dir: 1 | -1): { time; dir };
    advanceLooping(time: Seconds, delta: Seconds, duration: DurationSeconds): Seconds;
    advanceOnce(time: Seconds, delta: Seconds, duration: DurationSeconds): { time; finished: boolean };
    ```
    `update()` shrinks to dispatch on a mode tag + applying results.
- **Impact**: Each strategy becomes independently unit-testable at the boundaries (huge deltas,
  exact-duration hits); ping-pong edge cases get their own test surface instead of sharing one;
  `update()` reads as orchestration only — textbook SLAP.

#### Finding 2 — `endFrame()`'s once-per-frame contract is enforced by prose alone

- **File & Line**: `packages/glaze/src/core/InputStore.ts:65-69`
    ```ts
    /** Clears per-frame state; call once per frame. */
    endFrame(): void { this.#pressed.clear(); this.wheelDelta = 0; }
    ```
- **Current Code / Issue**: The doc comment carries a _temporal contract_ the compiler knows
  nothing about. Forget the call → `wasKeyPressed` reports a perpetual press (edge detection
  dead), `wheelDelta` grows unboundedly. Call it twice → double-consumed input. Nothing connects
  `InputStore.endFrame()` to an actual frame — it's a convention between two modules that never
  reference each other. This is the clearest `ActiveFrameToken` candidate in `core/`.
- **Proposed Refactoring**: Issue a proof per tick from the frame loop:
    ```ts
    // FrameLoop hands subscribers an opaque token valid for one frame:
    type FrameToken = { readonly __frame: unique symbol };
    // consumers must surrender it:
    input.endFrame(token: FrameToken): void;
    ```
    Minimal variant if coupling is unwanted: rename to `consumeFrameState()` and have it return
    `{ pressedKeys, wheelDelta }` while clearing — making "consumption" explicit and idempotence
    observable.
- **Impact**: Missing/duplicate `endFrame` becomes impossible or immediately visible; the
  FrameLoop↔InputStore handshake becomes a typed protocol instead of a comment.

#### Finding 3 — Disposing mid-gesture leaves gesture state dirty

- **File & Line**: `packages/glaze/src/core/gestures.ts:122-124` (`InputRouter.dispose`),
  interacting with `PanGesture.active` (`:36`, set at `:46`, cleared at `:59`)
- **Current Code / Issue**: If the router is disposed between `onStart` and `onEnd` (component
  unmount during a drag), no further events reach the gestures, so `PanGesture.active` stays
  `true`. The same `PanGesture` instance reused under a new router then pans on mere pointer
  movement (`onMove` only checks `this.active`, `:53`) — a phantom drag with no button held.
  Lifecycle ordering hazard: teardown assumes it never happens mid-interaction, but nothing
  demands that proof.
- **Proposed Refactoring**: `InputRouter.dispose()` iterates its gestures and calls a new optional
  lifecycle hook `gesture.onCancel?.()`, which built-in gestures implement as `active = false`.
  Alternatively fold into Pass 2 Finding 6's rework where activation state lives in the router,
  which naturally dies with it.
- **Impact**: Unmount-during-drag can't leak interaction state across router generations;
  gesture lifecycle becomes begin/end-paired by construction.

#### Finding 4 — Attached/Detached state guarded by runtime null checks in three places

- **File & Line**: `packages/glaze/src/core/InputStore.ts:96-98` (`#updatePointer`),
  `:143-145` (`#onWheel`), `:174-176` (`#unbind`) — all `const target = this.#attached; if (!target) return;`
- **Current Code / Issue**: The store is a two-state machine (Detached ⇄ Attached) encoded as a
  nullable field checked defensively at every use. In practice events can't fire while detached
  (listeners are removed), so these guards defend a nearly-impossible path — yet the _real_
  hazard goes unguarded: calling `update()`/reading `pointer` before any `attach()` yields
  silently meaningless zeros. State-dependent behavior is invisible in the types.
- **Proposed Refactoring**: Typestate-lite via handle token:
    ```ts
    attach(target): AttachedHandle;   // opaque brand
    detach(handle: AttachedHandle): void;
    ```
    Or a discriminated union internally: `type StoreState = Detached | AttachedTo<HTMLElement>`,
    with pointer-math helpers requiring `AttachedTo`. Public read APIs either throw on detached or
    are typed to require the handle.
- **Impact**: Illegal sequences (detach twice, use-before-attach) become compile errors or
  explicit throws; the three null-checks disappear along with the ambiguity of what a detached
  store's coordinates even mean.

#### Finding 5 — `ClockOptions` accepts silently-meaningless combinations

- **File & Line**: `packages/glaze/src/core/Clock.ts:19-25` (constructor derivation),
  `:21` (`loop = options.loop ?? options.duration !== undefined`), `:121` (pingPong only reached
  when duration exists)
- **Current Code / Issue**:
    ```ts
    new Clock({ pingPong: true }); // silently free-runs, pingPong ignored forever
    new Clock({ loop: true }); // loop flag stored but irrelevant without duration
    ```
    Cross-parameter coupling is hidden: `pingPong: true` without `duration` constructs fine and the
    flag is simply never consulted (`update()` reaches the ping-pong branch only inside the
    duration-defined path). Similarly `loop` defaults _derived from another option's presence_ —
    an inference rule nobody can see at the call site.
- **Proposed Refactoring**: Split the config into a discriminated union aligned with runtime
  behavior (synergy with Pass 1 Finding 3):
    ```ts
    type ClockOptions =
        | { mode?: 'free' }
        | { mode: 'timed'; duration: DurationSeconds; loop?: boolean; pingPong?: boolean };
    ```
    `pingPong`/`loop` only exist where they take effect; the implicit default `loop = true` becomes
    an explicit choice.
- **Impact**: Impossible configurations rejected at construction; the constructor's hidden
  inference rule surfaces as documentation-by-types; `update()` dispatch keys off the same union
  (completes Finding 1's refactor).

#### Finding 6 — `attach`/`#unbind` are mirror-image plumbing walls

- **File & Line**: `packages/glaze/src/core/InputStore.ts:71-82` (8× `addEventListener`) and
  `:173-187` (8× `removeEventListener`)
- **Current Code / Issue**: Sixteen near-identical DOM calls listing event names, handler refs,
  and one stray options object (`{ passive: false }`, `:78`). Adding one event means editing both
  lists in lockstep — a classic drift risk (miss one side and you leak listeners or drop events).
  Two levels interleave: _which events we care about_ (policy) and _how to bind/unbind DOM
  events_ (mechanism).
- **Proposed Refactoring**: Declare bindings as data, bind/unbind generically:
    ```ts
    const BINDINGS = [
        ['pointermove', '#onPointerMove'],
        ['wheel', '#onWheel', { passive: false }],
        ...
    ] as const;
    #bound: Array<() => void> = BINDINGS.map(([t, h, o]) => source.on(target, t, this[h], o));
    ```
    `#unbind` collapses to running the stored disposers (pairs naturally with Pass 2 Finding 5's
    `EventSource`).
- **Impact**: Single declaration site per event; adding/removing an event is a one-line change;
  listener-leak class eliminated by construction.

#### Finding 7 — InputRouter repeats the fan-out loop five times

- **File & Line**: `packages/glaze/src/core/gestures.ts:145-149`, `:151-155`, `:157-161`,
  `:163-167`, `:169-173`
- **Current Code / Issue**: Five handlers with identical shape:
    ```ts
    #onStart = (nativeEvent, point) => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) gesture.onStart?.(event);
    };
    ```
    Only the hook name varies. The iteration-and-optional-call pattern (the router's entire job)
    is copy-pasted rather than named.
- **Proposed Refactoring**:
    ```ts
    #dispatch = <K extends keyof Gesture<TSurface>, E>(
        hook: K, nativeEvent: E, point?: Point2D
    ): void => {
        const event = this.#interaction(nativeEvent, point ?? this.#options.input.pointer);
        for (const g of this.#options.gestures) g[hook]?.(event);
    };
    ```
    Handlers reduce to one-liners (`#onStart = (e, p) => this.#dispatch('onStart', e, p)`).
- **Impact**: Gesture-dispatch semantics (ordering, error handling, future consume-protocol)
  live in exactly one place; new hooks cost one line.

#### Finding 8 — FrameLoop's schedule-before-dispatch invariant is invisible

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:64-68`
    ```ts
    this.#rafId = requestAnimationFrame(this.#tick); // scheduled FIRST...
    for (const cb of this.#callbacks) cb(time, delta); // ...then callbacks run
    ```
- **Current Code / Issue**: Scheduling the next frame _before_ dispatching callbacks is a
  deliberate survival guarantee — a throwing callback cannot kill the loop because the chain is
  already re-linked. But nothing marks this as load-bearing: a future refactor "cleaning up" the
  ordering (schedule after the loop, as most people would write it) silently introduces
  death-by-exception. Secondary subtlety: callbacks run over a live `Set`, so a callback that
  subscribes mid-frame gets invoked in the same pass, and one that unsubscribes another callback
  skips it — both undocumented behaviors.
- **Proposed Refactoring**: Make the invariant structural and named:
    ```ts
    #tick = (now: Milliseconds): void => {
        const batch = [...this.#callbacks];          // stable snapshot
        this.#schedule(this.#tick, now + ...);        // keep-alive first, commented as such
        for (const cb of batch) cb(...);
    };
    ```
    plus a one-line comment stating the ordering contract, and the injected `schedule` from Pass 2
    Finding 1 making the mechanism swappable/testable.
- **Impact**: Loop resilience survives refactors (the invariant is written down and shaped by
  code, not by accident); deterministic callback-set semantics per frame.

---

### Recommended Order of Refactoring for core/

Bottom-up: leaves first (no internal dependencies), adapters last (everything composes into
them). Cross-references point back to findings above.

1. **`core/types.ts` — Branded numeric vocabulary (new file)** _(Pass 1 F1, F3, F4)_
   `ZoomFactor`, `DurationSeconds`, `TimeSpeed`, `Seconds`, `Milliseconds`, `WheelSpeed` +
   validated factories. Everything downstream imports these; zero behavioral risk.

2. **`Camera.ts` — Pure math leaves** _(Pass 1 F5, F6)_
   Fix `clamp` (NaN/bounds), introduce `ScreenPoint`/`WorldPoint`/delta brands, add
   `createCamera` factory with `ZoomFactor` field (private constructor). Still dependency-free.

3. **`Clock.ts` — Config union + extracted advance strategies** _(Pass 3 F5, F1; Pass 1 F3)_
   Discriminated `ClockOptions`, pure `advanceFree/PingPong/Looping/Once` helpers, duration
   guards collapse. Depends only on layer 1 brands.

4. **`CameraControls.ts` — Pure command transforms** _(Pass 2 F3; Pass 1 F2)_
   `(Camera, input) => Camera` functions, validated `ZoomBounds`, patch interface replacing
   `Object.assign`. Depends on layers 1–2; thin mutable facade stays available at the edge.

5. **`gestures.ts` — Decision-only gestures + dispatch extraction** _(Pass 3 F7, F3; Pass 2 F6;
   Pass 1 F7)_
   `WheelSpeed` brand, `dispatch()` fan-out helper, capture policy moved to router, cancel-safe
   dispose. Depends on layers 1–2 (brands, points).

6. **`FrameLoop.ts` — Injected clock/scheduler** _(Pass 2 F1; Pass 1 F10; Pass 3 F8)_
   `now()`/`schedule()` injection, `NonNegativeSeconds` emission, named schedule-before-dispatch
   invariant, issues `FrameToken` per tick (feeds layer 7). First adapter; depends on layer 1.

7. **`InputStore.ts` — Environment made explicit** _(Pass 2 F4, F5, F2, F7; Pass 3 F4, F2, F6)_
   `EventSource` injection, cached bounds provider, snapshot publication, honest readonly views,
   `AttachedHandle` state, table-driven bindings, token-consuming `endFrame()`. Largest adapter;
   consumes `FrameToken` from layer 6.

8. **`InputRouter` (in `gestures.ts`) — Final composition** _(Pass 3 F3 closure)_
   Wire router dispose → gesture reset, own capture policy, sit atop the finished InputStore API.
   Highest position in the dependency graph; changed last so its surface stops moving.

Rationale: steps 1–3 are pure and unit-testable in isolation (no mocks); steps 4–5 introduce the
new value-oriented APIs; steps 6–7 swap environment seams with production defaults preserving
behavior; step 8 is pure wiring. Each layer compiles green before the next begins, and the
branded-type work lands first precisely because everything else wants the vocabulary.