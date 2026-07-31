# `@repo/graphics` — Refactor Plan, revisited for React 19 + React Compiler

> Rewritten from the original audit. The audit's core findings stand, but **four conclusions change once the React Compiler is in the picture**, and the execution plan is re-cut into **9 context-friendly sessions** (one fresh context window each — copy-paste the prompt, get a reviewable unit of work).

---

## Part 0 — Compiler reality check (what changes in the report)

I re-verified every claim against the current source. Three facts about this repo's React setup are load-bearing:

1. **The compiler is on everywhere.** `reactCompilerPreset()` is applied in the Vite packages that consume the graphics React layer — `packages/art-canvas`, `packages/automa`, plus pixel, graph-viz, etc. — **and now also `apps/storybook`** (`vite.config.ts` uses the same `reactCompilerPreset()`), while **`apps/playground` (Astro)** enables it via `babel-plugin-react-compiler` inside the React integration (`astro.config.mjs`). So `ShaderCanvas`/`GraphicsProvider`/`useShaderRunner` are compiled in every bundle, including identity-stable inline object-literal props. Robustness principle still applies: don't _depend_ on compiler-only behavior, because the compiler is a perf optimization, not a correctness contract. Impure calls like `createFrameLoop()` are never memoized, and a future app without the compiler would regress silently.

2. **The compiler auto-memoizes inline object literals** passed as JSX props. This directly kills one of the report's findings (see #1 below).

3. **Repo rule (AGENTS.md):** "React 19 with compiler (no need for useMemo or useCallback)". Every React-layer fix below obeys this — no `useMemo`/`useCallback`, lazy `useState`/`useRef` only.

### Changed conclusions

| Original finding                                                                                                                                                   | Verdict after re-check                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1e / 2.2 — `webGLContextAttributes` object-identity churn in `useShaderRunner`** ("inline `{antialias:true}` rebuilds the GL context on every parent re-render") | **Wrong under the compiler.** A compiled parent passing `webGLContextAttributes={{antialias:true}}` gets a _stable identity_ — the effect doesn't re-run, no context rebuild. The proposed `JSON.stringify` fix is **anti-recommended**: per-render cost, false-positive rebuilds on key order, and it silently drops non-serializable values. The honest fix is a **mount-time contract** (attributes/dpr are read once into a ref; changing a context's attributes requires a new context anyway — and the compiler is now on in every consumer bundle). See S4. |
| **2.2 — `GraphicsProvider` creates a new `FrameLoop` every render**                                                                                                | **Still a bug — the compiler does not fix it.** `createFrameLoop()` is an impure call; the compiler cannot and will not memoize it. The report's fix (`useState(() => createFrameLoop())`) is correct. Do **not** fix with `useMemo`. See S4.                                                                                                                                                                                                                                                                                                                      |
| **2b — recompile-in-place in `useShaderRunner` instead of full teardown**                                                                                          | **Still valid, and the orphan mechanism is confirmed.** `CellMesh.tsx:23-35` keys its engine effect on `runnerRef` (a stable ref object). When `fragmentShader` changes, `useShaderRunner` tears down the whole runner and assigns a _new_ runner to `runnerRef.current`; the ref identity is unchanged, so CellMesh's effect never re-runs and `createSimulationEngine` keeps pointing at the **dead old context**. See S4.                                                                                                                                       |
| **2.2 — "No VAO bound in the quad pipeline"**                                                                                                                      | **Understated.** WebGL2 has _no default VAO_ — drawing with no VAO bound is `INVALID_OPERATION`. `QuadPipeline.render()` only works because a leftover VAO (usually GPGPU's `emptyVao`) is still bound. A first-ever quad draw in a fresh context can genuinely error. Elevates 1g from "hygiene" to "real bug". See S2.                                                                                                                                                                                                                                           |

### Findings confirmed as-is (unchanged by the compiler)

- Shader-compile/link/reflect duplication between `createQuadPipeline` and `createGPGPUPipeline`, already drifting (`#version 300 es` injection vs `.trim()`; two `[0]`-strip variants).
- `'fill'`/`'none'` both collapse to `scale = 1` in `createDataToCanvas`/`createCanvasToData` (`transforms.ts:89-93`); tests only assert round-trips so they can't catch it.
- automa duplicates the grid transforms (`automa/src/lib/coordinates.ts`) — but it's a **superset**: Y-flip (`boundsHeight - p.y`), pan/zoom `eventToGridPoint`, and unclamped `index`. Migration must preserve these (S6).
- Mixed `dispose()`/`destroy()` naming; no context-restore path; program leak on recompile; GPGPU `compile()` re-run orphans programs; FBO completeness never checked; FBO allocates a zeroed CPU buffer.
- DPR default inconsistency (`createShaderRunner` passes `window.devicePixelRatio` explicitly, bypassing the `min(dpr, 2)` cap in `createWebGLContext`).
- `uniformMouse` is **three different spaces** depending on who wrote the shader: `ShaderCanvas` feeds CSS pixels, storybook's `MOUSE_SPOTLIGHT_FS` compares against normalized `vUv`, and art-canvas's `mouseAttractor` compares against centered `[-1,1]` uv. Real bug, real fix in S7.
- Magic-name auto-binding (`uniformResolution`/`u_resolution` …), reserved `u_state`, `runner.ctx.gl` reach-ins, `instanceof WebGLTexture` (realm-unsafe), `Array.from` per frame in automa.
- Missing "render pass" primitive — the `FBOManager.stories.tsx` hand-rolls ~50 lines of `gl.createShader`/`bindFramebuffer` boilerplate the lib should own. Left as documented future work (S9), not in the current session cut.

---

## Part 1 — How to run the sessions

- Each session is a **fresh opencode window**; paste the prompt. Every prompt is self-contained: it says what state the repo should be in, what to read first, what to change, and how to verify.
- **Do not skip sessions** — later prompts reference earlier ones.
- Command patterns (from repo root):
  - `pnpm --filter @repo/graphics test` · `check-types` · `lint`
  - `pnpm --filter @repo/automa check-types` · `lint`
  - `pnpm --filter @repo/storybook ...` for storybook
- Verify visually in storybook where noted: `pnpm --filter @repo/storybook dev`.

### File-ownership map (avoids two sessions editing the same file)

| Session     | Owns                                                                                                                                                         | Also touches (delegated — re-read current state first)        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| S0 baseline | —                                                                                                                                                            | —                                                             |
| S1          | `math/transforms.ts`, `math/transforms.test.ts`                                                                                                              | —                                                             |
| S2          | `webgl/createProgramManager.ts` (new), `webgl/createQuadPipeline.ts`                                                                                         | —                                                             |
| S3          | `webgl/createGPGPUPipeline.ts`, `react/useGPGPU.ts`, `automa-engine/src/gpu/createSimulationEngine.ts`                                                       | —                                                             |
| S4          | `react/FrameLoopContext.tsx`, `react/useShaderRunner.ts`                                                                                                     | —                                                             |
| S5          | `webgl/createFBOManager.ts`, `webgl/createWebGLContext.ts`, `webgl/createShaderRunner.ts`                                                                    | `webgl/createQuadPipeline.ts` (add `reinitialize`)            |
| S6          | `automa/src/lib/coordinates.ts`, `automa/src/hooks/useSimulationUniforms.ts`, `automa/src/components/canvas/CellMesh.tsx`                                    | —                                                             |
| S7          | `math/transforms.ts`, `react/ShaderCanvas.tsx`, `webgl/createProgramManager.ts`, storybook shaders, `art-canvas/src/shaders/modules/space/mouseAttractor.ts` | `webgl/createQuadPipeline.ts`, `webgl/createGPGPUPipeline.ts` |
| S8          | `package.json` exports, `README.md`, `docs/reference/packages/graphics.md`, all webgl/react factory files (declared types)                                   | everything above                                              |
| S9          | (future, not scoped) render-pass primitive, `u_state` decoupling                                                                                             | —                                                             |

---

## Part 2 — The sessions

---

### Session 0 — Baseline (optional, 10 min)

Goal: prove the repo is green before touching anything.

```md
# Session 0 — Baseline verification

Run, from the repo root, in order:

1. `pnpm install`
2. `pnpm --filter @repo/graphics test`
3. `pnpm --filter @repo/graphics check-types`
4. `pnpm --filter @repo/graphics lint`
5. `pnpm --filter @repo/automa check-types`

Report each result. If anything fails, stop and tell me the failing package/error
before proceeding — do not fix it yet. If all green, confirm "baseline green".
```

---

### Session 1 — Fit-math DRY + `'fill'`/`'none'` bug fix

Small, pure, zero React. Owns `math/transforms.ts` + its test.

```md
# Session 1 — transforms: shared fit math + fix 'fill'/'none'

Repo state: sessions 0 done (baseline green). No other changes yet.

## Read first (one codegraph call)

- packages/graphics/src/math/transforms.ts
- packages/graphics/src/math/transforms.test.ts

## Problem

`createDataToCanvas` and `createCanvasToData` duplicate the fit computation
(transforms.ts:69-139), and both collapse `'fill'` and `'none'` to `scale = 1`,
so 'fill' behaves identically to 'none' + centering.

## Task

1. Extract a private `computeDataFit(dataDomainBounds, canvasWidth, canvasHeight,
aspectFitMode, paddingFraction)` returning `{ scaleX, scaleY, offsetX, offsetY }`:
   - contain: uniform, `scale = min(paddedW/dataW, paddedH/dataH)`
   - cover: uniform, `scale = max(paddedW/dataW, paddedH/dataH)`
   - fill: non-uniform, `scaleX = paddedW/dataW`, `scaleY = paddedH/dataH`
   - none: `{ 1, 1, 0, 0 }` (true identity; padding ignored)
   - offsets keep the existing centering formula
     `(canvasDim - dataDim * scale) / 2 - domainMin * scale` for contain/cover/fill.
2. `createDataToCanvas` maps `x * scaleX + offsetX`; `createCanvasToData` is the
   exact inverse. Both call `computeDataFit` — delete the duplicated switch.
3. Add tests:
   - `'fill'` maps domain corners to canvas corners: domain {0..W, 0..H} → (0,0)→(0,0)
     and (W,H)→(W,H).
   - `'none'` is identity: (0,0)→(0,0) and (cols,rows)→(cols,rows) (uncentered).
   - Existing round-trip tests must still pass for all four modes.

## Constraints

- Only edit the two files listed. Do not touch the mouse/uniform builder or the
  grid transforms in this session.

## Verify

- `pnpm --filter @repo/graphics test`
- `pnpm --filter @repo/graphics check-types`
- `pnpm --filter @repo/graphics lint`
```

---

### Session 2 — Shared shader-program module + QuadPipeline rewrite

The biggest DRY win. Owns a new module + `createQuadPipeline.ts`. Behavior-identical to today (magic uniforms stay — S7 changes them).

```md
# Session 2 — shared shader compiler/uniform dispatcher + QuadPipeline

Repo state: S1 done (transforms fit-math fixed). `math/transforms.ts` is untouched
by this session.

## Read first (one codegraph call)

- packages/graphics/src/webgl/createQuadPipeline.ts
- packages/graphics/src/webgl/createGPGPUPipeline.ts
- packages/graphics/src/webgl/createWebGLContext.ts

## Task — NEW module: packages/graphics/src/webgl/createProgramManager.ts

1. `FULLSCREEN_TRIANGLE` — one copy, with `#version 300 es` baked in (GPGPU's
   current version; quad's runtime injection goes away).
2. `compileShaderProgram(gl, fragmentSource, vertexSource = FULLSCREEN_TRIANGLE)`
   → `{ program, uniforms: Map<string, { location, type, size }> }`.
   - compile VS+FS, link, reflect ACTIVE_UNIFORMS; canonical name = strip `[0]`,
     keep one entry per uniform.
   - on any compile/link failure: `gl.deleteShader`/`gl.deleteProgram` the partial
     resources, then `throw new Error('...shader "<name>" compile failed: <log>')`
     (identify which shader failed — VS vs FS vs link).
3. `setUniformValue(gl, entry, value, nextTextureUnit?)` — the single uniform
   type dispatcher both pipelines use:
   - FLOAT → `uniform1f`; INT/BOOL/SAMPLER_2D → `uniform1i`
   - FLOAT_VEC2/3/4 → `uniform{2,3,4}fv`; INT_VEC/BOOL_VEC → `uniform{2,3,4}iv`
   - FLOAT_MAT2/3/4 → `uniformMatrix{2,3,4}fv(loc, false, v)`
   - value is `number | number[] | Float32Array | Int32Array | WebGLTexture`
   - detect textures with `gl.isTexture(value)`, NOT `instanceof` — bind to
     `gl.TEXTURE0 + nextTextureUnit()`, set as `uniform1i`.

## Task — rewrite packages/graphics/src/webgl/createQuadPipeline.ts on top of it

- `compileFragmentShader(source)` → `compileShaderProgram`; **delete the previous
  program first** (`if (program) gl.deleteProgram(program)`) to fix the leak.
- Create **one VAO** in the factory; `render()` binds it before `drawArrays`
  (fixes the "no VAO in WebGL2 = INVALID_OPERATION" bug), and `dispose()` deletes
  program + VAO.
- `setUniforms` accepts `Record<string, number | number[] | Float32Array |
Int32Array | WebGLTexture>` and goes through `setUniformValue`.
- Keep `render(mousePx)` magic-uniform auto-binding and `updateUniformBuilder`
  exactly as today (same spellings, same behavior).
- Keep the existing `console.warn` on render/setUniforms with no program.

## Constraints

- Do NOT touch createGPGPUPipeline.ts (next session), ShaderCanvas, or any React file.
- No behavior change visible to consumers: same exports, same method names.
- The GPGPU pipeline must keep compiling (it is currently independent — leave it).

## Verify

- `pnpm --filter @repo/graphics test` && `check-types` && `lint`
- `pnpm --filter @repo/automa check-types` (automa imports QuadPipeline's types)
- Storybook: QuadPipeline stories + FBOManager story still render
  (`pnpm --filter @repo/storybook dev`)
```

---

### Session 3 — GPGPUPipeline onto the shared module + call-site API updates

Owns `createGPGPUPipeline.ts` + its two call sites. Contains the one breaking change (`compile()` removed, `destroy`→`dispose`).

```md
# Session 3 — GPGPUPipeline rewrite + call-site updates

Repo state: S2 done — `webgl/createProgramManager.ts` exists with
`compileShaderProgram` + `setUniformValue`, and `createQuadPipeline.ts` uses it.
This session may build on that module; do not modify it.

## Read first (one codegraph call)

- packages/graphics/src/webgl/createProgramManager.ts (S2's new module)
- packages/graphics/src/webgl/createGPGPUPipeline.ts
- packages/graphics/src/webgl/createFBOManager.ts
- packages/graphics/src/react/useGPGPU.ts
- packages/automa-engine/src/gpu/createSimulationEngine.ts

## Task — createGPGPUPipeline.ts

1. Replace the internal `compileShader` with `compileShaderProgram` from the shared
   module; replace `setUniform` with `setUniformValue`.
2. **Auto-compile the default program in the factory** — delete `compile()` from
   the interface and body. `defaultShader` is compiled immediately; `addProgram`
   also works as today.
3. `addProgram` that reuses a name **deletes the prior program** before overwriting
   (fixes the leak).
4. `step()` and `setUniforms`: if no program is selected, default to `'default'`;
   if the target program is genuinely missing, throw
   `Error('GPGPUPipeline: program "<name>" not found')`.
5. `init(data)`: guard `data.length !== width * height` → throw with a clear message
   before touching `texSubImage2D`.
6. Rename `destroy()` → `dispose()`. Keep the rest of the public surface identical
   (`step`, `init`, `getStateTexture`, `resize`, `addProgram`, `useProgram`,
   `setUniforms`, `fbo`).

## Task — call sites (exact edits)

- `react/useGPGPU.ts`: delete the `pipeline.compile()` line; cleanup `pipeline.destroy()` → `pipeline.dispose()`.
- `automa-engine/src/gpu/createSimulationEngine.ts`: delete `pipeline.compile()` (line ~14); `pipeline.destroy()` → `pipeline.dispose()` (line ~67).

## Constraints

- Keep the `u_state` unit-0 binding behavior in `step()` exactly as-is (a later
  session revisits it).
- Do not touch useShaderRunner / ShaderCanvas / FrameLoopContext.

## Verify

- `pnpm --filter @repo/graphics check-types` && `lint` && `test`
- `pnpm --filter @repo/automa-engine check-types` && `lint`
- `pnpm --filter @repo/automa check-types`
- Storybook: the automa/cell-mesh simulation story and FBOManager story still work
```

---

### Session 4 — React-layer lifecycle (compiler-aware)

Owns `FrameLoopContext.tsx` + `useShaderRunner.ts`. **No `useMemo`/`useCallback` anywhere** (repo rule).

````md
# Session 4 — React-layer lifecycle fixes (React 19 + compiler)

Repo state: S2+S3 done (both pipelines on the shared program module; GPGPU API
renamed). This session changes only React files.

IMPORTANT: the compiler is now enabled in every bundle that consumes these
components (Vite packages and storybook via `reactCompilerPreset()`, the Astro
app via `babel-plugin-react-compiler`), so inline object literals passed as
props are identity-stable across re-renders everywhere. Never rely on the
compiler for correctness, though: impure calls like `createFrameLoop()` are not
memoized, and it can be disabled at any time. Repo rule: no useMemo/useCallback.

## Read first (one codegraph call)

- packages/graphics/src/react/FrameLoopContext.tsx
- packages/graphics/src/react/useShaderRunner.ts
- packages/graphics/src/webgl/createFrameLoop.ts
- packages/graphics/src/webgl/createQuadPipeline.ts (recompile surface only)

## Task 1 — FrameLoopContext.tsx: stop creating a loop every render

`createFrameLoop()` in the render body is an impure call the compiler cannot
memoize — it runs on every render and the old loop is disposed on the NEXT render.
Fix:

```tsx
const [loop] = useState(() => createFrameLoop());
```
````

Keep the `useEffect(() => () => loop.dispose(), [loop])` cleanup. Loop identity is
now stable for the provider's lifetime. Do NOT use useMemo. (StrictMode may run the
lazy initializer twice in dev; the discarded loop has no subscribers and never
started rAF, so it leaks nothing.)

## Task 2 — useShaderRunner.ts: recompile-in-place + mount-time context attrs

Current behavior: any change to `fragmentShader` destroys the whole runner
(context + GL resources) and assigns a new runner to the stable `runnerRef` — which
orphans consumers that keyed effects on `runnerRef` (e.g. automa's engine keeps the
dead context). Fix:

1. Snapshot mount-time props in a ref so the create effect has no dependencies:
   ```ts
   const mountPropsRef = useRef({ fragmentShader, dpr, webGLContextAttributes });
   mountPropsRef.current = { fragmentShader, dpr, webGLContextAttributes };
   ```
2. Create-effect (deps `[]`): reads `mountPropsRef.current.*`; creates the runner,
   wires a ResizeObserver, and returns cleanup (`observer.disconnect()`,
   `runner.dispose()`, `runnerRef.current = null`). Document in a comment that
   `dpr`/`webGLContextAttributes` are **mount-time only** — changing a context's
   attributes requires a new context anyway, and honoring changes is what caused
   the churn. Do NOT JSON.stringify them.
3. Recompile-effect (deps `[fragmentShader]`): calls
   `runnerRef.current?.pipeline.compileFragmentShader(fragmentShader)`. Skip the
   first run if it equals the mounted shader (track with a ref) to avoid a
   double-compile on mount.
4. ResizeObserver: **rAF-coalesce** resize and skip degenerate sizes:
   ```ts
   const observer = new ResizeObserver(([entry]) => {
     if (!entry) return;
     const { width, height } = entry.contentRect;
     if (width === 0 || height === 0) return; // hidden canvas
     cancelAnimationFrame(rafId);
     rafId = requestAnimationFrame(() => runner.resize(width, height));
   });
   ```
   Cancel `rafId` in cleanup.
5. Keep the return value `{ canvasRef, runnerRef }` unchanged (automa depends on it).

## Constraints

- Do not touch useGPGPU.ts (S3 owns it), ShaderCanvas.tsx (S7), createFrameLoop.ts.
- No useMemo/useCallback/useCallback.

## Verify

- `pnpm --filter @repo/graphics check-types` && `lint` && `test`
- `pnpm --filter @repo/automa check-types`
- Storybook: an art-canvas ShaderCanvas module renders and responds to mouse;
  automa cell-mesh still simulates; change a shader string and confirm the canvas
  recompiles WITHOUT the context being recreated (check `webglcontextlost`/chrome
  GPU logs stay quiet).

````

---

### Session 5 — Context restore + stable accessors + FBO fixes

Owns the webgl lifecycle trio. Adds `reinitialize()` to the quad pipeline (delegated edit on S2's file — re-read it first).

```md
# Session 5 — context-restore path, stable accessors, FBO hardening

Repo state: S4 done (React lifecycle fixed). The React layer now recompiles in
place; this session makes the webgl layer capable of surviving a GL context loss.

## Read first (one codegraph call)
- packages/graphics/src/webgl/createFBOManager.ts
- packages/graphics/src/webgl/createWebGLContext.ts
- packages/graphics/src/webgl/createShaderRunner.ts
- packages/graphics/src/webgl/createQuadPipeline.ts   (for reinitialize)

## Task 1 — createFBOManager.ts
1. `texImage2D` allocation: pass `null` instead of `new Uint8Array(width*height*4)`
   (no CPU buffer for a 0-fill).
2. After `framebufferTexture2D`, check completeness and fail loud:
   ```ts
   if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
     throw new Error(`Framebuffer incomplete (${width}x${height})`);
   }
````

(0×0 resizes now throw instead of silently producing undefined behavior.)

## Task 2 — createWebGLContext.ts

Add `reinitialize()` to the returned object: re-applies current-DPR sizing
(equivalent to `applyDPR()`). Keep `onContextLost`/`onContextRestored` as-is.

## Task 3 — createQuadPipeline.ts (delegated edit)

Add `reinitialize(fragmentSource)` — recompiles the program and **recreates the
VAO** (both are invalid after context restore). Reuse the existing compile path.

## Task 4 — createShaderRunner.ts

1. Fix the DPR inconsistency: default
   `dpr = Math.min(window.devicePixelRatio, 2)` so the cap applies on the
   recommended path too.
2. Wire context restore internally (track the current fragment source in a local):
   - `onContextLost` → nothing (preventDefault already handled)
   - `onContextRestored` → `ctx.reinitialize(); pipeline.reinitialize(currentSource);`
3. Add stable accessors and keep back-compat:
   - `get context(): WebGL2RenderingContext` (= `ctx.gl`)
   - `get canvas(): HTMLCanvasElement`
   - keep `ctx` as a deprecated alias (remove in a later breaking release).
4. `dispose()` also unregisters the context-loss listeners.

## Constraints

- GPGPU context-loss rebuild is deliberately OUT of scope (automa's engine would
  need recreation + FBO rebuild) — add a one-line comment in
  createGPGPUPipeline.ts noting it's a known limitation.
- Do not touch FrameLoopContext/useShaderRunner (S4) — this wiring is internal to
  the factory.

## Verify

- `pnpm --filter @repo/graphics test` && `check-types` && `lint`
- `pnpm --filter @repo/automa check-types`
- Storybook: with a quad story open, use the browser "Suspended" device-toolbar
  simulation (or force `webglcontextlost`) and confirm the image comes back after
  restore without a full page reload.

````

---

### Session 6 — Automa consumer cleanup

Owns the three automa files. Depends on S2 (typed-array uniforms) and S5 (`runner.context`/`runner.canvas`).

```md
# Session 6 — automa consumer cleanup

Repo state: S2+S5 done. QuadPipeline accepts Float32Array uniforms; ShaderRunner
exposes `context` and `canvas`. This session touches automa only.

## Read first (one codegraph call)
- packages/automa/src/lib/coordinates.ts
- packages/automa/src/hooks/useSimulationUniforms.ts
- packages/automa/src/components/canvas/CellMesh.tsx
- packages/graphics/src/math/transforms.ts   (grid transforms + fit API)

## Task 1 — coordinates.ts: migrate onto the lib, preserve semantics
The lib now exports `createWorldToGrid`/`gridToWorld`/`createCanvasToGrid`.
automa's local copies are NOT identical — they add a Y-flip and use an unclamped
index. Preserve exact behavior:
1. Import `createWorldToGrid`, `gridToWorld`, and `createCanvasToData` (or the lib
   `createCanvasToGrid`) from `@repo/graphics/math/transforms`.
2. Keep a thin local `createCanvasToGrid` that delegates to the lib but preserves
   automa's semantics: flip `y` (`boundsHeight - p.y`) before converting, and keep
   the **unclamped** `index = Math.floor(d.y) * cols + Math.floor(d.x)` computation
   (the lib clamps; automa doesn't — decide deliberately and note it).
3. Delete the now-unused local `createWorldToGrid`/`gridToWorld`; re-export from
   the lib if automa code imports them from `./coordinates`.
4. `eventToGridPoint` stays as-is (pan/zoom math) but builds on the delegating
   `createCanvasToGrid`.

## Task 2 — useSimulationUniforms.ts
1. Delete the per-frame `Array.from(stateColorsArray)` — pass the typed array
   directly: `stateColors: stateColorsArray` (QuadPipeline now accepts
   Float32Array).
2. Replace the `runner.ctx.gl.canvas` reach-in with `runner.canvas.clientWidth`.

## Task 3 — CellMesh.tsx
Replace `runner.ctx.gl` with `runner.context`.

## Constraints
- Do not change the shader files or the engine package beyond what's needed.
- Behavior must be pixel-identical in the grid→cell mapping (verify against the
  existing storybook coordinates story if one exists).

## Verify
- `pnpm --filter @repo/automa check-types` && `lint`
- `pnpm --filter @repo/automa-engine check-types`
- Storybook: automa cell-mesh — click/paint cells, pan/zoom, confirm grid hit-testing
  is unchanged, and confirm no `Array.from` remains in the hot path.
````

---

### Session 7 — Uniform contract + dev warnings

The one deliberate shader-behavior change: `u_mouse` becomes **normalized UV (0..1, y-down)** — the same space as `vUv` — fixing the "three different spaces" bug.

````md
# Session 7 — uniform contract normalization + dev warnings

Repo state: S1-S6 done. QuadPipeline/GPGPUPipeline use the shared dispatcher.

## Read first (one codegraph call)

- packages/graphics/src/math/transforms.ts (createShaderUniformBuilder)
- packages/graphics/src/react/ShaderCanvas.tsx
- packages/graphics/src/webgl/createQuadPipeline.ts (magic names + setUniforms)
- packages/graphics/src/webgl/createGPGPUPipeline.ts
- apps/storybook/src/stories/graphics/QuadPipeline.stories.tsx (MOUSE_SPOTLIGHT_FS)
- packages/art-canvas/src/shaders/modules/space/mouseAttractor.ts
- packages/art-canvas/src/shaders/templates/classic.ts

## Contract (canonical, documented)

- `u_resolution` — buffer px (unchanged)
- `u_aspect` — cssW/cssH (unchanged)
- `u_mouse` — **normalized UV, origin top-left, y-down (0..1)** — same space as `vUv`.
  The `uniform*` spellings remain supported aliases (do NOT drop them — back-compat).

## Task 1 — transforms.ts

`createShaderUniformBuilder`'s mouse parameter now takes **normalized UV**.
Rename the param to `mouseNormalizedUV` and document the space. Update the
`ShaderUniformValues` type docs. Resolution/aspect math unchanged.

## Task 2 — ShaderCanvas.tsx

Convert pointer to normalized UV in one place before feeding `setMouse`:

```ts
const rect = e.currentTarget.getBoundingClientRect();
runnerRef.current?.setMouse({
  x: (e.clientX - rect.left) / rect.width,
  y: (e.clientY - rect.top) / rect.height
});
```
````

(already y-down, matching vUv — no flip needed).

## Task 3 — dev warnings for unknown uniforms

In both pipelines' `setUniforms`, when a uniform name is not found, emit
`console.warn('[graphics] unknown uniform "' + name + '" in program')` gated to dev
(`import.meta.env?.DEV`). This kills the silent black-screen typo tax.

## Task 4 — consumer shaders

1. art-canvas `mouseAttractor` module: it compares `mouse` against centered
   `[-1,1]` uv. Convert inside the module: `vec2 m = mouse * 2.0 - 1.0;` then use
   `m` against `uv`. (classic.ts / DirectNoiseTemplate.ts only declare u_mouse —
   no other changes needed.)
2. Storybook `MOUSE_SPOTLIGHT_FS` already compares against `vUv` — it now
   matches the contract exactly; keep it as the canonical example.

## Constraints

- This is the ONLY session that changes shader-visible behavior. Do not add new
  magic names. Do not touch GPGPU's `u_state` (out of scope).

## Verify

- `pnpm --filter @repo/graphics test` && `check-types` && `lint`
- `pnpm --filter @repo/art-canvas check-types` && `lint`
- `pnpm --filter @repo/automa check-types`
- Storybook: art-canvas modules with mouse interaction + the QuadPipeline
  MOUSE_SPOTLIGHT story behave identically; intentionally typo a uniform name and
  confirm a console warning appears in dev.

````

---

### Session 8 — Declared types + docs/exports alignment

Owns the final polish across all graphics files (all previously rewritten — re-read each before editing).

```md
# Session 8 — declared public types + docs/export alignment

Repo state: S1-S7 done. Everything is refactored; this session finalizes the
public contract and documentation.

## Read first (one codegraph call)
- packages/graphics/src/webgl/createQuadPipeline.ts
- packages/graphics/src/webgl/createFBOManager.ts
- packages/graphics/src/webgl/createFrameLoop.ts
- packages/graphics/src/webgl/createShaderRunner.ts
- packages/graphics/src/webgl/createWebGLContext.ts
- packages/graphics/src/webgl/createGPGPUPipeline.ts
- packages/graphics/package.json
- packages/graphics/README.md (if present)
- docs/reference/packages/graphics.md

## Task 1 — declared types, not ReturnType
Replace `export type X = ReturnType<typeof createX>` with explicit declared
interfaces for: `QuadPipeline`, `FBOManager`, `FrameLoop`, `ShaderRunner`,
`WebGLContext`. (`GPGPUPipeline` already has one — align the others to its style.)
Keep the factory functions as the only constructors. The implementation return
shape must still satisfy the interface (compile-time check via
`satisfies`/direct assignment).

## Task 2 — exports map (package.json)
Ensure every subpath in `exports` resolves to a real file (it does today) and add
any the refactor introduced. Remove nothing that consumers import.

## Task 3 — docs alignment (README.md + docs/reference/packages/graphics.md)
Fix every documented-but-nonexistent API so the docs match reality:
- `new WebGLContext(...)`, `new QuadPipeline(...)`, `new FBOManager(...)` class
  usage → factory functions (`createWebGLContext`, etc.)
- phantom exports: `useShaderPass`, `Vector2/3`, `InstancedBatch`, `CanvasContainer`
- wrong paths: `@repo/graphics/math`, `@repo/graphics/webgl/WebGLContext` →
  `@repo/graphics/math/transforms`, `@repo/graphics/webgl/createWebGLContext`
- document the canonical uniform contract from S7 (`u_resolution`/`u_aspect`/
  `u_mouse`, normalized UV mouse)
- document `dispose()` (uniform), `context`/`canvas` accessors, mount-time
  `webGLContextAttributes` contract.

## Constraints
- No behavior changes — types/docs only.

## Verify
- `pnpm --filter @repo/graphics test` && `check-types` && `lint`
- Full sweep: `pnpm --filter @repo/art-canvas check-types`, `pnpm --filter @repo/automa check-types`, `pnpm --filter @repo/automa-engine check-types`
- Grep the docs for each phantom name and confirm zero remaining hits.
````

---

### Session 9 — Future work (not scoped, deliberately excluded)

The report also identified two genuinely large design gaps that don't fit a bounded context window and touch many consumers. Track them as issues, not sessions:

1. **Render-pass primitive** (`createRenderPass` or `QuadPipeline.renderTo(fbo, uniforms)`) — the fix for the hand-rolled FBOManager story. Needs its own design pass + consumer migration.
2. **GPGPU context-loss rebuild + `u_state` decoupling** — the simulation-schema ↔ infra coupling and a full engine-rebuild path.

---

## Suggested execution order & expected size

| #   | Session                              | Size      | Breaking?                                      |
| --- | ------------------------------------ | --------- | ---------------------------------------------- |
| 0   | Baseline                             | 10 min    | —                                              |
| 1   | transforms fit-math                  | 30-45 min | no (bug fix, tested)                           |
| 2   | shared program module + QuadPipeline | ~2-3 hrs  | no                                             |
| 3   | GPGPUPipeline + call sites           | ~1-2 hrs  | yes (`compile()` removed, `destroy`→`dispose`) |
| 4   | React lifecycle                      | ~1-2 hrs  | no (behavioral fix)                            |
| 5   | context restore + accessors          | ~1-2 hrs  | no (additive)                                  |
| 6   | automa cleanup                       | ~1 hr     | no (internal)                                  |
| 7   | uniform contract + warnings          | ~1-2 hrs  | yes (shader-visible `u_mouse` units)           |
| 8   | types + docs                         | ~1 hr     | no (types/docs)                                |

All sessions end green, so the refactor can land incrementally with a review between each.
