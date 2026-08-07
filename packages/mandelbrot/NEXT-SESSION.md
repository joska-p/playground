# Next session — @repo/mandelbrot Phase 2 (glaze shell)

Copy this file's body into the fresh session as your opening prompt. It preloads the
context you need so you do **not** rescan the codebase. Repo: `/workspaces/playground`.

---

You are continuing the `@repo/mandelbrot` plan. The driving doc is
`packages/mandelbrot/PLAN.md` — **read it fully first**. Its §6 defines Phase 2 (glaze
shell), which is next. The coding-style skill is your technique guide — **load it before
the first edit**. The repo's `AGENTS.md` governs commands and conventions.

## How to get context WITHOUT rescanning

- **Preloaded and verified — trust it.** Everything below was checked in the previous
  session (types, glaze APIs, shader surfaces, the fracture pattern). Don't re-derive it.
- **Read these files only** (small, high-value):
    - `packages/mandelbrot/PLAN.md` — phases, decisions, hand-off notes (§9).
    - `packages/mandelbrot/REVIEW.md` — pipeline depth (skim; it's long).
    - `packages/fracture/src/components/PerturbationScene.tsx` (lines ~107–213) — the glaze
      integration pattern to mirror.
    - `packages/fracture/src/core/createOrbitTextures.ts` — the orbit-texture pattern.
- **For any targeted question, use the codegraph MCP tool** (`codegraph_explore`) — one
  call answers what a grep+read loop would take dozens of turns to find. Do not grep the
  repo for facts already stated here.
- Do not explore the whole repo, read `fracture`'s other scenes, or audit other packages.
  `@repo/glaze` and `@repo/worker-pool` are already proven; don't re-read their internals
  unless the codegraph tool shows something contradicting this prompt.

## Current state (Phase 0 ✅ `4ccb66d4`, Phase 1 ✅ `50d20022`)

The arbitrary-precision view math, perturbation shader, and reference pipeline all work.
The remaining gap: the app still renders through a bespoke WebGL2 `renderer.ts` instead of
`@repo/glaze`. That is exactly what Phase 2 replaces.

### File map (all under `packages/mandelbrot/src/`)

| File                               | What it is                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/mandelbrot-viewer.tsx` | THE imperative shell: WebGL init, rAF render loop, pointer/wheel input on the BigFloat view, `requestReference`, HUD + ControlPanel. **Phase 2 rewires this onto `GpuCanvas`.**                                     |
| `components/control-panel.tsx`     | `LookState` sliders; pure view of `LookState`.                                                                                                                                                                      |
| `components/hud.tsx`               | zoom / cx / cy / maxIter / `computing` ("ref" pulse) readout.                                                                                                                                                       |
| `lib/big-float.ts`                 | `BigFloat { m: bigint; prec }`; `fromNumber`/`toNumber`/`add`/`sub`/`mul`/`mulInt`/`zero`/`withPrec`.                                                                                                               |
| `lib/mandelbrot/view.ts`           | `View { cx: BigFloat; cy: BigFloat; zoom /* log2 mag */ }`; `precisionForZoom = ⌈zoom⌉+52`, `pixelSpacing`, `initialView`, `reprecision`, `panByPixels`, `zoomAtPixel`, `formatMagnification`; `BASE_SPAN_Y = 3.0`. |
| `lib/mandelbrot/look.ts`           | `LookState`/`LookParams`, `DEFAULT_LOOK`, `MAX_ITER_CAP = 60000`, `effectiveMaxIter(budgetPct, zoom)`, `lookToParams` (angles → radians).                                                                           |
| `lib/reference-orbit.ts`           | `computeReferenceOrbit` (sync, used by worker) + `computeReferenceOrbitAsync` (chunked fallback). `ReferenceOrbit { data: Float32Array /* interleaved Zx,Zy */; length }`.                                          |
| `lib/reference.worker.ts`          | Vite module-worker entry.                                                                                                                                                                                           |
| `lib/reference-worker.ts`          | `OrbitRequest`/`OrbitResult`/`OrbitPool`; `computeReferenceAsync(req, pool?)`, `toRequest(centerX, centerY, maxIter)`.                                                                                              |
| `lib/reference-policy.ts`          | `needsRecompute(view, ref, refLength, look, heightPx)`, `Superseder`.                                                                                                                                               |
| `lib/webgl/renderer.ts`            | `MandelbrotRenderer` — **delete in Phase 2** (replaced by glaze).                                                                                                                                                   |
| `lib/webgl/shaders.ts`             | `VERTEX_SRC` + `FRAGMENT_SRC` (perturbation + rebase + DE + OKLCH) — **kept as-is**.                                                                                                                                |
| `styles/global.css`                | styles (note: `exports["./styles"]` now points here).                                                                                                                                                               |

### Key signatures the renderer currently calls

- `computeReferenceAsync(req, pool?) → Promise<OrbitResult>`; `OrbitRequest = { centerXStr, centerYStr, prec, maxIter }`; `OrbitResult = { data: Float32Array, length }`.
- `toRequest(centerX: BigFloat, centerY: BigFloat, maxIter: number)`.
- `effectiveMaxIter(budgetPct, zoom)` — cap 60000; the viewer renders `min(wantIters, refLength)`.
- `lookToParams(look) → LookParams` (lightAngle in radians).

### Fragment shader facts (verified — drop-in compatible with glaze)

`FRAGMENT_SRC` uses `gl_FragCoord.xy - 0.5*uResolution` for the pixel position — it does
**not** consume any varying. glaze supplies its own fullscreen-triangle vertex shader
(emits `vUv` via `pos[gl_VertexID]`); the fragment ignores it. So the string passes to
glaze's `fragmentShader` prop essentially unchanged (keep `#version 300 es`, `precision
highp`, `out vec4 fragColor`).

Uniform list (names must match exactly):
`uResolution`(vec2) `uSpacing`(float, complex-units/px) `uRefOffset`(vec2, complex-units)
`uMaxIter`(int) `uRef`(sampler2D, RG32F, RG=(Zx,Zy)) `uRefWidth`(int) `uRefCount`(int)
`uColorFreq` `uColorOffset` `uLightAngle` `uLightHeight` `uGlow` `uChroma` `uBaseL`.

Current reference texture: fixed width **2048**, RG32F, padded to `width*height`,
NEAREST + CLAMP_TO_EDGE. `uRefWidth=2048`, `uRefCount=length`.

### glaze facts (verified)

- Add `@repo/glaze` as a `workspace:*` dependency (fracture already does this).
- `import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';` Props: `fragmentShader`,
  `uniforms(({ camera, width, height }) => Record<string, UniformValue>)`, `onRuntime`,
  `camera`/`cameraControls`/`pointerHandlers`, `canvasRef`, `dpr`, `pan`, `zoom`, `children`.
- `UniformValue` includes raw `WebGLTexture` (glaze auto-assigns texture units) —
  `setUniforms.ts`.
- glaze recompiles its own programs on `webglcontextrestored`, but **app-created raw
  textures are dead** after restore — you must re-create + re-upload (fracture's pattern).
- `FrameLoopProvider` + `useFrame` exist for rAF-driven UI (`@repo/glaze/react/`).
- `GpuFrameContext` exposes `width`/`height` → feed `uResolution: [width, height]`.

## Phase 2 task (from PLAN §6)

Delete `renderer.ts`; render through `GpuCanvas` + per-frame `uniforms`, porting the
texture/uniform plumbing. Mirror `PerturbationScene.tsx:107–213` + `createOrbitTextures.ts`.

1. **Orbit texture helper** (new, e.g. `src/lib/orbit-textures.ts` — D1 keeps it in
   `lib/`, framework/ comes at Phase 3). Single fixed-2048-wide RG32F texture:
   `texImage2D` on create, **`texSubImage2D` reuse when dims match** (the current
   `renderer.setReference` re-allocates every recompute), `dispose()`, and a getter for
   the raw `WebGLTexture`.
2. **Rewire `mandelbrot-viewer.tsx`**:
    - Render via `<GpuCanvas fragmentShader={FRAGMENT_SRC} ...>` with the uniforms callback
      computing exactly what the old render loop did: `uResolution` (from frame ctx),
      `uSpacing`, `uRefOffset` (`(reprecision(view).cx - refCenter.cx)/spacing`, same
      toNumber math as today), `uMaxIter = min(effectiveMaxIter(...), refLength)`,
      `uRefWidth/uRefCount`, and `...lookToParams(look)`.
    - **Decision to make (recommended):** set `pan={false} zoom={false}` and keep the
      existing BigFloat pointer/wheel handlers driving `viewRef`. glaze's `Camera` is
      float32 and cannot hold arbitrary-depth zoom; PLAN §2 says "Keep the BigFloat view
      math; only translate at the canvas boundary." GpuCanvas becomes a pure GL surface +
      frame loop.
    - **Retain the last orbit `Float32Array` in a ref.** Today the viewer discards
      `orbit.data` after upload — context restore needs it for re-upload.
    - Add a `webglcontextrestored` listener: `dispose()` + re-upload the last orbit
      (fracture pattern). Dispose textures on unmount.
    - `requestReference`, policy, and the HUD "computing" flag stay as-is.
    - Delete `MandelbrotRenderer` + the bespoke init/rAF/loop code it replaces (the
      rAF loop moves into glaze's per-frame uniforms callback).
3. **HUD** — PLAN says "FrameLoopProvider/useFrame for the HUD." Decide: either move the
   HUD readout to `useFrame`, or keep the current state-driven HUD. Pick the smallest
   change that stays honest to the plan; say which and why.
4. **`@repo/ui/control-panel`** — PLAN mentions it for the sliders. Check whether it
   exists and fits before adopting it; the current hand-rolled panel already works. Don't
   churn the panel unless it's clearly better.

## Constraints

- No new dependency beyond `@repo/glaze` (and the existing `@repo/worker-pool`).
- Do **not** touch `packages/fracture`; only read its patterns.
- Do **not** create `framework/` paths yet (PLAN §9 D1).
- **No tests / vitest** (preference — don't add them).
- Don't fix unrelated lint/style issues in code you're not refactoring (e.g. keep `App.tsx`
  and `control-panel.tsx` unchanged unless the task touches them).
- Follow the repo's commit style; one commit for the phase, e.g. `feat(mandelbrot): Phase 2 — glaze shell`.

## Verification

- `pnpm --filter @repo/mandelbrot lint` and `pnpm --filter @repo/mandelbrot check-types`
  must be clean. (`check-types` depends on `@repo/ui#build`; turbo handles it.)
- `pnpm --filter @repo/mandelbrot dev`: visual parity with the pre-change renderer at
  several zooms (incl. deep), pan/zoom smooth, "ref" pulse still accurate.
- Context-loss recovery: trigger a WebGL context loss (e.g. `canvas.getContext('webgl2')
.getExtension('WEBGL_lose_context').loseContext()` from devtools) and confirm the image
  re-uploads correctly.

**Done when** (PLAN §6): Reference/DE renders identically to today, with context-loss
recovery.
