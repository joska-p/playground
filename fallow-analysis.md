# Fallow Image Pipeline Analysis

## Current Architecture

Three factory functions (`definePixel`, `defineNeighbor`, `defineWhole`) produce three
different `ManipulationDefinition` types with different `execute` signatures:

| Factory          | Execute signature                             | Example                     |
| ---------------- | --------------------------------------------- | --------------------------- |
| `definePixel`    | `(r,g,b,a) → [r,g,b,a]` (pure, fusible)       | brightness, contrast, sepia |
| `defineNeighbor` | `(source, dest, w, h) → void` (double-buffer) | gaussian-blur, edge-detect  |
| `defineWhole`    | `(ImageData) → ImageData` (own allocation)    | resize, flips, histogram    |

The scheduler dispatches on `definition.type` — pixel ops are batched via
`FusionScheduler`, neighbor ops use double-buffered convolution (optionally tiled),
whole ops own their output allocation.

## What's Right

The three execution **paths** (fusible point-wise, windowed double-buffer, global
allocation) are real and performance-sensitive. Your instinct to separate them was
correct — the `FusionScheduler` batching pixel ops into a single loop pass saves
significant memory traffic vs treating everything as a kernel.

## What's Wrong

### 1. Three different function signatures for authors

Operation authors must learn three calling conventions:

- `PixelFunction`: destructure `r/g/b/a`, return a tuple
- `NeighborhoodFunction`: write to a separate `destination` buffer
- `WholeImageFunction`: allocate + return new `ImageData`

The scheduler already knows the execution path from `definition.type`. The different
signatures add no runtime benefit.

### 2. The "whole" category is a grab-bag

5 whole-image ops, but only 2 genuinely need special treatment:

| Op                 | Actually needs whole? | Real category                                   |
| ------------------ | --------------------- | ----------------------------------------------- |
| flip-horizontal    | No                    | Pixel remap — could use source/dest buffer      |
| flip-vertical      | No                    | Same — row-level subarray/set                   |
| rotate-90cw        | Partially             | Dimension swap — needs different output size    |
| resize             | Yes                   | Different output dimensions + bilinear sampling |
| histogram-equalize | Yes                   | Two-pass: global stats first, then remap        |

### 3. Duplicate metadata

`manipData.ts` (434 lines) hardcodes all 18 manipulation entries with their labels,
descriptions, and parameter definitions — a complete copy of the `ui` metadata
already on each `ManipulationDefinition`. Adding a new manipulation requires editing
two files.

## How Professional Libraries Handle This

| Library     | Registration                                 | Operation model                                                                      |
| ----------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| libvips     | GObject metaclass = implicit registry        | Unified `VipsOperation` base, access pattern declared via flags (`SEQUENTIAL`, etc.) |
| ImageMagick | `RegisterMagickInfo()` → splay tree          | All ops are `Image` transforms with declared read/write extent                       |
| Skia        | Per-filter `SkRegister*` + factory functions | `SkImageFilters::Blur(...)` — no central dispatch, immutable DAG                     |
| Pillow      | `Image.register_filter()` → string→class     | `ImageFilter.Kernel(size, weights)` — universal N×N kernel, pixel ops are radius-0   |

Common pattern: **unified authoring API, discriminated execution engine**.

## Proposal

### Phase 1 — Unified Authoring API

Replace 3 factories with 1:

```ts
defineManip({
  id: 'brightness',
  access: 'pixel',           // fusible, pure function
  execute: (ctx) => { ... },
  ui: { ... }
})

defineManip({
  id: 'gaussian-blur',
  access: 'neighborhood',    // windowed, double-buffer
  radius: 1,
  execute: (ctx) => { ... },
  ui: { ... }
})

defineManip({
  id: 'resize',
  access: 'global',          // own allocation, multi-pass
  execute: (ctx) => { ... },
  ui: { ... }
})
```

The `ManipulationDefinition` type becomes a discriminated union on `access`:

```ts
type ManipulationDefinition = { id: string; ui: ... } & (
  | { access: 'pixel'; execute: PixelFn }
  | { access: 'neighborhood'; radius: number; execute: NeighborhoodFn }
  | { access: 'global'; execute: GlobalFn }
)
```

The scheduler routes by `access` (same logic, cleaner naming).

### Phase 2 — Clean Up Bucket Boundaries

- flip-h, flip-v: move to `access: 'neighborhood'` — operate on source/destination
  buffers with coordinate transform (no ImageData allocation needed)
- rotate-90cw: stays `access: 'global'` (dimension swap)
- The `neighborhood` category now cleanly maps to "same-dimension, double-buffer"

### Phase 3 — Derive Docs Metadata from Registry

- `ALL_MANIPULATIONS` is the single source of truth
- `manipData.ts` replaced with a thin derivation layer
- `EndpointView.tsx` consumes derived data instead of hardcoded if/else chains

---

Net effect: one factory, one type (with discriminated union), same runtime
performance, zero metadata duplication.
