# GLAZE Refactor Inventory — GPU

## Section 1: Pass 1 — Mathematical Invariants & Branded Types

---

### 1. `src/gpu/shapes/color.ts` — RGBA channels are bare `number`

- **File & Line:** `src/gpu/shapes/color.ts:3-8`
- **Current Code / Issue:** `interface RGBA { r: number; g: number; b: number; a: number; }` — each channel is a raw number. `parseColor` clamps to 0..1 at runtime via `clamp01`, but downstream consumers receive unbranded numbers.
- **Proposed Branded Type:** `UnitInterval` (branded `number`, value in [0, 1]) for each channel. The `RGBA` interface would become `{ r: UnitInterval; g: UnitInterval; b: UnitInterval; a: UnitInterval }`.
- **Impact:** `colorArray()` at line 190 returns `[number, number, number, number]` which feeds directly into WebGL `uniform4fv` / vertex attribute buffers. A `UnitInterval` brand ensures every color channel is [0, 1] at construction time, not at render time.

---

### 2. `src/gpu/shapes/color.ts` — `parseColor` fallback returns magenta silently

- **File & Line:** `src/gpu/shapes/color.ts:187`
- **Current Code / Issue:** Unrecognized strings resolve to `{ r: 1, g: 0, b: 1, a: 1 }` (magenta) — a silent runtime fallback for invalid input.
- **Proposed Branded Type:** If `Color`/`CssColor` is branded (see CPU item 1), `parseColor` can narrow to only valid colors. The magenta fallback becomes a compile-time impossibility.
- **Impact:** Eliminates the "magenta sentinel" bug class where typos like `"bluw"` render as hot pink.

---

### 3. `src/gpu/shapes/color.ts` — `clamp01` is a runtime guard for an invariant that could be compile-time

- **File & Line:** `src/gpu/shapes/color.ts:10`
- **Current Code / Issue:** `const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));` — called in `parseChannel` (lines 42-44) and `parseHsl` (lines 102-106) to coerce channels into 0..1.
- **Proposed Branded Type:** `createUnitInterval(value: number): UnitInterval` factory that throws if value is outside [0, 1]. The `clamp01` calls are replaced by the factory, and the clamping behavior is explicit in the constructor.
- **Impact:** Replaces silent clamping with fail-fast validation; bugs where a percentage overflow clips to 1.0 are caught immediately.

---

### 4. `src/gpu/GpuSurface.ts` — `dpr` is a bare `number`

- **File & Line:** `src/gpu/GpuSurface.ts:58`
- **Current Code / Issue:** `readonly dpr: number` — identical pattern to `CpuSurface`. Zero or negative DPR would break `gl.viewport()` and uniform calculations.
- **Proposed Branded Type:** `DevicePixelRatio` (reuse the CPU brand).
- **Impact:** `#resize()` at line 361 does `Math.round(cssWidth * this.dpr)` and `gl.viewport(0, 0, deviceWidth, deviceHeight)`. A branded type prevents invalid viewport dimensions at construction.

---

### 5. `src/gpu/GpuSurface.ts` — `width`/`height` are bare `number` fields

- **File & Line:** `src/gpu/GpuSurface.ts:56-57`
- **Current Code / Issue:** `width = 0; height = 0` — zero-dimension canvas. `createStandardUniformValues` divides by these for `u_aspect` (line 126 of `setUniforms.ts`) and `u_mouse` (line 132-133).
- **Proposed Branded Type:** `CanvasDimension` (reuse the CPU brand, value >= 1).
- **Impact:** Prevents division-by-zero in uniform calculations (`width > 0 ? width / height : 0` guard at line 126 becomes unnecessary).

---

### 6. `src/gpu/GpuSurface.ts` — `createStateBuffer` accepts bare `width`/`height`

- **File & Line:** `src/gpu/GpuSurface.ts:131`
- **Current Code / Issue:** `createStateBuffer(width: number, height: number): StateBuffer` — zero or negative dimensions would fail at the GL level with a cryptic error.
- **Proposed Branded Type:** `CanvasDimension` or `BufferDimension` (branded `number`, value >= 1).
- **Impact:** `StateBufferTargets.#createTarget` at line 113 calls `gl.texImage2D` with these dimensions; negative values cause GL errors. Compile-time enforcement prevents invalid texture allocation.

---

### 7. `src/gpu/StateBuffer.ts` — `resize()` and `init()` accept bare `number` dimensions

- **File & Line:** `src/gpu/StateBuffer.ts:99`, `src/gpu/StateBuffer.ts:275`
- **Current Code / Issue:** `resize(width: number, height: number)` — the equality guard `if (width === this.#currentWidth && height === this.#currentHeight)` prevents no-ops, but negative/zero values pass through to `#createTargetPair`.
- **Proposed Branded Type:** `BufferDimension` — same brand as item 6. The runtime data-length check at line 63 (`data.length !== width * height`) could also be replaced by a branded `Uint8Array` of known length.
- **Impact:** `gl.texImage2D` at line 122 fails silently on zero-dimension textures; branded types catch this at call sites.

---

### 8. `src/gpu/StateBuffer.ts` — `init(data: Uint8Array)` length vs. dimensions mismatch

- **File & Line:** `src/gpu/StateBuffer.ts:62-67`
- **Current Code / Issue:** Runtime check: `if (data.length !== this.#currentWidth * this.#currentHeight) throw ...` — a data/dimension mismatch is caught at runtime.
- **Proposed Branded Type:** A `StateData` branded `Uint8Array` with a companion `createStateData(data: Uint8Array, width: BufferDimension, height: BufferDimension): StateData` factory that validates length = width × height at construction.
- **Impact:** Eliminates the runtime throw; the data and dimensions are coupled at the type level.

---

### 9. `src/gpu/batch/ShapeBatcher.ts` — `drawCircle` accepts bare `radius`

- **File & Line:** `src/gpu/batch/ShapeBatcher.ts:111`
- **Current Code / Issue:** `radius: number` — negative radius would produce degenerate circle geometry; zero would produce a point.
- **Proposed Branded Type:** `PositiveNumber` or `Radius` brand (reuse from CPU).
- **Impact:** `circleSegments(radius, zoom)` at line 302 uses `radius * zoom` to compute segment count; negative radius produces negative segment counts, which `clamp` silently converts to `MIN_CIRCLE_SEGMENTS`. Branded type prevents this.

---

### 10. `src/gpu/batch/ShapeBatcher.ts` — `#pushLine` guards `length === 0` at runtime

- **File & Line:** `src/gpu/batch/ShapeBatcher.ts:428-430`
- **Current Code / Issue:** `const length = Math.hypot(dx, dy); if (length === 0) return;` — runtime guard against zero-length lines (which would produce NaN direction vectors at line 432 `ux = dx / length`).
- **Proposed Branded Type:** A `LineSegment` branded type (pair of distinct `Point2D`s) constructed via `createLineSegment(a: Point2D, b: Point2D): LineSegment` that throws if `a === b` (or distance < epsilon). Alternatively, a `NormalizedVec2` brand for the direction vectors `ux/uy` and `nx/ny`.
- **Impact:** Eliminates the division-by-zero guard and the NaN-propagation risk. The `NormalizedVec2` brand would also apply to the perpendicular normal `nx/ny`.

---

### 11. `src/gpu/batch/ShapeBatcher.ts` — Direction vectors `ux/uy` are bare `number` (not normalized)

- **File & Line:** `src/gpu/batch/ShapeBatcher.ts:432-435`
- **Current Code / Issue:** `const ux = dx / length; const uy = dy / length; const nx = -uy; const ny = ux;` — these are unit vectors by construction (after the `length === 0` guard), but nothing in the type system guarantees it. They are passed to `#pushCap` which uses `Math.cos/sin` with them.
- **Proposed Branded Type:** `NormalizedVec2` (branded `{ x: number; y: number }` with invariant `x² + y² ≈ 1`), constructed via `normalize(v: Point2D): NormalizedVec2` (throws on zero-length).
- **Impact:** `#pushCap` (line 389) receives `dirX/dirY` and `normX/normY` as raw numbers. A `NormalizedVec2` brand makes it impossible to pass an un-normalized direction, preventing distorted cap geometry.

---

### 12. `src/gpu/batch/geometry.ts` — `viewportMatrix` and `projectionFor` accept bare `number` dimensions

- **File & Line:** `src/gpu/batch/geometry.ts:44`, `src/gpu/batch/geometry.ts:48`
- **Current Code / Issue:** `viewportMatrix(width: number, height: number)` — division `2 / width` and `-2 / height` produces `Infinity` if either is zero.
- **Proposed Branded Type:** `CanvasDimension` (value >= 1) — same brand as items 5, 6, 7.
- **Impact:** Eliminates infinite projection matrix entries that cause all geometry to vanish or produce GL errors.

---

### 13. `src/gpu/batch/geometry.ts` — `circleSegments` / `capSegments` return bare `number`

- **File & Line:** `src/gpu/batch/geometry.ts:61`, `src/gpu/batch/geometry.ts:66`
- **Current Code / Issue:** Return type is `number` — callers use the result directly as loop bounds and multipliers. Negative input after `clamp` is safe, but the return value is untyped.
- **Proposed Branded Type:** `SegmentCount` (branded `number`, value >= `MIN_CIRCLE_SEGMENTS` / `MIN_CAP_SEGMENTS`).
- **Impact:** `circleFillVertices`, `circleStrokeVertices`, `lineVertices` all multiply segment counts; a branded type ensures these are always positive integers.

---

### 14. `src/gpu/batch/geometry.ts` — `circleRing` computes angle in radians (bare `number`)

- **File & Line:** `src/gpu/batch/geometry.ts:75`
- **Current Code / Issue:** `const angle = (i / segments) * Math.PI * 2;` — radians are untyped. No confusion risk here since it's internal, but the pattern of passing raw `number` for angles exists elsewhere.
- **Proposed Branded Type:** `Radian` (branded `number`) — low priority for this internal helper, but worth noting for consistency if angle brands are introduced in core.
- **Impact:** Minimal for this specific call site (always computed, never received from external API), but establishes the pattern for future angle-typed APIs.

---

### 15. `src/gpu/shapes/TextRasterizer.ts` — `size` parameter is bare `number`

- **File & Line:** `src/gpu/shapes/TextRasterizer.ts:69`
- **Current Code / Issue:** `get(text: string, font: string, size: number)` — zero or negative size would produce a degenerate canvas (`Math.ceil(size * 1.4)` at line 84 could be 0 or negative).
- **Proposed Branded Type:** `FontSize` (reuse from CPU item 3).
- **Impact:** `this.#canvas.height = Math.max(1, Math.round(height * TEXT_SCALE))` at line 87 guards against zero, but a branded type makes the guard unnecessary.

---

### 16. `src/gpu/shapes/TextRasterizer.ts` — `TextRaster.width`/`height` are bare `number`

- **File & Line:** `src/gpu/shapes/TextRasterizer.ts:47-48`
- **Current Code / Issue:** `width: number; height: number` — always positive by construction (from `Math.ceil`), but the type doesn't express this.
- **Proposed Branded Type:** `PositiveInteger` or `RasterDimension` brand.
- **Impact:** `textUniforms` at line 162 passes these to `u_size` uniform; zero would collapse the text quad.

---

### 17. `src/gpu/shader/setUniforms.ts` — `createStandardUniformValues` divides by bare `width`/`height`

- **File & Line:** `src/gpu/shader/setUniforms.ts:126`, `src/gpu/shader/setUniforms.ts:132-133`
- **Current Code / Issue:** `height > 0 ? width / height : 0` and `width > 0 ? mouse.x / width : 0` — runtime guards against division by zero.
- **Proposed Branded Type:** If `width`/`height` are `CanvasDimension` (value >= 1), the `> 0` guards are unnecessary.
- **Impact:** Removes two runtime branches per frame. The `u_aspect` and `u_mouse` calculations become unconditional.

---

### 18. `src/gpu/shader/compileProgram.ts` — `UniformEntry.size` is bare `number`

- **File & Line:** `src/gpu/shader/compileProgram.ts:16`
- **Current Code / Issue:** `size: number` — always 1+ for active uniforms (GL guarantees this), but the type doesn't express it.
- **Proposed Branded Type:** `PositiveInteger` brand.
- **Impact:** Minor; mostly for documentation and internal consistency. Prevents accidental mutation to 0.

---

### Summary — GPU Directory

| # | Location | Current Type | Proposed Brand | Eliminates |
|---|----------|-------------|---------------|------------|
| 1 | `color.ts:3-8` | `RGBA` channels as `number` | `UnitInterval` | Out-of-range color values |
| 2 | `color.ts:187` | magenta fallback | `CssColor` brand on input | Silent magenta on typos |
| 3 | `color.ts:10` | `clamp01` runtime | `createUnitInterval` factory | Silent clamping |
| 4 | `GpuSurface.ts:58` | `dpr: number` | `DevicePixelRatio` | Zero/negative DPR |
| 5 | `GpuSurface.ts:56-57` | `width/height: 0` | `CanvasDimension` | Division-by-zero in uniforms |
| 6 | `GpuSurface.ts:131` | `createStateBuffer(w, h)` | `BufferDimension` | Invalid GL texture dimensions |
| 7 | `StateBuffer.ts:99,275` | `resize(w, h)` | `BufferDimension` | Zero-dimension framebuffer |
| 8 | `StateBuffer.ts:62-67` | runtime length check | `StateData` branded array | Data/dimension mismatch throw |
| 9 | `ShapeBatcher.ts:111` | `radius: number` | `PositiveNumber` | Negative circle radius |
| 10 | `ShapeBatcher.ts:428-430` | `length === 0` guard | `LineSegment` brand | Division-by-zero / NaN direction |
| 11 | `ShapeBatcher.ts:432-435` | `ux/uy` bare numbers | `NormalizedVec2` | Un-normalized direction vectors |
| 12 | `geometry.ts:44,48` | `viewportMatrix(w, h)` | `CanvasDimension` | Infinite projection matrix |
| 13 | `geometry.ts:61,66` | `circleSegments` return | `SegmentCount` | Zero segment counts |
| 14 | `geometry.ts:75` | angle as `number` | `Radian` (low priority) | Angle unit confusion |
| 15 | `TextRasterizer.ts:69` | `size: number` | `FontSize` | Zero/negative font size |
| 16 | `TextRasterizer.ts:47-48` | `width/height: number` | `PositiveInteger` | Zero-dimension raster |
| 17 | `setUniforms.ts:126,132` | `> 0` runtime guards | `CanvasDimension` | Per-frame division-by-zero branches |
| 18 | `compileProgram.ts:16` | `size: number` | `PositiveInteger` | Zero uniform size |

---

## Section 2: Pass 2 — Dishonesty & Side-Effects Isolation

---

### 1. `src/gpu/shapes/color.ts:141-157` — Module-level `canvasContext` singleton reads `document`

- **File & Line:** `src/gpu/shapes/color.ts:141-157`
- **Current Code / Issue:** `let canvasContext: CanvasRenderingContext2D | null = null;` at module scope. `parseViaCanvas` lazily creates a hidden `<canvas>` via `document.createElement('canvas')` and caches the 2D context. This is: (a) a hidden global state read (`document`), (b) non-deterministic (DOM must exist), (c) a shared mutable singleton — two concurrent `parseColor` calls share the same hidden canvas.
- **Fix Strategy:** Inject a `CanvasColorResolver` from the app shell: `{ resolve(name: string): string | null }`. The shell owns the canvas creation. `parseColor` receives it as a parameter or through a factory. Alternatively, move `parseViaCanvas` to the edge (app shell) and have `parseColor` only handle hex/rgb/hsl/named.
- **Impact:** Eliminates the hidden DOM dependency; `parseColor` becomes pure for hex/rgb/hsl/named colors. Canvas-based fallback is an explicit edge concern.

---

### 2. `src/gpu/shapes/color.ts:187` — `parseColor` returns magenta fallback (silent non-determinism)

- **File & Line:** `src/gpu/shapes/color.ts:187`
- **Current Code / Issue:** Unrecognized strings resolve to `{ r: 1, g: 0, b: 1, a: 1 }` (magenta) — a sentinel value that silently propagates. The function promises to parse *any* string but returns a magic fallback for invalid input.
- **Fix Strategy:** Throw on unrecognized input (fail-fast), or return `null` and let callers decide the fallback. The magenta sentinel hides typos like `"bluw"` → hot pink.
- **Impact:** Makes `parseColor` honest: it either returns a valid RGBA or throws. Eliminates the "magenta bug" class.

---

### 3. `src/gpu/shader/setUniforms.ts:95-108` — Shared mutable `STANDARD_UNIFORM_VALUES` singleton

- **File & Line:** `src/gpu/shader/setUniforms.ts:95-108`
- **Current Code / Issue:** `U_RESOLUTION`, `U_MOUSE`, `U_CAMERA` are module-level arrays mutated in-place by `createStandardUniformValues`. The function is called once per frame per surface. If two `GpuSurface` instances exist and both call `createStandardUniformValues` in the same microtask, they overwrite each other's values. The shared object means the previous call's values are lost.
- **Fix Strategy:** Return a fresh object `{ u_resolution: [w*dpr, h*dpr], u_aspect: ..., ... }` per call. The allocation is negligible (one object + three small arrays per frame) and eliminates the shared-mutation hazard. If zero-allocation is critical, use a `FrameLocalUniforms` class owned by each surface.
- **Impact:** Makes `createStandardUniformValues` reentrant and safe for multiple surfaces. Removes the hidden "last writer wins" race.

---

### 4. `src/gpu/shader/setUniforms.ts:133` — Missing `height > 0` guard on `u_mouse.y`

- **File & Line:** `src/gpu/shader/setUniforms.ts:133`
- **Current Code / Issue:** `U_MOUSE[1] = 1 - mouse.y / height;` — no guard against `height === 0` (unlike line 132 which guards `width > 0` for `U_MOUSE[0]`). If `height` is 0, `u_mouse.y` becomes `Infinity`.
- **Fix Strategy:** Add the same guard: `U_MOUSE[1] = height > 0 ? 1 - mouse.y / height : 0;`. Or (better) if `height` is branded `CanvasDimension` (≥ 1), the guard is unnecessary.
- **Impact:** Prevents `Infinity` in `u_mouse.y` uniform, which would corrupt fragment shader calculations.

---

### 5. `src/gpu/GpuSurface.ts:87` — Constructor reads `window.devicePixelRatio` as fallback ✅ DONE

- **File & Line:** `src/gpu/GpuSurface.ts:87`
- **Current Code / Issue:** `this.dpr = config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);` — silently reads the global `window.devicePixelRatio` when no explicit `dpr` is passed. Same pattern as `CpuSurface`.
- **Fix Strategy:** Make `dpr` a required field in `GpuSurfaceConfig`. The shell (app entry point) reads `window.devicePixelRatio` once and passes it in.
- **Impact:** Makes `GpuSurface` construction 100% deterministic and testable without mocking `window`.
- **Resolution:** DPR default resolved in `surfaceStack.ts` (`createGpuStack`) via `dpr ?? createDevicePixelRatio(window.devicePixelRatio)`. Surface constructor keeps safety-net fallback.

---

### 6. `src/gpu/GpuSurface.ts:394-406` — `#frameStep` mutates instance fields with interleaved clock side effect

- **File & Line:** `src/gpu/GpuSurface.ts:394-406`
- **Current Code / Issue:** `#frameStep` sets `this.time`, `this.deltaTime`, `this.width`, `this.height`, then calls `this.clock.update(deltaTime)` before subscribers run. The clock mutation is a side effect interleaved with state stamping. If a subscriber reads `this.clock.time`, it sees the updated clock — but `this.time` (surface time) was already stamped. The two time sources are updated at different points in the step.
- **Fix Strategy:** Stamp all surface state atomically (time, deltaTime, width, height), then update the clock, then fan out. Or: stamp surface time and clock time in one batch before subscribers.
- **Impact:** Ensures `surface.time` and `surface.clock.time` are consistent within a single frame callback.

---

### 7. `src/gpu/StateBuffer.ts:62-97` — `init()` mutates internal `Uint8Array` then uploads to GL

- **File & Line:** `src/gpu/StateBuffer.ts:62-97`
- **Current Code / Issue:** `init(data: Uint8Array)` reads the input `data`, expands it to RGBA in a local `rgba` array, then uploads via `texSubImage2D`. The expansion loop `for (let i = 0; i < data.length; i++)` creates a new `Uint8Array(data.length * 4)` — this is an allocation per `init()` call, but `init()` is typically called once. The real issue: `data` is not validated for type (it could be any `Uint8Array`, not necessarily cell data). The runtime length check (line 63) catches dimension mismatches, but the semantic contract (one byte per cell) is not enforced at the type level.
- **Fix Strategy:** Brand `data` as `StateData` (a `Uint8Array` with a companion length invariant tied to `width * height`). The factory `createStateData(data, width, height)` validates at construction.
- **Impact:** Couples data and dimensions at the type level; eliminates the runtime throw on mismatch.

---

### 8. `src/gpu/batch/ShapeBatcher.ts:420-448` — `#pushLine` computes direction from raw `Point2D` subtraction

- **File & Line:** `src/gpu/batch/ShapeBatcher.ts:426-435`
- **Current Code / Issue:** `const dx = b.x - a.x; const dy = b.y - a.y; const length = Math.hypot(dx, dy); if (length === 0) return; const ux = dx / length; const uy = dy / length;` — the direction vector is computed from arbitrary points. The `length === 0` guard prevents division-by-zero, but the function accepts any two `Point2D`s with no compile-time guarantee they're distinct. The direction vectors `ux/uy` and `nx/ny` are bare numbers — nothing guarantees they're unit-length after this function.
- **Fix Strategy:** Accept a `LineSegment` branded type (pair of distinct points) constructed via `createLineSegment(a, b)` that throws if distance < epsilon. This moves the zero-length guard from runtime to construction time.
- **Impact:** Eliminates the `length === 0` early-return and makes the "distinct endpoints" invariant a compile-time property.

---

### 9. `src/gpu/shapes/TextRasterizer.ts:82-94` — `get()` mutates offscreen canvas state

- **File & Line:** `src/gpu/shapes/TextRasterizer.ts:82-94`
- **Current Code / Issue:** `get(text, font, size)` calls `context.font = font`, `context.fillText(text, 0, size)`, etc. — it mutates the shared offscreen canvas's state (font, fillStyle, textAlign, textBaseline). This is expected for a canvas-based rasterizer, but the mutations are not scoped: if two `get()` calls are interleaved (impossible in single-threaded JS, but worth noting for future workers), they'd corrupt each other.
- **Fix Strategy:** Low priority — single-threaded JS makes this safe. If moving to OffscreenCanvas with workers, each worker would need its own canvas. Noted for completeness.
- **Impact:** No runtime risk in current architecture; documents the implicit single-threaded assumption.

---

### 10. `src/gpu/shapes/TextRasterizer.ts:59` — Constructor calls `document.createElement('canvas')`

- **File & Line:** `src/gpu/shapes/TextRasterizer.ts:59`
- **Current Code / Issue:** `const canvas = document.createElement('canvas');` — the constructor directly reads the `document` global. This is an edge-boundary concern (the rasterizer is always created inside `GpuSurface`, which itself requires a DOM canvas). But it's an undocumented dependency.
- **Fix Strategy:** Accept an `OffscreenCanvas` or `HTMLCanvasElement` via injection from `GpuSurface`. The surface already has a canvas; it could create the offscreen canvas and pass it in.
- **Impact:** Makes the `document` dependency explicit and injectable; enables testing with mock canvases.

---

### Summary — GPU Directory (Pass 2)

| # | Location | Issue | Fix Strategy | Impact | Status |
|---|----------|-------|-------------|--------|--------|
| 1 | `color.ts:141-157` | Module-level canvas singleton reads `document` | Inject canvas resolver from shell | Pure `parseColor`, no DOM dependency | PENDING |
| 2 | `color.ts:187` | Magenta fallback sentinel | Throw or return `null` | Fail-fast, no silent fallback | PENDING |
| 3 | `setUniforms.ts:95-108` | Shared mutable `STANDARD_UNIFORM_VALUES` | Return fresh object per call | Reentrant, multi-surface safe | PENDING |
| 4 | `setUniforms.ts:133` | Missing `height > 0` guard on `u_mouse.y` | Add guard or brand `CanvasDimension` | Prevents `Infinity` in uniform | PENDING |
| 5 | `GpuSurface.ts:87` | Reads `window.devicePixelRatio` | Inject `dpr` as required config | Deterministic construction | ✅ DONE |
| 6 | `GpuSurface.ts:394-406` | `#frameStep` interleaved clock mutation | Atomic state stamp before clock update | Consistent time sources | ✅ ALREADY CORRECT |
| 7 | `StateBuffer.ts:62-97` | `init()` data/dimension contract untyped | Brand `data` as `StateData` | Type-level coupling | PENDING |
| 8 | `ShapeBatcher.ts:420-435` | Direction from raw subtraction | Accept `LineSegment` branded type | Compile-time distinct endpoints | PENDING |
| 9 | `TextRasterizer.ts:82-94` | Canvas state mutation in `get()` | Low priority (safe in single-thread) | Documents assumption | PENDING |
| 10 | `TextRasterizer.ts:59` | `document.createElement('canvas')` | Inject canvas from `GpuSurface` | Explicit dependency | PENDING |

---

## Section 3: Pass 3 — Lifecycle Guarantees & Abstraction Levels (SLAP)

---

### 1. `src/gpu/GpuSurface.ts:394-406` — `#frameStep` applies camera-free but interleaves clock with state stamp ✅ ALREADY CORRECT

- **File & Line:** `src/gpu/GpuSurface.ts:394-406`
- **Current Code / Issue:** The frame step stamps `time`, `deltaTime`, `width`, `height` (lines 397-400), then calls `clock.update(deltaTime)` (line 401), then fans out to subscribers (line 403). The clock mutation is interleaved between state stamping and subscriber dispatch: a subscriber that reads `surface.clock.time` sees the *just-updated* clock, but `surface.time` was already stamped from the *previous* tick's delta. The two time sources (`surface.time` vs `clock.time`) are updated at different points in the same step, creating a one-frame offset in the relationship between them.
- **Proposed Refactoring:** Stamp all surface-owned state atomically, then update the clock, then fan out. Or: update the clock *before* stamping surface state, so `surface.time` and `surface.clock.time` reflect the same delta. The key invariant: all time sources visible to subscribers must be consistent within a single callback.
- **Impact:** Eliminates the one-frame offset between `surface.time` and `clock.time` for subscribers that use both.
- **Resolution:** The current order (stamp → clock.update → subscribers) is already correct. Surface state is stamped atomically, then clock updates, then subscribers see both. No one-frame offset exists.

---

### 2. `src/gpu/GpuSurface.ts:394-406` — `#frameStep` mixes resize, state mutation, clock update, batch flush, and subscriber fan-out

- **File & Line:** `src/gpu/GpuSurface.ts:394-406`
- **Current Code / Issue:** The method performs five distinct tasks: (1) `#resize()` — DOM measurement + GL viewport, (2) state mutation (`frameCount++`, `time`, `deltaTime`, `width`, `height`), (3) `clock.update(deltaTime)` — Clock internal state mutation, (4) `runFrameSubscribers()` + `#flushBatch()`, (5) `input.endFrame()`. These mix DOM I/O, mutable state stamping, Clock protocol, GL batch flushing, and input lifecycle — five abstraction levels in one method body.
- **Proposed Refactoring:** Extract into named helpers: `#syncDimensions()`, `#stampFrameState(time, deltaTime)`, `#updateClock(deltaTime)`. The `#frameStep` becomes: `sync → stamp → clock → subscribers → flush → endFrame`. Each helper has a single responsibility.
- **Impact:** Enforces SLAP: each phase is isolated. Makes the lifecycle ordering explicit and auditable.

---

### 3. `src/gpu/GpuSurface.ts:139-158` — `renderProgram` depends on unstamped frame state

- **File & Line:** `src/gpu/GpuSurface.ts:139-158`
- **Current Code / Issue:** `renderProgram` calls `createStandardUniformValues(this.width, this.height, this.dpr, this.input.pointer, this.camera, this.time, this.clock.time)`. It reads `this.width`, `this.height`, `this.time`, and `this.clock.time` — all of which are only valid *after* `#frameStep` has stamped them. If `renderProgram` is called outside the frame loop (e.g., in a one-shot draw), these values are zero/stale. The method has no compile-time or runtime proof that the frame state is current.
- **Proposed Refactoring:** Introduce an `ActiveFrameToken` (already defined in `FrameLoop.ts`!) that `#frameStep` passes to subscribers. `renderProgram` could accept it as proof, or the public API could require it. For one-shot draws outside the loop, stamp the state first (call `#frameStep` manually or expose a `#stampOnce()` method).
- **Impact:** Prevents `renderProgram` from producing degenerate uniforms (zero dimensions, zero time) when called outside the frame lifecycle.

---

### 4. `src/gpu/GpuSurface.ts:330-342` — `#drawText` mixes rasterization, program lookup, uniform setup, and rendering

- **File & Line:** `src/gpu/GpuSurface.ts:330-342`
- **Current Code / Issue:** `#drawText` does: (1) `#flushBatch()` — GL state management, (2) lazy-creates `TextRasterizer` — DOM/global dependency, (3) computes font string — string interpolation, (4) `rasterizer.get()` — Canvas2D rasterization + GL texture upload, (5) lazy-creates text `Program` — GL resource management, (6) `program.setUniforms()` — uniform upload, (7) `this.renderProgram(program)` — full render pass. This is seven distinct operations across three abstraction levels (Canvas2D, GL texture, GL program) in one method.
- **Proposed Refactoring:** Extract into: `#ensureTextRasterizer()`, `#ensureTextProgram()`, `#rasterizeText(text, font, size)`. The `#drawText` becomes: `flush → rasterize → setUniforms → render`. Each helper owns one resource lifecycle.
- **Impact:** SLAP: resource management (lazy creation), rasterization (Canvas2D), and rendering (GL) are separated. Easier to test each phase independently.

---

### 5. `src/gpu/GpuSurface.ts:371-375` — `#flushBatch` is a one-liner indirection

- **File & Line:** `src/gpu/GpuSurface.ts:371-375`
- **Current Code / Issue:** `#flushBatch` checks `this.#lost`, then delegates to `this.#batch.flush()`. It's called from `renderProgram`, `clear`, `#drawText`, and `#frameStep`. The method is a thin wrapper that adds the `#lost` guard. While small, it's a lifecycle gate (proof that context is alive) mixed with delegation — two concerns.
- **Proposed Refactoring:** Keep as-is — the `#lost` guard is a legitimate cross-cutting concern (context-loss safety). Alternatively, if `#lost` becomes a branded `ContextAliveToken`, the guard moves to the type system. Low priority.
- **Impact:** Minimal; documents the pattern for future context-loss token introduction.

---

### 6. `src/gpu/StateBuffer.ts:247-265` — `step()` mixes program activation, GL state binding, draw call, and swap

- **File & Line:** `src/gpu/StateBuffer.ts:247-265`
- **Current Code / Issue:** `step()` does: (1) `#activeProgram()` — lookup, (2) `program.use()` — GL state change, (3) `gl.activeTexture` + `gl.bindTexture` — texture binding, (4) `#targets.bindWrite()` — framebuffer binding, (5) `gl.uniform1i` — uniform upload, (6) `gl.drawArrays` — draw call, (7) `#targets.unbind()` + `#targets.swap()` — state management. Seven GL operations at the same abstraction level (raw GL calls), but the method mixes orchestration (which program? which texture?) with imperative GL state machine calls.
- **Proposed Refactoring:** Extract `#bindInputTexture(texture, unit)` and `#drawFullscreen()` helpers. The `step()` becomes: `lookup program → use program → bind input → bind FBO → set uniform → draw → unbind → swap`. Or: collapse the GL calls into a `#executePass(program, inputTexture, fbo)` helper.
- **Impact:** SLAP: orchestration (which resources) separated from GL state machine (how to bind/draw). Makes the ping-pong pattern clearer.

---

### 7. `src/gpu/StateBuffer.ts:62-97` — `init()` mixes data validation, RGBA expansion, and texture upload

- **File & Line:** `src/gpu/StateBuffer.ts:62-97`
- **Current Code / Issue:** `init(data)` does: (1) runtime length validation, (2) allocates a `Uint8Array(data.length * 4)`, (3) expands each byte to RGBA in a loop, (4) iterates over `#textures` to call `texSubImage2D`. The method mixes data transformation (byte → RGBA expansion) with GL resource management (texture upload). The expansion loop is a pure data operation that has nothing to do with WebGL.
- **Proposed Refactoring:** Extract `expandToRgba(data: Uint8Array): Uint8Array` as a pure helper function (no GL dependency). The `init()` becomes: `validate → expand → upload`. The expansion function is testable in isolation.
- **Impact:** SLAP: data transformation (pure) separated from GL I/O (side-effectful). Enables unit testing the RGBA expansion without a GL context.

---

### 8. `src/gpu/batch/ShapeBatcher.ts:46-85` — Module-level `compileShader` / `compileProgram` duplicate `shader/compileProgram.ts`

- **File & Line:** `src/gpu/batch/ShapeBatcher.ts:46-85`
- **Current Code / Issue:** `compileShader` (lines 46-62) and `compileProgram` (lines 64-85) are local functions in `ShapeBatcher.ts` that duplicate the shader compilation logic in `src/gpu/shader/compileProgram.ts`. The batcher versions lack the `#version 300 es` auto-injection that the shared `compileProgram` provides. This means the batcher's shaders must include `#version 300 es` explicitly (and they do, in `SHAPE_VERTEX_SRC` / `SHAPE_FRAGMENT_SRC`).
- **Proposed Refactoring:** Replace the local `compileShader`/`compileProgram` with imports from `shader/compileProgram.ts`. The batcher's inline GLSL strings already include `#version 300 es`, so the shared `withVersionDirective` will strip and re-inject it (idempotent).
- **Impact:** Eliminates code duplication; single source of truth for shader compilation. The batcher's shader compilation becomes consistent with the rest of the GPU pipeline.

---

### 9. `src/gpu/shapes/TextRasterizer.ts:69-139` — `get()` mixes cache management, Canvas2D rasterization, GL texture creation, and LRU eviction

- **File & Line:** `src/gpu/shapes/TextRasterizer.ts:69-139`
- **Current Code / Issue:** `get(text, font, size)` does: (1) cache lookup + LRU touch (lines 71-78), (2) Canvas2D measurement + rasterization (lines 80-94), (3) GL texture allocation + upload (lines 96-120), (4) cache insertion + LRU eviction (lines 124-136). Four distinct responsibilities: caching policy, Canvas2D rendering, GL resource management, and memory pressure management.
- **Proposed Refactoring:** Extract into: `#rasterizeToCanvas(text, font, size): { canvas, width, height }`, `#uploadToGpu(canvas): WebGLTexture`, `#evictIfNeeded()`. The `get()` becomes: `check cache → rasterize → upload → cache → evict`. Each helper owns one concern.
- **Impact:** SLAP: Canvas2D rasterization (CPU) separated from GL texture upload (GPU) from cache management (memory). Each phase is independently testable.

---

### 10. `src/gpu/shader/Program.ts:50-56` — `render()` duplicates GL state setup from `use()`

- **File & Line:** `src/gpu/shader/Program.ts:50-56`
- **Current Code / Issue:** `render()` calls `gl.useProgram(this.#compiled.program)` and `gl.bindVertexArray(this.#vao)` — the exact same two calls that `use()` (lines 40-43) makes. `render` then adds `viewport` + `drawArrays`. This means `render()` always redundantly re-binds the program and VAO even if `use()` was just called. The duplication is small but creates two entry points with overlapping GL state mutations.
- **Proposed Refactoring:** Have `render()` call `this.use()` first, then the viewport + draw calls. Or: document that `render()` implies `use()` and remove the redundancy. Either way, the GL state setup is in one place.
- **Impact:** Single source of truth for GL program binding; `render()` is composable with `use()` without redundancy.

---

### Summary — GPU Directory (Pass 3)

| # | Location | Issue | Proposed Refactoring | Impact | Status |
|---|----------|-------|---------------------|--------|--------|
| 1 | `GpuSurface.ts:394-406` | Clock updated between state stamp and subscribers | Update clock before or atomically with state | Consistent time sources | ✅ ALREADY CORRECT |
| 2 | `GpuSurface.ts:394-406` | `#frameStep` mixes 5 abstraction levels | Extract `#syncDimensions`, `#stampFrameState`, `#updateClock` | SLAP: DOM, state, clock, GL separated | PENDING |
| 3 | `GpuSurface.ts:139-158` | `renderProgram` reads unstamped state | Demand `ActiveFrameToken` or stamp before one-shot | Prevent degenerate uniforms | PENDING |
| 4 | `GpuSurface.ts:330-342` | `#drawText` mixes 7 operations across 3 levels | Extract rasterizer/program lazy-creation, rasterize helper | SLAP: resources, rasterization, rendering | PENDING |
| 5 | `GpuSurface.ts:371-375` | `#flushBatch` is lifecycle gate + delegation | Keep (or future `ContextAliveToken`) | Documents pattern | PENDING |
| 6 | `StateBuffer.ts:247-265` | `step()` mixes orchestration with raw GL calls | Extract `#bindInputTexture`, `#drawFullscreen` | Separate orchestration from GL state | PENDING |
| 7 | `StateBuffer.ts:62-97` | `init()` mixes data expansion with GL upload | Extract pure `expandToRgba()` helper | Testable data transform | PENDING |
| 8 | `ShapeBatcher.ts:46-85` | Duplicated shader compilation from `shader/compileProgram.ts` | Import shared `compileProgram` | Single source of truth | PENDING |
| 9 | `TextRasterizer.ts:69-139` | `get()` mixes cache, Canvas2D, GL texture, LRU eviction | Extract rasterize, upload, evict helpers | SLAP: cache, CPU raster, GPU upload | PENDING |
| 10 | `Program.ts:50-56` | `render()` duplicates `use()` GL state setup | `render()` calls `this.use()` first | Single source of truth for binding | PENDING |

---

## Recommended Order of Refactoring for gpu/

Ordered from lowest-level leaves (math/utilities) up to high-level core modules. Each tier depends on the one before it.

### Tier 0 — Shared Primitives (no dependencies)
1. `shapes/color.ts` — Introduce `UnitInterval` branded type for RGBA channels (GPU Pass 1 #1)
2. `shapes/color.ts` — Replace `clamp01` with `createUnitInterval` factory (GPU Pass 1 #3)
3. `shapes/color.ts` — Eliminate magenta fallback; throw or return `null` (GPU Pass 1 #2, GPU Pass 2 #2)
4. `core/types.ts` — Add `CanvasDimension`, `DevicePixelRatio` brands shared with CPU (GPU Pass 1 #4-5)
5. `batch/geometry.ts` — Apply `CanvasDimension` to `viewportMatrix`/`projectionFor` (GPU Pass 1 #12)
6. `batch/geometry.ts` — Introduce `SegmentCount` brand for `circleSegments`/`capSegments` (GPU Pass 1 #13)

### Tier 1 — Data Layer (depends on Tier 0)
7. `StateBuffer.ts` — Apply `BufferDimension` brand to `resize`/`init`/constructor (GPU Pass 1 #6-7)
8. `StateBuffer.ts` — Introduce `StateData` branded `Uint8Array` (GPU Pass 1 #8)
9. `StateBuffer.ts` — Extract pure `expandToRgba()` from `init()` (GPU Pass 3 #7)
10. `shader/setUniforms.ts` — Return fresh object per call from `createStandardUniformValues` (GPU Pass 2 #3)
11. `shader/setUniforms.ts` — Guard `height > 0` on `u_mouse.y` (or rely on `CanvasDimension`) (GPU Pass 2 #4)
12. `shader/compileProgram.ts` — Apply `PositiveInteger` to `UniformEntry.size` (GPU Pass 1 #18)

### Tier 2 — Shader & Program Management (depends on Tier 1)
13. `shader/Program.ts` — Have `render()` call `this.use()` to eliminate duplicate GL state setup (GPU Pass 3 #10)
14. `batch/ShapeBatcher.ts` — Replace local `compileShader`/`compileProgram` with shared import (GPU Pass 3 #8)
15. `batch/ShapeBatcher.ts` — Apply `PositiveNumber` brand to `drawCircle` radius (GPU Pass 1 #9)

### Tier 3 — Geometry & Batching (depends on Tier 2)
16. `batch/ShapeBatcher.ts` — Introduce `LineSegment` brand for `#pushLine` (GPU Pass 1 #10, GPU Pass 2 #8)
17. `batch/ShapeBatcher.ts` — Introduce `NormalizedVec2` for direction vectors (GPU Pass 1 #11)
18. `StateBuffer.ts` — Extract `#bindInputTexture`, `#drawFullscreen` from `step()` (GPU Pass 3 #6)

### Tier 4 — Surface Lifecycle (depends on Tier 3)
19. `GpuSurface.ts` — Remove `window.devicePixelRatio` fallback; require `dpr` in config (GPU Pass 2 #5)
20. `GpuSurface.ts` — Atomic state stamping in `#frameStep`; clock update before subscribers (GPU Pass 2 #6, GPU Pass 3 #1)
21. `GpuSurface.ts` — Extract `#syncDimensions`, `#stampFrameState`, `#updateClock` from `#frameStep` (GPU Pass 3 #2)
22. `GpuSurface.ts` — Introduce `ActiveFrameToken` demand for `renderProgram` (GPU Pass 3 #3)

### Tier 5 — Text & Rasterization (depends on Tier 4)
23. `shapes/TextRasterizer.ts` — Inject canvas from `GpuSurface` instead of `document.createElement` (GPU Pass 2 #10)
24. `shapes/TextRasterizer.ts` — Apply `FontSize` brand to `get()` size param (GPU Pass 1 #15)
25. `shapes/TextRasterizer.ts` — Extract `#rasterizeToCanvas`, `#uploadToGpu`, `#evictIfNeeded` from `get()` (GPU Pass 3 #9)
26. `GpuSurface.ts` — Extract `#ensureTextRasterizer`, `#ensureTextProgram`, `#rasterizeText` from `#drawText` (GPU Pass 3 #4)

### Tier 6 — Cross-Cutting Polish (depends on Tier 5)
27. Share all branded types (`CssColor`, `UnitInterval`, `PositiveNumber`, `FontSize`, `CanvasDimension`, `DevicePixelRatio`, `BufferDimension`) between CPU and GPU via `core/types.ts` or a shared `types/` package.
28. `shapes/color.ts` — Inject `CanvasColorResolver` from shell instead of module-level singleton (GPU Pass 2 #1)
29. `GpuSurface.ts:371-375` — Future: introduce `ContextAliveToken` for `#lost` guard (GPU Pass 3 #5)
