# Improvement Opportunities & Refactor Plan

Lessons from the draft that would benefit the package (./GRAMMAR_COMPARISON.md), ordered as a step-by-step implementation plan.

---

## Phase 1: Quick wins (COMPLETED)

### Step 1 — Add `sqrt` and `abs` rules (COMPLETED)

- `sqrt` at `src/core/grammar/rules/sqrt.ts`, `abs` at `src/core/grammar/rules/abs.ts`
- Both registered in `src/core/grammar/registry.ts`

### Step 2 — Add per-pixel `random` terminal (COMPLETED)

- `pixelRandomRule` at `src/core/grammar/rules/pixel-random.ts`
- Uses GLSL-style hash `fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453)` in JS and GLSL

---

## Phase 2: Grammar improvements (COMPLETED)

### Step 3 — Weighted grammar branches (COMPLETED)

- `weight` field added to `GrammarRule` type at `src/core/grammar/types.ts:8`
- `weightedPick()` at `src/core/engine.ts:6-14` computes total weight and picks via `rng.next() * totalWeight`
- `buildTree()` at `src/core/engine.ts:40-60` uses it for all selection
- No hardcoded terminal-bias constants remain

---

## Phase 3: Animation (COMPLETED)

### Step 4 — `t` (time) terminal + animation loop (COMPLETED)

Add a `t` rule (arity 0) that reads a time value. Requires:

- A time source in the store (e.g. `performance.now()` / `requestAnimationFrame`) - **Done**
- `evaluateNode` passes a time parameter (or a context object) alongside `(x, y)` - **Done**
- The renderer re-renders on each animation frame while active - **Done**
- The Canvas component uses `requestAnimationFrame` loop - **Done**

The store needs a `running` boolean and a `time` ref. The `RenderTask` type needs a `time` field. - **Done**

---

## Phase 4: GPU rendering (COMPLETED)

### Step 5 — GLSL compilation + WebGL renderer (COMPLETED)

**5a — Add `toGLSL(args: string[]): string` to `GrammarRule`** - **Done**

- Added to `GrammarRule` type at `src/core/grammar/types.ts:14`
- Implemented on all 18 rules across `src/core/grammar/rules/*.ts`
- Bug fix: `if.ts` `toGLSL` uses valid ternary `(... > 0.0 ? ... : ...)` instead of `if` keyword

**5b — `compileToGLSL(tree: ExpressionNode): string`** - **Done** at `src/core/compileToGLSL.ts`

- Recurses tree calling `toGLSL` via `compileNode()`
- Includes `random2d` GLSL hash function in preamble (required by `pixel-random` rule)
- Detects `vec3` root and outputs `vec3 color = <expr>` for correlated mode; falls back to `float r/g/b` for 3-tree mode
- Wraps in complete fragment shader with `u_time`, `u_resolution`, `v_texCoord`

**5c — WebGL renderer** - **Done** at `src/hooks/useWebGLRenderer.ts`

- Raw WebGL1 fullscreen quad (no dependencies added to monorepo)
- RAF animation loop passing `u_time` and `u_resolution`
- Recompiles shader on tree change
- Proper cleanup on unmount/mode switch
- Uses `preserveDrawingBuffer: true` for static frames

### Step 6 — Correlated RGB / single-tree vec3 (COMPLETED)

- **`vec3` GrammarRule** at `src/core/grammar/rules/vec3.ts` (arity 3, `toGLSL` returns `vec3(r, g, b)`)
- **`correlatedRGB` store toggle** at `src/stores/randomart/store.ts:22`
- When enabled: builds one tree with `vec3` root (single shared RNG) instead of 3 independent trees
- CPU path: extracts `tree.args[0/1/2]` for R/G/B evaluation at `src/components/RandomArtCanvas.tsx:27`
- GLSL path: `compileToGLSL` detects `vec3` root and outputs `vec3 color = <expr>` directly
- Coexists with 3-tree mode via UI toggle button (Linked/Split) in Controls

---

## Summary

| Step                  | Effort   | Impact    | Status      |
| --------------------- | -------- | --------- | ----------- |
| 1 — sqrt, abs rules   | 30 min   | Medium    | ✅ Complete |
| 2 — per-pixel random  | 1 hr     | Medium    | ✅ Complete |
| 3 — weighted branches | 2 hr     | High      | ✅ Complete |
| 4 — t + animation     | 3 hr     | High      | ✅ Complete |
| 5 — GLSL + WebGL      | 2-3 days | Very high | ✅ Complete |
| 6 — correlated RGB    | 1 day    | Medium    | ✅ Complete |

All phases implemented. The package now supports:

- **GPU rendering** via WebGL1 fullscreen quad (raw WebGL, no dependencies)
- **CPU rendering** via Canvas 2D + Worker pool (preserved for export)
- **Render mode toggle** — GPU (WebGL) / CPU (Canvas 2D)
- **Correlated RGB mode** — single `vec3` tree via shared RNG seed
- **Animation** via `t` terminal + RAF loop
