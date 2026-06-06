# `@repo/automata` — Specification

## 1. Overview

A high-performance, self-contained Cellular Automaton (CA) module living at
`packages/automata`. It ships WebGL rendering via React Three Fiber, isolated
per-island Zustand state, and a Web Worker compute pipeline. Consumers mount
three components and pass nothing mandatory — all options have smart defaults.

**v1 scope:** Conway's Game of Life only. Toroidal boundary. Fixed grid size
at init time. JSON pattern import/export. No RLE, no runtime resize.

---

## 2. Package Layout

```
packages/automata/
├── src/
│   ├── engine/                  # Layer 1 — Core Domain Engine (pure TS)
│   │   ├── grid.ts              # Grid allocation helpers
│   │   ├── rng.ts               # Seeded PRNG (mulberry32)
│   │   ├── step.ts              # Conway step function (double-buffer)
│   │   ├── worker.ts            # Web Worker entry (Vite module syntax)
│   │   ├── pattern.schema.ts    # Zod schema + inferred type for JSON I/O
│   │   └── types.ts             # Pure engine types (no React, no Zustand)
│   ├── stores/
│   │   └── automaton/           # Layer 2 — State Orchestration
│   │       ├── store.ts         # createCAStore() factory — never imported by components
│   │       ├── actions.ts       # All mutators; imports store.ts only
│   │       ├── selectors.ts     # All read hooks; imports store.ts only
│   │       └── types.ts         # Store-specific types (extends engine types)
│   ├── components/              # Layer 3 — Presentation
│   │   ├── AutomatonProvider.tsx
│   │   ├── AutomatonCanvas.tsx
│   │   ├── Controls.tsx
│   │   └── ErrorBoundary.tsx
│   └── index.ts                 # Public barrel — only named exports
├── package.json
└── README.md                    # Source of truth for docs
```

The three layers depend **downward only**: components → stores → engine.
Engine files import nothing from `stores/` or `components/`. Store files
import nothing from `components/`.

---

## 3. Public API

All exports are **named** (no default exports per ESLint `import/no-default-export`).

```ts
// index.ts
export { AutomatonProvider } from './components/AutomatonProvider';
export { AutomatonCanvas } from './components/AutomatonCanvas';
export { Controls } from './components/Controls';

// Types only — consumers may need them for extension
export type { CAProviderProps } from './components/AutomatonProvider';
export type { CACanvasProps } from './components/AutomatonCanvas';
export type { ControlsProps } from './components/Controls';
export type { Pattern } from './engine/pattern.schema';
```

### Astro usage

```astro
---
import { AutomatonProvider, AutomatonCanvas, Controls } from '@repo/automata'
---

<AutomatonProvider rows={150} cols={150} seed={42}>
  <AutomatonCanvas client:only="react" aliveColor="#22d3ee" deadColor="#0f172a" />
  <Controls />
</AutomatonProvider>
```

`client:only="react"` is mandatory on `AutomatonCanvas` to prevent SSR WebGL
crashes. `AutomatonProvider` may be server-rendered; it contains no WebGL.

---

## 4. Component Props

### `<AutomatonProvider>`

```ts
type CAProviderProps = {
  rows?: number; // default 100 — fixed at mount, never changed
  cols?: number; // default 100 — fixed at mount, never changed
  initialDensity?: number; // 0–1, default 0.2 (20 % alive)
  seed?: number; // PRNG seed for randomize(); default Date.now()
  children: React.ReactNode;
};
```

Creates an isolated Zustand store instance and exposes it via React Context.
Multiple `<AutomatonProvider>` islands on the same page are fully independent.

### `<AutomatonCanvas>`

```ts
type CACanvasProps = {
  aliveColor?: string; // CSS color string, default: Tailwind token --color-primary
  deadColor?: string; // CSS color string, default: Tailwind token --color-surface
  className?: string; // forwarded to the r3f canvas wrapper div
};
```

Colors are applied via the dynamic CSS variable trick:
`style={{ '--ca-alive': aliveColor }}` + `bg-[color:var(--ca-alive)]`.
Never pass colors as inline styles directly.

### `<Controls>`

```ts
type ControlsProps = {
  className?: string; // forwarded to the controls root div
};
```

All interaction logic is self-contained. No other props are needed.

---

## 5. Core Domain Engine (`src/engine/`)

This layer is pure TypeScript. No React, no Zustand, no side effects.
It can be imported in Node.js tests without a DOM.

### 5.1 Types (`engine/types.ts`)

```ts
// CellValue: 0 = dead, 1 = alive. Uint8 keeps V8 math in SMI fast path.
type CellValue = 0 | 1;

// Flat Uint8Array, row-major. Index formula: row * cols + col
type Grid = Uint8Array;

// Signature for all current and future rule functions.
// Flat primitives only — no object params to avoid GC pressure.
type RuleFn = (
  index: number,
  grid: Uint8Array,
  cols: number,
  rows: number
) => CellValue;
```

### 5.2 Grid helpers (`engine/grid.ts`)

```ts
// Allocates a zeroed Uint8Array of rows * cols.
const createGrid = (rows: number, cols: number): Grid

// Fills grid in-place using seeded PRNG. density ∈ [0, 1].
// Does NOT allocate — writes into the provided buffer.
const fillRandom = (grid: Grid, density: number, seed: number): void

// Returns a zeroed copy of the same size (used for double-buffer allocation).
const cloneEmpty = (grid: Grid): Grid
```

### 5.3 Seeded PRNG (`engine/rng.ts`)

Implementation: **mulberry32** (32-bit, zero dependencies).

```ts
// Returns a () => number function producing values in [0, 1).
const createRng = (seed: number): () => number
```

`Math.random()` is never used inside the engine. All randomness goes through
`createRng` so simulations are fully reproducible given the same seed.

### 5.4 Step function (`engine/step.ts`)

Conway's Game of Life, **toroidal boundary** (all edges wrap).

```ts
// Reads `current`, writes result into `next`. Does NOT swap references.
// Zero allocations inside the loop — no arrays, no objects, no closures.
// Caller is responsible for swapping current/next after this returns.
const stepConway = (
  current: Uint8Array,
  next:    Uint8Array,
  cols:    number,
  rows:    number
): void
```

Neighbor indexing (toroidal, 1D):

```
row above  = ((row - 1 + rows) % rows) * cols
row below  = ((row + 1)        % rows) * cols
col left   = (col - 1 + cols) % cols
col right  = (col + 1)        % cols
```

No branching on edges — the modulo handles all wrap cases uniformly.

### 5.5 Pattern schema (`engine/pattern.schema.ts`)

Used for JSON import/export. Zod is the type source of truth.

```ts
import { z } from 'zod';

export const patternSchema = z.object({
  name: z.string(),
  cols: z.number().int().positive(),
  rows: z.number().int().positive(),
  generation: z.number().int().nonneg(),
  // Sparse encoding: only alive cell indices stored.
  aliveCells: z.array(z.number().int().nonneg()),
});

export type Pattern = z.infer<typeof patternSchema>;
```

All JSON payloads entering the store from outside (file import, URL paste)
**must** be validated through `patternSchema.safeParse()` at the boundary.
Never let unvalidated data reach the store.

### 5.6 Web Worker (`engine/worker.ts`)

Instantiated with Vite's module syntax — no other syntax is valid:

```ts
new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
```

**Transferable ownership protocol** (this must be implemented exactly):

```
Main thread owns: gridA (Uint8Array), gridB (Uint8Array) — always two buffers.

Each step:
  1. Main transfers ONE buffer to worker (postMessage + transfer array).
     After transfer, main's reference to that buffer is neutered (byteLength === 0).
  2. Worker receives buffer, runs stepConway writing into its own scratch buffer.
  3. Worker transfers the RESULT buffer back to main.
  4. Main receives result, swaps its active/back buffer references.
  5. Main uploads the new active buffer to the GPU DataTexture.

The second buffer never leaves main thread — it becomes the next "back buffer"
for the following step's transfer.
```

Worker message types:

```ts
// Main → Worker
type StepRequest = {
  type: 'step';
  grid: Uint8Array; // transferred (Transferable)
  cols: number;
  rows: number;
};

// Worker → Main
type StepResponse = {
  type: 'step';
  grid: Uint8Array; // transferred back (Transferable)
};
```

The worker allocates its own internal scratch buffer once on first message and
reuses it for every subsequent step (zero allocation per step in the worker).

---

## 6. State Management (`src/stores/automaton/`)

### 6.1 Store factory (`store.ts`)

Uses `createStore` (vanilla Zustand) — **not** `create`. This is mandatory for
context isolation between multiple islands.

```ts
import { createStore } from 'zustand/vanilla';

// Internal factory. Only imported by actions.ts and selectors.ts.
// Never imported by components.
export const createCAStore = (opts: CAStoreInit) =>
  createStore<CAState>()(/* ... */);
```

`CAStoreInit` carries the mount-time options from `<AutomatonProvider>` props
(`rows`, `cols`, `seed`, `initialDensity`).

### 6.2 State shape (`types.ts`)

State is split into two slices to protect the React render cycle.

**UI Slice** — React subscribes to these via selectors:

```ts
type UISlice = {
  running: boolean; // default false
  speedMs: number; // default 100ms (= 10 FPS floor)
  toolMode: ToolMode; // default 'draw'
  showDebug: boolean; // default false
};

type ToolMode = 'draw' | 'erase' | 'pan';
```

**Simulation Slice** — transient; never subscribed to by UI components:

```ts
type SimSlice = {
  grid: Uint8Array; // active read buffer (owned by main thread or in-flight to worker)
  backBuffer: Uint8Array; // write target for next step
  generation: number; // increments each step; used as dirty flag
  cols: number; // fixed at init
  rows: number; // fixed at init
  seed: number; // fixed at init
};
```

`grid` and `backBuffer` are swapped (reference swap, no copy) after each step.
React components **never** subscribe to `grid` directly — only the r3f canvas
reads it, outside the React render cycle.

### 6.3 Actions (`actions.ts`)

All signatures use the union type, never the raw `string`.

```ts
const init: () => void;
const play: () => void;
const pause: () => void;
const step: () => void; // single manual step
const clear: () => void;
const toggleRunning: () => void;
const randomize: (density?: number) => void; // uses stored seed
const setSpeed: (ms: number) => void;
const setToolMode: (mode: ToolMode) => void;
const paintCell: (index: number, value: CellValue) => void;
const importPattern: (raw: unknown) => void; // validates via patternSchema
const exportPattern: (name: string) => Pattern;
```

`importPattern` calls `patternSchema.safeParse(raw)`. On failure it logs the
Zod error and returns early — it never throws and never silently swallows.

`step()` dispatches to the Web Worker. It does **not** call `stepConway`
directly on the main thread. The interval loop in `play()` is a plain
`setInterval` stored in a ref (not in Zustand state); it calls `step()` at
`speedMs` cadence.

### 6.4 Selectors (`selectors.ts`)

Components only import from here (and `actions.ts`). Never from `store.ts`.

```ts
const useRunning: () => boolean;
const useSpeedMs: () => number;
const useToolMode: () => ToolMode;
const useGeneration: () => number; // read-only; useful for debug overlay
const useShowDebug: () => boolean;
```

`useGeneration` is the only simulation-slice selector exposed to React — it
is a single number subscribed minimally and used by the debug overlay only.

---

## 7. Rendering (`AutomatonCanvas`)

### 7.1 Data texture pipeline

```ts
// Allocated once at mount. Format: THREE.LuminanceFormat (1 byte per cell).
const texture = new THREE.DataTexture(grid, cols, rows, THREE.LuminanceFormat);
texture.magFilter = THREE.NearestFilter; // pixel-sharp cells, no interpolation
```

A full-screen quad (`THREE.PlaneGeometry`) carries this texture.
A minimal fragment shader maps luminance 0 → deadColor, 1 → aliveColor.

Colors are passed as `THREE.Color` uniforms — never re-parsed per frame.
They update only when the corresponding props change (stable ref via `useMemo`).

### 7.2 Frame loop (`useFrame`)

```ts
useFrame(() => {
  const { grid, generation } = getSimState(); // reads transient slice directly

  if (generation === lastRenderedGeneration.current) return; // dirty flag — skip upload

  texture.image.data.set(grid); // typed array copy into DataTexture buffer
  texture.needsUpdate = true; // REQUIRED — signals Three.js to re-upload to GPU
  lastRenderedGeneration.current = generation;
});
```

`texture.needsUpdate = true` must be set every frame where a new generation is
written. Without it the GPU never receives the update — silent failure.

The frame loop runs at 60 FPS. Simulation steps run at `speedMs` cadence
(default 100ms = ~10 FPS). The dirty flag ensures redundant GPU uploads are
skipped on the ~50 frames between simulation steps.

### 7.3 Camera

Orthographic camera, centered on the grid. Initial zoom fits the full grid
into the canvas. Zoom and pan are implemented via camera position mutations
(not via r3f controls library) to remain consistent with keyboard shortcuts.

---

## 8. Controls Component

Self-contained UI overlay. Reads state via selectors, dispatches via actions.
No business logic — thin orchestrator only.

### 8.1 Tool panel

- Play/Pause button → `toggleRunning()`
- Step button (disabled while running) → `step()`
- Clear button → `clear()`
- Randomize button → `randomize()`
- Speed slider (50ms–1000ms) → `setSpeed(ms)`
- Tool mode toggle: Draw / Erase / Pan → `setToolMode(mode)`

### 8.2 Editing modes

- **Draw:** left-click + drag paints alive cells → `paintCell(index, 1)`
- **Erase:** right-click or active erase mode paints dead cells → `paintCell(index, 0)`
- **Pan:** Shift+drag moves camera (overrides draw/erase regardless of active tool)

Mouse position → cell index conversion: `index = Math.floor(y) * cols + Math.floor(x)`,
where `x` and `y` are derived from r3f raycasting against the grid plane.

High-frequency mouse events (`mousemove`) are throttled per the performance
guardrails convention before any layout or store calculation.

### 8.3 Keyboard shortcuts

| Key        | Action            |
| ---------- | ----------------- |
| `Space`    | `toggleRunning()` |
| `N`        | `step()`          |
| `R`        | `randomize()`     |
| `C`        | `clear()`         |
| `+` / `=`  | zoom in           |
| `-`        | zoom out          |
| Arrow keys | nudge camera      |

Event listeners are registered on `window` and cleaned up on unmount.

### 8.4 Data I/O panel

- **Export JSON:** calls `exportPattern(name)`, serialises to JSON, triggers
  browser download via `URL.createObjectURL`.
- **Import JSON:** file input → reads text → passes raw value to
  `importPattern(raw)`. Validation happens inside the action via Zod.
  On validation failure the UI shows an error toast (no throw, no crash).

### 8.5 Debug overlay

Hidden by default (`showDebug: false`). Toggled by a keyboard shortcut (`D`)
or a button visible only in development builds. When mounted it shows:

- Step time (ms) — measured in the Web Worker
- Render time (ms) — measured in `useFrame`
- Worker round-trip latency (ms)
- Current generation
- Grid dimensions

---

## 9. Provider & Context

```tsx
// AutomatonProvider.tsx

const CAStoreContext = createContext<
  ReturnType<typeof createCAStore> | undefined
>(undefined);

export const AutomatonProvider = ({
  rows = 100,
  cols = 100,
  initialDensity = 0.2,
  seed,
  children,
}: CAProviderProps) => {
  const resolvedSeed = seed ?? Date.now();
  // useRef ensures one store instance per mount, stable across re-renders
  const store = useRef(
    createCAStore({ rows, cols, initialDensity, seed: resolvedSeed })
  ).current;

  useEffect(() => {
    store.getState().init();
    return () => store.getState().pause(); // stop interval on unmount
  }, [store]);

  return (
    <CAStoreContext.Provider value={store}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </CAStoreContext.Provider>
  );
};

// Internal hook used by actions.ts and selectors.ts
export const useCAStore = () => {
  const store = useContext(CAStoreContext);
  if (store === undefined)
    throw new Error('useCAStore must be used within AutomatonProvider');
  return store;
};
```

The `ErrorBoundary` wrapping `children` ensures a WebGL crash or worker
failure does not take down the surrounding Astro page.

---

## 10. Default Load State

When `<AutomatonProvider>` mounts with no props:

| Property     | Value        |
| ------------ | ------------ |
| Grid size    | 100 × 100    |
| Fill density | 20 % alive   |
| Seed         | `Date.now()` |
| Running      | false        |
| Speed        | 100 ms/step  |
| Tool mode    | `'draw'`     |
| Debug        | false        |

---

## 11. Testing

### Unit tests (Vitest, Node.js — no DOM required)

- `stepConway`: deterministic round-trip tests with known seed + known input.
- `createRng`: reproducibility — same seed → same sequence.
- `patternSchema`: valid and invalid payload shapes.
- `fillRandom`: density output within ±5 % of requested density.
- `importPattern` / `exportPattern`: round-trip identity.

### Integration tests

- Store factory: two independent stores mutated in isolation — verify no
  cross-contamination (validates the Context isolation model).
- Worker protocol: mock `postMessage` / `onmessage`; verify buffer ownership
  is never held by both sides simultaneously.

### Storybook

Stories live in `apps/storybook/stories/automata/`.
Import via `@repo/automata` alias only.

| Story                      | Props                                 |
| -------------------------- | ------------------------------------- |
| `Default.stories.tsx`      | no props                              |
| `LargeGrid.stories.tsx`    | `rows={200} cols={200}`               |
| `CustomColors.stories.tsx` | `aliveColor` / `deadColor` overrides  |
| `Seeded.stories.tsx`       | `seed={12345}` — reproducible pattern |

---

## 12. Performance Targets

| Scenario               | Target                             |
| ---------------------- | ---------------------------------- |
| 100 × 100, 10 FPS step | 60 FPS UI, no jank                 |
| 200 × 200, 5 FPS step  | 60 FPS UI, no jank                 |
| GPU upload             | Only on generation change          |
| Step loop allocations  | Zero per step                      |
| Worker allocations     | Zero per step (scratch buf reused) |

---

## 13. Out of Scope for v1

- Additional rules (HighLife, Seeds, Brian's Brain, Wireworld)
- Runtime grid resize
- RLE import/export
- Multi-step undo/redo
- Shared-canvas mode (multiple simulations on one WebGL context)
