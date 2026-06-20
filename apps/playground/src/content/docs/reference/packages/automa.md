---
title: "automa"
description: "Interactive Cellular Automaton simulator with pluggable rules, Web Worker stepping (via `@repo/worker-pool`), Zustand state management, and React Three Fiber rendering."
category: "reference"
tags:
  - reference
  - automa
order: 20
---

# @repo/automa

## Quick Start

```bash
pnpm add @repo/automa
```

```tsx
import { App } from '@repo/automa';

export default function Page() {
  return (
    <StrictMode>
      <App
        rows={80}
        cols={60}
        seed={42}
      />
    </StrictMode>
  );
}
```

## Architecture

```
App
  └─ ErrorBoundary
       ├─ AutomatonCanvas
       │   └─ <Canvas> (R3F — orthographic, OrbitControls)
       │       ├─ <OrbitControls> (zoom via middle-click, pan via right-click)
       │       ├─ <mesh> (shaderMaterial ← DataTexture)
       │       └─ <GridLines> (debug overlay)
       │
       └─ Controls
            ├─ play / pause / step / clear / randomize
            ├─ speed slider
            ├─ brush mode (draw / erase)
            ├─ rule selector
            ├─ color picker (per-state colors)
            └─ debug overlay (D)

Hooks
  ├─ useCameraFitter — auto-fits orthographic camera to grid dimensions on mount/resize
  ├─ useCellPainting — maps pointer events → grid cell mutation
  ├─ useGridTexture  — bridges grid state ↔ GPU DataTexture every frame
  └─ useStepTimer    — measures simulation step performance

automatonStore (global Zustand singleton)
  ├─ Pure state mutations only (setGrid, clear, randomize, ...)
  └─ Consumer via selectors (useGrid, useRunning, ...)

actions.ts (plain functions, no hooks)
  ├─ init / destroy — WorkerPool lifecycle (via @repo/worker-pool)
  ├─ step / play / pause — async animation orchestration
  └─ clear / randomize / paintCell / setRule — grid edits
```

## Rules

Rules are plain data objects — no custom `if/else` per rule type.

```ts
type Rule = {
  id: string;
  name: string;
  stateCount: number; // 2 = Conway, 3 = Brian's Brain, etc.
  birth: readonly boolean[]; // length 9, index = neighbor count
  survive: readonly boolean[]; // length 9, index = neighbor count
};
```

**B/S notation** is parsed into lookup arrays. `parseRule(id, name, 'B3/S23')` produces `birth[3] = true`, `survive[2] = survive[3] = true`.

**Multi-state rules** (`stateCount > 2`) add an aging/refractory layer:

- State `0` — Dead
- State `1` — Alive (counts toward neighbor totals)
- State `2` to `N-1` — Dying (age by +1 each tick, ignore neighbors, don't breed)

### Built-in examples

| Rule                  | ID             | Notation  | States | Behavior                                                      |
| --------------------- | -------------- | --------- | ------ | ------------------------------------------------------------- |
| Conway's Game of Life | `conway`       | `B3/S23`  | 2      | Classic                                                       |
| HighLife              | `highlife`     | `B36/S23` | 2      | Conway + B6                                                   |
| Brian's Brain         | `brians-brain` | `B2/S`    | 3      | Birth on 2, no survival, cells decay through refractory state |

### Adding a new rule

```ts
import { parseRule } from '../rules/parse.ts';
import { registerRule } from '../rules/registry.ts';

const myRule = parseRule('my-rule', 'My Rule', 'B1/S', 2);
registerRule(myRule);
```

For multi-state rules, pass the `stateCount` as the fourth argument:

```ts
const briansBrain = parseRule('brians-brain', "Brian's Brain", 'B2/S', 3);
```

The rule will automatically appear in the UI selector and the color picker will show one swatch per state.

### File layout

```
core/
  engine.ts          Generic evolve (lookup tables + multi-state aging)
  worker.ts          Off-main-thread step, transferrable ArrayBuffers
  grid.ts            Grid allocation / seeding
  rules/
    types.ts         Rule type definition
    parse.ts         B/S notation → Rule
    registry.ts      Rule registry (register / get / getAll)
    conway.ts        Conway's Game of Life
    highlife.ts      HighLife
    brians-brain.ts  Brian's Brain
```

## Engine

Simulation runs in a **Web Worker** (via `@repo/worker-pool`) to avoid blocking the UI thread. The pool is configured with `maxPoolSize: 1` and uses `Transferable` buffers for zero-copy grid transfer. The `evolve` function in `engine.ts` is fully generic — it reads `birth[]`/`survive[]` lookups from the rule object and handles multi-state aging via the `stateCount` field.

## Color picker

Each state gets its own color swatch. The number of swatches is driven by the active rule's `stateCount` — switch to a 3-state rule and a third row appears automatically.

## Controls

| Input                       | Action                          |
| --------------------------- | ------------------------------- |
| Left-click + drag           | Draw / erase cells (brush mode) |
| Right-click + drag          | Pan                             |
| Scroll wheel / middle-click | Zoom                            |
| D                           | Toggle debug overlay            |
| Space                       | Play / pause                    |

## Camera

On mount the orthographic camera auto-fits the grid with a 15% margin via `useCameraFitter` (`src/hooks/useCameraFitter.ts`). The camera is updated whenever the grid dimensions or viewport size change — no manual `zoom`/`position` needed. Pan and zoom via OrbitControls work normally after the initial framing.

## Drawing

Drawing maps pointer events on the 3D plane to grid cell indices using `useCellPainting` (`src/hooks/useCellPainting.ts`). The plane geometry is centered at the origin, so pointer world coordinates are shifted by `(+cols/2, +rows/2)` to align with the grid's row-major storage. The Y axis is consistent between Three.js world space and grid space (no flip).

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

