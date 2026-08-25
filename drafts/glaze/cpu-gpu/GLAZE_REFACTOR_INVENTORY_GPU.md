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
