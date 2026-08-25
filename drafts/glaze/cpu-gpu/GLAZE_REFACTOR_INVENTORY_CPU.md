# GLAZE Refactor Inventory — CPU

## Section 1: Pass 1 — Mathematical Invariants & Branded Types

---

### 1. `src/cpu/shapes/types.ts` — `Color` is a bare `string`

- **File & Line:** `src/cpu/shapes/types.ts:1`
- **Current Code / Issue:** `export type Color = string;` — any string is accepted; a typo like `"#xyz"` silently propagates.
- **Proposed Branded Type:** `CssColor` (branded `string`) with a `createCssColor(s: string): CssColor` factory that validates hex, rgb(), hsl(), or named-color syntax at construction.
- **Impact:** Eliminates the need for runtime fallbacks in `parseColor` (which silently resolves to magenta on unrecognized input). Every `DrawStyle.fill`, `DrawStyle.stroke`, and `TextStyle.fill` would be type-safe.

---

### 2. `src/cpu/shapes/types.ts` — `lineWidth` is a bare `number`

- **File & Line:** `src/cpu/shapes/types.ts:13`
- **Current Code / Issue:** `lineWidth?: number` in `DrawStyle` — accepts negatives, zero, `Infinity`, `NaN`.
- **Proposed Branded Type:** `PositiveNumber` (branded `number`, value > 0) or a new `LineWidth` brand.
- **Impact:** `CpuSurface.#begin`, `#strokeLine`, `#drawText`, and `ShapeBatcher.drawCircle/drawRect/drawLine` all feed `lineWidth` directly into Canvas2D / WebGL. A branded type makes negative/zero widths a compile-time error.

---

### 3. `src/cpu/shapes/types.ts` — `fontSize` is a bare `number`

- **File & Line:** `src/cpu/shapes/types.ts:19`
- **Current Code / Issue:** `fontSize?: number` in `TextStyle` — zero or negative font sizes would produce invisible text or Canvas2D errors.
- **Proposed Branded Type:** `PositiveNumber` or a dedicated `FontSize` brand.
- **Impact:** `CpuSurface.#drawText` and `GpuSurface.#drawText` both use `fontSize` for `ctx.font` and `rasterizer.get()` respectively. Compile-time enforcement prevents degenerate text rendering.

---

### 4. `src/cpu/CpuSurface.ts` — `dpr` is a bare `number`

- **File & Line:** `src/cpu/CpuSurface.ts:41`
- **Current Code / Issue:** `readonly dpr: number` — a zero or negative DPR would cause division-by-zero or inverted scaling in `#resize()` and `applyCamera()`.
- **Proposed Branded Type:** `DevicePixelRatio` — a `PositiveNumber` brand (always >= 1 in practice).
- **Impact:** `#resize()` at line 309 does `Math.round(cssWidth * this.dpr)` and `applyCamera()` at line 113 does `context.scale(this.dpr, this.dpr)`. A branded type eliminates zero/negative DPR at construction time.

---

### 5. `src/cpu/CpuSurface.ts` — `width`/`height` are bare `number` fields

- **File & Line:** `src/cpu/CpuSurface.ts:39-40`
- **Current Code / Issue:** `width = 0; height = 0` — zero-dimension canvas is used as an initial value, but downstream code (e.g., `clear()` line 101, `GpuSurface.renderProgram`) divides by or multiplies with these values.
- **Proposed Branded Type:** `CanvasDimension` (branded `number`, value >= 1) — set after `#resize()`.
- **Impact:** `clear()` uses `this.canvas.width/height` directly; `GpuSurface.createStandardUniformValues` divides by `width`/`height` for `u_aspect` and `u_mouse`. A branded type catches zero-dimension misuse at compile time.

---

### 6. `src/cpu/CpuSurface.ts` — `circle()` accepts bare `radius`

- **File & Line:** `src/cpu/CpuSurface.ts:160-163`
- **Current Code / Issue:** `radius: number` — negative radius would produce a Canvas2D arc error; zero is degenerate.
- **Proposed Branded Type:** `PositiveNumber` or `Radius` brand.
- **Impact:** Canvas2D `arc()` throws if radius is negative. Compile-time enforcement prevents runtime exceptions.

---

### 7. `src/cpu/CpuSurface.ts` — `rect()` accepts bare `w`/`h`

- **File & Line:** `src/cpu/CpuSurface.ts:119-121`
- **Current Code / Issue:** `w: number, h: number` — zero or negative dimensions produce invisible/degenerate rects; no runtime guard.
- **Proposed Branded Type:** `PositiveNumber` (or allow zero with a `NonNegativeNumber` brand, since zero-area rects are valid no-ops).
- **Impact:** Prevents accidental degenerate rects from being drawn silently.

---

### 8. `src/cpu/CpuSurface.ts` — `#resize()` clamps CSS dimensions at runtime

- **File & Line:** `src/cpu/CpuSurface.ts:307-308`
- **Current Code / Issue:** `Math.max(1, this.canvas.clientWidth)` / `Math.max(1, this.canvas.clientHeight)` — runtime guard against zero-width canvas.
- **Proposed Branded Type:** `CanvasDimension` — the `Math.max(1, ...)` becomes part of the branded factory `createCanvasDimension(n)`, removing the runtime clamp.
- **Impact:** Moves the invariant from imperative code to the type system; the dimension can never be < 1 once constructed.

---

### 9. `src/cpu/CpuSurface.ts` — `fontSize` defaults to `16` without validation

- **File & Line:** `src/cpu/CpuSurface.ts:369`
- **Current Code / Issue:** `String(fontSize ?? 16)` — the fallback `16` is fine, but a caller can pass `0`, `-5`, or `NaN`.
- **Proposed Branded Type:** `FontSize` (via the same branded `TextStyle.fontSize` from item 3).
- **Impact:** Ensures the fallback path and user-supplied path both produce valid font sizes.

---

### Summary — CPU Directory

| # | Location | Current Type | Proposed Brand | Eliminates |
|---|----------|-------------|---------------|------------|
| 1 | `types.ts:1` | `Color = string` | `CssColor` | Silent magenta fallback on typos |
| 2 | `types.ts:13` | `lineWidth?: number` | `PositiveNumber` | Negative/zero stroke width |
| 3 | `types.ts:19` | `fontSize?: number` | `PositiveNumber` | Zero/negative font size |
| 4 | `CpuSurface.ts:41` | `dpr: number` | `DevicePixelRatio` | Zero/negative DPR |
| 5 | `CpuSurface.ts:39-40` | `width/height: number` | `CanvasDimension` | Zero-dimension canvas misuse |
| 6 | `CpuSurface.ts:160` | `radius: number` | `PositiveNumber` | Negative arc radius (Canvas2D throws) |
| 7 | `CpuSurface.ts:119-121` | `w/h: number` | `PositiveNumber` | Degenerate rect dimensions |
| 8 | `CpuSurface.ts:307-308` | `Math.max(1, ...)` runtime | `CanvasDimension` factory | Runtime clamping |
| 9 | `CpuSurface.ts:369` | `fontSize ?? 16` | `FontSize` | User-supplied invalid size |

---

## Section 2: Pass 2 — Dishonesty & Side-Effects Isolation

---

### 1. `src/cpu/CpuSurface.ts:59` — Constructor reads `window.devicePixelRatio` as fallback

- **File & Line:** `src/cpu/CpuSurface.ts:59`
- **Current Code / Issue:** `this.dpr = config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);` — silently reads the global `window.devicePixelRatio` when no explicit `dpr` is passed. This is a hidden global environment read that makes the surface non-deterministic: same config produces different DPR on a Retina display vs a standard monitor.
- **Fix Strategy:** Make `dpr` a required field in `CpuSurfaceConfig` (or inject a `() => number` accessor). The shell (app entry point) reads `window.devicePixelRatio` once and passes it in.
- **Impact:** Makes `CpuSurface` construction 100% deterministic and testable without mocking `window`.

---

### 2. `src/cpu/CpuSurface.ts:52` — Constructor reads `canvas.getContext('2d')` from injected DOM element

- **File & Line:** `src/cpu/CpuSurface.ts:52`
- **Current Code / Issue:** `config.canvas.getContext('2d')` — while the canvas is injected via config, the context acquisition is a side effect that can fail (`null` return). The error is thrown, but the pattern mixes DI with imperative DOM queries.
- **Fix Strategy:** Already acceptable for an edge-boundary constructor (the canvas is injected). No change needed — noted for completeness.
- **Impact:** Low. The canvas is the app shell's responsibility; this is a valid edge boundary.

---

### 3. `src/cpu/CpuSurface.ts:292-303` — `#frameStep` mutates instance fields before subscribers run

- **File & Line:** `src/cpu/CpuSurface.ts:292-303`
- **Current Code / Issue:** `#frameStep` writes `this.time`, `this.deltaTime`, `this.width`, `this.height`, then calls `this.#loop.runFrameSubscribers()` and `this.input.endFrame(frame)`. Subscribers see half-updated state: `width`/`height` are set, but `input` hasn't ended the frame yet. If a subscriber reads `input.wasKeyPressed`, it sees stale per-frame state.
- **Fix Strategy:** Split the frame step into two phases: (1) stamp all state atomically (`time`, `deltaTime`, `width`, `height`), (2) fan out to subscribers, (3) `endFrame`. Currently phases 1 and 3 overlap. The ordering should be: stamp → subscribers → endFrame. The current code does stamp → subscribers → endFrame, but `width`/`height` are set mid-step rather than from a pre-computed snapshot.
- **Impact:** Eliminates the window where a subscriber sees inconsistent frame state. Makes the update cycle a clean state-machine.

---

### 4. `src/gpu/GpuSurface.ts:87` — Constructor reads `window.devicePixelRatio` as fallback

- **File & Line:** `src/gpu/GpuSurface.ts:87`
- **Current Code / Issue:** `this.dpr = config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);` — identical pattern to CPU item 1.
- **Fix Strategy:** Same as CPU item 1: make `dpr` required in `GpuSurfaceConfig`, inject from app shell.
- **Impact:** Makes `GpuSurface` construction deterministic.

---

### 5. `src/gpu/GpuSurface.ts:394-406` — `#frameStep` mutates instance fields with interleaved side effects

- **File & Line:** `src/gpu/GpuSurface.ts:394-406`
- **Current Code / Issue:** `#frameStep` sets `this.time`, `this.deltaTime`, `this.width`, `this.height`, then calls `this.clock.update(deltaTime)` before subscribers run. The clock mutation is a side effect interleaved with state stamping. If a subscriber reads `this.clock.time`, it sees the updated clock — but `this.time` (surface time) was already stamped. The two time sources are updated at different points in the step.
- **Fix Strategy:** Stamp all surface state atomically, then update the clock, then fan out. Or: stamp surface time and clock time in one batch before subscribers.
- **Impact:** Ensures `surface.time` and `surface.clock.time` are consistent within a single frame callback.

---

### 6. `src/gpu/shapes/color.ts:141-157` — Module-level `canvasContext` singleton reads `document`

- **File & Line:** `src/gpu/shapes/color.ts:141-157`
- **Current Code / Issue:** `let canvasContext: CanvasRenderingContext2D | null = null;` at module scope. `parseViaCanvas` lazily creates a hidden `<canvas>` via `document.createElement('canvas')` and caches the 2D context. This is: (a) a hidden global state read (`document`), (b) non-deterministic (DOM must exist), (c) a shared mutable singleton across all callers. Two concurrent `parseColor` calls share the same hidden canvas.
- **Fix Strategy:** Inject a `CanvasColorResolver` interface from the app shell: `{ resolve(name: string): string | null }`. The shell creates the canvas, passes it in. `parseColor` receives it as a parameter or through a factory. Alternatively, move `parseViaCanvas` to the edge (app shell) and have `parseColor` only handle hex/rgb/hsl/named.
- **Impact:** Eliminates the hidden DOM dependency; `parseColor` becomes pure for hex/rgb/hsl/named colors. Canvas-based fallback is an explicit edge concern.

---

### 7. `src/gpu/shader/setUniforms.ts:95-108` — Shared mutable `STANDARD_UNIFORM_VALUES` singleton

- **File & Line:** `src/gpu/shader/setUniforms.ts:95-108`
- **Current Code / Issue:** `U_RESOLUTION`, `U_MOUSE`, `U_CAMERA` are module-level arrays mutated in-place by `createStandardUniformValues`. The function is called once per frame per surface. If two `GpuSurface` instances exist and both call `createStandardUniformValues` in the same microtask (unlikely but possible), they overwrite each other's values. The shared object means the previous call's values are lost.
- **Fix Strategy:** Return a fresh object `{ u_resolution: [w*dpr, h*dpr], u_aspect: ..., ... }` per call. The allocation is negligible (one object + three small arrays per frame) and eliminates the shared-mutation hazard. If zero-allocation is critical, use a `FrameLocalUniforms` class owned by each surface.
- **Impact:** Makes `createStandardUniformValues` reentrant and safe for multiple surfaces. Removes the hidden "last writer wins" race.

---

### 8. `src/gpu/shader/setUniforms.ts:133` — Missing `height > 0` guard on `u_mouse.y`

- **File & Line:** `src/gpu/shader/setUniforms.ts:133`
- **Current Code / Issue:** `U_MOUSE[1] = 1 - mouse.y / height;` — no guard against `height === 0` (unlike line 132 which guards `width > 0` for `U_MOUSE[0]`). If `height` is 0, `u_mouse.y` becomes `Infinity`.
- **Fix Strategy:** Add the same guard: `U_MOUSE[1] = height > 0 ? 1 - mouse.y / height : 0;`. Or (better) if `height` is branded `CanvasDimension` (≥ 1), the guard is unnecessary.
- **Impact:** Prevents `Infinity` in `u_mouse.y` uniform, which would corrupt fragment shader calculations.

---

### 9. `src/gpu/batch/ShapeBatcher.ts:420-448` — `#pushLine` computes direction from raw `Point2D` subtraction

- **File & Line:** `src/gpu/batch/ShapeBatcher.ts:426-435`
- **Current Code / Issue:** `const dx = b.x - a.x; const dy = b.y - a.y; const length = Math.hypot(dx, dy); if (length === 0) return; const ux = dx / length; const uy = dy / length;` — the direction vector is computed from arbitrary points. The `length === 0` guard prevents division-by-zero, but the function accepts any two `Point2D`s with no compile-time guarantee they're distinct. The direction vectors `ux/uy` and `nx/ny` are bare numbers — nothing guarantees they're unit-length after this function.
- **Fix Strategy:** Accept a `LineSegment` branded type (pair of distinct points) constructed via `createLineSegment(a, b)` that throws if distance < epsilon. This moves the zero-length guard from runtime to construction time.
- **Impact:** Eliminates the `length === 0` early-return and makes the "distinct endpoints" invariant a compile-time property.

---

### 10. `src/gpu/shapes/color.ts:187` — `parseColor` returns magenta fallback (silent non-determinism)

- **File & Line:** `src/gpu/shapes/color.ts:187`
- **Current Code / Issue:** Unrecognized strings resolve to `{ r: 1, g: 0, b: 1, a: 1 }` (magenta) — a sentinel value that silently propagates. This is "dishonest" because the function promises to parse *any* string but actually returns a magic fallback for invalid input.
- **Fix Strategy:** Throw on unrecognized input (fail-fast), or return `null` and let callers decide the fallback. The magenta sentinel hides typos like `"bluw"` → hot pink.
- **Impact:** Makes `parseColor` honest: it either returns a valid RGBA or throws. Eliminates the "magenta bug" class.

---

### Summary — CPU Directory (Pass 2)

| # | Location | Issue | Fix Strategy | Impact |
|---|----------|-------|-------------|--------|
| 1 | `CpuSurface.ts:59` | Reads `window.devicePixelRatio` | Inject `dpr` as required config | Deterministic construction |
| 2 | `CpuSurface.ts:52` | `getContext('2d')` side effect | Acceptable edge boundary | N/A (noted) |
| 3 | `CpuSurface.ts:292-303` | `#frameStep` interleaved mutation | Atomic state stamp before subscribers | Consistent frame state |
| 4 | `GpuSurface.ts:87` | Reads `window.devicePixelRatio` | Inject `dpr` as required config | Deterministic construction |
| 5 | `GpuSurface.ts:394-406` | `#frameStep` interleaved clock mutation | Atomic state stamp before clock update | Consistent time sources |
| 6 | `color.ts:141-157` | Module-level canvas singleton reads `document` | Inject canvas resolver from shell | Pure `parseColor`, no DOM dependency |
| 7 | `setUniforms.ts:95-108` | Shared mutable `STANDARD_UNIFORM_VALUES` | Return fresh object per call | Reentrant, multi-surface safe |
| 8 | `setUniforms.ts:133` | Missing `height > 0` guard on `u_mouse.y` | Add guard or brand `CanvasDimension` | Prevents `Infinity` in uniform |
| 9 | `ShapeBatcher.ts:420-435` | Direction from raw subtraction | Accept `LineSegment` branded type | Compile-time distinct endpoints |
| 10 | `color.ts:187` | Magenta fallback sentinel | Throw or return `null` | Fail-fast, no silent fallback |

---

## Section 3: Pass 3 — Lifecycle Guarantees & Abstraction Levels (SLAP)

---

### 1. `src/cpu/CpuSurface.ts:292-304` — `#frameStep` applies camera before stamping frame state

- **File & Line:** `src/cpu/CpuSurface.ts:292-304`
- **Current Code / Issue:** The frame step calls `applyCamera()` at line 295, *then* stamps `this.time`, `this.deltaTime`, `this.width`, `this.height` at lines 297-300. Subscribers (line 302) see the new camera transform but the *previous* frame's time and dimensions. A subscriber that reads `surface.time` during its callback gets stale data for one frame. Additionally, `applyCamera()` uses `this.dpr` and `this.camera`, which are stable, but `this.width`/`this.height` are still zero on the very first frame (they're stamped after `applyCamera`).
- **Proposed Refactoring:** Reorder to stamp all surface state *before* applying camera and fanning out to subscribers: `#resize → frameCount++ → stamp time/deltaTime/width/height → applyCamera → runFrameSubscribers → endFrame`. This makes `applyCamera` a pure function of the just-stamped state.
- **Impact:** Ensures subscribers always see a fully consistent snapshot of the frame; `applyCamera` no longer runs against stale dimension state.

---

### 2. `src/cpu/CpuSurface.ts:292-304` — `#frameStep` mixes resize, state stamping, camera application, and subscriber fan-out

- **File & Line:** `src/cpu/CpuSurface.ts:292-304`
- **Current Code / Issue:** The method performs four distinct tasks: (1) `#resize()` — DOM measurement + canvas buffer sizing, (2) state mutation (`frameCount++`, `time`, `deltaTime`, `width`, `height`), (3) `applyCamera()` — Canvas2D transform setup, (4) subscriber fan-out + input endFrame. These are different abstraction levels — DOM I/O, mutable state mutation, Canvas2D API calls, and orchestration — crammed into one method body. Without section comments, the ordering contract is implicit.
- **Proposed Refactoring:** Extract each phase into a named private helper: `#syncDimensions()`, `#stampFrameState(time, deltaTime)`, `#applyCamera()`. The `#frameStep` becomes a clear 5-line orchestration: `sync → stamp → camera → subscribers → endFrame`. Each helper has a single responsibility.
- **Impact:** Enforces SLAP by isolating DOM I/O, state stamping, and Canvas2D calls. Makes the lifecycle ordering explicit and auditable.

---

### 3. `src/cpu/CpuSurface.ts:360-385` — `#drawText` mixes Canvas2D state mutation with rendering

- **File & Line:** `src/cpu/CpuSurface.ts:360-385`
- **Current Code / Issue:** `#drawText` sets `context.font`, `context.textAlign`, `context.textBaseline`, then conditionally sets `lineWidth`/`strokeStyle` and calls `strokeText`, then sets `fillStyle` and calls `fillText`. The method mixes font configuration (3 fields), stroke configuration (3 fields), and actual draw calls. The `context.save()`/`context.restore()` pattern used in `clear()` is absent here, meaning this method mutates shared context state that bleeds into subsequent calls.
- **Proposed Refactoring:** Wrap the text-drawing block in `context.save()` / `context.restore()` to isolate its state mutations. Extract font config into a `#setFont(textStyle)` helper, and stroke/fill rendering into `#strokeText(text, x, y)` / `#fillText(text, x, y)`.
- **Impact:** Prevents Canvas2D state leakage between draw calls; each helper has a single concern (config vs. rendering).

---

### 4. `src/cpu/CpuSurface.ts:317-330` — `#begin` mixes stroke and fill configuration into one helper

- **File & Line:** `src/cpu/CpuSurface.ts:317-330`
- **Current Code / Issue:** `#begin` calls `context.beginPath()`, then conditionally sets `fillStyle`, then conditionally sets `strokeStyle` + `lineWidth` + `lineJoin` + `lineCap`. It conflates path initialization with *two* independent style configurations (fill and stroke) in one method. Callers that only need fill still enter the stroke branch (and vice versa). The method name `#begin` is vague about what it actually configures.
- **Proposed Refactoring:** Split into `#beginPath()`, `#applyFillStyle(fill)`, `#applyStrokeStyle(stroke, lineWidth)`. The calling shape methods compose these as needed. `#beginPath()` is a one-liner: `context.beginPath()`.
- **Impact:** Each helper has one job (SLAP); callers can apply only the styles they need without dead branches.

---

### 5. `src/cpu/CpuSurface.ts:95-105` — `clear()` applies camera-independent reset with hardcoded path

- **File & Line:** `src/cpu/CpuSurface.ts:95-105`
- **Current Code / Issue:** `clear()` does `save → setTransform(1,0,0,1,0,0) → fillStyle = color → fillRect(0, 0, canvas.width, canvas.height) → restore`. This is correct but mixes: (1) canvas state isolation (`save`/`restore`), (2) transform reset, (3) fill config, (4) the actual clear operation. The method is only 10 lines so it's borderline, but the `save`/`restore` + transform reset pattern is repeated elsewhere (in `applyCamera` line 111).
- **Proposed Refactoring:** Extract `#resetTransform()` helper (the `setTransform(1,0,0,1,0,0)` call) since it's used in both `clear()` and `applyCamera()`. This eliminates the duplicated transform-reset boilerplate.
- **Impact:** Minor SLAP improvement; eliminates duplicated imperative Canvas2D reset logic.

---

### 6. `src/cpu/CpuSurface.ts:128-156,167-193,197-215,220-246,256-285` — Overloaded public methods delegate to themselves for overload resolution

- **File & Line:** `src/cpu/CpuSurface.ts:128-156` (rect), `167-193` (circle), `197-215` (line), `220-246` (text), `256-285` (path)
- **Current Code / Issue:** Each public drawing method (`rect`, `circle`, `line`, `text`, `path`) has 2-3 overloads. The implementation signature dispatches on `typeof xOrRect === 'number'` and then *calls `this.rect(...)` recursively* (line 144) with unpacked arguments. This self-recursion for overload resolution means each public method is doing argument normalization (low-level) *and* delegating to the actual drawing (high-level) — two abstraction levels in one body.
- **Proposed Refactoring:** Extract a private `_drawRect(rect: Rect, style?: DrawStyle)` that contains the actual Canvas2D call. The public `rect()` overloads normalize args and delegate to `_drawRect()`. This separates API ergonomics (overloads) from the drawing primitive.
- **Impact:** Enforces SLAP: public methods handle API surface (arg normalization), private methods handle Canvas2D operations. Eliminates the self-recursion pattern.

---

### 7. `src/cpu/CpuSurface.ts:108-116` — `applyCamera` is public but only safe to call when canvas is sized

- **File & Line:** `src/cpu/CpuSurface.ts:108-116`
- **Current Code / Issue:** `applyCamera()` reads `this.camera` and `this.dpr` and applies them to the canvas context. It's documented as "call manually before one-shot draws outside the loop." However, it depends on the canvas having been sized by `#resize()` first — if called before any resize (e.g., before the first frame), `this.dpr` may be valid but the canvas buffer dimensions are zero (lines 39-40: `width = 0; height = 0`). `context.scale(this.dpr, this.dpr)` works on a zero-dimension canvas, but the transform is meaningless.
- **Proposed Refactoring:** Either: (a) introduce an `ActiveCanvasToken` that `#resize()` issues after sizing, and `applyCamera()` demands as proof, or (b) make `applyCamera` a no-op if `this.width === 0 || this.height === 0`.
- **Impact:** Prevents the public API from being called in a lifecycle state where it produces no visible effect (zero-dimension canvas). Enforces the precondition at the type or runtime level.

---

### 8. `src/cpu/CpuSurface.ts:131,139,177,201` — Overloaded methods default `w`/`h` to 0

- **File & Line:** `src/cpu/CpuSurface.ts:131` (`w = 0`), `139` (`yOrStyle as number` cast), `177` (`radiusOrStyle as number` cast), `201` (`y2 = 0`)
- **Current Code / Issue:** The overload implementations use default parameter values of `0` for `w`, `h`, `y2`. When the object-style overload is used (e.g., `rect(rect, style)`), the numeric parameters are unused but still default to `0`. This is harmless but noisy — it introduces `0` as a sentinel that, if accidentally used, produces degenerate geometry. The `typeof` guard prevents it, but the defaults exist as potential misuse vectors.
- **Proposed Refactoring:** Separate the overload implementations more cleanly: the numeric-signature implementation accepts explicit parameters, the object-signature implementation accepts a `Rect`/`DrawStyle`. Avoid defaulting geometric parameters to `0` in the implementation signature — use `undefined` and narrow inside the branch.
- **Impact:** Eliminates `0` as a potential degenerate value; each branch only receives parameters it actually needs (SLAP).

---

### Summary — CPU Directory (Pass 3)

| # | Location | Issue | Proposed Refactoring | Impact |
|---|----------|-------|---------------------|--------|
| 1 | `CpuSurface.ts:292-304` | Camera applied before state stamped | Reorder: stamp → camera → subscribers | Consistent frame snapshot |
| 2 | `CpuSurface.ts:292-304` | `#frameStep` mixes 4 abstraction levels | Extract `#syncDimensions`, `#stampFrameState`, `#applyCamera` | SLAP: DOM I/O, state, rendering separated |
| 3 | `CpuSurface.ts:360-385` | `#drawText` mixes config + render, no save/restore | Add save/restore, extract `#setFont`, `#strokeText`, `#fillText` | Isolate Canvas2D state mutations |
| 4 | `CpuSurface.ts:317-330` | `#begin` conflates fill + stroke config | Split into `#beginPath`, `#applyFillStyle`, `#applyStrokeStyle` | Single-responsibility helpers |
| 5 | `CpuSurface.ts:95-105` | Duplicated `setTransform(1,0,0,1,0,0)` | Extract `#resetTransform()` | Eliminate repeated boilerplate |
| 6 | `CpuSurface.ts:128-285` | Overloads self-recursive for arg normalization | Extract `_drawRect`, `_drawCircle`, etc. as private drawing primitives | Separate API ergonomics from rendering |
| 7 | `CpuSurface.ts:108-116` | `applyCamera` safe only after resize | Introduce `ActiveCanvasToken` or guard on `width > 0` | Prevent no-op lifecycle misuse |
| 8 | `CpuSurface.ts:131,139,177,201` | Overloaded defaults of `0` for geometry params | Use `undefined` defaults, narrow inside branches | Eliminate degenerate value vectors |

---

## Recommended Order of Refactoring for cpu/

Ordered from lowest-level leaves (math/utilities) up to high-level core modules. Each tier depends on the one before it.

### Tier 0 — Shared Primitives (no dependencies)
1. `types.ts` — Introduce `CssColor`, `PositiveNumber`, `FontSize` branded types (CPU Pass 1 #1-3)
2. `types.ts` — Make `Color` brand shared between CPU and GPU (CPU Pass 1 #1)
3. `core/types.ts` — Add `CanvasDimension`, `DevicePixelRatio` branded types (CPU Pass 1 #4-5)

### Tier 1 — State Management (depends on Tier 0)
4. `CpuSurface.ts` — Introduce `CanvasDimension` for `#resize()` (CPU Pass 1 #8)
5. `CpuSurface.ts` — Apply `DevicePixelRatio` brand to `dpr` (CPU Pass 1 #4)
6. `CpuSurface.ts` — Remove `window.devicePixelRatio` fallback; require `dpr` in config (CPU Pass 2 #1)
7. `CpuSurface.ts` — Apply `PositiveNumber` to `rect`, `circle` params (CPU Pass 1 #6-7)
8. `CpuSurface.ts` — Apply `FontSize` to `#drawText` (CPU Pass 1 #9)

### Tier 2 — Frame Lifecycle (depends on Tier 1)
9. `CpuSurface.ts` — Reorder `#frameStep`: stamp state before `applyCamera` (CPU Pass 3 #1)
10. `CpuSurface.ts` — Extract `#syncDimensions`, `#stampFrameState`, `#applyCamera` helpers (CPU Pass 3 #2)
11. `CpuSurface.ts` — Add `ActiveCanvasToken` or guard for `applyCamera` (CPU Pass 3 #7)
12. `CpuSurface.ts` — Atomic state stamping: ensure subscribers see consistent frame (CPU Pass 2 #3)

### Tier 3 — Drawing Primitives (depends on Tier 2)
13. `CpuSurface.ts` — Split `#begin` into `#beginPath`, `#applyFillStyle`, `#applyStrokeStyle` (CPU Pass 3 #4)
14. `CpuSurface.ts` — Extract `#resetTransform()` helper (CPU Pass 3 #5)
15. `CpuSurface.ts` — Add `save()`/`restore()` to `#drawText`, extract `#setFont`, `#strokeText`, `#fillText` (CPU Pass 3 #3)
16. `CpuSurface.ts` — Extract `_drawRect`, `_drawCircle`, etc. from overloaded self-recursion (CPU Pass 3 #6)
17. `CpuSurface.ts` — Clean up overloaded defaults to use `undefined` (CPU Pass 3 #8)

### Tier 4 — Polish (depends on Tier 3)
18. Cross-cutting: Share branded types (`CssColor`, `PositiveNumber`, `FontSize`, `CanvasDimension`, `DevicePixelRatio`) between CPU and GPU packages via `core/types.ts` or a shared `types/` package.

---
