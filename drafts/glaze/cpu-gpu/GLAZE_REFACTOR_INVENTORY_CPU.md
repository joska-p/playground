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
