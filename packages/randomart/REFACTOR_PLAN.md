# Improvement Opportunities & Refactor Plan

Lessons from the draft that would benefit the package (./GRAMMAR_COMPARISON.md), ordered as a step-by-step implementation plan.

---

## Phase 1: Quick wins (COMPLETED)

### Step 1 — Add `sqrt` and `abs` rules (COMPLETED)

- `sqrt` at `src/core/grammar/rules/sqrt.ts`, `abs` at `src/core/grammar/rules/abs.ts`
- Both registered in `src/core/grammar/registry.ts`

### Step 2 — Add per-pixel `random` terminal (COMPLETED)

- `pixelRandomRule` at `src/core/grammar/rules/pixel-random.ts`
- Uses GLSL-style hash `fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453)` in JS and GLSL

---

## Phase 2: Grammar improvements (COMPLETED)

### Step 3 — Weighted grammar branches (COMPLETED)

- `weight` field added to `GrammarRule` type at `src/core/grammar/types.ts:8`
- `weightedPick()` at `src/core/engine.ts:6-14` computes total weight and picks via `rng.next() * totalWeight`
- `buildTree()` at `src/core/engine.ts:40-60` uses it for all selection
- No hardcoded terminal-bias constants remain

---

## Phase 3: Animation (COMPLETED)

### Step 4 — `t` (time) terminal + animation loop (COMPLETED)

Add a `t` rule (arity 0) that reads a time value. Requires:

- A time source in the store (e.g. `performance.now()` / `requestAnimationFrame`) - **Done**
- `evaluateNode` passes a time parameter (or a context object) alongside `(x, y)` - **Done**
- The renderer re-renders on each animation frame while active - **Done**
- The Canvas component uses `requestAnimationFrame` loop - **Done**

The store needs a `running` boolean and a `time` ref. The `RenderTask` type needs a `time` field. - **Done**

---

## Phase 4: GPU rendering (COMPLETED)

### Step 5 — GLSL compilation + WebGL renderer (COMPLETED)

**5a — Add `toGLSL(args: string[]): string` to `GrammarRule`** - **Done**

- Added to `GrammarRule` type at `src/core/grammar/types.ts:14`
- Implemented on all 18 rules across `src/core/grammar/rules/*.ts`
- Bug fix: `if.ts` `toGLSL` uses valid ternary `(... > 0.0 ? ... : ...)` instead of `if` keyword

**5b — `compileToGLSL(tree: ExpressionNode): string`** - **Done** at `src/core/compileToGLSL.ts`

- Recurses tree calling `toGLSL` via `compileNode()`
- Includes `random2d` GLSL hash function in preamble (required by `pixel-random` rule)
- Detects `vec3` root and outputs `vec3 color = <expr>` for correlated mode; falls back to `float r/g/b` for 3-tree mode
- Wraps in complete fragment shader with `u_time`, `u_resolution`, `v_texCoord`

**5c — WebGL renderer** - **Done** at `src/hooks/useWebGLRenderer.ts`

- Raw WebGL1 fullscreen quad (no dependencies added to monorepo)
- RAF animation loop passing `u_time` and `u_resolution`
- Recompiles shader on tree change
- Proper cleanup on unmount/mode switch
- Uses `preserveDrawingBuffer: true` for static frames

### Step 6 — Correlated RGB / single-tree vec3 (COMPLETED)

- **`vec3` GrammarRule** at `src/core/grammar/rules/vec3.ts` (arity 3, `toGLSL` returns `vec3(r, g, b)`)
- **`correlatedRGB` store toggle** at `src/stores/randomart/store.ts:22`
- When enabled: builds one tree with `vec3` root (single shared RNG) instead of 3 independent trees
- CPU path: extracts `tree.args[0/1/2]` for R/G/B evaluation at `src/components/RandomArtCanvas.tsx:27`
- GLSL path: `compileToGLSL` detects `vec3` root and outputs `vec3 color = <expr>` directly
- Coexists with 3-tree mode via UI toggle button (Linked/Split) in Controls

---

## Summary

| Step                  | Effort   | Impact    | Status      |
| --------------------- | -------- | --------- | ----------- |
| 1 — sqrt, abs rules   | 30 min   | Medium    | ✅ Complete |
| 2 — per-pixel random  | 1 hr     | Medium    | ✅ Complete |
| 3 — weighted branches | 2 hr     | High      | ✅ Complete |
| 4 — t + animation     | 3 hr     | High      | ✅ Complete |
| 5 — GLSL + WebGL      | 2-3 days | Very high | ✅ Complete |
| 6 — correlated RGB    | 1 day    | Medium    | ✅ Complete |
| 7 — state architecture | 2-3 days | Very high | 🟡 Pending |

All phases implemented (except Phase 7). The package now supports:

- **GPU rendering** via WebGL1 fullscreen quad (raw WebGL, no dependencies)
- **CPU rendering** via Canvas 2D + Worker pool (preserved for export)
- **Render mode toggle** — GPU (WebGL) / CPU (Canvas 2D)
- **Correlated RGB mode** — single `vec3` tree via shared RNG seed
- **Animation** via `t` terminal + RAF loop

---

## Phase 7: State architecture & composability (PENDING)

### The problem

The feature set grew organically (animation → GPU → correlated → inspector). Each feature added state, selectors, and effects independently. The code works, but assembling the pieces into a working view requires orchestrating too many hooks and store slices at the consumer level (`RandomArtCanvas.tsx`). The codebase feels like you're **fighting the architecture** rather than being carried by it.

### Root causes

**R1 — One flat store for three categories of state**

The store (`src/stores/randomart/types.ts`) mixes:

| Category | Examples | Update frequency |
|---|---|---|
| **Config** | seedText, maxDepth, enabledRuleIds, renderMode, correlatedRGB | Rare (user-initiated) |
| **Derived artifacts** | treeR, treeG, treeB, rngR, rngG, rngB | Medium (on config change) |
| **Runtime** | running, time, timeRef | High (60fps during animation) |

These have different lifetimes and consumers. The flat structure means **every store subscriber is notified on every animation frame**, even controls that only care about config. Zustand's reference-equality bail-out masks this, but the mental model is muddy: "does this component re-render when time ticks?"

**R2 — Dual time representation (`time` + `timeRef`)**

`time: number` and `timeRef: { current: number }` (`types.ts:17`) represent the same logical value but are updated on different schedules:
- WebGL renderer mutates `timeRef.current` every frame
- Every 6th frame, it syncs back to `store.setState({ time: timeRef.current })`

This means:
- `useTime()` consumers get stale data (up to ~100ms lag at 60fps)
- The mutable ref inside the store breaks Zustand's immutability contract
- Two values must be kept in sync — a fragile requirement

**R3 — Render hooks both consume state AND own UI concerns**

`useWebGLRenderer` takes tree/running/timeRef as parameters but also writes back to the store (`setState({ time })`). `useCanvasRenderer` takes trees as parameters but calls `useTime()` internally. The direction of data flow is inconsistent:
- Some data flows **in** (props)
- Some data flows **out** (store mutation during render)

**R4 — Correlated RGB unwrapping leaks implementation detail**

The view layer (`RandomArtCanvas.tsx:26-28`) reaches into `treeR.args[0/1/2]` to extract channel trees. This couples the canvas component to the `vec3` wrapper-node strategy. If the correlated implementation changes, all consumers change.

**R5 — 14 one-liner selector files**

```
stores/randomart/selectors/
  useActiveChannel.ts    (6 lines)
  useCorrelatedRGB.ts    (9 lines — uses useSyncExternalStore)
  useEnabledRuleIds.ts   (6 lines)
  useMaxDepth.ts         (6 lines)
  useRenderMode.ts       (9 lines — uses useSyncExternalStore)
  useRngB.ts             (7 lines)
  useRngG.ts             (7 lines)
  useRngR.ts             (7 lines)
  useRunning.ts          (6 lines)
  useSeedText.ts         (6 lines)
  useTime.ts             (6 lines)
  useTreeB.ts            (7 lines)
  useTreeG.ts            (7 lines)
  useTreeR.ts            (7 lines)
```

12 are structurally identical (different selector lambda). 2 use `useSyncExternalStore` instead of `useStore` — same purpose, different API. Component files that need 2+ fields import 2+ files. This is file-per-function ceremony without benefit.

**R6 — Inspector components subscribe to all channels**

`AstTreeView`, `MathFormula`, `SeedInfo`, `ChoiceHistory` each call `useTreeR()`, `useTreeG()`, `useTreeB()` (or all three RNGs) but only display the active channel. When any channel tree regenerates, all inspector components re-render.

**R7 — Actions read state internally but receive parameters externally**

`regenerateTrees()` (`actions/trees.ts`) receives `seedText`, `maxDepth`, `correlated` as arguments but calls `getEnabledRules()` → `randomartStore.getState().enabledRuleIds` internally. Two data-passing styles in one function.

### Strategic vision

The goal is a codebase where the dependency direction is always:

```
Config → Tree Generation → Rendering
```

And renderers never write back to config state. Time is owned by the renderer.

**Separate by update frequency and ownership:**

```
┌─────────────────────────────────────┐
│          Config Slice               │  Zustand store
│  seedText, maxDepth, enabledRules,  │  (rare changes, user-triggered)
│  renderMode, correlatedRGB,         │
│  activeChannel                      │
├─────────────────────────────────────┤
│          Derived Slice              │  Computed from config
│  {treeR, treeG, treeB}             │  (medium frequency)
│  {rngR, rngG, rngB}                │
├─────────────────────────────────────┤
│          Runtime                    │  Imperative, no store
│  time (useRef in WebGL renderer)   │  (60fps, renderer only)
└─────────────────────────────────────┘
```

**The renderer owns time.** Animation is a WebGL-only concern. The CPU path renders a single frame with a time snapshot.

### Concrete plan

#### Step 7a — Remove `timeRef` from the store

- Delete `timeRef: { current: number }` from `RandomartState`
- Move the `{ current: 0 }` ref into `useWebGLRenderer` as a local `useRef`
- The WebGL renderer reads/writes its own ref directly (the ref never enters the store)
- Throttle time to UI: write `store.setState({ time })` at most every 100ms (or every N frames) so `TimeDisplay` stays responsive without hammering React

**What this fixes:** R2 (dual time), part of R1 (no more runtime state in store). The store no longer contains a mutable object. The 60fps update path never touches the store.

#### Step 7b — Pure tree factory + reactive subscriber (aligns with SPECS.md)

Make `generateTrees` a pure function that takes all config as input (no store imports):

```typescript
function generateTrees(config: {
  seedText: string;
  maxDepth: number;
  enabledRuleIds: string[];
  correlated: boolean;
}): { treeR, treeG, treeB, rngR, rngG, rngB }
```

Then wire it with a Zustand `subscribe` listener in the store setup, as the spec prescribes:

```typescript
// In store.ts, after createStore:
randomartStore.subscribe((state, prev) => {
  const changed = (
    state.seedText !== prev.seedText ||
    state.maxDepth !== prev.maxDepth ||
    state.enabledRuleIds !== prev.enabledRuleIds ||
    state.correlatedRGB !== prev.correlatedRGB
  );
  if (!changed) return;
  const trees = generateTrees({
    seedText: state.seedText,
    maxDepth: state.maxDepth,
    enabledRuleIds: state.enabledRuleIds,
    correlated: state.correlatedRGB,
  });
  // Merge in updated trees + reset time
  randomartStore.setState({ ...trees, time: 0 });
});
```

Individual actions no longer call `regenerateTrees` — they just set the config field. The subscriber auto-rebuilds the AST. This eliminates the possibility of an action forgetting to regenerate, and matches the spec's "automated calculation side-effect" requirement.

**What this fixes:** R1 (derived state auto-syncs from config), R7 (no more mixed data-passing styles).

#### Step 7c — Consolidated selector file

Replace `selectors/*.ts` (14 files) with a single `selectors.ts`:

```typescript
// — Whole-state access —
export function useRandomartState(): RandomartState

// — Config (never triggers renders for runtime changes) —
export function useConfig(): ConfigSlice              // seedText, maxDepth, etc.

// — Derived trees + rngs —
export function useDerived(): DerivedSlice            // trees + rngs

// — Inspector: active channel only (saves re-renders, fixes R6) —
export function useSelectedTree(): ExpressionNode
export function useSelectedRng(): SeededRandom

// — Canvas: unwrapped trees for CPU, wrapped for GLSL (fixes R4) —
export function useCPUTrees(): Trees                  // treeR.args[i] expanded
export function useGLSLTrees(): Trees                 // raw treeR/G/B (vec3 intact)
```

The `useSelectedTree` selector reads `s.activeChannel` and the relevant tree in one lambda, so Zustand only re-renders when the active tree reference actually changes (fixing R6).

The `useCPUTrees` / `useGLSLTrees` pair encapsulates the correlated unwrapping (Step 7e): CPU consumers get three separate trees (unwrapped from `vec3`), GLSL consumers keep the wrapped tree for optimal single-expression compilation.

**What this fixes:** R5 (14 files → 1), R6 (over-subscription).

#### Step 7d — Consolidate action files

Group actions by domain in fewer files:

- `actions/config.ts` — `setSeedText`, `setMaxDepth`, `toggleRule` (these regenerate trees)
- `actions/display.ts` — `setActiveChannel`, `setRenderMode`, `setCorrelatedRGB` (no tree regeneration except correlated which does)
- `actions/playback.ts` — `setRunning`, `toggleRunning`, `setTime` (minimal, time is now renderer-owned)

#### Step 7e — Encapsulate correlated unwrapping in selectors (aligns with SPECS.md)

The spec requires a `vec3` container (UC-2.2: *"single structural `vec3` container"*). The `vec3` wrapper is also beneficial for GLSL compilation — `compileToGLSL` outputs `vec3 color = <expr>` directly for the correlated path, saving three separate float→vec3 conversions.

Keep the `vec3` wrapper in generated trees. Instead, push the unwrapping into selectors so consumers never reach into `treeR.args[i]`:

```typescript
// selectors.ts — encapsulates the correlated unwrapping
export function useCanvasTrees() {
  return useStore(randomartStore, (s) => {
    const r = s.treeR;
    if (s.correlatedRGB) {
      return {
        treeR: r.args[0] as ExpressionNode,
        treeG: r.args[1] as ExpressionNode,
        treeB: r.args[2] as ExpressionNode,
      };
    }
    return { treeR: r, treeG: s.treeG, treeB: s.treeB };
  });
}
```

`RandomArtCanvas.tsx` calls `useCanvasTrees()`, destructures the result, and passes to renderers. No `.args` access in the view layer.

For the GLSL path, pass the full wrapped tree so `compileToGLSL` can still produce the single `vec3` expression. The selector provides unwrapped for CPU, wrapped for GLSL:

```typescript
export function useRendererTrees() {
  const treeR = useStore(randomartStore, s => s.treeR);
  const treeG = useStore(randomartStore, s => s.treeG);
  const treeB = useStore(randomartStore, s => s.treeB);
  return { treeR, treeG, treeB };
}
```

**What this fixes:** R4 (leaky abstraction) — the `vec3` wrapping strategy is hidden from consumers, matching the spec.

#### Step 7f — Renderer owns its time; CPU path is single-frame

- `useWebGLRenderer`: manages `timeRef` locally. Every N frames, pushes `{ time }` to store for UI. Stops the loop when `running=false`.
- `useCanvasRenderer`: no `useTime()`. Accepts `time: number` as a parameter. Renders one frame. Used both for the static canvas view and for PNG export.
- `RandomArtCanvas`: CPU mode passes the current store `time` snapshot. WebGL mode manages its own loop.

**What this fixes:** R1 (runtime state out of store), R3 (consistent data direction).

### Expected outcome

After Phase 7:

| Before | After |
|---|---|
| 14 selector files | 1 selector file |
| `time` + `timeRef` (dual state) | Single ref in WebGL renderer |
| Store notified 60fps | Store notified at most ~10fps for UI |
| All channel trees always subscribed | Only active channel subscribes |
| correlated unwrapping in component | Encapsulated in selectors |
| Actions call regenerateTrees manually | Reactive subscriber auto-rebuilds AST |
| Renderers write back to store | Renderers read only, never write |
