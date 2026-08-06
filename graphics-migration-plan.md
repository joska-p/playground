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

- **Fracture pipeline approach**: DEFERRED — review `createPerturbationPipeline.ts`
    - `PerturbationScene.tsx` first, then present options (reimplement on glaze
      runtime vs. add glaze exports).
- **Zero-cost items**: do both upfront (delete pixelate2d suite, drop storybook dep).

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
      (glaze builtin; old `time="uTime"` was a silent no-op — preview was static). check-types
      + lint pass.
      **Uniform-name audit (both consumers):** test-mode fragment shaders use `u_time` ✓
      (glaze builtin); `vUv` matches glaze's default vertex shader ✓. The `VALUE_VERTEX_SHADER`
      constants (`modelViewMatrix`/`projectionMatrix`) are dead code — never passed to the
      canvas in old or new code. The raw-WebGL `useWebGLRenderer` renderer (independent of
      `@repo/graphics`) is self-consistent: `u_time`/`u_animSpeed`/`u_resolution`/`u_mouse`
      declared in `compileToGLSL.ts:94-97` == queried in `useShaderProgram.ts:82-85`.
      Stale `uT` comment in `evalHelpers.ts` updated to `u_time`.
- [ ] **Phase 2** — `@repo/fracture`: review pipeline code, decide approach, migrate
- [ ] **Phase 3** — delete `@repo/graphics`; prune `graphics.md` reference doc;
      update `scripts/sync-package-readmes.mjs` `PACKAGE_NAMES`; repo-wide check

## Verification

Per package: `pnpm --filter @repo/<pkg> check-types` and `pnpm --filter @repo/<pkg> lint`.
Repo-wide after Phase 3: `pnpm check-types && pnpm lint`.

## Key API mappings

| `@repo/graphics`                                                      | `@repo/glaze`                                | Notes                                       |
| --------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------- |
| `ShaderCanvas` (`2d/react/ShaderCanvas`)                              | `react/GpuCanvas`                            | GpuCanvas owns its frame loop + interaction |
| `FrameLoopProvider` / `useFrame`                                      | `react/FrameLoopProvider` / `react/useFrame` | often not needed — GpuCanvas self-driven    |
| `usePanZoom`                                                          | `react/useCanvasInteraction`                 | built into GpuCanvas via `pan`/`zoom` props |
| `time="uTime"`                                                        | `uniforms: (ctx) => ({ uTime: ctx.time })`   | glaze auto-sets `u_time` (lowercase)        |
| `transforms` / `Point2D`                                              | `core/coords/*`                              | verify export parity during migration       |
| `createQuadPipeline` / `createWebGLContext` / `applyStandardUniforms` | (none today)                                 | Phase 2 decision point                      |
