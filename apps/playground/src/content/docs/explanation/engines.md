---
title: 'Engines'
description: 'How the creative engines work — pluggable definitions, registries, execution cores, and the shared architectural patterns across all packages.'
category: 'explanation'
tags:
  - explanation
---

# Engines

Every creative tool in this project is an **engine**: a system that takes
pluggable definitions, feeds them into a core processor, and renders the
result. Despite different domains (sequences, cellular automata, image
manipulation, mosaic patterns), all engines share a common architecture.

---

## Common Architecture

```
Definitions (data/factories)
    │
    ▼
Registry (Map<id, Definition>)
    │
    ▼
Engine Core (processor / generator / runner)
    │
    ▼
Zustand Store (unexported — bridges engine ↔ UI)
    │
    ▼
Presentation Layer (React components, Canvas, R3F, CSS Grid)
```

Dependencies point downward only — presentation never imports definitions
directly, and the engine core has no React or store imports.

---

## Definition & Registry System

Every engine defines a **pluggable unit** — a plain data object or factory
function that encodes a specific behavior. Definitions are registered in a
`Map<id, Definition>` and the UI consumes them automatically.

| Package             | Definition       | Creation helper        | Registry location                                                    |
| :------------------ | :--------------- | :--------------------- | :------------------------------------------------------------------- |
| `sequence-engine`   | `SequenceRule`   | `createRule()`         | `packages/engines/sequence-engine/src/rules/registry.ts`             |
| `automa`            | `Rule`           | `parseRule()`          | `src/core/rules/registry.ts`                                         |
| `palette-engine`    | `Rule`           | inline object          | `packages/engines/palette-engine/src/rules/`                         |
| `pixel-engine`      | `Manipulation`   | inline manifest object | `packages/engines/pixel-engine/src/registry.ts` (implicit in facade) |
| `pixel-manipulator` | `PixelCallback`  | factory function       | `src/manipulations/` (exported, no explicit registry Map)            |
| `mosaic-maker`      | `TileDefinition` | inline object array    | `core/TILE_REGISTRY.ts` (flat array)                                 |

**Adding a new entry** means: define it, register it, and the UI updates
automatically. No wiring.

---

## Execution Models

Each engine's core processes its definitions differently:

### Sequential generator (`@repo/sequence-engine`)

```
Rule → generateSequence() → number[]
```

Pure function. Iterates `rule.getNext()` up to `steps` times producing an
array of numbers. Rules have a `maxSteps` cap. The store clamps user input
to `[2, maxSteps]`.

### Ticked simulator (`automa`)

```
Rule + grid → evolve() → next grid state
```

Runs in a Web Worker via `@repo/worker-pool`. The `evolve` function is fully
generic — it reads `birth[]`/`survive[]` lookups from the rule and handles
multi-state aging. Grid data transfers use zero-copy `Transferable` buffers.

### Step pipeline (`pixel`)

```
ImageData + Step[] → pixel.run() → ImageData[]
```

Dispatches to a Web Worker pool (up to `hardwareConcurrency`). Consecutive
`pixel`-type operations are fused into a single pass. `neighborhood` ops use
tiling for large images. Returns one snapshot per step.

### Fluent pipeline (`pixel-manipulator`)

```
ImageData → manipulate().apply(fn).apply(fn).toImageData() → ImageData
```

All callbacks run in a **single pixel loop** — the output of each feeds into
the next per pixel. Supports intermediate snapshots via `.toArray()`. Uses
`PixelCallback` function composition rather than a registry Map.

### Constraint-driven generator (`mosaic-maker`)

```
TileDefinition[] + dimensions → computeInitialTiles() → TileInstance[]
```

Driven by container size (ResizeObserver with 150 ms debounce). Tile size,
gap, and palette colors are set via CSS custom properties — no React
re-render for slider drags. Regeneration fires on resize, tile set changes,
or explicit "New tiles" button.

---

## State Management

All engines use **Zustand** with a consistent pattern:

- The `create()` call is **never exported** — components never import the
  store directly.
- **Getter hooks** select a single slice:
  ```typescript
  export function useSequenceSteps(): number {
    return sequenceStore((s) => s.steps);
  }
  ```
- **Setter functions** are plain functions (no `use` prefix) that call
  `getState()` / `setState()` internally:
  ```typescript
  export function setSequenceSteps({ steps }: { steps: number }): void {
    const state = sequenceStore.getState();
    // clamp, generate, setState
  }
  ```
- Store files are `.ts` only — no JSX.
- Fine-grained selectors prevent cascade re-renders.

The `conventions.md` doc defines the full store structure: `store.ts` +
`actions.ts` + `selectors/` for larger domains, single file for smaller ones.

---

## Component Architecture

```
ErrorBoundary (@repo/ui/ErrorBoundary)
  └─ Sidebar (@repo/ui/Sidebar)
       ├─ Main (<canvas> / R3F / CSS Grid display)
       └─ Panel (Controls)
            ├─ Rule/definition selector (dropdown — reads from registry)
            ├─ Parameter sliders
            └─ Action buttons (play, randomize, etc.)
```

- The display component reads state via getter hooks and renders using the
  appropriate technology (Canvas 2D, R3F, CSS Grid, SVG).
- Controls dispatch changes via setter functions — no business logic.
- The main exported component is typically named `App` (`@repo/automa`,
  `@repo/sequence-renderer`) or the domain name (`MosaicMaker`, `ImageManipulator`).

---

## Web Worker Integration

Two packages offload computation to workers via `@repo/worker-pool`:

| Package  | Worker use                          | Pool config                        |
| :------- | :---------------------------------- | :--------------------------------- |
| `automa` | Single worker, `Transferable` grids | `maxPoolSize: 1`                   |
| `pixel`  | Pool of N workers, FIFO queue       | `maxPoolSize: hardwareConcurrency` |

Both use `Transferable` buffers for zero-copy memory transfer. Workers are
stateless (registry rebuilt per invocation). Call `teardown()` on app shutdown.

---

## Performance Patterns

| Concern                | Technique                                                        |
| :--------------------- | :--------------------------------------------------------------- |
| Resize thrashing       | Debounce at 150 ms before tile/regeneration                      |
| High-frequency sliders | Write CSS custom properties via `style.setProperty()` — no React |
| Worker overhead        | FusionScheduler + tiling for large-image convolutions            |
| Selective re-renders   | Fine-grained Zustand selectors per slice                         |
| Async data             | localStorage cache with TTL (mosaic palette fetch)               |
| Palette cycling        | In-memory window + CSS var swap — no re-render                   |

---

## Engine Comparison

| Package             | Definitions        | Execution           | Render tech    | State shape                         |
| :------------------ | :----------------- | :------------------ | :------------- | :---------------------------------- |
| `sequence-engine`   | 5 rules, 2 presets | Pure function       | Canvas 2D      | rule, steps, vizId, sequence        |
| `automa`            | 3 rules            | Web Worker, ticked  | R3F + shaders  | rule, grid, running, brush, colors  |
| `palette-engine`    | 4 rules            | Pure function       | (no render)    | (no store — stateless facade)       |
| `pixel`             | 18 manipulations   | Worker pool, fused  | Canvas 2D      | (no store — stateless facade)       |
| `pixel-manipulator` | 8 callbacks        | Fluent, single loop | Canvas 2D      | image, steps, presets               |
| `mosaic-maker`      | 8 tile shapes      | Constraint-driven   | CSS Grid + SVG | tiles, palette, tileSet, dimensions |

---

## Summary

Every engine follows the same three-layer architecture:

1. **Definitions** — pluggable data or factory functions.
2. **Engine Core** — a processor that reads definitions and produces output.
3. **Presentation** — React components that render the result and let users
   pick definitions and tune parameters.

The Zustand store pattern (unexported store, getter hooks, plain setter
functions) is consistent across every package. The definition/registry
pattern makes adding new rules, tiles, or manipulations a mechanical step
with zero wiring.

---

## Extending

- **Add a sequence rule**: See [Adding a Sequence Rule](/docs/how-to/adding-sequence-rule/)
- **Add a visualization**: See [Adding a Visualization](/docs/how-to/adding-visualization/)
