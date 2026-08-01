# @repo/graphics Refactor Plan

> Living document — update statuses as the refactor progresses.
> Goals: clean-code consistency, generic pipeline, thinner React layer, aligned
> resize/DPR contracts, docs that match the actual layout.
> Breaking changes are accepted (consumers updated in-repo).

## Status legend

- `[ ]` pending
- `[~]` in progress
- `[x]` done

---

## Phase 1 — Naming & hygiene

- [x] Rename `webGlContextAttributes` → `webGLContextAttributes`
      (`core/createWebGLContext.ts`, `2d/createShaderRunner.ts`, `2d/react/useShaderRunner.ts`,
      `2d/react/ShaderCanvas.tsx`).
- [x] Extract `defaultDevicePixelRatio()` (cap `devicePixelRatio` at 2) — single source used
      by `createWebGLContext` and `createShaderRunner`. Also fixed the resize default to use it
      (was uncapped `window.devicePixelRatio`).
- [x] Delete `src/vite-env.d.ts.del` (cruft).
- [x] Move `src/review.md` → `docs/review.md`.

## Phase 2 — Generic pipeline (core win)

- [x] New `core/standardUniforms.ts`:
  - `ShaderUniformValues` type (moved here from `transforms.ts`, which re-exports it),
  - `STANDARD_UNIFORM_NAMES` (`u_resolution`, `u_aspect`, `u_mouse`) — **canonical-only**,
    legacy `uniform*` aliases dropped by decision (single source of truth, per review),
  - `applyStandardUniforms(pipeline, values)` — `hasUniform`-guarded `setUniforms`.
  - `warnUnknownUniform` helper lives in `core/compileShaderProgram.ts` (kills the 3×
    `import.meta.env.DEV` cast).
- [x] `createQuadPipeline` becomes generic: dropped `uniformBuilder` / `updateUniformBuilder` /
      `render(mousePx)` and the auto-injection; `render()` takes no args; keeps
      `compileFragmentShader` / `setUniforms` / `hasUniform` / `render` / `dispose` +
      viewport + texture-unit reset.
- [x] `createShaderRunner` owns the uniform builder; `render()` =
      `applyStandardUniforms(pipeline, builder(mousePx))` → `pipeline.render()`.
      Fixes resolution mismatch (builder = single source of truth vs `drawingBufferWidth`).
- [x] Fail-fast: throw on `render` / `setUniforms` with no compiled program (match GPGPU).
- [x] **Canonical-only decision:** legacy alias support dropped. Only real repo shader using a
      legacy name — `automa/src/shaders/cell-mesh.frag` (`uniformResolution`) — updated to
      `u_resolution`.

## Phase 3 — Transforms polish

- [x] Top-of-file coordinate-space doc block (origin + axis per space).
- [x] Zero-size guards in `createCanvasToNormalized` and `computeDataFit` + tests.
- [x] Move `generateGLSLFragment` → `core/generateGLSLFragment.ts` (re-export from transforms).

## Phase 4 — React layer

- [x] Rename `GraphicsProvider` → `FrameLoopProvider`; updated consumers:
      `fracture/App`, `automa/App`, `randomart-next/CanvasGPU`, `randomart/ValueCanvasGPU`,
      `art-canvas/ArtCanvas`.
- [x] New `2d/react/usePanZoomUniforms.ts` hook (owns `u_panOffset` / `u_zoom` mapping);
      `ShaderCanvas` composes it — no hardcoded uniform names in the component.
- [x] Fix `e.button !== 1` comment in `useInteractiveCanvas.ts`; document px-vs-normalized
      mouse spaces (ShaderCanvas pointer = normalized 0..1 → builder flips to vUv; interaction
      state = CSS px, normalized by canvas size in the pan/zoom hook).

## Phase 5 — Docs & tests

- [x] Rewrite README: `2d/`/`core/` paths, new prop names, canonical-only uniform contract
  (now a runner convention), renamed provider, `usePanZoomUniforms`, new blueprint tree.
- [x] Add package.json exports for `core/standardUniforms`, `core/generateGLSLFragment`,
  `2d/react/usePanZoomUniforms`.
- [x] Tests: standard-uniform helper, transforms guards, moved `generateGLSLFragment`.
- [x] Verify: `pnpm --filter @repo/graphics check-types`, `test`, `lint`, then repo-wide
  `check-types` + `lint` (28/28 packages), prettier clean.

## Follow-ups found during the refactor (done)

- `ShaderUniformValues` keys renamed `uniformResolution`/`uniformAspectRatio`/`uniformMouse`
  → `resolution`/`aspectRatio`/`mouse` (they collided with the removed legacy shader names;
  the builder outputs semantic values, `applyStandardUniforms` maps them to `u_*`).
- `generateGLSLFragment` emitted the removed `uniformResolution` GLSL identifier — now emits
  `u_resolution`.

## Deferred (explicitly out of scope)

- GPGPU context-loss `reinitialize` path.
- `createFrameLoop` pause / force-tick.
- GPGPU `resize` signature alignment.
