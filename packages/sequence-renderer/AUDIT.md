# Code Health Audit: `@repo/sequence-renderer`

Generated: 2026-07-03

---

## Overview

This package is a canvas-based interactive renderer for mathematical sequences. It structures rendering around a plugin-style `VisualLayer` system with a shared `CanvasLayout` and `Record<string, unknown>` params bag. State is split across two Zustand stores (`sequence`, `ui`). A Fourier epicycle module lives alongside, using a Web Worker pool.

---

### 📄 File: `src/core/types.ts`

- **Type of Smell:** Leaky Abstraction / Under-Specified Contract
- **Complexity Score:** Medium
- **Architectural Observation:** The `VisualLayer.draw` signature takes `params: Record<string, unknown>`, forcing every layer implementation to do runtime type narrowing via `as` assertions. `ParamDescriptor` is a tagged union that _describes_ param types but never feeds a type-safe accessor, so the type information encoded in `ParamDescriptor` is effectively dead at render time. The `draw` callback is incapable of expressing per-layer param shapes, which is the root cause of the ~30 type assertions across all layer files.
- **Impact on Strictness:** The `Record<string, unknown>` params bag creates a type hole every layer must punch through with `as` assertions.

---

### 📄 File: `src/core/render.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** Low
- **Architectural Observation:** `computeLayout()` bundles min/max range finding, horizontal scaling, vertical scaling, and centering offset math into one function. It computes both `horizontalScale` and `verticalScale` but only returns a single `valueScale` (their `Math.min`), meaning the unused scale dimension is wasted work. The division fallback chain `(dataRange || Math.max(maxVal, -minVal) || 1)` obscures edge-case handling for edge-case handling for zero or single-element arrays but only ever produces the scale for the horizontal axis since the dimensions share a single value anyway.
- **Impact on Strictness:** None (no type assertions or lint escapes).

---

### 📄 File: `src/core/layers/drawFactorWaves.ts`

- **Type of Smell:** Hyper-Generic Abstraction / Performance Trap
- **Complexity Score:** High
- **Architectural Observation:** This layer draws a sine wave radiating from _each_ data point. The draw loop is O(data × pixelWidth): for every sequence value, it iterates pixel-by-pixel from `startX` to `endX` (canvas-wide), computing `Math.sin` per pixel. For a 1000-element sequence on a 1920px canvas, that is ~1.9M trig calls per frame. The `params as unknown` pattern forces 4 type assertions in the draw body. The per-pixel inner loop is unbounded — it runs to `endX` regardless of whether the sine wave is still visible.
- **Impact on Strictness:** 4+ type assertions on params destructure; `as number` for lineWidth, alpha, amplitudeScale.

---

### 📄 File: `src/core/layers/drawMountain.ts`

- **Type of Smell:** Hyper-Generic Abstraction / Performance Trap
- **Complexity Score:** Medium
- **Architectural Observation:** Reconstructs a filled polygon path from sequence data, creating a linear gradient every frame. The path build iterates data forward (the curve) and then constructs the bottom edge by hand (lines back to origin). This is a specialized fill shape that shares the same generic `params: Record<string, unknown>` pattern. The gradient creation per frame is cheap but unnecessary — it could be cached or precomputed.
- **Impact on Strictness:** 2 type assertions (`gradientHeight as number`).

---

### 📄 File: `src/core/layers/drawFourierEpicycles.ts`

- **Type of Smell:** Universal Function / Side-Effect Coupling
- **Complexity Score:** High
- **Architectural Observation:** This layer performs **three** distinct responsibilities in a single draw call: (1) fetching/cache-looking epicycles via `fetchFourierEpicycles()` which itself triggers a re-render event (side effect in a draw function), (2) sampling and stroking the full periodic path (O(epicycles × samples) ≈ 500 × activeLimit trig evaluations), (3) drawing the animated orbit overlay using `performance.now()` for the `liveProgress` time value. The `performance.now()` call makes the draw output time-dependent and non-deterministic, which is unusual for a layer that is otherwise data-driven. The comment on line 109 (`// REMOVED: requestAnimationFrame event dispatch loop that causes overheating.`) indicates a prior version caused thermal issues and the current design retains a single moving pointer via time sampling, but the redraw trigger from `fetchFourierEpicycles()` creates a feedback loop risk.
- **Impact on Strictness:** Uses `as Record<string, number | boolean>` to cast entire params object.

---

### 📄 File: `src/core/layers/drawBarChart.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Standard bar chart layer. Straightforward rendering, no complex branching. The `as` assertions on params are the only concern.
- **Impact on Strictness:** 3 type assertions (`barWidth as number`, `alpha as number`, `saturation`/`lightness` via template literal coercion).

---

### 📄 File: `src/core/layers/drawBaseline.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Simple horizontal line. Minimal logic.
- **Impact on Strictness:** 3 type assertions (`color as string`, `lineWidth as number`, `alpha as number`).

---

### 📄 File: `src/core/layers/drawConnectionLines.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Draws lines between consecutive values with hue cycling. Straightforward.
- **Impact on Strictness:** 4 type assertions (`lineWidth as number`, `alpha as number`, `hueCycle as number`, `saturation`/`lightness` via template).

---

### 📄 File: `src/core/layers/drawPlottedNumbers.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Draws dots at unique sequence values using a `Set` for deduplication.
- **Impact on Strictness:** 3 type assertions (`color as string`, `alpha as number`, `radius as number`).

---

### 📄 File: `src/core/layers/drawRadialSpokes.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Maps values to polar coordinates and draws spokes from center. More complex geometrically but still straightforward.
- **Impact on Strictness:** 4 type assertions (`lineWidth as number`, `alpha as number`, `dotRadius as number`, `scale as number`).

---

### 📄 File: `src/core/layers/drawRecamanArcs.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Draws semicircle arcs between consecutive values specific to Recamán sequence visualization. Uses `getComputedStyle` to fall back to canvas color — an unusual pattern.
- **Impact on Strictness:** 3 type assertions (`color as string`, `lineWidth as number`, `alpha as number`).

---

### 📄 File: `src/core/layers/drawStemPlot.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Vertical stems from baseline with marker dots. Straightforward.
- **Impact on Strictness:** 3 type assertions (`lineWidth as number`, `alpha as number`, `markerRadius as number`).

---

### 📄 File: `src/hooks/useCanvasRenderer.ts`

- **Type of Smell:** React 19 / React Compiler Friction
- **Complexity Score:** Medium
- **Architectural Observation:** This hook fights React Compiler in three distinct ways. (1) **Manual ref sync anti-pattern**: Three separate `useEffect` hooks (lines 27–35) sync props into refs so `draw` can read them inside rAF without stale closures — React Compiler would normally handle memoization across renders. (2) **Manual `useCallback`** (line 16) wraps `draw` despite it only referencing `canvasRef` (a ref, always stable). (3) **Three `useEffect` boundaries**: one for sequence/layers → immediate draw, one for viewport → rAF-throttled draw, one for custom `request-draw` events. Each uses `// eslint-disable-next-line react-hooks/exhaustive-deps` to suppress the dependency lint. All of this is manual, imperative scheduling around canvas that would need a rethink under React Compiler's automatic memoization — the compiler will treat these effects as stable when it sees the eslint-disable, but the ref-sync pattern is entirely redundant with the compiler's ability to track reactive values.
- **Impact on Strictness:** 3 eslint-disable comments suppressing `react-hooks/exhaustive-deps`.

---

### 📄 File: `src/hooks/useCanvasInteraction.ts`

- **Type of Smell:** React 19 / React Compiler Friction
- **Complexity Score:** Low
- **Architectural Observation:** Uses raw DOM event listeners (`addEventListener`) on canvas and window rather than React's synthetic events. This is pragmatic for canvas interaction (pointer position, wheel, panning) but entirely outside React's lifecycle. The `useEffect` depends only on `canvasRef`, which is fine, but the imperative state reads (`getViewportState()`) bypass React's reactive flow entirely. Not a severe smell since canvas interaction is inherently imperative, but worth noting that React Compiler provides no benefit here.
- **Impact on Strictness:** None.

---

### 📄 File: `src/components/layers/LayerOptionsPanel.tsx`

- **Type of Smell:** Universal Component / Hyper-Generic Abstraction
- **Complexity Score:** Medium
- **Architectural Observation:** This component renders all 4 param types (`number`, `color`, `string`, `boolean`) in a single file with an `if/else-if` chain on `descriptor.type`. While this mirrors the `ParamDescriptor` union, it forces one component to know about every possible UI control type. Adding a new param type (e.g. `select`) requires modifying this component. The `currentValue` defaulting on line 18 (`values[key] ?? descriptor.default`) mixes runtime and compile-time defaults awkwardly.
- **Impact on Strictness:** Uses type narrowing on `descriptor.type` which is safe, but accesses `descriptor.min`/`max`/`step` without narrowing past the union — only safe because the `type === 'number'` branch is the only one rendering those. Fine at runtime but the `Slider` props technically access properties not on the narrowed type.

---

### 📄 File: `src/modules/fourier/harmonicPath.ts`

- **Type of Smell:** Performance Bug (Recalculation)
- **Complexity Score:** Low
- **Architectural Observation:** `generateHarmonics(seed)` is called inside `getNext()` — which runs once _per step_. For a 1000-step sequence, the same 4 harmonics are regenerated 1000 times from the same seed, including 4 `floor(rng.next() * 12)` calls each time. The harmonics should be computed once (e.g. in a factory or closure) and reused across all `getNext` invocations. Currently each step re-rolls the same pseudo-random values, producing identical results but wasting compute.
- **Impact on Strictness:** None.

---

### 📄 File: `src/modules/fourier/fourier.worker.ts`

- **Type of Smell:** Potential Precision Loss
- **Complexity Score:** Low
- **Architectural Observation:** The DFT in the worker operates on `Float32Array` data, performing repeated floating-point trig operations inside a double loop. For large N, `Float32` precision may accumulate significant error in the DFT coefficients. The sorted-by-amplitude post-processing (line 35) is a sort that could be deferred until after truncation for the active limit. Clean implementation otherwise.
- **Impact on Strictness:** None.

---

### 📄 File: `src/modules/fourier/store.ts`

- **Type of Smell:** Linter Workaround / Manual Cache Implementation
- **Complexity Score:** Medium
- **Architectural Observation:** Implements an LRU cache for epicycle computations manually (lines 33–50) using `Map` delete-reinsert for LRU tracking and manual eviction with `MAX_CACHE_SIZE = 20`. The `hashPairs` function (line 25) is a hand-rolled FNV-1a-like hash that operates on `Float32Array` values — for very large sequences, this iterates all pairs on every `fetchFourierEpicycles` call, even for cache misses. The `activeQueries` Set prevents duplicate requests for the same key. The cache miss path dispatches an async worker call but returns `null` immediately — the caller (`drawFourierEpicycles`) then bails out, and the worker's completion fires a custom event to trigger a redraw. This implicit callback chain is fragile: if the draw function changes its behavior between the miss and the redraw, the visual result may be inconsistent.
- **Impact on Strictness:** None.

---

### 📄 File: `src/modules/fourier/SeededRandom.ts`

- **Type of Smell:** Comment/Implementation Mismatch
- **Complexity Score:** Low
- **Architectural Observation:** The comment on line 10 reads _"A more robust string hashing algorithm (MurmurHash-inspired)"_ but the implementation is FNV-1a (initializing 2166136261, multiplier 16777619), not MurmurHash. The PRNG below is correctly labeled as Mulberry32. Minor documentation inaccuracy.
- **Impact on Strictness:** None.

---

## Summary: Smell Frequency

| Smell Category                                 | Occurrences                                                                                                      |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Universal Function / Hyper-Generic Abstraction | **5** (`render.ts`, `drawFactorWaves.ts`, `drawMountain.ts`, `drawFourierEpicycles.ts`, `LayerOptionsPanel.tsx`) |
| Linter Workaround (type assertions)            | **10 files** (all 9 layer files + `drawFourierEpicycles.ts`) — ~30 `as` assertions total                         |
| React 19 / Compiler Friction                   | **2** (`useCanvasRenderer.ts`, `useCanvasInteraction.ts`)                                                        |
| Performance Bug                                | **1** (`harmonicPath.ts` — harmonic regeneration per step)                                                       |
| Documentation Inaccuracy                       | **1** (`SeededRandom.ts` — FNV-1a labeled as MurmurHash)                                                         |
