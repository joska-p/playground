# Graphics Migration Plan: `@repo/graphics` + `@repo/pixelate2d-*` → `@repo/glaze`

Goal: migrate every consumer of `@repo/graphics` and the `@repo/pixelate2d-*`
suite onto `@repo/glaze`, then delete the two old libs.

## Consumer inventory (by refactor complexity, smallest first)

| #   | Consumer                             | Footprint                                                                             | Complexity          |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------- | ------------------- |
| 1   | `@repo/pixelate2d-{core,math,react}` | zero consumers — only self-imports                                                    | delete, no refactor |
| 2   | `apps/storybook`                     | dead dep, zero imports                                                                | remove dep          |
| 3   | `@repo/randomart-next`               | 1 file (`CanvasGPU.tsx`), `ShaderCanvas` + `FrameLoopProvider`                        | near drop-in        |
| 4   | `@repo/randomart`                    | 1 file (`ValueCanvasGPU.tsx`), same + `time="uTime"`                                  | near drop-in        |
| 5   | `@repo/fracture`                     | 6 files; easy (ShaderCanvas ×2, provider, `Point2D`) + hard (raw WebGL quad pipeline) | real work           |

## Decisions (recorded)

- **Fracture pipeline approach**: DECIDED — **conform fracture to glaze's existing API, zero glaze
  changes.** Rationale: fracture/graphics holds nothing reusable that glaze lacks (fullscreen
  fragment shader → `GpuCanvas`/`useGpuCanvas`; standard uniforms → `createStandardUniformValues`
  superset; camera/pan/zoom → `useCamera` — pan already scales with zoom, just a different stored
  convention; resize/context-restore/loop → `createGpuRuntime`). The genuinely fracture-specific
  parts (reference-orbit math, RG32F textures, double-double `splitDS`, custom uniforms) are
  consumer domain logic. `zoomSpeed`, `scalePanWithZoom`, `onViewChange` gaps are handled
  consumer-side (onWheel override / formula re-derivation / diff writeback in `onFrame`).
- **Glaze internal cleanup**: `useGpuCanvas` dropped its `uniformsRef` mirror — the `draw`
  effect event already reads the latest `uniforms`/`onFrame` from render scope
  (`useEffectEvent` replaces the ref-mirror + no-deps `useEffect` trick). No API change.
- **Zero-cost items**: do both upfront (delete pixelate2d suite, drop storybook dep).
- **Known unrelated breakage**: `@repo/automa` `CellMesh.tsx:3` imports
  `@repo/glaze/gpu/createGpuDoor` — pre-existing stale import (glaze renamed the door to
  `createGpuRuntime`). Automa imports glaze, not graphics; NOT part of this migration. Also:
  repo-wide `pnpm check-types` is flaky — parallel `tsc -b` on shared project references races
  on `.tsbuildinfo`; every package passes its own `check-types` sequentially.

## Phase status

- [x] **Phase 0a** — `apps/storybook`: remove `@repo/graphics` from `package.json` (dead dep)
- [x] **Phase 0b** — delete `@repo/pixelate2d-{core,math,react}`; remove reference docs
      `apps/playground/src/content/docs/reference/packages/pixelate2d-{core,math}.md`,
      root `tsconfig.json` project references; refresh lockfile (no yml mentions existed)
- [x] **Phase 1a** — `@repo/randomart-next`: swap to `@repo/glaze/react/GpuCanvas`, drop
      `FrameLoopProvider`, remove `@repo/graphics` dep. Verified: shader uniform `u_time` + `vUv`
      match glaze's auto-set uniforms and default vertex shader (identical to old graphics).
      check-types + lint pass.
- [x] **Phase 1b** — `@repo/randomart`: swap to `@repo/glaze/react/GpuCanvas`, drop
      `FrameLoopProvider`, remove `@repo/graphics` dep. Renamed shader uniform `uT` → `u_time`
      (glaze builtin; old `time="uTime"` was a silent no-op — preview was static). check-types + lint pass.
      **Uniform-name audit (both consumers):** test-mode fragment shaders use `u_time` ✓
      (glaze builtin); `vUv` matches glaze's default vertex shader ✓. The `VALUE_VERTEX_SHADER`
      constants (`modelViewMatrix`/`projectionMatrix`) are dead code — never passed to the
      canvas in old or new code. The raw-WebGL `useWebGLRenderer` renderer (independent of
      `@repo/graphics`) is self-consistent: `u_time`/`u_animSpeed`/`u_resolution`/`u_mouse`
      declared in `compileToGLSL.ts:94-97` == queried in `useShaderProgram.ts:82-85`.
      Stale `uT` comment in `evalHelpers.ts` updated to `u_time`.
- [x] **Phase 2** — `@repo/fracture`: migrated all three scenes to `@repo/glaze/react/GpuCanvas` + a shared `core/useFractureView` hook (external `useCamera` pair, `zoomSpeed=250` wheel
      override returning `true`, store writeback). `viewStore` `Point2D` now from
      `@repo/glaze/core/coords/camera`. Orbit RG32F textures moved to `core/createOrbitTextures`
      (lazy-bound to glaze's GL context inside the `uniforms` callback; re-uploaded on
      `webglcontextrestored`; disposed on unmount). `App.tsx` dropped `FrameLoopProvider`.
      Center/pan math preserved verbatim from the old scenes (original: `u_panOffset = -panNorm`;
      double-split: DS `u_centerRe/u_centerIm`; perturbation: `u_zoom`/`u_scale`/orbit samplers).
      Sizing kept the old `<canvas width/height:100%>` contract via `className="h-full w-full"`.
      check-types + lint pass.
- [x] **Phase 3** — deleted `packages/graphics`; pruned `reference/packages/graphics.md`; removed
      `graphics` from `scripts/sync-package-readmes.mjs` `PACKAGE_NAMES`; refreshed lockfile.
      Repo-wide `@repo/graphics` grep: zero remaining imports (only historical docs mention it).
      All touched packages pass `check-types` + `lint` individually (see unrelated-breakage note).

## Verification

Per package: `pnpm --filter @repo/<pkg> check-types` and `pnpm --filter @repo/<pkg> lint`.
Repo-wide after Phase 3: `pnpm check-types && pnpm lint`.

## Key API mappings (verified)

| `@repo/graphics`                                                      | `@repo/glaze`                                        | Notes                                                                                                         |
| --------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `ShaderCanvas` (`2d/react/ShaderCanvas`)                              | `react/GpuCanvas`                                    | GpuCanvas owns frame loop + interaction                                                                       |
| `FrameLoopProvider` / `useFrame`                                      | (not needed)                                         | GpuCanvas is self-driven; `useGpuCanvas.onFrame` / `GpuRuntime.setDraw` if you need the frame                 |
| `usePanZoom` (`zoomToCursor`, `scalePanWithZoom`, `onViewChange`)     | `react/useCamera` + `react/useCanvasActions`        | pan stored unscaled (px); convert at the boundary (`pan * zoom` in, `x / zoom` out)                           |
| `usePanZoomUniforms` (`u_zoom`/`u_panOffset`)                         | (none)                                               | supply in GpuCanvas `uniforms` callback; fracture keeps its own center formula                                |
| `zoomSpeed` prop                                                      | `zoomSpeed` prop on `react/CpuCanvas`/`GpuCanvas`    | exponential factor per scroll tick, default `0.002`; `pointerHandlers.onWheel` returning `true` overrides it  |
| `time="uTime"`                                                        | `uniforms: (ctx) => ({ uTime: ctx.time })`           | glaze auto-sets `u_time` (lowercase); prefer the builtin name                                                 |
| `transforms` / `Point2D`                                              | `core/coords/camera`                                 | `Point2D` re-exported there                                                                                   |
| `createQuadPipeline` / `createWebGLContext` / `applyStandardUniforms` | `gpu/createGpuRuntime` + `uniforms` callback         | fragment program via `runtime.createProgram`; raw-GL resources (e.g. RG32F orbit textures) stay consumer-side |
| default vertex shader (`vUv`)                                         | `gpu/shader/compileProgram.FULLSCREEN_TRIANGLE`      | byte-identical (`in vec2 vUv`)                                                                                |
| standard uniforms (`u_resolution`/`u_aspect`/`u_mouse`/`u_time`/…)    | `gpu/shader/setUniforms.createStandardUniformValues` | applied per-frame in `renderProgram`; unknown-uniform keys are skipped                                        |
