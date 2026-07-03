# Code Health Audit — `@repo/pixel-engine`

**Date:** 2026-07-03
**Package Path:** `packages/pixel-engine`
**Scope:** All 20 source files

---

## Summary

| Category | Count | Severity |
|---|---|---|
| Universal Function / Hyper-Generic Abstraction | 3 | Medium |
| Linter Fighting & Config Loosening | 1 | Medium |
| React 19 / React Compiler Friction | 0 | N/A (not a UI package) |

---

## Findings

### 📄 File: `src/types.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** All four generic types (`PixelFunction`, `NeighborhoodFunction`, `WholeImageFunction`, `ManipulationDefinition`) default their `Options` parameter to `any` (`Options = any`). This means every consumer that omits the generic argument gets zero type safety on options — the very thing the generics were introduced to enforce. The `ManipulationDefinition` type additionally uses a discriminant union (`access: 'pixel' | 'neighborhood' | 'global'`) whose `options` field (`options?: Options` on line 69) is described as a "type-only marker to simplify Step derivation" — it has no runtime effect, creating a gap between the type system and execution.
- **Impact on Strictness:** 4 `// eslint-disable-line @typescript-eslint/no-explicit-any` comments (lines 48, 52, 56, 66). Without these, the `any` defaults would be caught by the strict `no-explicit-any` rule.

### 📄 File: `src/manipulation-factories.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** Low
- **Architectural Observation:** `defineManip()` is an identity function — it accepts a `params` argument and returns it unchanged (`return params`). The type `DefineManipParams` is a line-for-line duplicate of the `ManipulationDefinition` discriminated union from `types.ts`. This function exists solely to attach a generic constraint at the call site, but it adds no runtime behavior, no validation, and no transformation. Every manipulation in the codebase passes through this function, yet it does nothing — the type narrowing it performs could be achieved by annotating each exported const with `ManipulationDefinition<Options>` directly. This is a "universal factory" abstraction that exists only for ergonomics but introduces a maintenance burden (two type definitions that must stay in sync) and a spurious indirection layer.
- **Impact on Strictness:** None — the function is properly typed given its definition, but the duplicated type is fragile.

### 📄 File: `src/resize.ts` (in `manipulations/whole/resize.ts`)

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** High
- **Architectural Observation:** `computeTargetDimensions()` handles four mutually exclusive resize strategies via a single function with a complex discriminated union (`ResizeOptions` on line 4–13) and a nested `if/else` chain (lines 79–104). The four strategies — (a) max pixel budget, (b) explicit width + height with fit modes, (c) width-only proportional, (d) height-only proportional — share no code and have divergent semantics. The `fit` mode (lines 86–97) introduces an additional branching dimension (`'fill' | 'cover' | 'contain'`) that makes the function's decision tree three levels deep. The `bilinearResize` function is clean and well-factored, but `computeTargetDimensions` mixes scaling math, fit-mode math, and proportional calculation into one monolithic conditional structure. A separate helper per strategy (e.g., `computeMaxPixelsDimensions`, `computeFitDimensions`, `computeProportionalWidth`, etc.) would make each path independently testable and remove the `never`-field pattern from the type.
- **Impact on Strictness:** None — typed correctly with a discriminated union, but the union's 4 variants with `never` fields are complex.

### 📄 File: `src/step-dispatcher.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** Medium
- **Architectural Observation:** The `executors` record (line 18–58) dispatches three access types through a single lookup, but the `neighborhood` executor has a conditional branch (line 27) that chooses between tiled and non-tiled execution based on pixel count. This means the dispatcher knows about both the tiling boundary AND the maximum-pixel budget — concerns that belong in the pipeline-runner or a dedicated tiling decision layer. The `global` executor (line 48–58) and `pixel` executor (line 19–21) are trivially simple, but the `neighborhood` branch duplicates the access-type-narrowing check (`definition.access === 'neighborhood'` on line 32 and again conceptually via the `executors` key) because TypeScript cannot narrow the discriminated union through the record lookup. Line 73 uses `(step as { options?: Record<string, unknown> })` to widen the `Step` type into a bag — a pragmatic cast that signals a type-level impedance mismatch between the strongly-typed `Step` and the dispatcher's generic option passing.
- **Impact on Strictness:** 1 implicit type assertion (`as`) on line 73 to bypass the typed `Step` options into `Record<string, unknown>`.

### 📄 File: `src/manipulations/whole/flip-vertical.ts` and `src/manipulations/whole/flip-horizontal.ts`

- **Type of Smell:** Universal Function / Misclassified Access Type (taxonomy stretch)
- **Complexity Score:** Low
- **Architectural Observation:** Both flips are declared as `access: 'neighborhood'` with `radius: 0`. This is semantically incorrect — a flip is a whole-image remapping that reads each source pixel exactly once and writes it to a different position. A `radius: 0` neighborhood means "no neighboring pixels needed", which happens to work because the tiled executor in `step-dispatcher.ts` still dispatches correctly when `radius=0`, but the classification forces these operations through the tiling infrastructure unnecessarily. They consume a tile boundary check, extract/blit overhead, and the `halo` computation (line 79 of `neighborhood-tiling.ts`) for zero benefit. The taxonomy should include an `access: 'remap'` or similar category for per-pixel coordinate transforms that don't need neighborhood context but aren't pure pixel operations either.
- **Impact on Strictness:** None — no explicit eslint/ts violations. But the misclassification is a design-level smell that forces unnecessary runtime overhead and complicates the pipeline dispatch.

### 📄 File: `src/manipulations/neighborhood/helpers.ts`

- **Type of Smell:** Universal Function / Kernel Convolution Abstraction
- **Complexity Score:** Low
- **Architectural Observation:** `applyKernel()` is a well-factored convolution helper — this is clean abstraction, not problematic. Included here only as a point of contrast: it demonstrates the package *can* extract shared logic cleanly. The function takes a flat `kernel: number[]` array and a `kernelSize` dimension, iterates the image, applies the kernel per-channel, divides, and clamps. Three of four neighborhood manipulations (box-blur, gaussian-blur, sharpen) reuse it. Edge-detect does not (it uses inline Sobel logic via `getPixel`/`clamp` from the same file). The edge-detect function duplicates the convolution loop structure manually because its kernel application (two kernels, gradient computation) diverges from the single-kernel pattern. This is acceptable clean duplication — a single `applyKernel` that tried to handle both single-kernel and dual-kernel (gradient) convolution would be a worse abstraction.
- **Impact on Strictness:** None.

---

## Cross-Cutting Observations

### No React/UI Code
This package is a pure TypeScript data-processing engine with no React components, hooks, or JSX. React 19 / React Compiler friction is therefore not applicable.

### Strong Separation of Concerns
The pipeline architecture (runner → dispatcher → scheduler → buffer manager → tiling) is well-segmented. The `FusionScheduler` cleanly batches consecutive pixel operations. The `BufferManager` cleanly abstracts double-buffering. No single file is bloated beyond ~140 lines.

### Discriminated Union Design
The `access: 'pixel' | 'neighborhood' | 'global'` taxonomy (in `types.ts`) is the central architectural seam. It works well for the three execution models but is stretched by flip operations (neighborhood with radius 0) and the resize function (global but with complex options). If the package grows more whole-image remap operations (shear, warp, affine), a fourth access type would improve clarity and eliminate unnecessary tiling overhead.

### Fusion Scheduling Constraint
The `FusionScheduler` requires `bufferManager.other` to be non-null (line 57–59), but this is a runtime-only invariant — no type system mechanism enforces that a double buffer is available when fusion is active. An optional `BufferManager.lock()` or compile-time marker pattern could make this safer.
