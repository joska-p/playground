# Architecture Review

> Review of the `graphics` package and its usage across the codebase, focusing on
> package independence, API quality, and efficiency.

---

## Package Independence

| Package         | Dependencies                                   | Verdict                          |
| --------------- | ---------------------------------------------- | -------------------------------- |
| `automa-engine` | Nothing (pure TypeScript)                      | ✅ Fully isolated                |
| `graphics`      | React (peer dep, only in `react/` exports)     | ✅ Math/webgl layers are pure    |
| `automa`        | `automa-engine` + `graphics` + React + Zustand | ✅ Reasonable UI layer           |
| `art-canvas`    | `graphics` + React + Zustand                   | ✅ Reasonable UI layer           |
| `real-life`     | Three.js directly (does NOT use `graphics`)    | ✅ Proves `graphics` is optional |

**Verdict:** The package split is sound. `automa-engine` has zero DOM or browser
awareness — it is pure cellular-automaton computation. Every package imports only
what it needs.

---

## Graphics Package: API Usage Audit

### ✅ Well-Used APIs (proven valuable)

| Export                                               | Consumers                                                   | Notes                             |
| ---------------------------------------------------- | ----------------------------------------------------------- | --------------------------------- |
| `FBOManager`                                         | `SimulationEngine` (automa)                                 | FBO ping-pong core                |
| `QuadPipeline`                                       | `useGridTexture` (automa), `ShaderCanvas` (art-canvas)      | Fullscreen-quad rendering         |
| `ShaderRunner`                                       | `useShaderRunner` (internal)                                | Wraps WebGLContext + QuadPipeline |
| `GraphicsProvider` / `useFrame` / `FrameLoopContext` | automa, art-canvas                                          | Animation loop foundation         |
| `useInteractiveCanvas`                               | `CellMesh` (automa)                                         | Pan/zoom interaction              |
| `ShaderCanvas`                                       | `Manual`, `SeedCanvas`, `FoldedSpace`, `Atlas` (art-canvas) | High-level display component      |
| `transforms`                                         | storybook, internal                                         | Coordinate mapping                |

### 🟡 Shipped But Unused (dead code)

These are exported in `package.json` but imported by zero consumers:

| Export                  | Purpose                             | Notes                                                                              |
| ----------------------- | ----------------------------------- | ---------------------------------------------------------------------------------- |
| `GPGPUPipeline`         | GPGPU simulation loop               | **Reimplemented** by automa as `SimulationEngine` — should be the same abstraction |
| `useGPGPU`              | React hook wrapping `GPGPUPipeline` | Dead with it                                                                       |
| `InstancedBatch`        | Instanced geometry rendering        | No consumer yet                                                                    |
| `Vector2`               | 2D vector math                      | No consumer yet                                                                    |
| `Vector3`               | 3D vector math                      | No consumer yet                                                                    |
| `texture-utils`         | Grid texture creation / upload      | No consumer yet                                                                    |
| `FrameLoop` (raw class) | Standalone rAF loop                 | Only used internally by `FrameLoopContext`                                         |

---

## Architectural Issues

### 1. Double Rendering in `useShaderRunner`

`useShaderRunner` (`packages/graphics/src/react/useShaderRunner.ts:29`) auto-registers
a `useFrame` that calls `pipeline.render()` every animation frame. But consumers
register their own `useFrame` too:

- **`CellMesh.tsx:55`** calls `onBeforeRenderRef.current?.(time)` (sets uniforms via
  `runner.pipeline.setUniforms(...)`) then `runnerRef.current?.render()`.
- **`ShaderCanvas.tsx:14`** calls `onBeforeRender(runner.pipeline, time)` (caller
  sets uniforms) in a separate `useFrame`.

Since both fire on the same `GraphicsProvider`'s `FrameLoop`, **`render()` is
called twice per frame — one with stale/unset uniforms, one with correct ones.** The
first render wastes GPU work; the second overwrites the output, so it is invisible
but costly.

**Affected consumers:** `CellMesh` (automa), `ShaderCanvas` → `Manual`, `SeedCanvas`,
`FoldedSpace`, `Atlas` (art-canvas).

**Root cause:** `useShaderRunner` should not auto-render. The consumer should own
the `render()` call so it can set uniforms immediately before the draw.

### 2. `onBeforeRender` in `ShaderCanvas` Fires After the Render

Because of issue #1, `onBeforeRender` in `ShaderCanvas.tsx:14` is registered in a
_separate_ `useFrame` from the one that calls `render()`. The `setUniforms(...)`
calls inside `onBeforeRender` don't take effect until the **next frame's render**,
introducing a one-frame latency.

**Affected:** All `art-canvas` modules (Manual, Atlas, SeedCanvas, FoldedSpace).

### 3. `GPGPUPipeline` vs `SimulationEngine` — Duplicated Abstraction

The `graphics` package provides `GPGPUPipeline` — a generic FBO ping-pong pipeline
for GPGPU simulation. It wraps `FBOManager`, compiles a fragment shader, and
exposes `step()` / `getStateTexture()`.

But automa's `SimulationEngine` (`packages/automa/src/core/gpu/SimulationEngine.ts`)
reimplements the **same pattern** plus:

- Multiple shader programs (sim + paint)
- Uniform location caching (avoids `gl.getUniformLocation` in the hot path)
- Typed array buffers (avoids GC in the tick loop)
- A `paint()` method for user interaction

If `GPGPUPipeline` were enhanced to support these features, `SimulationEngine`
could be eliminated and the abstraction would live in `graphics` where it belongs.

**Currently automa imports `graphics` only for `FBOManager`** — the higher-level
abstraction (`GPGPUPipeline`) provides no value and is bypassed entirely.

### 4. Double Shader Compilation in `useShaderRunner`

`useShaderRunner` compiles the fragment shader **twice** on mount:

1. Inside `new ShaderRunner(canvas, fragmentShader, dpr)` — the constructor calls
   `pipeline.compileFragmentShader(fragmentShader)`.
2. In a separate `useEffect` at line 32 that also calls
   `runnerRef.current?.pipeline.compileFragmentShader(fragmentShader)`.

The second effect is redundant for the initial mount. It only serves to recompile
when `fragmentShader` changes — but the first effect already does that (it's in the
dependency array `[dpr, fragmentShader]`).

### 5. `SimulationEngine.init()` Stores States as Raw Bytes, `sim-step.frag` Stores as Normalized Floats

This was the original bug you fixed (state encoding mismatch). The `UNSIGNED_BYTE`
textures store [0–255] byte values that read back as [0–1] normalized floats.
`init()` writes raw byte values (e.g. `1`), but `sim-step.frag` was writing `1.0`
(which clamps to byte `255`). The display shader then decodes byte `255` and
indexes `stateColors[255]` — out of bounds → black.

**Status:** Fixed in your session.

---

## Summary

| Issue                                             | Severity                                 | Affects            |
| ------------------------------------------------- | ---------------------------------------- | ------------------ |
| Double rendering in `useShaderRunner`             | Medium (waste + 1-frame latency)         | automa, art-canvas |
| `GPGPUPipeline` vs `SimulationEngine` duplication | Medium (dead code + maintenance surface) | graphics, automa   |
| Unused exports (6 items)                          | Low (noise)                              | graphics           |
| Double shader compilation                         | Low (waste on mount)                     | automa, art-canvas |
| State encoding bug                                | Fixed                                    | —                  |
